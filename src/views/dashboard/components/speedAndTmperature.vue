<template>
  <div class="speedAndTmperature-container">
    <el-row :gutter="40">
      <el-col :xs="12" :sm="12" :lg="6" v-for="(item, index) in target" :key="index">
        <gaugeSpeed :id="item.id" :class="item.name" height="100%" width="100%" />
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="12" :sm="12" :lg="6" v-for="(item, index) in thermometerList" :key="index">
        <gaugeTemperature :id="item.id" :class="item.name" height="100%" width="100%" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import gaugeSpeed from "@/components/Charts/gaugeSpeed.vue";
import gaugeTemperature from "@/components/Charts/gaugeTemperature.vue";

export default {
  name: "speedAndTmperature",
  components: { gaugeSpeed, gaugeTemperature },
  data() {
    return {
      target: [
        //循环5个折线图
        { id: "1", name: "折线图1" },
        { id: "2", name: "折线图2" },
        { id: "3", name: "折线图3" },
        { id: "4", name: "折线图4" }
      ],
      thermometerList: [
        { id: "5", name: "温度计1" },
        { id: "6", name: "温度计2" },
        { id: "7", name: "温度计3" },
        { id: "8", name: "温度计4" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.speedAndTmperature-container {
  background-color: #95b7e1;
  width: 100%;
  height: 100%;
}
</style>