(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b232ee24"],{"09f4":function(t,e,i){"use strict";i.d(e,"a",function(){return o}),Math.easeInOutQuad=function(t,e,i,a){return t/=a/2,t<1?i/2*t*t+e:(t--,-i/2*(t*(t-2)-1)+e)};var a=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function n(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function s(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function o(t,e,i){var o=s(),l=t-o,r=20,c=0;e="undefined"===typeof e?500:e;var u=function t(){c+=r;var s=Math.easeInOutQuad(c,o,l,e);n(s),c<e?a(t):i&&"function"===typeof i&&i()};u()}},"1c49":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[i("div",{staticClass:"action-container",staticStyle:{display:"inline-block"}},[i("AttachmentList",{attrs:{limit:3},model:{value:t.imagesFile,callback:function(e){t.imagesFile=e},expression:"imagesFile"}})],1),t._v(" "),i("div",[i("table",{staticClass:"el-table banner-list"},t._l(t.imagesFile,function(e){return i("tr",{key:e},[i("td",[i("el-image",{staticStyle:{width:"320px",height:"160px"},attrs:{src:e,fit:"cover"}})],1),t._v(" "),i("td",[i("el-input",{attrs:{placeholder:"请输入包含https://的链接"}})],1),t._v(" "),i("td",[i("el-button",{attrs:{type:"primary",plain:""},on:{click:function(i){return t.saveBanner(e)}}},[t._v("保存")]),t._v(" "),i("el-button",{attrs:{type:"danger",plain:""},on:{click:function(i){return t.delBanner(e)}}},[t._v("删除")])],1)])}),0)])])},n=[],s=i("b775"),o="/backEnd/goods",l={Query:function(t){return Object(s["a"])({url:"/backEnd/bannerList",method:"post",data:t})},Delete:function(t){return Object(s["a"])({url:o,method:"delete",data:{ids:t}})},Update:function(t){return Object(s["a"])({url:o,method:"put",data:t})}},r=l,c=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("ul",[t._l(t.value,function(e,a){return i("li",{key:a,staticClass:"item"},[i("el-image",{staticStyle:{width:"100px",height:"100px"},attrs:{src:e+"!size=s"}}),t._v(" "),i("span",{staticClass:"item-actions",on:{click:function(e){return t.itemDelete(a)}}},[i("i",{staticClass:"el-icon-delete"})])],1)}),t._v(" "),t.value.length<t.limit?i("li",{staticClass:"item",on:{click:function(e){t.dialogVisible=!0}}},[i("i",{staticClass:"el-icon-plus"})]):t._e()],2),t._v(" "),i("el-dialog",{attrs:{width:"900px",visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("AttachmentSelect",{ref:"AttachmentSelect",attrs:{limit:t.limit-t.value.length}}),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:t.hiddenSelect}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.setSelect}},[t._v("确 定")])],1)],1)],1)},u=[],d=(i("ac6a"),i("c5f6"),function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"attachment-container"},[i("div",{staticStyle:{"padding-bottom":"10px"}},[i("el-button",{staticClass:"action-item",attrs:{size:"mini",type:"primary",icon:"el-icon-edit"},on:{click:t.show_upload}},[t._v("上传图片")]),t._v(" "),i("span",{staticStyle:{float:"right"}},[t._v("还可以选择："+t._s(t.canSelect)+" 项")])],1),t._v(" "),i("el-row",[i("el-col",{attrs:{span:4}},[i("AttachmentGroup",{attrs:{type:"image"},on:{change:t.groupChange}})],1),t._v(" "),i("el-col",{staticStyle:{height:"512px"},attrs:{span:20}},[i("div",{staticClass:"list-container"},t._l(t.list,function(e){return i("div",{key:e.id,staticClass:"list-item",class:{active:e.isChecked}},[i("div",{on:{click:function(i){return t.itemisChecked(e)}}},[i("el-image",{staticStyle:{width:"120px",height:"120px"},attrs:{src:e.savePath,fit:"cover"}})],1),t._v(" "),i("div",{staticClass:"actions"},[t._v("\n            "+t._s(e.originalName)+"\n          ")])])}),0),t._v(" "),i("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){return t.$set(t.listQuery,"page",e)},"update:limit":function(e){return t.$set(t.listQuery,"limit",e)},pagination:t.loadData}})],1)],1),t._v(" "),i("el-dialog",{attrs:{title:"本地上传",visible:t.upload_show,width:"800px","append-to-body":""},on:{"update:visible":function(e){t.upload_show=e},close:t.hidden_upload}},[i("div",[i("AttachmentUpload",{ref:"Uploader",on:{change:t.fileChane}})],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:t.hidden_upload}},[t._v("确 定")])],1)])],1)}),p=[],h=i("a796"),m=i("cebb"),f=i("333d"),v=i("a54c"),g=i("b224"),_={name:"AttachmentSelect",components:{Pagination:f["a"],AttachmentGroup:v["a"],AttachmentUpload:g["a"]},mixins:[m["a"]],props:{limit:{type:Number,default:10}},data:function(){return{upload_show:!1,api:h["a"],listQuery:{limit:15,groupId:null,type:"image"}}},computed:{canSelect:function(){return this.limit-this.getSelectItems().length}},methods:{itemisChecked:function(t){!0===t.isChecked?t.isChecked=!1:this.canSelect>0&&(t.isChecked=!0)},fileChane:function(){null==this.listQuery.groupId&&this.loadData()},afterLoadData:function(t){return t.forEach(function(t){t.isChecked=!1}),t},groupChange:function(t,e){this.listQuery.groupId=t.id,this.loadData()},show_upload:function(){this.upload_show=!0},hidden_upload:function(){var t=this;this.upload_show=!1,this.$nextTick(function(e){t.$refs.Uploader.clearFiles()})},getSelectItems:function(){var t=[];return this.list.forEach(function(e){e.isChecked&&t.push(e)}),t},clearSelectItems:function(){this.list.forEach(function(t){t.isChecked=!1})},getSelectIds:function(){var t=[];return this.list.forEach(function(e){e.isChecked&&t.push(e.id)}),t}}},b=_,y=(i("b664"),i("2877")),w=Object(y["a"])(b,d,p,!1,null,null,null),k=w.exports,C={name:"AttachmentList",components:{AttachmentSelect:k},props:{value:{type:Array,default:function(){return[]}},limit:{type:Number,default:5},valuetype:{type:String,default:"url"}},data:function(){return{dialogVisible:!1}},methods:{hiddenSelect:function(){this.dialogVisible=!1,this.$refs["AttachmentSelect"].clearSelectItems()},setSelect:function(){var t=this,e=this.$refs["AttachmentSelect"].getSelectItems();e.forEach(function(e){t.value.push(e.savePath)}),this.dialogVisible=!1,this.$refs["AttachmentSelect"].clearSelectItems()},itemDelete:function(t){this.value.splice(t,1)}}},x=C,S=(i("1dd0"),Object(y["a"])(x,c,u,!1,null,"1598a9d0",null)),D=S.exports,$={name:"GoodsList",components:{AttachmentList:D},data:function(){return{imagesFile:[],gather:[]}},created:function(){this.loadData()},methods:{loadData:function(){var t=this;r.Query({}).then(function(e){t.gather=e.data.items,e.data.items.map(function(e){return t.imagesFile.push(e.imgUrl)})})},saveBanner:function(t){console.info(t)}}},E=$,F=(i("a8905"),Object(y["a"])(E,a,n,!1,null,"3da124b8",null));e["default"]=F.exports},"1dd0":function(t,e,i){"use strict";var a=i("8c52"),n=i.n(a);n.a},"2e7b":function(t,e,i){},"57dc":function(t,e,i){},"8c52":function(t,e,i){},a54c:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"category-container"},[t.editable?i("div",[i("div",{staticClass:"group_title"},[t._v(t._s(t.current_group.name))]),t._v(" "),i("el-button-group",{directives:[{name:"show",rawName:"v-show",value:null!=t.current_group.id,expression:"current_group.id != null"}]},[i("el-button",{directives:[{name:"popover",rawName:"v-popover:edit_popover",arg:"edit_popover"}],attrs:{size:"mini",icon:"el-icon-edit"}}),t._v(" "),i("el-button",{directives:[{name:"popover",rawName:"v-popover:delete_popover",arg:"delete_popover"}],attrs:{size:"mini",icon:"el-icon-delete"}})],1)],1):t._e(),t._v(" "),t._l(t.list,function(e,a){return i("div",{key:e.id,staticClass:"category-item",class:e.id===t.current_group.id?"active":"",on:{click:function(e){return t.Change(a)}}},[i("span",{staticClass:"category-name"},[t._v(" "+t._s(e.name))]),t._v(" "),i("span",{staticClass:"category-num"},[t._v("100")])])}),t._v(" "),t.editable?i("div",[i("el-popover",{attrs:{placement:"bottom",width:"200",trigger:"click"},model:{value:t.add_show,callback:function(e){t.add_show=e},expression:"add_show"}},[i("el-input",{attrs:{type:"text",size:"small",placeholder:"请输入分类名称",maxlength:"6","show-word-limit":""},model:{value:t.add_title,callback:function(e){t.add_title=e},expression:"add_title"}}),t._v(" "),i("div",{staticStyle:{"text-align":"right","margin-top":"10px"}},[i("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){t.add_show=!1}}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleCreate}},[t._v("确定")])],1),t._v(" "),i("el-button",{staticStyle:{"margin-top":"10px"},attrs:{slot:"reference",size:"small"},slot:"reference"},[t._v(" + 添加分组")])],1),t._v(" "),i("el-popover",{ref:"edit_popover",attrs:{placement:"bottom",width:"200",trigger:"click"},model:{value:t.edit_show,callback:function(e){t.edit_show=e},expression:"edit_show"}},[i("el-input",{attrs:{type:"text",size:"small",placeholder:"请输入分类名称",maxlength:"6","show-word-limit":""},model:{value:t.edit_title,callback:function(e){t.edit_title=e},expression:"edit_title"}}),t._v(" "),i("div",{staticStyle:{"text-align":"right","margin-top":"10px"}},[i("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){t.edit_show=!1}}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleEdit}},[t._v("确定")])],1)],1),t._v(" "),i("el-popover",{ref:"delete_popover",attrs:{placement:"top",width:"160"},model:{value:t.delete_show,callback:function(e){t.delete_show=e},expression:"delete_show"}},[i("p",[t._v("仅删除分组，不删除图片，组内图片将自动归入未分组")]),t._v(" "),i("div",{staticStyle:{"text-align":"right"}},[i("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){t.delete_show=!1}}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleDelete}},[t._v("确定")])],1)])],1):t._e()],2)},n=[],s=(i("7f7f"),i("b775")),o="/backEnd/attachmentGroup",l={Query:function(t){return Object(s["a"])({url:"/backEnd/attachmentGroupQuery",method:"post",data:t})},Delete:function(t){return Object(s["a"])({url:o,method:"delete",data:t})},Update:function(t){return Object(s["a"])({url:o,method:"put",data:t})},Create:function(t){return Object(s["a"])({url:o,method:"post",data:t})}},r=l,c={name:"AttachmentGroup",props:{type:{type:String,default:"image"},editable:{type:Boolean,default:!1}},data:function(){return{api:r,add_show:!1,edit_show:!1,delete_show:!1,current_group:{id:null,name:"未分组"},current_index:0,add_title:"",edit_title:"",list:[]}},mounted:function(){this.loadData()},methods:{handleCreate:function(){var t=this;this.api.Create({name:this.add_title,type:this.type}).then(function(e){2e4===e.code&&(t.loadData(),t.add_show=!1)})},handleEdit:function(){var t=this;this.api.Update({id:this.current_group.id,name:this.edit_title}).then(function(e){2e4===e.code&&(t.current_group.name=t.edit_title,t.edit_show=!1)})},handleDelete:function(){var t=this;this.api.Delete({id:this.current_group.id}).then(function(e){2e4===e.code&&(t.list.splice(t.current_index,1),t.reset(),t.delete_show=!1)})},loadData:function(){var t=this;this.api.Query({type:this.type}).then(function(e){t.list=e.data,t.reset()})},Change:function(t){this.current_group=this.list[t],this.edit_title=this.current_group.name,this.current_index=t,this.$emit("change",this.list[t],this.list)},reset:function(){this.Change(0)}}},u=c,d=(i("a968"),i("2877")),p=Object(d["a"])(u,a,n,!1,null,null,null);e["a"]=p.exports},a5e9:function(t,e,i){},a796:function(t,e,i){"use strict";var a=i("b775"),n="/backEnd/attachment",s={Query:function(t){return Object(a["a"])({url:"/backEnd/attachmentQuery",method:"post",data:t})},Delete:function(t){return Object(a["a"])({url:n,method:"delete",data:t})},Update:function(t){return Object(a["a"])({url:n,method:"put",data:t})},Create:function(t){return Object(a["a"])({url:n,method:"post",data:t})}};e["a"]=s},a8905:function(t,e,i){"use strict";var a=i("a5e9"),n=i.n(a);n.a},a968:function(t,e,i){"use strict";var a=i("57dc"),n=i.n(a);n.a},b224:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-upload",{ref:"elupload",staticClass:"jui-upload",attrs:{action:t.upload_url,limit:10,multiple:"","auto-upload":!0,"list-type":"picture-card","show-file-list":!0,headers:t.requestHeaders,"on-success":t.uploadSuccess,"on-error":t.uploadError}},[i("i",{staticClass:"el-icon-plus"}),t._v(" "),i("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传jpg/png文件，且不超过500kb,建议尺寸：800*800像素,最多上传10张")])])],1)},n=[],s=i("5f87"),o={data:function(){return{upload_url:"/prod-apiuploadByType",requestHeaders:{"X-Token":Object(s["a"])()}}},methods:{clearFiles:function(){var t=this;this.$nextTick(function(e){t.$refs["elupload"].clearFiles()})},uploadSuccess:function(){this.$emit("change")},uploadError:function(){this.$message.error("上传错误")}}},l=o,r=i("2877"),c=Object(r["a"])(l,a,n,!1,null,null,null);e["a"]=c.exports},b664:function(t,e,i){"use strict";var a=i("2e7b"),n=i.n(a);n.a},cebb:function(t,e,i){"use strict";i("ac4d"),i("8a81"),i("ac6a");var a={filters:{statusFilter:function(t){var e={published:"success",draft:"info",deleted:"danger"};return e[t]}}};e["a"]={mixins:[a],data:function(){return{list:[],total:0,Field:"id",listQuery:{page:1,limit:10,order:"id",sort:"DESC"},listLoading:!0,downloadLoading:!1,ExportFields:["id"],dialogFormVisible:!1,dialogStatus:""}},methods:{HandleCreate:function(t){var e=this;if(this.$refs.singleTable.selection.length>0){var i={};i["ids"]=this.$refs.singleTable.selection.map(function(t){return t[e.Field]}),i["type"]=t,this.api.goodsSaleable(i).then(function(t){2e4===t.code?(e.$message({message:"操作成功",type:"success"}),e.SearchData()):e.$message({message:"操作失败",type:"error"})})}else this.$message({message:"请选择要操作的数据",type:"error"})},CreateData:function(){var t=this;this.$refs["dataForm"].validate(function(e){e&&t.api.Create(t.temp).then(function(e){t.dialogFormVisible=!1,t.SearchData(),t.$notify({title:"成功",message:"创建成功",type:"success",duration:2e3})})})},BatchDelete:function(){var t=this;if(this.$refs.singleTable.selection.length>0){var e=this.$refs.singleTable.selection.map(function(e){return e[t.Field]});this.api.Delete(e).then(function(e){2e4===e.code?(t.$message({message:"操作成功",type:"success"}),t.SearchData()):t.$message({message:"操作失败",type:"error"})})}else this.$message({message:"请选择删除的数据",type:"error"})},RowDelete:function(t){var e=this,i=[t[this.Field]];this.api.Delete(i).then(function(t){2e4===t.code?(e.$message({message:"操作成功",type:"success"}),e.SearchData()):e.$message({message:"操作失败",type:"error"})})},HandleUpdate:function(t){this.temp=Object.assign({},t),this.dialogStatus="update",this.dialogFormVisible=!0},UpdateData:function(){var t=this;this.$refs["dataForm"].validate(function(e){if(e){var i=Object.assign({},t.temp);t.api.Update(i).then(function(e){var i=!0,a=!1,n=void 0;try{for(var s,o=t.list[Symbol.iterator]();!(i=(s=o.next()).done);i=!0){var l=s.value;if(l.id===t.temp.id){var r=t.list.indexOf(l);t.list.splice(r,1,t.temp);break}}}catch(c){a=!0,n=c}finally{try{i||null==o.return||o.return()}finally{if(a)throw n}}t.dialogFormVisible=!1,t.$notify({title:"成功",message:"更新成功",type:"success",duration:2e3})})}})},ConfirmData:function(){"create"===this.dialogStatus?this.CreateData():this.UpdateData()},sortChange:function(t){this.listQuery.page=1,this.listQuery.sort="ascending"===t.order?"ASC":"DESC",this.listQuery.order=t.prop,this.loadData()},loadData:function(){var t=this;this.listLoading=!0,this.loadListBefore(this.QueryParams),this.api.Query(this.listQuery).then(function(e){t.afterLoadData&&(e.data.items=t.afterLoadData(e.data.items)),t.list=e.data.items,t.total=e.data.total,t.listLoading=!1,t.$previewRefresh()})},loadListBefore:function(t){return t},SearchData:function(){this.listQuery.page=1,this.loadData()},ExportData:function(){var t=this;this.downloadLoading=!0,Promise.all([i.e("chunk-6e83591c"),i.e("chunk-5164a781"),i.e("chunk-5bdd67a2"),i.e("chunk-54b312fe")]).then(i.bind(null,"4bf8d")).then(function(e){var i=t.list.map(function(e){return t.ExportFormateRow?t.ExportFormateRow(e):e}),a=i.map(function(e){return t.ExportFields.map(function(t){return e[t]})});e.export_json_to_excel({header:t.ExportFields,data:a,filename:"table-list"}),t.downloadLoading=!1})},resetTemp:function(){this.temp={id:void 0}}}}}}]);