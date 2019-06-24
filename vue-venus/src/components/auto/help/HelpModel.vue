<!-- 自动封堵-操作手册模态框 -->
<template lang="html">
    <b-modal ref="modelRef" title="操作手册" :no-close-on-backdrop="true" size="lg">
        <div class="ql-snow">
            <div class="ql-editor" v-html="text"></div>
        </div>
        <div slot="modal-footer">
            <div class="btn-gro">
                <el-button @click="hideModel" type="danger" icon="el-icon-circle-close-outline" size="mini">关闭</el-button>
            </div>
        </div>
    </b-modal>
</template>

<script>
export default {
    props: ['text'],
    methods: {
        hideModel () {
            this.$refs.modelRef.hide()
        },
        showModel () {
            this.$refs.modelRef.show()
        }
    },
}

</script>
<style lang="scss" scoped type="text/css">
.ql-editor {
  min-height: 200px;
  font-size: 16px;
}

.ql-snow .ql-stroke.ql-thin,
.ql-snow .ql-thin {
  stroke-width: 1px !important;
}

.quillWrapper .ql-snow.ql-toolbar {
  padding-top: 8px;
  padding-bottom: 4px;
}
.quillWrapper .ql-snow.ql-toolbar .ql-formats {
  margin-bottom: 10px;
}

.ql-snow .ql-toolbar button svg,
.quillWrapper .ql-snow.ql-toolbar button svg {
  width: 22px;
  height: 22px;
}

.quillWrapper .ql-editor ul[data-checked=false] > li::before,
.quillWrapper .ql-editor ul[data-checked=true] > li::before {
  font-size: 1.35em;
  vertical-align: baseline;
  bottom: -0.065em;
  font-weight: 900;
  color: #222;
}

.quillWrapper .ql-snow .ql-stroke {
  stroke: rgba(63, 63, 63, 0.95);
  stroke-linecap: square;
  stroke-linejoin: initial;
  stroke-width: 1.7px;
}

.quillWrapper .ql-picker-label {
  font-size: 15px;
}

.quillWrapper .ql-snow .ql-active .ql-stroke {
  stroke-width: 2.25px;
}

.quillWrapper .ql-toolbar.ql-snow .ql-formats {
  vertical-align: top;
}

.ql-picker {
  &:not(.ql-background) {
    position: relative;
    top: 2px;
  }

  &.ql-color-picker {
    svg {
      width: 22px !important;
      height: 22px !important;
    }
  }
}

.quillWrapper {
  & .imageResizeActive {
    img {
      display: block;
      cursor: pointer;
    }

    & ~ div svg {
      cursor: pointer;
    }
  }
}
</style>
