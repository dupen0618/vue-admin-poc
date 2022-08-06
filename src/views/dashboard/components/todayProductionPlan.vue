<!-- 今天生产计划 -->
<template>
  <div class="todayProductionPlan-container">
    <h1
      style="text-align: center;margin-top: 0px;"
    >今日计划数:{{productionScheduleNum}} 生产数:{{productionQuantity}}</h1>
    <div style="padding-top:20px;" class="progress-item">
      <!-- <span>Vue</span> -->
      <el-progress :percentage="80" :stroke-width="18" />
    </div>
  </div>
</template>

<script>
export default {
  name: "todayProductionPlan",
  data() {
    return {
      productionScheduleNum: 100,
      productionQuantity: 80,
      per: 80
    };
  }
};
</script>

<style>
.todayProductionPlan-container {
  width: 100%;
  background-color: #95b7e1;
  height: 100%;
}
</style>