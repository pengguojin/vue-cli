<!--  -->
<template lang="html">
    <div class="main">
        <div class="bxy-left">
            <BxyChart />
        </div>

        <div class="bxy-right">
            <div class="pane mypane">
                <span class="h2-title"></span>
                <BxyTable />
            </div>
        </div>
    </div>
</template>

<script>
const BxyChart = r => require.ensure([], () => r(require('./BxyChart')), 'BxyChart')
const BxyTable = r => require.ensure([], () => r(require('./BxyTable')), 'BxyTable')

export default {
    components: {
        BxyTable, BxyChart
    }
}

</script>
<style lang="css" scoped>
    .bxy-left {
        width: 100%;
        height: 39%;
        float: left;
    }
    .bxy-right {
        margin-top: 5px;
        width: 100%;
        height: 60%;
        float: left;
    }
</style>
