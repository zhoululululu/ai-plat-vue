(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["similar"],{3436:function(e,t,l){"use strict";l("bac9")},bac9:function(e,t,l){},ee2c:function(e,t,l){"use strict";l.r(t);var a=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{},[l("div",{staticClass:"crumbs"},[l("el-breadcrumb",{attrs:{separator:"/"}},[l("el-breadcrumb-item",[l("i",{staticClass:"el-icon-lx-copy"}),e._v(" 相似度测试")])],1)],1),l("div",{staticClass:"container"},[l("div",{staticClass:"handle-box"},[l("el-button",{staticClass:"handle-del mr10",staticStyle:{float:"right"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:e.handleNewTest}},[e._v("新建测试")]),l("el-button",{staticClass:"handle-del mr10",attrs:{type:"primary",icon:"el-icon-download"},on:{click:e.downLoadAllSelection}},[e._v("批量下载")]),l("el-button",{staticClass:"handle-del mr10",attrs:{type:"primary",icon:"el-icon-delete"},on:{click:e.delAllSelection}},[e._v("批量删除")]),l("el-select",{staticClass:"handle-select mr10",attrs:{placeholder:"选择科室"},model:{value:e.query.similarserchindustry,callback:function(t){e.$set(e.query,"similarserchindustry",t)},expression:"query.similarserchindustry"}},[l("el-option",{key:"1",attrs:{label:"口腔科",value:"口腔科"}}),l("el-option",{key:"2",attrs:{label:"妇产科",value:"妇产科"}}),l("el-option",{key:"3",attrs:{label:"儿科",value:"儿科"}}),l("el-option",{key:"2",attrs:{label:"妇科",value:"妇科"}}),l("el-option",{key:"2",attrs:{label:"男科",value:"男科"}}),l("el-option",{key:"2",attrs:{label:"眼科",value:"眼科"}})],1),l("el-input",{staticClass:"handle-input mr10",attrs:{placeholder:"直接输入科室"},model:{value:e.query.name,callback:function(t){e.$set(e.query,"name",t)},expression:"query.name"}}),l("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleSearch}},[e._v("搜索")])],1),l("el-table",{ref:"multipleTable",staticClass:"table",attrs:{data:e.tableData,border:"","header-cell-class-name":"table-header"},on:{"selection-change":e.handleSelectionChange}},[l("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),l("el-table-column",{attrs:{prop:"industry",label:"科室"}}),l("el-table-column",{attrs:{prop:"data",label:"数据量"}}),l("el-table-column",{attrs:{prop:"accuracy",label:"准确率"}}),l("el-table-column",{attrs:{label:"状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-tag",{attrs:{type:"成功"===t.row.state?"success":"失败"===t.row.state?"danger":""}},[e._v(e._s(t.row.state))])]}}])}),l("el-table-column",{attrs:{label:"操作",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{type:"text",icon:"el-icon-download"},on:{click:function(l){return e.handleEdit(t.$index,t.row)}}},[e._v("下载详情")]),l("el-button",{staticClass:"red",attrs:{type:"text",icon:"el-icon-delete"},on:{click:function(l){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),l("div",{staticClass:"pagination"},[l("el-pagination",{attrs:{background:"",layout:"total, prev, pager, next","current-page":e.query.pageIndex,"page-size":e.query.pageSize,total:e.pageTotal},on:{"current-change":e.handlePageChange}})],1)],1),l("el-dialog",{attrs:{title:"新建相似度测试",visible:e.editVisible,width:"30%"},on:{"update:visible":function(t){e.editVisible=t}}},[l("el-form",{ref:"form",attrs:{model:e.form,"label-width":"70px"}},[l("el-form-item",{attrs:{label:"选择科室"}},[l("el-select",{staticClass:"handle-select mr10",attrs:{placeholder:"选择科室"},model:{value:e.query.similartestindustry,callback:function(t){e.$set(e.query,"similartestindustry",t)},expression:"query.similartestindustry"}},[l("el-option",{key:"1",attrs:{label:"口腔科",value:"口腔科"}}),l("el-option",{key:"2",attrs:{label:"妇产科",value:"妇产科"}}),l("el-option",{key:"3",attrs:{label:"儿科",value:"儿科"}}),l("el-option",{key:"2",attrs:{label:"妇科",value:"妇科"}}),l("el-option",{key:"2",attrs:{label:"男科",value:"男科"}}),l("el-option",{key:"2",attrs:{label:"眼科",value:"眼科"}})],1)],1),l("el-form-item",{attrs:{label:"选择数据"}},[l("el-select",{staticClass:"handle-select mr10",attrs:{placeholder:"选择数据"},model:{value:e.query.similardatanum,callback:function(t){e.$set(e.query,"similardatanum",t)},expression:"query.similardatanum"}},[l("el-option",{key:"1",attrs:{label:"第一批测试数据-1000条",value:"第一批测试数据-1000条"}}),l("el-option",{key:"2",attrs:{label:"第二批测试数据-2000条",value:"第二批测试数据-2000条"}})],1)],1)],1),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.editVisible=!1}}},[e._v("取 消")]),l("el-button",{attrs:{type:"primary"},on:{click:e.saveEdit}},[e._v("确 定")])],1)],1)],1)},i=[],s=(l("7f7f"),l("365c")),n={name:"basetable",data:function(){return{query:{address:"",name:"",pageIndex:1,pageSize:10},tableData:[],multipleSelection:[],delList:[],editVisible:!1,pageTotal:0,form:{},idx:-1,id:-1}},created:function(){this.getData()},methods:{getData:function(){var e=this;Object(s["b"])(this.query).then((function(t){console.log(t),e.tableData=t.list,e.pageTotal=t.pageTotal||50}))},handleSearch:function(){this.$set(this.query,"pageIndex",1),this.getData()},handleDelete:function(e,t){var l=this;this.$confirm("确定要删除吗？","提示",{type:"warning"}).then((function(){l.$message.success("删除成功"),l.tableData.splice(e,1)})).catch((function(){}))},handleSelectionChange:function(e){this.multipleSelection=e},delAllSelection:function(){var e=this.multipleSelection.length,t="";this.delList=this.delList.concat(this.multipleSelection);for(var l=0;l<e;l++)t+=this.multipleSelection[l].name+" ";this.$message.error("删除了".concat(t)),this.multipleSelection=[]},handleNewTest:function(e,t){this.idx=e,this.form=t,this.editVisible=!0},handleEdit:function(e,t){this.idx=e,this.form=t,this.editVisible=!0},saveEdit:function(){this.editVisible=!1,this.$message.success("修改第 ".concat(this.idx+1," 行成功")),this.$set(this.tableData,this.idx,this.form)},handlePageChange:function(e){this.$set(this.query,"pageIndex",e),this.getData()}}},o=n,r=(l("3436"),l("2877")),c=Object(r["a"])(o,a,i,!1,null,"dffe89b0",null);t["default"]=c.exports}}]);