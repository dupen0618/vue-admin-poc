<template>
  <e-charts class="chart" :option="option" />
</template>

<script>
export default {
  props: ["option"],
};
</script>

<style>
.chart {
  height: 400px;
}
</style>
