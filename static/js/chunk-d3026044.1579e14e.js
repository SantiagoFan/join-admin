(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d3026044"],{"1bc4":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[i("div",{staticClass:"action-container"},[i("el-button",{staticClass:"action-item",attrs:{size:"mini",plain:"",type:"primary",icon:"el-icon-plus"},on:{click:t.handleCreateLevelOne}},[t._v("添加")])],1),t._v(" "),i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"row-key":"id",border:""}},[i("el-table-column",{attrs:{label:"标题",prop:"name"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"级别",prop:"level",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.level))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"操作",align:"center",width:"230","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.level<2?i("el-button",{attrs:{type:"primary",size:"mini",plain:"",icon:"el-icon-plus"},on:{click:function(i){return t.handleCreate(e.row)}}},[t._v("添加")]):t._e(),t._v(" "),i("el-button",{attrs:{type:"primary",size:"mini",plain:"",icon:"el-icon-edit"},on:{click:function(i){return t.handleUpdate(e.row)}}},[t._v("编辑")]),t._v(" "),e.row.children.length<1?i("el-button",{attrs:{size:"mini",type:"danger",plain:"",icon:"el-icon-delete"},on:{click:function(i){return t.handleDelete(e.row)}}},[t._v("\n          删除\n        ")]):t._e()]}}])})],1),t._v(" "),i("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{rules:t.rules,model:t.temp,"label-position":"left","label-width":"70px"}},[i("el-form-item",{attrs:{label:"标题",prop:"name"}},[i("el-input",{model:{value:t.temp.name,callback:function(e){t.$set(t.temp,"name",e)},expression:"temp.name"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(e){"create"===t.dialogStatus?t.createData():t.updateData()}}},[t._v("确定")])],1)],1)],1)},n=[],l=i("8263"),o={data:function(){return{tableData:[],listQuery:{search:void 0},listLoading:!0,dialogFormVisible:!1,dialogStatus:"",textMap:{update:"修改",create:"新增"},temp:{id:void 0,name:"",parentId:""},rules:{name:[{required:!0,message:"请填入标题",trigger:"blur"}]}}},created:function(){this.getList()},methods:{getList:function(){var t=this;l["a"].get().then(function(e){t.tableData=e.data})},handleFilter:function(){this.getList()},handleCreate:function(t){var e=this;3!==t.level?(this.resetTemp(),this.temp.parentId=t.id,this.temp.level=t.level+1,this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){e.$refs["dataForm"].clearValidate()})):this.$notify({title:"提示",message:"最多创建3级目录",type:"warning",duration:2e3})},handleCreateLevelOne:function(){var t=this;this.resetTemp(),this.temp.parentId=0,this.temp.level=1,this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs["dataForm"].clearValidate()})},resetTemp:function(){this.temp={id:void 0,name:""}},createData:function(){var t=this;this.$refs["dataForm"].validate(function(e){e&&l["a"].add(t.temp).then(function(){t.getList(),t.dialogFormVisible=!1,t.$notify({title:"成功",message:"创建成功",type:"success",duration:2e3})})})},handleUpdate:function(t){var e=this;this.temp=Object.assign({},t),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick(function(){e.$refs["dataForm"].clearValidate()})},updateData:function(){var t=this;this.$refs["dataForm"].validate(function(e){if(e){var i=Object.assign({},t.temp);l["a"].update(i).then(function(){t.getList(),t.dialogFormVisible=!1,t.$notify({title:"成功",message:"更新成功",type:"success",duration:2e3})})}})},handleDelete:function(t){var e=this;console.log(t),t.children.length>0?this.$notify({title:"提示",message:"本节点包含下级节点，无法删除！",type:"warning",duration:2e3}):this.$confirm("确定要删除吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){l["a"].delete(t.id).then(function(){e.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3}),e.getList()})})}}},s=o,r=i("2877"),c=Object(r["a"])(s,a,n,!1,null,null,null);e["default"]=c.exports},8263:function(t,e,i){"use strict";var a=i("b775"),n="/backend/goodsCategory",l={get:function(){return Object(a["a"])({url:n,method:"get",params:{timestamp:(new Date).getTime()}})},add:function(t){return Object(a["a"])({url:n,method:"post",data:t})},update:function(t){return Object(a["a"])({url:n,method:"put",data:t})},delete:function(t){return Object(a["a"])({url:n,method:"delete",data:{id:t}})}};e["a"]=l}}]);