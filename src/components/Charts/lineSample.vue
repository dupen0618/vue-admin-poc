<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
import resize from "./mixins/resize";
import { EleResize } from "@/utils/esresize";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    id: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "200px",
    },
    height: {
      type: String,
      default: "150px",
    },
    xAxisData: {
      type: Array,
      // default: function () { return [] }
      default: () => [],
    },
    // seriesData: {
    //   type: Array,
    //   // default: function () { return [] }
    //   default: () => [],
    // },
    seriesList: {
      type: Array,
      // default: function () { return [] }
      default: () => [],
    },
  },
  data() {
    return {
      chart: null,
      option: undefined,
    };
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id), null, {
        renderer: "canvas",
        useDirtyRect: false,
      });
      let resizeDiv = document.getElementById(this.id);
      console.log("++++++++++++++++++++++++++");
      console.log(this.seriesList);
      console.log("--------------------------");

      this.option = {
        xAxis: {
          type: "category",
          data: this.xAxisData,
        },
        yAxis: {
          type: "value",
        },
        series: this.seriesList,
        // [
        //   {
        //     data: this.seriesData,
        //     type: "line",
        //     // 显示数值
        //     // itemStyle: { normal: { label: { show: true } } },
        //   },
        // ],
      };

      if (this.option && typeof this.option === "object") {
        this.chart.setOption(this.option);
      }
      let listener = function () {
        this.chart.resize();
      };
      EleResize.on(resizeDiv, listener);
    },
    refreshChart() {
      if (this.chart != null && this.chart != "" && this.chart != undefined) {
        this.chart.dispose(); //销毁
      }
      // this.option.xAxis.data = this.xAxisData;
      // this.option.series.data = this.seriesData;
      // this.chart.setOption(this.option);
      this.initChart();
    },
  },
};
</script>
