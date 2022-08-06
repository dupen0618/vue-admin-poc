<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.nickName"
        placeholder="登录名"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.mobile"
        placeholder="手机"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

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
      <!-- <el-select
        v-model="listQuery.importance"
        placeholder="Imp"
        clearable
        style="width: 90px"
        class="filter-item"
      >
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select
        v-model="listQuery.type"
        placeholder="Type"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in calendarTypeOptions"
          :key="item.key"
          :label="item.display_name+'('+item.key+')'"
          :value="item.key"
        />
      </el-select>
      <el-select
        v-model="listQuery.sort"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>-->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
        >查询</el-button
      >
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
        >新增</el-button
      >
      <!-- <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-upload2"
        @click="handleDownload"
        >导入</el-button
      > -->
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
        >导出</el-button
      >
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="登录名" width="95">
        <!-- <template slot-scope="scope">{{ scope.$index }}</template> -->
        <template slot-scope="scope">{{ scope.row.nickName }}</template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">{{ scope.row.userName }}</template>
      </el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机" align="center">
        <template slot-scope="scope">{{ scope.row.mobile }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="创建时间"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="small-padding fixed-width"
        label="操作"
        width="200"
        align="center"
      >
        <template slot-scope="{ row, $index }">
          <el-row>
            <el-button
              v-if="true"
              type="success"
              size="small"
              icon="el-icon-edit"
              @click="handleUpdate(row)"
            >
              编辑
            </el-button>
            <el-button
              v-if="true"
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="handleDelete(row.id, $index)"
            >
              删除
            </el-button>
          </el-row>
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="80px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="temp.userName" />
        </el-form-item>
        <el-form-item label="登录名">
          <el-input v-model="temp.nickName" />
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select
            v-model="temp.roleId"
            class="filter-item"
            placeholder="选择用户角色"
          >
            <el-option
              v-for="item in roleOptions"
              :key="item.roleId"
              :label="item.description"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="temp.mobile" />
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="temp.pwd" type="password" />
        </el-form-item>
        <el-form-item label="密码确认" prop="confirmPwd">
          <el-input v-model="temp.confirmPwd" type="password" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  roleList,
  createUser,
  updateUser,
  deleteUser,
} from "@/api/user";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import pagination from "@/components/Pagination";

const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" },
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.temp.confirmPwd !== "") {
          this.$refs["dataForm"].validateField("confirmPwd");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.temp.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      total: 20,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        startTime: "",
        endTime: "",
        nickName: undefined,
        mobile: undefined,
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
      calendarTypeOptions,
      sortOptions: [
        { label: "ID Ascending", key: "+id" },
        { label: "ID Descending", key: "-id" },
      ],
      roleOptions: [],
      rules: {
        userName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        roleId: [
          { required: true, message: "请选择用户角色", trigger: "change" },
        ],
        pwd: [{ required: true, validator: validatePass, trigger: "blur" }],
        confirmPwd: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
      list: null,
      downloadLoading: false,
    };
  },
  created() {
    this.fetchData();
    this.getRoleList();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        var json = JSON.parse(response.data);
        this.list = json.items;
        this.total = json.total;
        this.listLoading = false;
      });
    },
    getRoleList() {
      this.roleOptions = [];
      roleList().then((response) => {
        var json = response.data;
        // console.log(json);
        var options = [];
        json.forEach(function (element, index, array) {
          // element: 指向当前元素的值
          // index: 指向当前索引
          // array: 指向Array对象本身
          options.push({
            roleId: element.Id,
            roleType: element.RoleCode,
            description: element.RoleName,
          });
        });
        this.roleOptions = options;
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
    resetTemp() {
      this.temp = {
        id: undefined,
        userName: "",
        nickName: "",
        roleId: undefined,
        pwd: "",
        confirmPwd: "",
        mobile: "",
      };
    },
    createData() {
      console.log(this.temp);
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          createUser(this.temp).then(() => {
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "新建用户成功",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          updateUser(tempData).then(() => {
            const index = this.list.findIndex((v) => v.id === this.temp.UserId);
            this.list.splice(index, 1, this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "用户信息修改成功",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    handleDelete(id, index) {
      deleteUser(id).then(() => {
        this.$notify({
          title: "Success",
          message: "删除成功",
          type: "success",
          duration: 2000,
        });
        this.list.splice(index, 1);
        this.total = this.list.length;
      });
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = [
          "id",
          "登录名",
          "用户名",
          "角色",
          "手机",
          "密码",
          "创建时间",
        ];
        const filterVal = [
          "id",
          "nickName",
          "userName",
          "description",
          "mobile",
          "pwd",
          "createDate",
        ];
        const data = this.formatJson(filterVal);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "用户信息",
        });
        this.downloadLoading = false;
      });
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
