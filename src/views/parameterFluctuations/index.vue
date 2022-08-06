<template>
  <div class="tab-container">
    <el-select
      v-model="listQuery.parameter"
      placeholder="参数"
      clearable
      style="width: 320px"
    >
      <el-option
        v-for="item in parameterListOptions"
        :key="item.key"
        :label="item.displayName + '(' + item.tableName + ')'"
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

    <el-tabs v-model="activeName" style="margin-top: 15px" type="border-card">
      <el-tab-pane :label="tabMapChart.label" :name="tabMapChart.key">
        <keep-alive>
          <TabPaneChart
            v-if="activeName == tabMapChart.key"
            :listQuery="listQuery"
            :type="tabMapChart.key"
            ref="tabPaneChart"
            @create="showCreatedTimes"
          />
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane :label="tabMapData.label" :name="tabMapData.key">
        <keep-alive>
          <TabPaneData
            v-if="activeName == tabMapData.key"
            :listQuery="listQuery"
            :type="tabMapData.key"
            ref="tabPaneData"
            @create="showCreatedTimes"
          />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TabPane from "./components/TabPane";
import TabPaneChart from "./components/TabPaneChart";
import TabPaneData from "./components/TabPaneData";
import waves from "@/directive/waves"; // waves directive

const parameterListOptions = [
  {
    key: "Blower_InfeedOutfeedOutput",
    tableName: "Blower",
    displayName: "Printer Infeed and Outfeed Blower",
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
  name: "Tab",
  components: { TabPane, TabPaneChart, TabPaneData },
  directives: { waves },
  data() {
    return {
      tabMapOptions: [
        { label: "China", key: "CN" },
        { label: "USA", key: "US" },
        { label: "Japan", key: "JP" },
        { label: "Eurozone", key: "EU" },
      ],
      listQuery: {
        page: 1,
        limit: 20,
        startTime: "",
        endTime: "",
        parameter: undefined,
        tableName: undefined,
        columnName: undefined,
        type: "chart",
      },
      tabMapChart: {
        label: "图表",
        key: "chart",
      },
      tabMapData: {
        label: "数据",
        key: "data",
      },
      parameterListOptions,
      activeName: "chart",
      createdTimes: 0,
    };
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`);
    },
  },
  created() {
    // init the default selected tab
    const tab = this.$route.query.tab;
    if (tab) {
      this.activeName = tab;
    }
  },
  methods: {
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1;
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.listQuery.type = this.activeName;
      var listQuery = this.listQuery;
      if (this.activeName == "chart") {
        this.$refs.tabPaneChart.searchData(listQuery);
      } else {
        this.$refs.tabPaneData.searchData(listQuery);
      }
    },
  },
};
</script>

<style scoped>
.tab-container {
  margin: 30px;
}
</style>
