import React from 'react';
import ReactDOM from 'react-dom';
import {
	Menu, Icon
}
from 'antd';
import {
	Link
}
from 'react-router';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Sider = React.createClass({

	render() {
		return (
			<div className="sidebar">
		        <Menu 
					style={{ width: 240,float:'left' }}
					defaultOpenKeys={['sub1','sub2']}
					mode="inline">
					<SubMenu key="sub1" title={<span><Icon type="retweet" /><span>推送管理</span></span>}>
						<MenuItemGroup title="固件/应用列表">
						    <Menu.Item key="1"><Link  activeClassName="active" to="/list/firmware" >固件</Link></Menu.Item>
						    <Menu.Item key="2"><Link   activeClassName="active"  to="/list/app" >应用</Link></Menu.Item>
						</MenuItemGroup>
						<MenuItemGroup title="任务管理">
						    <Menu.Item key="3"><Link  activeClassName="active"   to="/rule/firmware" >固件</Link></Menu.Item>
						    <Menu.Item key="4"><Link  activeClassName="active"   to="/rule/app" >应用</Link></Menu.Item>
						</MenuItemGroup>

					</SubMenu>
					<SubMenu key="sub2" title={<span><Icon type="setting" /><span>配置管理</span></span>}>

						<Menu.Item key="5"><Link  activeClassName="active"   to="/manage/product_type" >产品类型</Link></Menu.Item>
						<Menu.Item key="6"><Link  activeClassName="active"   to="/manage/android_version" >安卓版本</Link></Menu.Item>
						<Menu.Item key="7"><Link  activeClassName="active"   to="/manage/app_type" >应用类型</Link></Menu.Item>
					 

					</SubMenu>
		        </Menu>
		    </div>
		);
	}
});
module.exports = Sider;