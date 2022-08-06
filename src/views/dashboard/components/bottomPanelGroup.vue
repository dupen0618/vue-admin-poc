<template>
  <div class="panelGroup-container">
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel-col">
          <div class="card-panel-description">
            <div class="card-panel-text">开机时间：{{ startTime }}</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel-col">
          <div class="card-panel-description">
            <div class="card-panel-text">开机时长：{{ runtime }}</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
        <div class="card-panel-col">
          <div class="card-panel-description">
            <div class="card-panel-text">状态：{{runingDescription}}</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "bottomPanelGroup",
  props: ["startTime", "runtime", "runingDescription"]
};
</script>

<style lang="scss" scoped>
.panelGroup-container {
  background-color: #95b7e1;
  height: 100%;

  .panel-group {
    margin-top: 0px;
    //background: rebeccapurple;

    .card-panel-col {
      margin-bottom: 0px;
      //background: red;

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-setting {
          background: #40c9c6;
        }
      }

      .icon-setting {
        color: #40c9c6;
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 2px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }
      .card-panel-icon-wrapper-right {
        float: right;
        margin: 2px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }
      .card-panel-icon {
        float: left;
        font-size: 30px;
      }
      .card-panel-icon-right {
        float: right;
        font-size: 30px;
      }

      .card-panel-description {
        float: left;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 20px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }
}
</style>