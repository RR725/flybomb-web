import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Select, Tooltip } from 'antd';
const Option = Select.Option;
import { DragSource, DropTarget } from 'react-dnd';
import utils from '../../../lib/utils';



const cardSource = {
	beginDrag(props) {
		return {
			id: props.id,
			index: props.index
		};
	}
};

const cardTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

		// Determine mouse position
		const clientOffset = monitor.getClientOffset();

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}

		// Time to actually perform the action
		props.moveCard(dragIndex, hoverIndex);

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex;
	}
};


let Card = React.createClass({
	//   static propTypes = {
	//     connectDragSource: PropTypes.func.isRequired,
	//     connectDropTarget: PropTypes.func.isRequired,
	//     index: PropTypes.number.isRequired,
	//     isDragging: PropTypes.bool.isRequired,
	//     id: PropTypes.any.isRequired,
	//     text: PropTypes.string.isRequired,
	//     moveCard: PropTypes.func.isRequired
	//   };
	getDefaultProps() {
		return {
			connectDragSource: PropTypes.func.isRequired,
			connectDropTarget: PropTypes.func.isRequired,
			index: PropTypes.number.isRequired,
			isDragging: PropTypes.bool.isRequired,
			id: PropTypes.any.isRequired,
			fname: PropTypes.string.isRequired,
			moveCard: PropTypes.func.isRequired
		};
	},
	getInitialState() {

		return {
			displayDel: 'none',
			displayAndor: 'none'
		};
	},
	deleteItem(e) {
		let id = e.target.getAttribute('data-fid');
		let fname = e.target.getAttribute('data-fname');
		this.props.deleteItem(id, fname);
	},
	showDel() {
		this.setState({
			displayDel: ''
		});
	},
	hideDel() {
		this.setState({
			displayDel: 'none'
		});
	},
	selectAndor(text, options) {
		let fid = options.props.fid;
		this.setState({
			defaultAndor: text
		});
		this.props.selectAndor(text, fid);
	},
	setFreversed(fid) {
		this.props.setFreversed(fid);
	},
	getContainer() {
		return document.getElementById('ugToolbar');
	},
	render() {
		let style = {

		};
		const { fname, fid, fpermission, fnames, andorText, andor, className, isDragging, connectDragSource, connectDropTarget } = this.props;
		const opacity = isDragging ? 0 : 1;
		style.opacity = opacity;
		if (!fpermission && fpermission !== undefined) {
			style.color = '#f00';
		}
		return connectDragSource(connectDropTarget(
			<div className={'list_item ' + className} style={style}>

				<div className="item_select" onMouseOver={this.showDel} onMouseOut={this.hideDel}>
					{(!fpermission && fpermission !== undefined) && <Tooltip getTooltipContainer={this.getContainer} title='标签无权限'>
						<i className="fs14  fw_n cursor_p anticon anticon-info-circle-o permission_info"></i>
					</Tooltip>}
					{fname === '(' || fname === ')' ?
						fname
						:
						<div className='fname_area'>
							<div className="fname" title={fname + '：' + fnames}>
								{fname + '：' + fnames}
							</div>
							<span onClick={this.setFreversed.bind(this, fid)} className={'freversed_' + (this.props['freversed' + fid] ? 'true' : 'false')}>取反</span>
						</div>
					}
					<span title="删除" style={{ display: this.state.displayDel }} className='item_del'>
						<img src={utils.cdn + '/resources/push/images/delete.png'} data-fname={fname} data-fid={fid} onClick={this.deleteItem} className="i_delete" />
					</span>
				</div>
				{andor ?
					<div className="andor">
						<Select size="large" onSelect={this.selectAndor} defaultValue={this.state.defaultAndor || andorText === 'and' ? '且' : '或'}>
							<Option fid={fid} value='且'>且</Option>
							<Option fid={fid} value='或'>或</Option>
						</Select>
					</div>
					:
					null
				}


			</div>
		));
	}
});

// {andor ? <span onMouseOver={this.showAndor} onMouseOut={this.showAndor} className="andor">
// 					{this.state.defaultAndor}
// 					<ul style={{ display: this.state.displayAndor }}>
// 						<li data-fid={fid} onClick={this.selectAndor}>且</li>
// 						<li data-fid={fid} onClick={this.selectAndor}>或</li>
// 					</ul>
// 				</span> : null
// 				}
const ContainerDragSource = DragSource('card', cardSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
}))(Card);
export default DropTarget('card', cardTarget, connect => ({
	connectDropTarget: connect.dropTarget()
}))(ContainerDragSource);


// @DropTarget(ItemTypes.CARD, cardTarget, connect => ({
//   connectDropTarget: connect.dropTarget()
// }))
// @DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
//   connectDragSource: connect.dragSource(),
//   isDragging: monitor.isDragging()
// }))