<template>
  <div class="components-list">
    <div class="widget-cate">辅助类组件</div>
    <draggable
      element="ul"
      :list="assistComponents"
      :options="{group:{ name:'widget', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
    >
      <li v-for="(item, index) in assistComponents" :key="index" class="form-edit-widget-label">
        <a>{{ item.name }}</a>
      </li>
    </draggable>
    <div class="widget-cate">基础类组件</div>
    <draggable
      element="ul"
      :list="basicComponents"
      :options="{group:{ name:'widget', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
    >
      <li v-for="(item, index) in basicComponents" :key="index" class="form-edit-widget-label">
        <a>{{ item.name }}</a>
      </li>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import allWidget from '@/components/PageDesigner/widget.json'
export default {
  components: { draggable },
  data() {
    return {
      basicComponents: allWidget.basicComponents,
      assistComponents: allWidget.assistComponents
    }
  }
}
</script>

<style lang="scss" scoped>
.components-list{
    .widget-cate {
        padding: 8px 12px;
        font-size: 13px;
    }
    ul {
        position: relative;
        overflow: hidden;
        padding: 0 10px 10px;
        margin: 0;
    }
    .ghost {
        background: #fff;
        border: 1px dashed red;

        &::after {
        background: #fff;
        }
    }
    .form-edit-widget-label {
        font-size: 12px;
        display: block;
        width: 48%;
        line-height: 30px;
        position: relative;
        float: left;
        left: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 1%;
        color: #333;
        border: 1px solid #F4F6FC;
        text-align: center;

        &:hover {
        color: red;
        border: 1px dashed red;
        }

        & > a {
        display: block;
        cursor: move;
        background: #F4F6FC;
        }
  }
}
</style>
