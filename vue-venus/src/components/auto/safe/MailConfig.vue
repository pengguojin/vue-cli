<!-- 邮件设置 -->
<template lang="html">
    <b-modal ref="modelRef" title="邮件设置" :no-close-on-backdrop="true">
        <el-form ref="form" :model="form" label-width="125px" size="small" label-position="left">
            <el-form-item label="执行任务的时间：">
                <el-col :span="9">
                    <el-input type="number" placeholder="选择时" v-model="form.jobminute"></el-input>
                </el-col>
                <el-col class="line" :span="3">时</el-col>
                <el-col :span="9">
                    <el-input type="number" placeholder="选择分" v-model="form.jobhour"></el-input>
                </el-col>
                <el-col class="line" :span="3">分</el-col>
            </el-form-item>
            <el-form-item label="收件人：">
                <el-input type="textarea" :rows="3" v-model="form.mailConfig.recipients"></el-input>
            </el-form-item>
            <el-form-item label="邮件标题：">
                <el-input v-model="form.mailConfig.subject"></el-input>
            </el-form-item>
            <el-form-item label="邮件内容：">
                <el-input type="textarea" :rows="3" v-model="form.mailConfig.body"></el-input>
            </el-form-item>
            <el-form-item label="邮件服务器：">
                <el-col :span="12">
                    <el-input v-model="form.mailConfig.host"></el-input>
                </el-col>
                <el-col class="line" :span="4">端口：</el-col>
                <el-col :span="8">
                    <el-input v-model="form.mailConfig.port"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="发件人：">
                <el-input v-model="form.mailConfig.user"></el-input>
            </el-form-item>
            <el-form-item label="发件人验证密码：">
                <el-input type="password" v-model="form.mailConfig.password"></el-input>
            </el-form-item>
            <el-form-item label="是启用SSL：">
                <el-col :span="6">
                    <el-checkbox v-model="form.mailConfig.ssl"></el-checkbox>
                </el-col>
                <el-col :span="10">邮件任务是否开始：</el-col>
                <el-col :span="6">
                    <el-switch v-model="jobstatus" inactive-color="#dcdfe6" active-color="#13ce66" @change="change"></el-switch>
                </el-col>  
            </el-form-item>
        </el-form>
        <div slot="modal-footer">
            <div class="btn-gro">
                <el-button type="warning" icon="el-icon-time" :size="size" @click="btnTset">测试邮件配置</el-button>
                <el-button @click="btnSave" type="primary" icon="el-icon-circle-plus-outline" :size="size" :disabled="disabled">保存</el-button>
                <el-button @click="hideModel" type="danger" icon="el-icon-circle-close-outline" :size="size">关闭</el-button>
            </div>
        </div>
    </b-modal>
</template>

<script>
import {getReportConfig, updateReportConfig, testReport, startStopReport} from '@/config/getData'
export default {
    props: ['size'],
    data () {
        return {
            disabled: false,
            jobstatus: false,
            form: {
                jobhour: 0,
                jobminute: 0,
                mailConfig: {
                    host: '',
                    port: 0,
                    ssl: true,
                    user: '',
                    password: '',
                    recipients: '',
                    subject: '',
                    body: ''
                }
            }
        }
    },
    methods: {
        hideModel () {
            this.$refs.modelRef.hide()
        },
        showModel () {
            this.disabled = false
            this.$refs.modelRef.show()
            getReportConfig().then(json=>{
                this.form = json.config
                this.jobstatus = json.jobstatus
            }).catch(res=>{
                this.$message.error(`调用服务失败：${res}`)
            })
        },
        btnSave () {
            this.disabled = true
            updateReportConfig(this.form).then(res=>{
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
                this.disabled = false
            }).catch(res=>{
                this.$message.error(`调用服务失败：${res}`)
                this.disabled = false
            })
        },
        btnTset () {
            testReport().then(res=>{
                if (res.return) {
                    this.$message({
                        type: 'success',
                        message: '测试通过'
                    })
                } else {
                    this.$message({
                        type: 'warning',
                        message: `测试失败：${res.message}`
                    })
                }
            }).catch(res=>{
                this.$message.error(`调用服务失败：${res}`)
            })
        },
        change () {
            startStopReport(this.jobstatus).then(res=>{
                this.$message({
                    type: 'success',
                    message: `更新成功`
                })
            }).catch(res=>{
                this.$message.error(`调用服务失败：${res}`)
            })
        }
    }
}

</script>
<style lang="css" scoped>
    .text-muted {padding: 0 5px;}
    .line {text-align: center;}
    .el-form-item {margin-bottom: 8px!important;}
</style>
