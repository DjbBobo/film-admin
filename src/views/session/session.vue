<template>
  <div class="session-container" v-loading="loading">
    <el-card class="box-card">
      <el-form
        ref="form"
        v-model="searchParams"
        :inline="true"
        label-width="80px"
        class="text item"
      >
        <el-form-item label="影院名称">
          <el-input v-model="searchParams.likeCinemaName" />
        </el-form-item>
        <el-form-item label="电影名称">
          <el-input v-model="searchParams.likeFilmName" />
        </el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button type="info" @click="resetForm">重置</el-button>
      </el-form>
    </el-card>
    <br />
    <el-card class="box-card" body-style>
      <el-row class="btn-row">
        <el-button type="primary" @click="handleSave">新增</el-button>
      </el-row>
      <br />
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="cinemaName" label="影院名称" width="180" />
        <el-table-column prop="filmName" label="电影名称" />
        <el-table-column prop="hallName" label="放映厅" />
        <el-table-column prop="sessionStartTime" label="播出时间" :formatter="formatterStartTime" />
        <el-table-column prop="sessionEndTime" label="结束时间" :formatter="formatterEndTime" />
        <el-table-column prop="price" label="价格" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br />
      <el-row class="pagination-row">
        <el-pagination
          :current-page="page.currentPage"
          :page-sizes="[20,40,60,80]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next"
          :total="page.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </el-card>

    <el-dialog :visible.sync="dialogVisible" :title="operationType=='save'?'新增':'修改'">
      <edit-form
        :formParams="formParams"
        :operationType="operationType"
        @toogleDialog="toogleDialog"
        @getDataList="getDataList"
      ></edit-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import editForm from "./component/editForm";

export default {
  components: {
    editForm
  },
  data() {
    return {
      list: [],
      page: {},
      loading: false,
      searchParams: {
        likeCinemaName: "",
        likeFilmName: ""
      },
      formParams: {
        name: "",
        districtDetail: "",
        provinceId: "",
        cityId: "",
        areaId: ""
      },
      dialogVisible: false,
      operationType: ""
    };
  },
  computed: {
    ...mapState({
      sessionList: state => state.session.list,
      pagination: state => state.session.pagination
    })
  },
  created() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.loading = true;
      this.$store.dispatch("session/list", this.searchParams).then(() => {
        this.list = this.sessionList;
        this.page.currentPage = this.pagination.currentPage;
        this.page.pageSize = this.pagination.pageSize;
        this.page.total = this.pagination.total;

        this.loading = false;
      });
    },
    onSearch() {
      this.getDataList();
    },
    resetForm() {
      this.searchParams = {};
      this.getDataList();
    },
    toogleDialog() {
      this.dialogVisible = this.dialogVisible == false ? true : false;
    },
    handleSave() {
      this.formParams = {};
      this.operationType = "save";
      this.toogleDialog();
    },
    handleUpdate(index, row) {
      this.formParams = {};
      // this.formParams.id = row.id;
      // this.formParams.cinemaName = row.cinemaName;
      // this.formParams.filmName = row.filmName;
      // this.formParams.hallName = row.hallName;
      // this.formParams.sessionStartTime = row.sessionStartTime;
      // this.formParams.sessionEndTime = row.sessionEndTime;
      // this.formParams.price = row.price;
      this.formParams = JSON.parse(JSON.stringify(row));
      this.operationType = "update";
      this.toogleDialog();
    },
    handleDelete(index, row) {
      this.$confirm("确定删除数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("session/deleteById", row.id).then(() => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getDataList();
        });
      });
    },
    handleCurrentChange(page) {
      this.searchParams.page = page;
      this.getDataList();
    },
    handleSizeChange(size) {
      this.searchParams.size = size;
      this.getDataList();
    },
    formatterStartTime(row, column) {
      return row.sessionStartTime.substr(0, row.sessionStartTime.length - 3);
    },
    formatterEndTime(row, column) {
      return row.sessionEndTime.substr(0, row.sessionEndTime.length - 3);
    }
  }
};
</script>

<style scoped>
.btn-row {
  text-align: right;
}
.pagination-row {
  text-align: right;
}
</style>
