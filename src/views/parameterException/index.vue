<template>
  <div class="tab-container">
    <el-select
      v-model="listQuery.parameterList"
      multiple
      placeholder="参数"
      clearable
      style="width: 400px"
    >
      <el-option
        v-for="item in parameterListOptions"
        :key="item.key"
        :label="item.displayName + '(' + item.key + ')'"
        :value="item.key"
      />
    </el-select>

    <el-date-picker
      v-model="listQuery.startTime"
      type="datetime"
      placeholder="开始时间"
      style="width: 200px; margin-left: 10px"
    />
    <el-date-picker
      v-model="listQuery.endTime"
      type="datetime"
      placeholder="结束时间"
      style="width: 200px; margin-left: 10px"
    />
    <el-button
      v-waves
      class="filter-item"
      type="primary"
      style="margin-left: 10px"
      icon="el-icon-search"
      @click="handleFilter"
      >查询</el-button
    >

    <split-pane split="vertical" @resize="resize" style="margin-top: 15px">
      <template slot="paneL">
        <parameterTable
          :list="dataList"
          :listLoading="listLoading"
          :total="total"
          class="left-container"
        />
      </template>
      <template slot="paneR">
        <parameterChart class="top-container" :option="option" />
      </template>
    </split-pane>
  </div>
</template>

<script>
import { ParameterExceptionCount } from "@/api/Parameter";
import splitPane from "vue-splitpane";
import waves from "@/directive/waves"; // waves directive
import parameterTable from "./components/table";
import parameterChart from "./components/chart";
import { assertJSXMemberExpression } from "@babel/types";

const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" },
];

const parameterListOptions = [
  {
    key: "Blower_PVPressureOutput",
    tableName: "Blower",
    displayName: "Printer PV Pressure Blower",
  },
  {
    key: "Blower_PVVacuumOutput",
    tableName: "Blower",
    displayName: "Printer PV Vacuum Blower",
  },
  {
    key: "NozzleXyz_XYZ",
    tableName: "NozzleXyz",
    colunmName: "XYZ",
    displayName: "XYZ",
  },
  {
    key: "PhaZMapHeadList_SlopeX",
    tableName: "PhaZMapHeadList",
    displayName: "SlopeX",
  },
  {
    key: "PhaZMapHeadList_SlopeY",
    tableName: "PhaZMapHeadList",
    displayName: "SlopeY",
  },
  {
    key: "VcdAllNew_ChamberPressure",
    tableName: "VcdAllNew",
    displayName: "Chamber Pressure",
  },
];

export default {
  name: "parameterException",
  components: { splitPane, parameterTable, parameterChart },
  directives: { waves },
  data() {
    return {
      total: 20,
      listQuery: {
        page: 1,
        limit: 20,
        startTime: "",
        endTime: "",
        parameterList: undefined,
        columnNames: [],
        tableNames: [],
      },
      listLoading: true,
      dataList: [],
      data1: [
        {
          name: "Mon",
          value: 2.0,
        },
        {
          name: "Tue",
          value: 4.9,
        },
        {
          name: "Wed",
          value: 7.0,
        },
        {
          name: "Thu",
          value: 23.2,
        },
        {
          name: "Fri",
          value: 25.6,
        },
        {
          name: "Sat",
          value: 76.7,
        },
        {
          name: "Sun",
          value: 135.6,
        },
      ],
      data2: [
        {
          name: "Mon",
          value: 2.0,
        },
        {
          name: "Tue",
          value: 2.2,
        },
        {
          name: "Wed",
          value: 3.3,
        },
        {
          name: "Thu",
          value: 4.5,
        },
        {
          name: "Fri",
          value: 6.3,
        },
        {
          name: "Sat",
          value: 10.2,
        },
        {
          name: "Sun",
          value: 20.3,
        },
      ],
      calendarTypeOptions,
      parameterListOptions,
    };
  },
  watch: {},
  computed: {
    option() {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        legend: {
          data: ["参数", "异常率"],
        },
        xAxis: [
          {
            type: "category",
            data: this.data1.map((e) => e.name),
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "异常参数",
            min: 0,
            axisLabel: {
              formatter: "{value} 个",
            },
          },
          {
            type: "value",
            name: "异常率",
            min: 0,
            axisLabel: {
              formatter: "{value} %",
            },
          },
        ],
        series: [
          {
            name: "参数",
            type: "bar",
            tooltip: {
              valueFormatter: function (value) {
                return value + " 个";
              },
            },
            data: this.data1.map((e) => e.value),
          },
          {
            name: "异常率",
            type: "line",
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + " %";
              },
            },
            data: this.data2.map((e) => e.value),
          },
        ],
      };
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      if (this.listQuery.parameterList != undefined) {
        for (var i = 0; i < this.listQuery.parameterList.length; i++) {
          var arr = this.listQuery.parameterList[i].split("_");
          this.listQuery.tableNames.push(arr[0]);
          this.listQuery.columnNames.push(arr[1]);
        }
      }
      this.listLoading = true;
      ParameterExceptionCount(this.listQuery).then((response) => {
        var json = JSON.parse(response.data);
        console.log(json);
        if (json != null) {
          this.dataList = json.items;
          this.total = json.items.length;
          var data1 = [];
          var data2 = [];
          json.items.forEach((element) => {
            data1.push({
              name: element.name,
              value: element.value,
            });
            data2.push({
              name: element.name,
              value: element.per,
            });
          });

          this.data1 = data1;
          this.data2 = data2;
        }
        this.listLoading = false;
      });
    },
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1;
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.fetchData();
    },
    resize() {
      console.log("resize");
    },
  },
};
</script>

<style scoped>
.tab-container {
  margin: 30px;
  position: relative;
  height: 80vh;
}

.left-container {
  height: 100%;
}

.right-container {
  background-color: #fce38a;
  height: 200px;
}

.top-container {
  background-color: #fce38a;
  width: 100%;
  height: 100%;
}

.bottom-container {
  width: 100%;
  background-color: #95e1d3;
  height: 100%;
}
</style>
