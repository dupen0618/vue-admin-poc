<!-- 机台下次保养时间 -->
<template>
  <div class="machineNextMaintenance-container">
    <h3 style="text-align: center;margin-top: 0px;">
      机台下次保养时间:
      <span style="background-color:#E6A23C;color:red;font-size:large;">状态：{{status}}</span>
    </h3>
    <h1 style="text-align: center;">{{nextMaintenanceDate}}</h1>
  </div>
</template>

<script>
export default {
  name: "machineNextMaintenance",
  data() {
    return {
      nextMaintenanceDate: "2022-07-21",
      status: "已逾期"
    };
  }
};
</script>

<style>
.machineNextMaintenance-container {
  width: 100%;
  background-color: #95b7e1;
  height: 100%;
}
</style>