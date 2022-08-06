<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="listQuery.parameterList"
        placeholder="参数"
        multiple
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
        style="width: 200px"
      />
      <el-date-picker
        v-model="listQuery.endTime"
        type="datetime"
        placeholder="结束时间"
        style="width: 200px"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
        >查询</el-button
      >

      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        style="margin-top: 15px"
      >
        <el-table-column align="center" label="编号" width="95">
          <template slot-scope="scope">{{ scope.row.indexNo }}</template>
        </el-table-column>
        <el-table-column
          v-if="isShow.bPVPressureOutput"
          label="PVPressureOutput"
          align="center"
        >
          <template slot-scope="scope">{{
            scope.row.bPVPressureOutput
          }}</template>
        </el-table-column>
        <el-table-column
          v-if="isShow.bPVVacuumOutput"
          label="PVVacuumOutput"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.bPVVacuumOutput }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="isShow.bCreateDate"
          align="center"
          prop="created_at"
          label="创建时间"
          width="200"
        >
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.bCreateDate }}</span>
          </template>
        </el-table-column>

        <el-table-column v-if="isShow.nX" label="X" align="center">
          <template slot-scope="scope">{{ scope.row.nX }}</template>
        </el-table-column>
        <el-table-column v-if="isShow.nY" label="Y" align="center">
          <template slot-scope="scope">{{ scope.row.nY }}</template>
        </el-table-column>
        <el-table-column v-if="isShow.nZ" label="Z" align="center">
          <template slot-scope="scope">{{ scope.row.nZ }}</template>
        </el-table-column>
        <el-table-column
          v-if="isShow.nCreateDate"
          align="center"
          prop="created_at"
          label="创建时间"
          width="200"
        >
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.nCreateDate }}</span>
          </template>
        </el-table-column>

        <el-table-column v-if="isShow.pSlopeX" label="SlopeX" align="center">
          <template slot-scope="scope">{{ scope.row.pSlopeX }}</template>
        </el-table-column>
        <el-table-column v-if="isShow.pSlopeY" label="SlopeY" align="center">
          <template slot-scope="scope">{{ scope.row.pSlopeY }}</template>
        </el-table-column>
        <el-table-column
          v-if="isShow.pCreateDate"
          align="center"
          prop="created_at"
          label="创建时间"
          width="200"
        >
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.pCreateDate }}</span>
          </template>
        </el-table-column>

        <el-table-column
          v-if="isShow.cChamberPressure"
          label="ChamberPressure"
          align="center"
        >
          <template slot-scope="scope">{{
            scope.row.cChamberPressure
          }}</template>
        </el-table-column>
        <el-table-column
          v-if="isShow.cCreateDate"
          align="center"
          prop="created_at"
          label="创建时间"
          width="200"
        >
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.cCreateDate }}</span>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="fetchData"
      />
    </div>
  </div>
</template>

<script>
import { getList2 } from "@/api/Parameter";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import pagination from "@/components/Pagination";

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
  components: { pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      total: 20,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        startTime: "",
        endTime: "",
        parameterList: undefined,
        tableNames: [],
        columnName: undefined,
      },
      temp: {
        id: undefined,
        userName: "",
        nickName: "",
        roleId: undefined,
        pwd: "",
        confirmPwd: "",
        mobile: "",
      },
      textMap: {
        update: "编辑",
        create: "创建",
      },
      dialogStatus: "",
      dialogFormVisible: false,
      importanceOptions: [1, 2, 3],
      parameterListOptions,
      sortOptions: [
        { label: "ID Ascending", key: "+id" },
        { label: "ID Descending", key: "-id" },
      ],
      isShow: {
        bCreateDate: true,
        bPVPressureOutput: true,
        bPVVacuumOutput: true,
        nX: true,
        nY: true,
        nZ: true,
        nCreateDate: true,
        pSlopeX: true,
        pSlopeY: true,
        pCreateDate: true,
        cChamberPressure: true,
        cCreateDate: true,
      },
      roleOptions: [],
      list: null,
      downloadLoading: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      console.log(this.listQuery.parameterList);
      this.resetIsShow();
      if (this.listQuery.parameterList != undefined) {
        for (var i = 0; i < this.listQuery.parameterList.length; i++) {
          var arr = this.listQuery.parameterList[i].split("_");
          this.listQuery.tableNames.push(arr[0]);
          this.updateIsShow(arr[1]);
        }
      }
      this.listLoading = true;
      getList2(this.listQuery).then((response) => {
        var json = JSON.parse(response.data);
        if (json != null) {
          this.list = json.items;
          this.total = json.total;
        }
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.fetchData();
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    resetIsShow() {
      this.isShow = {
        bCreateDate: false,
        bPVPressureOutput: false,
        bPVVacuumOutput: false,
        nX: false,
        nY: false,
        nZ: false,
        nCreateDate: false,
        pSlopeX: false,
        pSlopeY: false,
        pCreateDate: false,
        cChamberPressure: false,
        cCreateDate: false,
      };
    },
    updateIsShow(param) {
      if (param == "PVPressureOutput") {
        this.isShow.bPVPressureOutput = true;
        this.isShow.bCreateDate = true;
      }
      if (param == "PVVacuumOutput") {
        this.isShow.bPVVacuumOutput = true;
        this.isShow.bCreateDate = true;
      }
      if (param == "XYZ") {
        this.isShow.nX = true;
        this.isShow.nY = true;
        this.isShow.nZ = true;
        this.isShow.nCreateDate = true;
      }
      if (param == "SlopeX") {
        this.isShow.pSlopeX = true;
        this.isShow.pCreateDate = true;
      }
      if (param == "SlopeY") {
        this.isShow.pSlopeY = true;
        this.isShow.pCreateDate = true;
      }
      if (param == "ChamberPressure") {
        this.isShow.cChamberPressure = true;
        this.isShow.cCreateDate = true;
      }
    },
    formatJson(filterVal) {
      return this.list.map((v) =>
        filterVal.map((j) => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    confirmEdit(row) {},
    confirmDelete(row) {},
  },
};
</script>
