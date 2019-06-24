<!-- 安全日报-查询模态框 -->
<template lang="html">
    <b-modal ref="modelRef" title="配置" :no-close-on-backdrop="true">
        <b-form>
            <b-form-group horizontal :label-cols="3" label-size="sm" label="发现开始时间：" label-for="startTime">
                <vue-datepicker-local v-model="data.startTime" format="YYYY-MM-DD HH:mm:ss" placeholder="填写发现开始时间"/>
            </b-form-group>

            <b-form-group horizontal :label-cols="3" label-size="sm" label="发现结束时间：" label-for="endTime">
                <vue-datepicker-local v-model="data.endTime" format="YYYY-MM-DD HH:mm:ss" placeholder="填写发现结束时间" :disabled-date="disabledDate"/>
            </b-form-group>
        </b-form>
        <div slot="modal-footer">
            <div class="btn-gro">
                <el-button @click="search" type="primary" icon="el-icon-zoom-in" :size="size">查询</el-button>
                <el-button @click="hideModel" type="danger" icon="el-icon-circle-close-outline" :size="size">关闭</el-button>
            </div>
        </div>
    </b-modal>
</template>

<script>
import VueDatepickerLocal from '@/components/ui/datepicker/VueDatepickerLocal'

export default {
    props: ['data', 'size'],
    methods: {
        hideModel () {
            this.$refs.modelRef.hide()
        },
        showModel () {
            this.$refs.modelRef.show()
        },
        search () {
            this.$emit('search', this.data)
            this.$refs.modelRef.hide()
        },
        disabledDate (time){
            // 如果是时间格式，不用转换，否则转换成时间格式
            let nowTime = 0
            if (typeof (this.data.startTime) === 'object') {
                nowTime = this.data.startTime.getTime()
            } else {
                let date = new Date(this.data.startTime)
                nowTime = date.getTime()
            }
            return nowTime > time.getTime()
        },
    },
    components: {
        VueDatepickerLocal
    }
}

</script>
<style lang="css" scoped>
</style>
