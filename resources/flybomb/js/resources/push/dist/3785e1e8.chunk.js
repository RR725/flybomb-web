webpackJsonp([14,10],{902:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}var r=a(600),n=l(r),s=a(783),i=n.default.createClass({displayName:"Info",getContainer:function(){return document.getElementById("detailTable")},render:function(){var e=this,t=[{text:"目标数",title:"计划推送的目标数"},{text:"日增用户数",title:"当天首次订阅应用的设备数"},{text:"在线峰值用户数",title:"订阅该应用的设备中，当天同时在线的数量峰值"},{text:"日联网用户数",title:"订阅该应用的设备中，当天有联网行为的设备数总和"},{text:"累计注册用户数",title:"历史累积订阅该应用的设备数，已卸载应用不计入累计用户数中"},{text:"联网数",title:"联网并且与通道形成长链接的设备数"},{text:"到达应用数",title:"PushSDK将消息发送给应用的数量（flyme6中，通知栏消息由pushSDK弹出，此埋点仍保留有上报数据）"},{text:"划掉数",title:"在通知栏中划掉消息的数量。透传消息不统计该项"},{text:"已卸载数",title:"本次推送任务中应用已被卸载的数量，数据上将出现接收数大于展示数。（flyme6固件此应用会被反订阅，在重新订阅前下次推送任务将不朝它推送；flyme6以下固件应用没有被反订阅）"},{text:"有效数",title:"从目标数中去除错误或无效的ID，实际有效的ID数量。筛选包括开关状态，订阅状态，pushid有效性以及其他可以推送状态"},{text:"推送数",title:"Push平台实际下发推送的数量"},{text:"接收数",title:"Push服务接收数，任务有效期内，联网并正常接收到推送消息的数量"},{text:"展示数",title:"客户端从Push服务收到消息，并在通知栏中展示的数量（3.0以下版本SDK，数据统计T+1，3.0以上实时统计。透传消息没有展示数统计）"},{text:"点击数",title:"用户点击消息的数量（3.0以下版本SDK，数据统计T+1，3.0以上实时统计。透传消息没有点击数统计）"},{text:"App ID",title:"应用的唯一标识，客户端订阅推送时使用"},{text:"App Key",title:"客户端身份标识，客户端订阅推送时使用"},{text:"App Secret",title:"服务端身份标识，服务端 SDK 初始化使用"},{text:"点击动作",title:"调起包名不是必填项，如不填，则参数传给本应用"},{text:"推送黑名单",title:"选择黑名单后，本次推送将不会朝这批用户推送"},{text:"定速推送",title:"开启定速推送后，此任务的推送速率将按设置的速率推送。速率不会超过应用最大推送速率"},{text:"定时展示",title:"开启定时展示后，目标用户的展示量将平摊到时间段内"},{text:"任务定制",title:"设置好循环推送的周期后，会在规定的时间点进行推送"}],a=t.map(function(t){var a=e.props.text;return a.indexOf(t.text)>-1?t.title:""});return n.default.createElement("span",null,n.default.createElement(s.Tooltip,{getTooltipContainer:this.getContainer,title:a},n.default.createElement("i",{className:"fs14 color999 fw_n cursor_p anticon anticon-info-circle-o"})),this.props.text)}});e.exports=i},921:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e},n=a(600),s=l(n),i=a(783),u=a(777),d=l(u),o=a(922),c=l(o),p=i.Form.Item,m=i.Radio.Button,f=i.Radio.Group,h=s.default.createClass({displayName:"PushTime",getInitialState:function(){var e=this.props.router,t=864e5,a=new Date,l="userdata"===e?new Date(+new Date-6*t):a,r=d.default.dateFormat("yyyy-MM-dd",l),n=d.default.dateParse(r+" 00:00:00");return{startTimeStatus:"success",endTimeStatus:"success",startTime:n,endTime:a,display:"none",errorTips:"",pushTimeType:0}},changeRadio:function(e){var t=e.target.value,a=+new Date,l=864e5,r={pushTimeType:t};if(1===t?r.endTime=new Date(a-Number(t)*l):r.endTime=new Date,"number"==typeof t){r.startTime=new Date(a-Number(t)*l);var n=d.default.dateFormat("yyyy-MM-dd",r.startTime);1!==t&&0!==t||(r.startTime=d.default.dateParse(n+" 00:00:00")),1===t&&(r.endTime=d.default.dateParse(n+" 23:59:59")),r.display="none",r.startTimeStatus="success",r.endTimeStatus="success",r.errorTips=""}else r.startTime=new Date;this.setState(r),this.props.form.setFieldsValue(r)},componentDidMount:function(){"userdata"===this.props.router&&this.setState({pushTimeType:6})},onOpen:function(){this.setState({pushTimeType:"other"})},changeStartTime:function(e){var t=this.props.router,a=this.props.required,l={router:t,required:a},r=this.props.form.getFieldValue("endTime"),n=c.default.changeStartTime(e,r,l);this.setState(n)},changeEndTime:function(e){var t=this.props.required,a={required:t},l=this.props.form.getFieldValue("startTime"),r=c.default.changeEndTime(e,l,a);this.setState(r)},render:function(){var e="",t=this.props.type,a=this.props.router;"second"===t&&(e=" H:mm:ss");var l=this.props.form.getFieldProps;return s.default.createElement(p,{className:"radio_btn",labelCol:{span:2},wrapperCol:{span:22},label:"时间    "},"personal"===a?null:s.default.createElement(f,{onChange:this.changeRadio,value:this.state.pushTimeType,size:"large",style:{marginRight:10}},"userdata"===a?null:s.default.createElement(m,{value:0},"今天"),"userdata"===a?null:s.default.createElement(m,{value:1},"昨天"),"analyze"===a?null:s.default.createElement(m,{value:6},"最近7天"),"analyze"===a?null:s.default.createElement(m,{value:30},"最近30天"),s.default.createElement(m,{value:"other"},"选择日期")),s.default.createElement(p,{validateStatus:this.state.startTimeStatus,className:"display_ib va_t mg0"},s.default.createElement(i.DatePicker,r({},l("startTime",{initialValue:this.state.startTime,onChange:this.changeStartTime}),{toggleOpen:this.onOpen,showTime:!0,format:"yyyy-MM-dd"+e}))),"analyze"===a?null:s.default.createElement("span",{className:"pl10 pr10"},"至"),"analyze"===a?null:s.default.createElement(p,{validateStatus:this.state.endTimeStatus,className:"display_ib va_t mg0"},s.default.createElement(i.DatePicker,r({},l("endTime",{initialValue:this.state.endTime,onChange:this.changeEndTime}),{toggleOpen:this.onOpen,showTime:!0,format:"yyyy-MM-dd"+e}))),s.default.createElement("span",{style:{display:this.state.display},className:"color_error pl10"},this.state.errorTips))}});e.exports=h},1327:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}var r=a(600),n=l(r),s=a(1328),i=l(s),u=a(776),d=l(u),o=a(777),c=l(o),p=a(785),m=l(p),f=n.default.createClass({displayName:"App",getInitialState:function(){return{current:1,appName:{},appId:c.default.queryString("appId",window.location.href),tableData:{loading:!0,data:[],pagination:null}}},componentWillReceiveProps:function(){var e=c.default.queryString("appId",window.location.href);this.setState({appId:e})},tableData:function(e){var t=this;this.setState({tableData:{loading:!0,data:[]},current:e.index});var a=this.props.type,l=d.default.listTaskStatics;"platform"===a&&(l=d.default.listTaskStaticsDetail);var r=c.default.queryString("appId",window.location.href);r&&"0"!==r?e.appId=r:delete e.appId,l=c.default.makeUrl(l,e),m.default.get(l,function(a){var l=a.value.result;l.map(function(e,t){l[t].key=t});var n=r&&"0"!==r?{}:{title:"应用名",key:"2",className:"ta_c",dataIndex:"appName"};t.setState({appName:n,tableData:{data:l,loading:!1,pagination:{total:a.value.amount,current:e.index,pageSize:10,showSizeChanger:!1,onChange:function(a){e.index=a,t.setState({current:a,searchData:e}),t.tableData(e)}}}})},function(){t.setState({tableData:{loading:!1}})})},componentWillUnmount:function(){document.querySelector("#dataStat")&&(document.querySelector("#dataStat").className="")},componentDidMount:function(){document.querySelector("#dataStat")&&(document.querySelector("#dataStat").className="active")},render:function(){return n.default.createElement("div",null,n.default.createElement(i.default,{type:this.props.type,appName:this.state.appName,searchData:this.state.searchData,refresh:this.state.refresh,tableData:this.state.tableData,current:this.state.current,appId:this.state.appId,onSearch:this.tableData}))}});e.exports=f},1328:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e},n=a(600),s=l(n),i=a(783),u=a(776),d=l(u),o=a(785),c=l(o),p=a(777),m=l(p),f=a(1329),h=l(f),y=a(921),T=l(y),v=i.Form.Item,g=i.Select.Option,E={labelCol:{span:8},wrapperCol:{span:16}},S=s.default.createClass({displayName:"AddAppTask",getInitialState:function(){return{buttonGroupType:"ghost",initData:{},sourceValue:"",sourceType:[{id:"",desc:"全部"}],values:[],data:null,noticeBarType:"0",noticeExpandType:"0",pushTimeType:0,errors:{},defaultAppid:"应用"}},handleSubmit:function(e){var t=this;this.props.form.validateFields(function(a,l){if(a)return void console.log("Errors in form!!!");var r=l.startTime,n=l.endTime;if(!(+new Date(r)>+new Date(n))){l.index=1,l.startTime="string"==typeof l.startTime?l.startTime:m.default.dateFormat("yyyy-MM-dd hh:mm:ss",l.startTime),l.endTime="string"==typeof l.endTime?l.endTime:m.default.dateFormat("yyyy-MM-dd hh:mm:ss",l.endTime);var s={};for(var i in l)""!==l[i]&&(s[i]=l[i]);var u=t.state.sourceValue;u&&(s.sourceType=u),t.setState({searchData:l}),"search"===e&&t.props.onSearch(s),"export"===e&&t.exportData(s)}})},componentDidMount:function(){var e=new Date,t=m.default.queryString("appId",window.location.href),a={appId:t,index:1,startTime:m.default.dateFormat("yyyy-MM-dd",e)+" 00:00:00",endTime:m.default.dateFormat("yyyy-MM-dd hh:mm:ss",e)};this.setState({appId:t,searchData:a}),this.props.onSearch(a),this.getSourceType()},componentWillReceiveProps:function(){var e=m.default.queryString("appId",window.location.href);this.state.appId&&e!==this.state.appId&&this.getSourceType("changeApp"),this.setState({appId:e})},getSourceType:function(e){var t=this,a=m.default.queryString("appId",window.location.href),l=d.default.getSourceType;l=m.default.makeUrl(l,{appId:a||0}),c.default.get(l,function(a){var l=t.state.sourceType;"changeApp"===e&&(l=[{id:"",desc:"全部"}]),l=l.concat(a.value);var r={sourceType:l};t.state.sourceType.length!==l.length&&"3"===t.state.sourceValue&&(r.sourceValue=""),t.setState(r)})},cantNull:function(e,t){var a=this.props.form.getFieldProps;return a(e,{initialValue:t})},exportData:function(e){var t=m.default.queryString("appId",window.location.href);t&&"0"!==t?e.appId=t:delete e.appId;var a=this.props.type,l=d.default.exportTaskStatics;"platform"===a&&(l=d.default.exportTaskStaticsDetail),l=m.default.makeUrl(l,e),window.location.href=l},changeSourceType:function(e){var t={sourceValue:e};this.setState(t)},render:function(){var e=this.state.searchData||this.props.searchData,t=this.state.sourceType,a=t.map(function(e,t){return s.default.createElement(g,{key:t,value:String(e.id)},e.desc)});return s.default.createElement("div",null,s.default.createElement(i.Form,{horizontal:!0},s.default.createElement(i.Row,null,s.default.createElement(i.Col,{span:"24"},s.default.createElement(T.default,{type:"second",form:this.props.form}))),s.default.createElement(i.Row,null,s.default.createElement(i.Col,{span:"6"},s.default.createElement(v,r({},E,{label:"任务来源    "}),s.default.createElement(i.Select,{value:this.state.sourceValue,onChange:this.changeSourceType,size:"large"},a))),s.default.createElement(i.Col,{span:"6"},s.default.createElement(v,r({},E,{label:"推送类型    "}),s.default.createElement(i.Select,r({},this.cantNull("pushType",""),{size:"large"}),s.default.createElement(g,{value:""},"全部"),s.default.createElement(g,{value:"0"},"通知"),s.default.createElement(g,{value:"1"},"透传消息")))),s.default.createElement(i.Col,{span:"6"},s.default.createElement(v,r({},E,{label:"状态    "}),s.default.createElement(i.Select,r({},this.cantNull("pushStatus",""),{size:"large"}),s.default.createElement(g,{value:""},"全部"),s.default.createElement(g,{value:"0"},"待推送"),s.default.createElement(g,{value:"1"},"推送中"),s.default.createElement(g,{value:"3"},"已完成"),s.default.createElement(g,{value:"4"},"取消"),s.default.createElement(g,{value:"5"},"推送失败"))))),s.default.createElement(i.Row,null,s.default.createElement(i.Col,{span:"6"},s.default.createElement(v,r({},E,{label:"任务ID    "}),s.default.createElement(i.Input,r({placeholder:"输入任务ID"},this.cantNull("taskId",""))))),s.default.createElement(i.Col,{span:"6"},s.default.createElement(v,r({},E,{label:"标题名称    "}),s.default.createElement(i.Input,r({placeholder:"输入标题关键字"},this.cantNull("title",""))))),s.default.createElement(i.Col,{span:"6"},s.default.createElement(i.Button,{className:"ml10",type:"primary",onClick:this.handleSubmit.bind(this,"search"),size:"large"},"查询"),s.default.createElement(i.Button,{className:"ml10",type:"primary",onClick:this.handleSubmit.bind(this,"export"),size:"large"},"导出")))),s.default.createElement(h.default,{type:this.props.type,appName:this.props.appName,searchData:e,current:this.props.current,onSearch:this.props.onSearch,refresh:this.props.refresh,tableData:this.props.tableData}))}});S=i.Form.create()(S),e.exports=S},1329:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}var r=a(600),n=l(r),s=a(783),i=a(902),u=l(i),d=n.default.createClass({displayName:"App",getInitialState:function(){return{columns:[{title:"推送时间",key:"0",width:100,className:"ta_c",dataIndex:"pushTime"},{title:"推送标题",key:"1",dataIndex:"title",className:"td_appname "},{},{title:"任务ID",key:"3",className:"ta_c",dataIndex:"taskId"},{title:"状态",key:"4",className:"ta_c",dataIndex:"status"},{title:n.default.createElement(u.default,{text:"目标数"}),key:"5",className:"ta_r",dataIndex:"targetNo"},{title:n.default.createElement(u.default,{text:"有效数"}),key:"6",className:"ta_r",dataIndex:"validNo"},{title:n.default.createElement(u.default,{text:"推送数"}),key:"7",className:"ta_r",dataIndex:"pushedNo"},{},{title:n.default.createElement(u.default,{text:"接收数"}),key:"9",className:"ta_r",dataIndex:"acceptNo"},{},{title:n.default.createElement(u.default,{text:"展示数"}),key:"11",className:"ta_r",dataIndex:"displayNo"},{title:n.default.createElement(u.default,{text:"点击数"}),key:"12",className:"ta_r",dataIndex:"clickNo"},{},{},{title:"操作",className:"ta_l",key:"15",render:function(e,t){var a=t.appId,l="#/data/push/detail?appId="+a+"&taskId="+t.taskId;return n.default.createElement("div",{className:"btn_wrap"},t.scheduled&&n.default.createElement(s.Tooltip,{title:"推送详情"},n.default.createElement("a",{target:"_blank",href:window.location.pathname+l},n.default.createElement("i",{className:"i_detail"}))))},dataIndex:""}],refresh:!1}},render:function(){var e=this.props.tableData.data,t=this.props.appName,a=this.state.columns;a[2]=t;var l=this.props.type;return"platform"===l&&(a[0]={},a[1]={},a[8]={title:n.default.createElement(u.default,{text:"联网数"}),key:"8",className:"ta_r",dataIndex:"onlineNo"},a[10]={title:n.default.createElement(u.default,{text:"到达应用数"}),key:"10",className:"ta_r",dataIndex:"recvNo"},a[13]={title:n.default.createElement(u.default,{text:"划掉数"}),key:"13",className:"ta_r",dataIndex:"slipNo"},a[14]={title:n.default.createElement(u.default,{text:"已卸载数"}),key:"14",className:"ta_r",dataIndex:"unregNo"}),n.default.createElement("div",{className:"push_data"},n.default.createElement("div",{id:"detailTable",className:"detail_table"},n.default.createElement(s.Table,{columns:a,loading:this.props.tableData.loading,dataSource:e,pagination:this.props.tableData.pagination})))}});e.exports=d},1343:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}var r=a(600),n=l(r),s=a(1327),i=l(s),u=n.default.createClass({displayName:"DetailList",componentDidMount:function(){},render:function(){return n.default.createElement("div",null,n.default.createElement(i.default,{type:"platform"}))}});e.exports=u}});