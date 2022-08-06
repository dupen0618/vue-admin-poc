<template>
  <div class="dashboard-container">
    <div class="components-container">
      <split-pane split="horizontal">
        <template slot="paneL">
          <!-- <div class="top-container" /> -->
          <split-pane split="horizontal" :default-percent="15">
            <template slot="paneL">
              <panelGroup equitmentName="Box投板机" runingStatus="success"></panelGroup>
            </template>
            <!-- 整个看板拆分成上下两部分 -->
            <template slot="paneR">
              <!-- <div class="bottom-container" /> -->
              <split-pane split="vertical" :default-percent="60">
                <template slot="paneL">
                  <split-pane split="vertical" :default-percent="50">
                    <template slot="paneL">
                      <div class="top-container">视频监控区</div>
                    </template>
                    <template slot="paneR">
                      <split-pane split="horizontal" :default-percent="70">
                        <template slot="paneL">
                          <speedAndTmperature />
                        </template>
                        <!-- 整个看板拆分成上下两部分 -->
                        <template slot="paneR">
                          <nextMaintenance />
                        </template>
                      </split-pane>
                    </template>
                  </split-pane>
                </template>
                <template slot="paneR">
                  <split-pane split="horizontal" :default-percent="70">
                    <template slot="paneL">
                      <capacityWorkOEE />
                    </template>
                    <!-- 整个看板拆分成上下两部分 -->
                    <template slot="paneR">
                      <todayProductionPlan />
                    </template>
                  </split-pane>
                </template>
              </split-pane>
            </template>
          </split-pane>
        </template>
        <!-- 整个看板拆分成上下两部分 -->
        <template slot="paneR">
          <!-- <div class="bottom-container" /> -->
          <split-pane split="horizontal" :default-percent="85">
            <template slot="paneL">
              <split-pane split="vertical" :default-percent="60">
                <template slot="paneL">
                  <todayProductionPlanTabe />
                </template>
                <!-- 整个看板拆分成上下两部分 -->
                <template slot="paneR">
                  <split-pane split="vertical" :default-percent="60">
                    <template slot="paneL">
                      <alarmInformationList />
                    </template>
                    <!-- 整个看板拆分成上下两部分 -->
                    <template slot="paneR">
                      <split-pane split="horizontal" :default-percent="50">
                        <template slot="paneL">
                          <alarmFrequency />
                        </template>
                        <!-- 整个看板拆分成上下两部分 -->
                        <template slot="paneR">
                          <alarmType />
                        </template>
                      </split-pane>
                    </template>
                  </split-pane>
                </template>
              </split-pane>
            </template>
            <!-- 整个看板拆分成上下两部分 -->
            <template slot="paneR">
              <bottomPanelGroup
                :startTime="startTime"
                :runtime="runtime"
                :runingDescription="runingDescription"
              />
            </template>
          </split-pane>
        </template>
      </split-pane>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import splitPane from "vue-splitpane";
import panelGroup from "./components/panelGroup";
import speedAndTmperature from "./components/speedAndTmperature.vue";
import nextMaintenance from "./components/nextMaintenance.vue";
import capacityWorkOEE from "./components/capacityWorkOEE.vue";
import todayProductionPlan from "./components/todayProductionPlan.vue";
import alarmInformationList from "./components/alarmInformationList.vue";
import alarmFrequency from "./components/alarmFrequency.vue";
import alarmType from "./components/alarmType.vue";
import bottomPanelGroup from "./components/bottomPanelGroup.vue";
import todayProductionPlanTabe from "./components/todayProductionPlanTable.vue";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
};

export default {
  name: "Dashboard",
  components: {
    splitPane,
    panelGroup,
    speedAndTmperature,
    nextMaintenance,
    capacityWorkOEE,
    todayProductionPlan,
    todayProductionPlanTabe,
    alarmInformationList,
    alarmFrequency,
    alarmType,
    bottomPanelGroup
  },
  computed: {
    ...mapGetters(["name"])
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      startTime: "2022-07-24 11:06:54",
      runtime: "2h",
      runingDescription: "运行中 机台运行抖动频率低"
    };
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.components-container {
  position: relative;
  height: 90vh;
}

.left-container {
  background-color: #95b7e1;
  height: 100%;
}

.right-container {
  background-color: #95b7e1;
  height: 100%;
}

.top-container {
  background-color: #95b7e1;
  width: 100%;
  height: 100%;
}

.bottom-container {
  width: 100%;
  background-color: #95b7e1;
  height: 100%;
}
</style>
