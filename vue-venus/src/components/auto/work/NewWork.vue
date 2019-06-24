<!-- 新建通报 -->
<template lang="html">
    <div>
        <fieldset>
            <span class="legend">新建通报</span>
            <div style="float: right;">
                <div class="btn-gro text-center">
                    <el-button @click="save" type="success" icon="el-icon-circle-plus-outline" :size="size">保存</el-button>
                    <el-button type="primary" icon="el-icon-zoom-in" :size="size">取消</el-button>
                </div>
            </div>
        </fieldset>
        <el-container>
            <el-aside width="200px"></el-aside>
            <el-main>
                <el-form label-width="100px" class="demo-ruleForm" :model="workForm" size="small">
                    <el-form-item label="通报名称">
                        <el-col :span="10">
                            <el-input v-model="workForm.name" placeholder="通报名称"></el-input>
                        </el-col>
                        <el-col class="text-center" :span="4">通报状态</el-col>
                        <el-col :span="10">
                            <el-input v-model="workForm.status" disabled></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="通报分类">
                        <el-col :span="10">
                            <el-input v-model="workForm.classify" placeholder="填写通报分类"></el-input>
                        </el-col>
                        <el-col class="text-center" :span="4">优先级</el-col>
                        <el-col :span="10">
                            <b-form-select v-model="workForm.priority" required placeholder="填写优先级" :options="optPiority">
                                <template slot="first">
                                    <option :value="''">-- 请选择 --</option>
                                </template>
                            </b-form-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="开始时间">
                        <el-col :span="10">
                            <vue-datepicker-local v-model="workForm.begin_time" format="YYYY-MM-DD HH:mm:ss"/>
                        </el-col>
                        <el-col class="text-center" :span="4">完成时间</el-col>
                        <el-col :span="10">
                            <vue-datepicker-local v-model="workForm.complate_time" format="YYYY-MM-DD HH:mm:ss"/>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="通报描述">
                        <el-input type="textarea" rows="4" v-model="workForm.description"></el-input>
                    </el-form-item>
                </el-form>
            </el-main>
            <el-aside width="200px"></el-aside>
        </el-container>
        <fieldset>
            <span class="legend">子通报</span>
            <div style="float: right;">
                <el-button @click="showModel" type="success" icon="el-icon-circle-plus-outline" :size="size">添加子通报</el-button>
            </div>
        </fieldset>
        <el-container>
            <el-aside width="200px"></el-aside>
            <el-main>
                <el-collapse>
                    <el-collapse-item :key="index" v-for="(item, index) in workItems">
                        <template slot="title">
                            <i class="el-icon-error i-button" style="color: #F56C6C;" title="移除" @click="closeItem(item.id)"></i>
                        </template>
                         <template slot="title">
                            <span class="item-st">{{item.city}} 子通报</span>
                        </template>
                        <el-form label-width="100px" class="demo-ruleForm" :model="workForm" size="small">
                            <el-form-item label="子通报名称">
                                <el-col :span="10">
                                    <el-input v-model="item.name" placeholder="填写子通报名称"></el-input>
                                </el-col>
                                <el-col class="text-center" :span="4">子通报状态</el-col>
                                <el-col :span="10">
                                    <el-input v-model="item.status" disabled></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="指派给哪个局">
                                <el-col :span="10">
                                    <el-input v-model="item.city" placeholder="填写指派给哪个局"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="通报描述">
                                <el-input type="textarea" rows="4" v-model="item.description"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-collapse-item>
                </el-collapse>
            </el-main>
            <el-aside width="200px"></el-aside>
        </el-container>

        <b-modal ref="modelRef" title="选择地市局" :no-close-on-backdrop="true">
            <b-form>
                <b-form-group horizontal :label-cols="3" label-size="sm" label="地市局：" label-for="city">
                    <el-select v-model="city" filterable placeholder="请选择" @change="change">
                        <el-option v-for="item in options" :key="item.roleId" :label="item.name" :value="item.roleId"></el-option>
                    </el-select>
                </b-form-group>
            </b-form>
            <div slot="modal-footer">
                <div class="btn-gro">
                    <el-button @click="addItem" type="primary" icon="el-icon-zoom-in" :size="size">确定</el-button>
                    <el-button @click="hideModel" type="danger" icon="el-icon-circle-close-outline" :size="size">关闭</el-button>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import VueDatepickerLocal from '@/components/ui/datepicker/VueDatepickerLocal'
import { getRoleList, saveWork, saveWorkItem, getWorkDetail, getWorkItemList } from '@/config/getData'

export default {
    data () {
        return {
            id: '',
            city: '',
            workForm: { id: '', name: '', status: '待审批', description: '', begin_time: '', complate_time: '', priority: '', classify: '' },
            workItems: [],
            options: [{roleId: '', name: '--请选择--'}],
            optAssign: [ { text: 'pengguojin', value: '1' } ],
            optPiority: [ { text: '高', value: '1' },
                { text: '中', value: '2' },
                { text: '低', value: '3' } ],
            size: 'mini' // 按钮大小
        }
    },
    mounted() {
        this.id = this.$route.params.id
        getRoleList().then(json=>{
            json.forEach(el => {
                this.options.push(el)
            })
        })
        if(this.id != undefined && this.id != null && this.id != '') {
            getWorkDetail(this.id).then(json => {
                this.workForm = json
            })
            getWorkItemList(this.id).then(json => {
                this.workItems = json
            })
        } else {
            this.workForm.id = new Date().getTime()
        }
    },
    methods: {
        save () {
            saveWork(this.workForm, `/work/save`).then(json => {
                this.workItems.forEach(el => {
                    saveWork(el, `/work/save_item`).catch(err=>{
                        this.$message.error('服务调用失败：' + err)
                    })
                })
                this.$message({ type: 'success', message: '保存成功' })
            }).catch(err=>{
                this.$message.error('服务调用失败：' + err)
            })
        },
        addItem () {
            let cnCity = ''
            this.options.forEach(el => {
                if(el.roleId === this.city) {
                    cnCity = el.name
                }
            });
            let time = new Date()
            this.workItems.push({ id: time.getTime(), name: '', status: '待审批', city: cnCity, description: '', relateId: this.workForm.id })
            this.$refs.modelRef.hide()
        },
        hideModel () {
            this.$refs.modelRef.hide()
        },
        showModel () {
            this.$refs.modelRef.show()
        },
        change (data) {
            this.city = data
        },
        closeItem (id) {
            this.workItems = this.workItems.filter(el => {
                if (el.id === id)
                    return false
                else 
                    return true
            })
        }
    },
    components: {
        VueDatepickerLocal
    }
}

</script>
<style lang="css" scoped>
    fieldset { border-bottom: 1px solid #409EFF; margin-bottom: 5px;  padding-bottom: 3px; }
    .legend { font-size: 20px; color: #409EFF; border-bottom: 3px solid #409EFF; padding-bottom: 7px; }
    .work {
        margin-top: 20px;
        padding-left: 20px;
        width: 70%;
    }
    .item-st { font-size: 16px;font-weight: bold }
    .i-button { padding-right: 12px;font-size: 18px; }
    .el-select { width: 100%; }
    .el-main { overflow: inherit; }
</style>
