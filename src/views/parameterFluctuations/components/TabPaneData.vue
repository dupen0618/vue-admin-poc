<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="参数1" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.param1 }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="isShow" label="参数2" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.param2 }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="isShow" label="参数3" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.param2 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="时间戳"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createDate }}</span>
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
</template>

<script>
import { getList } from "@/api/Parameter";
import pagination from "@/components/Pagination";

export default {
  components: { pagination },
  props: ["listQuery"],
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
      total: 0,
      list: null,
      listLoading: true,
      isShow: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      if (this.listQuery.parameter == "NozzleXyz_XYZ") {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
      if (this.listQuery.parameter != undefined) {
        var arr = this.listQuery.parameter.split("_");
        this.listQuery.tableName = arr[0];
        this.listQuery.columnName = arr[1];
      }

      getList(this.listQuery).then((response) => {
        var json = JSON.parse(response.data);
        if (json != null) {
          this.list = json.items;
          this.total = json.total;
        }
        this.listLoading = false;
      });
    },
    searchData(query) {
      this.listQuery = query;
      this.fetchData();
    },
  },
};
</script>
