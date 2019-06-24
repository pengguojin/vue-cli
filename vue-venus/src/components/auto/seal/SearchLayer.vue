<!-- 自动封堵-查询模态框 -->
<template lang="html">
    <!-- 查询-弹出层 -->
    <b-modal ref="modelRef" title="查询" :no-close-on-backdrop="true">
        <b-form>
            <b-form-group horizontal :label-cols="3" label-size="sm" label="发现开始时间：" label-for="startTime">
                <vue-datepicker-local v-model="item.values.startTime" format="YYYY-MM-DD HH:mm:ss" placeholder="填写发现开始时间"/>
            </b-form-group>

            <b-form-group horizontal :label-cols="3" label-size="sm" label="发现结束时间：" label-for="endTime">
                <vue-datepicker-local v-model="item.values.endTime" format="YYYY-MM-DD HH:mm:ss" placeholder="填写发现结束时间" :disabled-date="disabledDate"/>
            </b-form-group>

            <b-form-group horizontal :label-cols="3" label-size="sm" label="信息来源：" label-for="cdevtype">
                <b-form-input v-model="item.values.cdevtype" id="cdevtype" type="text" required placeholder="填写信息来源" />
            </b-form-group>

            <b-form-group horizontal :label-cols="3" label-size="sm" label="封堵IP：" label-for="ip">
                <b-form-input v-model="item.values.ip" id="ip" type="text" required placeholder="填写封堵IP" />
            </b-form-group>

            <b-form-group horizontal :label-cols="3" label-size="sm" label="创建者：" label-for="creator">
                <b-form-input v-model="item.values.creator" id="creator" type="text" required placeholder="填写创建者" />
            </b-form-group>

            <b-form-group horizontal :label-cols="3" label-size="sm" label="推送状态：" label-for="status">
                <b-form-select v-model="item.values.status" required placeholder="填写推送状态" :options="options">
                    <template slot="first">
                        <option :value="''">-- 请选择 --</option>
                    </template>
                </b-form-select>
            </b-form-group>
        </b-form>
        <div slot="modal-footer">
            <div class="btn-gro">
                <el-button @click="search" type="primary" icon="el-icon-zoom-in" :size="size">查询</el-button>
                <el-button @click="reset" type="primary" icon="el-icon-refresh" :size="size">重置</el-button>
                <el-button @click="hideModel" type="danger" icon="el-icon-circle-close-outline" :size="size">关闭</el-button>
            </div>
        </div>
    </b-modal>
</template>

<script>
import VueDatepickerLocal from '@/components/ui/datepicker/VueDatepickerLocal'

export default {
    props: ['size', 'item'],
    methods: {
        hideModel () {
            this.$refs.modelRef.hide()
        },
        showModel () {
            this.$refs.modelRef.show()
        },
        search () {
            this.$emit('search', this.item)
            this.$refs.modelRef.hide()
        },
        reset () {
            this.$emit('reset')
        },
        disabledDate (time){
            // 如果是时间格式，不用转换，否则转换成时间格式
            let nowTime = 0
            if (typeof (this.item.values.startTime) === 'object') {
                nowTime = this.item.values.startTime.getTime() + 1000 * 24 * 60 * 60
            } else {
                let date = new Date(this.item.values.startTime)
                nowTime = date.getTime() + 1000 * 24 * 60 * 60
            }
            return nowTime > time.getTime()
        }
    },
    components: {
        VueDatepickerLocal
    },
    computed: {
        options () {
            if (this.$store.state.sealSelect) {
                return this.$store.state.sealSelect
            } else {
                return []
            }
        }
    }
}

</script>
<style lang="css" scoped>
    option {
        border: 1px solid #ccc;
        font-size: 1rem;
    }
    option:hover{
        color:#fff;
        background-color:#ccc;
    }
</style>
