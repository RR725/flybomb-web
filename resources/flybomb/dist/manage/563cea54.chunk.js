webpackJsonp([3],{1693:function(e,t){"use strict";e.exports=[{type:1,type_desc:"单选题"},{type:2,type_desc:"多选题"},{type:3,type_desc:"名词解释"},{type:4,type_desc:"简答题"},{type:5,type_desc:"论述题"}]},1756:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e},r=a(594),i=l(r),o=a(775),s=a(1),u=l(s),d=a(2),c=l(d),p=a(1683),f=l(p),m=a(1757),g=l(m),h=a(1693),v=l(h),y=o.Radio.Group,E=o.Form.Item,b={labelCol:{span:5},wrapperCol:{span:19}},C=i.default.createClass({displayName:"Add",getInitialState:function(){return{subjectList:[],loading:!1}},componentWillUnmount:function(){document.querySelector("#home").className=""},getList:function(){var e=this;f.default.post(u.default.subjectList,{},function(t){e.setState({subjectList:t.value})})},componentDidMount:function(){var e=this;document.querySelector("#home").className="active",this.getList();var t=c.default.getQueryObj(window.location.hash),a={id:t.id};t.id&&f.default.post(u.default.questionFindOne,a,function(t){e.setState({editData:t.value}),e.props.form.setFieldsValue({type:String(t.value.type)})})},cantNull:function(e,t){var a=this.props.form.getFieldDecorator;return a(e,{validate:[{rules:[{whitespace:!0,required:!0,message:"请填写应用名称"}],trigger:["onBlur","onChange"]}]})(t)},handleSubmit:function(){var e=this.props.form.getFieldValue("type"),t=c.default.getQueryObj(window.location.hash),a=t.id;this.props.form.validateFields(function(t,l){var n=[],r="";for(var i in l){var s=l[i];i.indexOf("answer")>-1&&("2"===e?(s.sort(),r=s.join(",")):r=s),i.indexOf("content")>-1&&n.push(s)}if(t)return void console.log("Errors in form!!!");var d={subject:l.subject,content:n,type:l.type,point:l.point||"",answer:r,title:l.title};return a?(d.questionId=a,void f.default.post(u.default.updateQuestion,d,function(){o.message.success("修改成功")})):void f.default.post(u.default.addQuestion,d,function(){o.message.success("新建成功")})})},add:function(){this.toggleModal()},getContent:function(){var e=this.props.form.getFieldDecorator,t=this.props.form.getFieldValue("type"),a=void 0,l=this.state.editData;if("1"==t){var n=["A","B","C","D"];a=n.map(function(t,a){return i.default.createElement(o.Row,{style:{height:44},key:a},i.default.createElement(o.Col,{span:"1"},t),i.default.createElement(o.Col,{span:"23"},e("content_radio_"+t,{initialValue:l?l.content&&l.content[a]:"",validate:[{rules:[{whitespace:!0,required:!0,message:"请填写内容"}],trigger:["onBlur","onChange"]}]})(i.default.createElement(o.Input,null))))})}else if("2"==t){var r=["A","B","C","D","E"];a=r.map(function(t,a){return i.default.createElement(o.Row,{style:{height:44},key:a},i.default.createElement(o.Col,{span:"1"},t),i.default.createElement(o.Col,{span:"23"},e("content_checkbox_"+t,{initialValue:l?l.content&&l.content[a]:"",validate:[{rules:[{whitespace:!0,required:!0,message:"请填写内容"}],trigger:["onBlur","onChange"]}]})(i.default.createElement(o.Input,null))))})}else a=e("content",{initialValue:l?l.content:"",validate:[{rules:[{whitespace:!0,required:!0,message:"请填写内容"}],trigger:["onBlur","onChange"]}]})(i.default.createElement(o.Input,{type:"textarea",rows:6}));return a},toggleModal:function(){this.setState({visible:!this.state.visible})},onChangeType:function(e){this.setState({type:e})},getAnswer:function(){var e=this.props.form.getFieldDecorator,t=this.props.form.getFieldValue("type"),a=void 0,l=this.state.editData,n={display:"block",height:"32px",lineHeight:"32px"},r=void 0;if("1"==t){var s=["A","B","C","D"],u=s.map(function(e,t){return i.default.createElement(o.Col,{key:t,span:"3"},i.default.createElement(o.Radio,{style:n,value:e},e))});a=i.default.createElement(y,{style:{width:"100%"}},i.default.createElement(o.Row,null,u)),r=l?l.answer:null}else if("2"==t){var d=["A","B","C","D","E"],c=d.map(function(e,t){return i.default.createElement(o.Col,{key:t,span:"3"},i.default.createElement(o.Checkbox,{value:e},e))});a=i.default.createElement(o.Checkbox.Group,null,i.default.createElement(o.Row,null,c)),r=l?l.answer:null,r=l?r.split(","):[]}else a=i.default.createElement(o.Input,{type:"textarea",rows:6}),r=l?l.answer:"";var p=e("answer_"+t,{initialValue:r,validate:[{rules:[{required:!0,message:"请填写答案"}],trigger:["onBlur","onChange"]}]})(a);return p},render:function(){var e=this.props.form.getFieldValue("type"),t=c.default.getQueryObj(window.location.hash),a=t.id,l=a?"修改":"创建",r=this.state.editData,s=this.props.form.getFieldDecorator,u=this.state.subjectList,d=u.map(function(e,t){return i.default.createElement(o.Select.Option,{key:t,value:e.name},e.name)}),p=v.default.map(function(e,t){return i.default.createElement(o.Select.Option,{key:t,value:String(e.type)},e.type_desc)});return i.default.createElement("div",null,i.default.createElement("div",{className:"home_toolbar"},i.default.createElement(o.Row,null,i.default.createElement(o.Col,{span:"20"},i.default.createElement("div",{className:"title"},i.default.createElement("span",{className:"border"}),"新建")),i.default.createElement(o.Col,{span:"4"},i.default.createElement(o.Button,{onClick:this.add,type:"primary",size:"large"},"新建科目")))),i.default.createElement(g.default,{toggleModal:this.toggleModal,getList:this.getList,visible:this.state.visible}),i.default.createElement(o.Form,{style:{paddingTop:20},layout:"horizontal"},i.default.createElement(o.Row,{className:"add_app"},i.default.createElement(o.Col,{span:"18"},i.default.createElement(E,n({},b,{label:"科目"}),s("subject",{initialValue:r?r.subject:"",validate:[{rules:[{required:!0,message:"请选择科目"}],trigger:["onBlur","onChange"]}]})(i.default.createElement(o.Select,{style:{width:300}},d))),i.default.createElement(E,n({},b,{label:"类型"}),s("type",{initialValue:r?String(r.type):"",onChange:this.onChangeType,validate:[{rules:[{required:!0,message:"请选择类型"}],trigger:["onBlur","onChange"]}]})(i.default.createElement(o.Select,{style:{width:300}},p))),i.default.createElement(E,n({},b,{label:"标题"}),s("title",{initialValue:r?r.title:"",validate:[{rules:[{whitespace:!0,required:!0,message:"请填写标题"}],trigger:["onBlur","onChange"]}]})(i.default.createElement(o.Input,null))),e<3&&i.default.createElement(E,n({},b,{label:"内容"}),this.getContent()),i.default.createElement(E,n({},b,{label:"答案"}),this.getAnswer()),e<3&&i.default.createElement(E,n({},b,{label:"要点透析"}),s("point",{initialValue:r?r.point:""})(i.default.createElement(o.Input,{type:"textarea",rows:6}))),i.default.createElement(E,n({className:"create_app"},b,{label:" "}),i.default.createElement(o.Button,{type:"primary",className:"btn_normal_show color_bg",onClick:this.handleSubmit,size:"large"},l))))))}});C=o.Form.create()(C),e.exports=C},1757:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e},r=a(594),i=l(r),o=a(775),s=a(1),u=l(s),d=a(1683),c=l(d),p=(o.Radio.Group,o.Form.Item),f={labelCol:{span:5},wrapperCol:{span:19}},m=i.default.createClass({displayName:"App",getInitialState:function(){return{subjectList:[],loading:!1}},componentDidMount:function(){},handleOk:function(){var e=this;this.props.form.validateFields(function(t,a){if(t&&0===Object.keys(t).length&&(t=null),t)return void console.log("Errors in form!!!");var l={name:a.addName};c.default.post(u.default.addSubject,l,function(){o.message.success("新建成功"),e.props.toggleModal(),e.props.getList()})})},handleCancel:function(){this.props.toggleModal()},render:function(){var e=this.props.form.getFieldDecorator;return i.default.createElement(o.Form,{style:{paddingTop:20},layout:"horizontal"},i.default.createElement(o.Modal,{title:"新建科目",visible:this.props.visible,onOk:this.handleOk,onCancel:this.handleCancel},i.default.createElement(p,n({},f,{label:"科目"}),e("addName",{validate:[{rules:[{whitespace:!0,required:!0,message:"请填写科目名称"}],trigger:["onBlur","onChange"]}]})(i.default.createElement(o.Input,{style:{width:300}})))))}});m=o.Form.create()(m),e.exports=m}});