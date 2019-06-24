<!-- 自动封堵-编辑操作手册tab -->
<template lang="html">
    <div>
        <h3 class="text-center">编辑操作手册</h3>
        <div class="editor">
            <vue-editor v-model="content" :editorToolbar="customToolbar"></vue-editor>
            <div class="text-center btn-gro">
                <el-button @click="saveContent" type="success" icon="el-icon-circle-plus-outline" size="mini">保存</el-button>
                <el-button @click="preview" type="success" icon="el-icon-circle-close-outline" size="mini">预览</el-button>
            </div>
            <div class="ql-snow">
                <div class="ql-editor" v-html="detail"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import {savHelp} from '@/config/getData'
import {getSealList, importSeal, getHelp} from '@/config/getData'

export default {
    data () {
        return {
            content: '',
            detail: '',
            customToolbar: [
                [{ 'header': [false, 1, 2, 3, 4, 5, 6, ] }],
                ['bold', 'underline', 'strike'], 
                [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
                [{ 'indent': '-1'}, { 'indent': '+1' }],
                [{ 'color': [] }, { 'background': [] }],
                ['clean']                       
            ]
        }
    },
    mounted () {
        getHelp().then(res=>{
            this.content = res.text
        })      
    },
    methods: {
        hideModel () {
            this.$refs.modelRef.hide()
        },
        showModel () {
            this.$refs.modelRef.show()
        },
        saveContent: function() {
            savHelp(this.content).then(res=>{
                this.$message({ type: 'success', message: '保存成功' });
            })
        },
        preview () {
            this.detail = this.content
        }
    },
    components: {
        VueEditor
    }
}

</script>
<style lang="css" scoped>
    p {padding: 0;margin: 0;}
    h3 {padding: 10px;}
    .editor {padding: 10px;}
    .btn-gro { padding: 10px 0;}
    .detail p {padding: 0!important;margin: 0!important;}
</style>
