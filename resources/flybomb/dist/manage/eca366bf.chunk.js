webpackJsonp([3],{1614:function(e,t){"use strict";e.exports=[{type:1,type_desc:"单选题"},{type:2,type_desc:"多选题"},{type:3,type_desc:"名词解释"},{type:4,type_desc:"简答题"},{type:5,type_desc:"论述题"}]},1677:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function l(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)}var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},i=a(594),s=n(i),o=a(775),u=a(1),d=n(u),c=a(2),p=n(c),f=a(1604),m=n(f),h=a(1678),g=n(h),v=a(1614),y=n(v),E=o.Radio.Group,b=o.Form.Item,C={labelCol:{span:5},wrapperCol:{span:19}},w=s.default.createClass({displayName:"Add",getInitialState:function(){return{tags:[],inputVisible:!1,inputValue:"",subjectList:[],loading:!1}},componentWillUnmount:function(){document.querySelector("#home").className=""},getList:function(){var e=this;m.default.post(d.default.subjectList,{},function(t){e.setState({subjectList:t.value})})},componentDidMount:function(){var e=this;document.querySelector("#home").className="active",this.getList();var t=p.default.getQueryObj(window.location.hash),a={questionId:t.questionId};t.questionId&&m.default.post(d.default.questionFindOne,a,function(t){var a=t.value;e.setState({editData:a,tags:a.tags||[]}),e.props.form.setFieldsValue({type:String(t.value.type)})})},cantNull:function(e,t){var a=this.props.form.getFieldDecorator;return a(e,{validate:[{rules:[{whitespace:!0,required:!0,message:"请填写应用名称"}],trigger:["onBlur","onChange"]}]})(t)},handleSubmit:function(){var e=this.props.form.getFieldValue("type"),t=p.default.getQueryObj(window.location.hash),a=t.questionId,n=this.state.tags;return n.length?void this.props.form.validateFields(function(t,l){var r=[],i="";for(var s in l){var u=l[s];s.indexOf("answer")>-1&&("2"===e?(u.sort(),i=u.join(",")):i=u),s.indexOf("content")>-1&&r.push(u)}if(t)return void console.log("Errors in form!!!");var c={subject:l.subject,content:r,type:l.type,tags:n,point:l.point||"",answer:i,title:l.title};return a?(c.questionId=a,void m.default.post(d.default.updateQuestion,c,function(){o.message.success("修改成功")})):void m.default.post(d.default.addQuestion,c,function(){o.message.success("新建成功")})}):void o.message.error("请至少填写一个标签")},add:function(){this.toggleModal()},getContent:function(){var e=this.props.form.getFieldDecorator,t=this.props.form.getFieldValue("type"),a=void 0,n=this.state.editData;if("1"==t){var l=["A","B","C","D"];a=l.map(function(t,a){return s.default.createElement(o.Row,{style:{height:44},key:a},s.default.createElement(o.Col,{span:"1"},t),s.default.createElement(o.Col,{span:"23"},e("content_radio_"+t,{initialValue:n?n.content&&n.content[a]:"",validate:[{rules:[{whitespace:!0,required:!0,message:"请填写内容"}],trigger:["onBlur","onChange"]}]})(s.default.createElement(o.Input,null))))})}else if("2"==t){var r=["A","B","C","D","E"];a=r.map(function(t,a){return s.default.createElement(o.Row,{style:{height:44},key:a},s.default.createElement(o.Col,{span:"1"},t),s.default.createElement(o.Col,{span:"23"},e("content_checkbox_"+t,{initialValue:n?n.content&&n.content[a]:"",validate:[{rules:[{whitespace:!0,required:!0,message:"请填写内容"}],trigger:["onBlur","onChange"]}]})(s.default.createElement(o.Input,null))))})}else a=e("content",{initialValue:n?n.content:"",validate:[{rules:[{whitespace:!0,required:!0,message:"请填写内容"}],trigger:["onBlur","onChange"]}]})(s.default.createElement(o.Input,{type:"textarea",rows:6}));return a},toggleModal:function(){this.setState({visible:!this.state.visible})},onChangeType:function(e){this.setState({type:e})},getAnswer:function(){var e=this.props.form.getFieldDecorator,t=this.props.form.getFieldValue("type"),a=void 0,n=this.state.editData,l={display:"block",height:"32px",lineHeight:"32px"},r=void 0;if("1"==t){var i=["A","B","C","D"],u=i.map(function(e,t){return s.default.createElement(o.Col,{key:t,span:"3"},s.default.createElement(o.Radio,{style:l,value:e},e))});a=s.default.createElement(E,{style:{width:"100%"}},s.default.createElement(o.Row,null,u)),r=n?n.answer:null}else if("2"==t){var d=["A","B","C","D","E"],c=d.map(function(e,t){return s.default.createElement(o.Col,{key:t,span:"3"},s.default.createElement(o.Checkbox,{value:e},e))});a=s.default.createElement(o.Checkbox.Group,null,s.default.createElement(o.Row,null,c)),r=n?n.answer:null,r=n?r.split(","):[]}else a=s.default.createElement(o.Input,{type:"textarea",rows:6}),r=n?n.answer:"";var p=e("answer_"+t,{initialValue:r,validate:[{rules:[{required:!0,message:"请填写答案"}],trigger:["onBlur","onChange"]}]})(a);return p},handleClose:function(e){var t=this.state.tags.filter(function(t){return t!==e});this.setState({tags:t})},showInput:function(){var e=this;this.setState({inputVisible:!0},function(){return e.input.focus()})},handleInputChange:function(e){this.setState({inputValue:e.target.value})},handleInputConfirm:function(){var e=this.state,t=e.inputValue,a=e.tags;t&&a.indexOf(t)===-1&&(a=[].concat(l(a),[t])),this.setState({tags:a,inputVisible:!1,inputValue:""})},saveInputRef:function(e){this.input=e},render:function(){var e=this,t=this.state,a=t.tags,n=t.inputVisible,l=t.inputValue,i=this.props.form.getFieldValue("type"),u=p.default.getQueryObj(window.location.hash),d=u.questionId,c=d?"修改":"创建",f=this.state.editData,m=this.props.form.getFieldDecorator,h=this.state.subjectList,v=h.map(function(e,t){return s.default.createElement(o.Select.Option,{key:t,value:e.name},e.name)}),E=y.default.map(function(e,t){return s.default.createElement(o.Select.Option,{key:t,value:String(e.type)},e.type_desc)});return s.default.createElement("div",null,s.default.createElement("div",{className:"home_toolbar"},s.default.createElement(o.Row,null,s.default.createElement(o.Col,{span:"20"},s.default.createElement("div",{className:"title"},s.default.createElement("span",{className:"border"}),"新建")),s.default.createElement(o.Col,{span:"4"},s.default.createElement(o.Button,{onClick:this.add,type:"primary",size:"large"},"新建科目")))),s.default.createElement(g.default,{toggleModal:this.toggleModal,getList:this.getList,visible:this.state.visible}),s.default.createElement(o.Form,{style:{paddingTop:20},layout:"horizontal"},s.default.createElement(o.Row,{className:"add_app"},s.default.createElement(o.Col,{span:"18"},s.default.createElement(b,r({},C,{label:"科目"}),m("subject",{initialValue:f?f.subject:"",validate:[{rules:[{required:!0,message:"请选择科目"}],trigger:["onBlur","onChange"]}]})(s.default.createElement(o.Select,{style:{width:300}},v))),s.default.createElement(b,r({},C,{label:"类型"}),m("type",{initialValue:f?String(f.type):"",onChange:this.onChangeType,validate:[{rules:[{required:!0,message:"请选择类型"}],trigger:["onBlur","onChange"]}]})(s.default.createElement(o.Select,{style:{width:300}},E))),s.default.createElement(b,r({},C,{label:"标题"}),m("title",{initialValue:f?f.title:"",validate:[{rules:[{whitespace:!0,required:!0,message:"请填写标题"}],trigger:["onBlur","onChange"]}]})(s.default.createElement(o.Input,null))),i<3&&s.default.createElement(b,r({},C,{label:"内容"}),this.getContent()),s.default.createElement(b,r({},C,{label:"答案"}),this.getAnswer()),i<3&&s.default.createElement(b,r({},C,{label:"要点透析"}),m("point",{initialValue:f?f.point:""})(s.default.createElement(o.Input,{type:"textarea",rows:6}))),s.default.createElement(b,r({},C,{label:"标签"}),a.map(function(t,a){var n=s.default.createElement(o.Tag,{key:t,closable:!0,afterClose:function(){return e.handleClose(t)}},t);return n}),n&&s.default.createElement(o.Input,{ref:this.saveInputRef,type:"text",size:"small",style:{width:78},value:l,onChange:this.handleInputChange,onBlur:this.handleInputConfirm,onPressEnter:this.handleInputConfirm}),!n&&s.default.createElement(o.Button,{size:"small",type:"dashed",onClick:this.showInput},"+ 新标签")),s.default.createElement(b,r({className:"create_app"},C,{label:" "}),s.default.createElement(o.Button,{type:"primary",className:"btn_normal_show color_bg",onClick:this.handleSubmit,size:"large"},c))))))}});w=o.Form.create()(w),e.exports=w},1678:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},r=a(594),i=n(r),s=a(775),o=a(1),u=n(o),d=a(1604),c=n(d),p=(s.Radio.Group,s.Form.Item),f={labelCol:{span:5},wrapperCol:{span:19}},m=i.default.createClass({displayName:"App",getInitialState:function(){return{subjectList:[],loading:!1}},componentDidMount:function(){},handleOk:function(){var e=this;this.props.form.validateFields(function(t,a){if(t&&0===Object.keys(t).length&&(t=null),t)return void console.log("Errors in form!!!");var n={name:a.addName};c.default.post(u.default.addSubject,n,function(){s.message.success("新建成功"),e.props.toggleModal(),e.props.getList()})})},handleCancel:function(){this.props.toggleModal()},render:function(){var e=this.props.form.getFieldDecorator;return i.default.createElement(s.Form,{style:{paddingTop:20},layout:"horizontal"},i.default.createElement(s.Modal,{title:"新建科目",visible:this.props.visible,onOk:this.handleOk,onCancel:this.handleCancel},i.default.createElement(p,l({},f,{label:"科目"}),e("addName",{validate:[{rules:[{whitespace:!0,required:!0,message:"请填写科目名称"}],trigger:["onBlur","onChange"]}]})(i.default.createElement(s.Input,{style:{width:300}})))))}});m=s.Form.create()(m),e.exports=m}});