(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4c9ef285"],{3252:function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("switch-roles",{on:{change:e.handleRolesChange}})],1)},o=[],i=n("8ee8"),l={name:"PagePermission",components:{SwitchRoles:i["a"]},methods:{handleRolesChange:function(){this.$router.push({path:"/permission/index?"+ +new Date})}}},a=l,r=n("2877"),c=Object(r["a"])(a,s,o,!1,null,null,null);t["default"]=c.exports},"8ee8":function(e,t,n){"use strict";var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticStyle:{"margin-bottom":"15px"}},[e._v("\n    角色: "+e._s(e.roles)+"\n  ")]),e._v("\n  角色切换:\n  "),n("el-radio-group",{model:{value:e.switchRoles,callback:function(t){e.switchRoles=t},expression:"switchRoles"}},[n("el-radio-button",{attrs:{label:"editor"}}),e._v(" "),n("el-radio-button",{attrs:{label:"admin"}})],1)],1)},o=[],i={computed:{roles:function(){return this.$store.getters.roles},switchRoles:{get:function(){return this.roles[0]},set:function(e){var t=this;this.$store.dispatch("user/changeRoles",e).then(function(){t.$emit("change")})}}}},l=i,a=n("2877"),r=Object(a["a"])(l,s,o,!1,null,null,null);t["a"]=r.exports}}]);