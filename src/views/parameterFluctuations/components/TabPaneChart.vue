<template>
  <div class="chart-container">
    <e-charts class="chart" :option="option" />
  </div>
</template>

<script>
import { getList } from "@/api/Parameter";
import lineSample from "@/components/Charts/lineSample";

export default {
  name: "TabPaneChart",
  props: ["listQuery"],
  components: { lineSample },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  props: {
    type: {
      type: String,
      default: "CN",
    },
  },
  data() {
    return {
      list: null,
      loading: false,
      data: [
        {
          time: "Mon",
          value: 150,
        },
        {
          time: "Tue",
          value: 230,
        },
        {
          time: "Wed",
          value: 224,
        },
        {
          time: "Thu",
          value: 218,
        },
        {
          time: "Fri",
          value: 135,
        },
        {
          time: "Sat",
          value: 147,
        },
        {
          time: "Sun",
          value: 260,
        },
      ],
      data2: [
        {
          time: "Mon",
          value: 180,
        },
        {
          time: "Tue",
          value: 200,
        },
        {
          time: "Wed",
          value: 124,
        },
        {
          time: "Thu",
          value: 218,
        },
        {
          time: "Fri",
          value: 235,
        },
        {
          time: "Sat",
          value: 187,
        },
        {
          time: "Sun",
          value: 200,
        },
      ],
      data3: [
        {
          time: "Mon",
          value: 250,
        },
        {
          time: "Tue",
          value: 130,
        },
        {
          time: "Wed",
          value: 124,
        },
        {
          time: "Thu",
          value: 180,
        },
        {
          time: "Fri",
          value: 235,
        },
        {
          time: "Sat",
          value: 247,
        },
        {
          time: "Sun",
          value: 160,
        },
      ],
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    option() {
      return {
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: this.data.map((e) => e.time),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.data.map((e) => e.value),
            type: "line",
          },
          {
            data: this.data2.map((e) => e.value),
            type: "line",
          },
          {
            data: this.data3.map((e) => e.value),
            type: "line",
          },
        ],
      };
    },
  },
  methods: {
    fetchData() {
      this.loading = true;

      if (this.listQuery != undefined) {
        var arr = this.listQuery.parameter.split("_");
        this.listQuery.tableName = arr[0];
        this.listQuery.columnName = arr[1];
      }

      getList(this.listQuery).then((response) => {
        var json = JSON.parse(response.data);
        if (json != null) {
          this.data2 = [];
          this.data3 = [];
          var parameter = this.listQuery.parameter;
          var list = [];
          var list2 = [];
          var list3 = [];
          json.items.forEach((element) => {
            list.push({
              time: element.createDate,
              value: element.param1,
            });
            if (parameter == "NozzleXyz_XYZ") {
              list2.push({
                time: element.createDate,
                value: element.param2,
              });
              list3.push({
                time: element.createDate,
                value: element.param3,
              });
            }
          });
          this.data = list;
          if (parameter == "NozzleXyz_XYZ") {
            this.data2 = list2;
            this.data3 = list3;
          }
        }
        this.loading = false;
      });
    },
    searchData(query) {
      this.listQuery = query;
      this.fetchData();
    },
  },
};
</script>
<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
.chart {
  height: 400px;
}
</style>
