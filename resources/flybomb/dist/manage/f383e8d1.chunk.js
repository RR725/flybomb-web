webpackJsonp([4],{1662:function(e,t){"use strict";e.exports=[{type:1,type_desc:"单选题"},{type:2,type_desc:"多选题"},{type:3,type_desc:"名词解释"},{type:4,type_desc:"简答题"},{type:5,type_desc:"论述题"},{type:6,type_desc:"辨析题"}]},1728:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var l=a(653),r=n(l),s=a(1729),u=n(s),o=a(1),i=n(o),c=a(2),d=(n(c),a(1651)),p=n(d),f=r.default.createClass({displayName:"App",getInitialState:function(){return{current:1,appId:0,tableData:{loading:!1,data:[],pagination:null}}},tableData:function(e){var t=this,a=i.default.stockList;p.default.post(a,e,function(a){var n=a.value.result;n.map(function(e,t){n[t].key=t}),t.setState({tableData:{data:n,loading:!1,pagination:{total:a.value.total,current:e.pageNum,pageSize:10,showSizeChanger:!1,onChange:function(e){var a={pageNum:e};t.tableData(a)}}}})})},componentWillUnmount:function(){document.querySelector("#home").className=""},componentDidMount:function(){document.querySelector("#home").className="active"},render:function(){return r.default.createElement("div",null,r.default.createElement(u.default,{refresh:this.state.refresh,tableData:this.state.tableData,getTableData:this.tableData}))}});e.exports=f},1729:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var l=a(653),r=n(l),s=a(841),u=a(1),o=n(u),i=a(2),c=(n(i),a(1651)),d=n(c),p=a(1730),f=n(p),m=(s.Select.Option,s.Form.Item,r.default.createClass({displayName:"App",getInitialState:function(){return{}},componentDidMount:function(){var e={pageNum:1};this.props.getTableData(e)},add:function(e){d.default.post(o.default.stockList,{},function(){s.message.success("新建成功")})},render:function(){return r.default.createElement("div",null,r.default.createElement(s.Form,{layout:"horizontal"},r.default.createElement("div",{className:"home_toolbar"},r.default.createElement(s.Row,null,r.default.createElement(s.Col,{span:"4"},r.default.createElement("div",{className:"title"},r.default.createElement("span",{className:"border"}),"列表")),r.default.createElement(s.Col,{span:"10"}," "),r.default.createElement(s.Col,{span:"10"},r.default.createElement("div",{style:{textAlign:"right"}},r.default.createElement(s.Col,{span:"3"}," "),r.default.createElement(s.Col,{span:"21"},r.default.createElement(s.Button,{onClick:this.add.bind(this,"/stock/add"),type:"primary",size:"large"},"新建"))))))),r.default.createElement(f.default.render,{refresh:this.props.refresh,tableData:this.props.tableData}))}}));m=s.Form.create()(m),e.exports=m},1730:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var l=a(653),r=n(l),s=a(841),u=a(1),o=(n(u),a(2)),i=(n(o),a(1651)),c=(n(i),a(1662)),d=n(c),p=a(1663),f=r.default.createClass({displayName:"HomeTable",getInitialState:function(){return{columns:[{title:"科目名称",key:"0",dataIndex:"subject",className:"td_appname "},{title:"类型",className:"td_appname",key:"1",dataIndex:"type",render:function(e,t){var a=d.default.filter(function(t){return t.type===e});return a[0].type_desc}},{title:"标题",className:"ta_l",key:"2",dataIndex:"title"},{title:"操作",className:"ta_c",key:"3",render:function(e,t){return r.default.createElement(p.Link,{to:"/manage/add?questionId="+t.questionId},"修改")},dataIndex:""}],refresh:!1}},render:function(){return r.default.createElement(s.Table,{className:"home_table",columns:this.state.columns,loading:this.props.tableData.loading,dataSource:this.props.tableData.data,pagination:this.props.tableData.pagination})}});t.render=f}});