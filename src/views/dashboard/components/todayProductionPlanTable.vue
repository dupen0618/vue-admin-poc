<template>
  <div class="todayProductionPlanTable-container">
    <el-table
      class="el-table"
      :key="key"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      :cell-style="{borderColor:'white',background: '#95b7e1'}"
      :header-cell-style="{borderColor:'white',color: '#C8D6F1', fontSize: '18px', height:'64px',  background: '#95b7e1'}"
    >
      <el-table-column class="el-table-cell" prop="productionNo" label="生产序号" width="180" />
      <el-table-column
        class="el-table-cell"
        v-for="item in formThead"
        :key="item.name"
        :prop="item.name"
        :label="item.title"
      >
        <template slot-scope="scope">{{ scope.row[item.name] }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const defaultFormThead = [
  { name: "materialNo", title: "料号" },
  { name: "batchNo", title: "生产批号" },
  { name: "startTime", title: "开始时间" },
  { name: "endTime", title: "完成时间" },
  { name: "isFinished", title: "完成" }
];

export default {
  data() {
    return {
      tableData: [
        {
          productionNo: "1",
          materialNo: "fruit-1",
          batchNo: "apple-10",
          startTime: "banana-10",
          endTime: "orange-10",
          isFinished: "完成"
        },
        {
          productionNo: "2",
          materialNo: "fruit-1",
          batchNo: "apple-10",
          startTime: "banana-10",
          endTime: "orange-10",
          isFinished: "完成"
        },
        {
          productionNo: "3",
          materialNo: "fruit-1",
          batchNo: "apple-10",
          startTime: "banana-10",
          endTime: "orange-10",
          isFinished: "完成"
        },
        {
          productionNo: "4",
          materialNo: "fruit-1",
          batchNo: "apple-10",
          startTime: "banana-10",
          endTime: "orange-10",
          isFinished: "完成"
        }
      ],
      key: 1, // table key
      formThead: defaultFormThead // 默认表头 Default header
    };
  },
  watch: {}
};
</script>
<style  lang="scss" scoped>
.todayProductionPlanTable-container {
  width: 100%;
  background-color: #95b7e1;
  height: 100%;

  .el-table {
    background-color: #95b7e1;
    background-color: transparent; //这是设置透明背景色
    border: 1px solid white;

    .el-table-cell {
      background-color: #95b7e1;
      background-color: transparent; //这是设置透明背景色
    }
  }
}
</style>
