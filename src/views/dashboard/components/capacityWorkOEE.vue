<template>
  <div class="capacityWorkOEE-container">
    <el-row :gutter="40">
      <el-col :xs="12" :sm="12" :lg="8" v-for="(item, index) in capacityTarget" :key="index">
        <pieDoughnut :id="item.id" :class="item.name" height="100%" width="100%" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import pieDoughnut from "@/components/Charts/pieDoughnut.vue";
export default {
  name: "capacityWorkOEE",
  components: { pieDoughnut },
  data() {
    return {
      capacityTarget: [
        { id: "pieDoughnut1", name: "环形图1" },
        { id: "pieDoughnut2", name: "环形图2" },
        { id: "pieDoughnut3", name: "环形图3" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.capacityWorkOEE-container {
  background-color: #95b7e1;
  width: 100%;
  height: 100%;
}
</style>