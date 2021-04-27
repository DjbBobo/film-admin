<template>
  <div class="film-container">
    <el-card class="box-card">
      <el-form
        ref="form"
        v-model="searchParams"
        :inline="true"
        label-width="80px"
        class="text item"
      >
        <el-form-item label="电影名称">
          <el-input v-model="searchParams.name" />
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
        <el-table-column prop="name" label="电影名称" width="180" />
        <el-table-column prop="image" label="海报" />
        <el-table-column prop="brief" label="简介" />
        <el-table-column prop="releaseTime" label="发布时间" />
        <el-table-column prop="releasePlace" label="发布地点" />
        <el-table-column prop="filmType" label="类型" />
        <el-table-column prop="duration" label="时长" />
        <el-table-column prop="price" label="票价" />
        <el-table-column prop="score" label="评分" />
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
      searchParams: {
        name: ""
      },
      formParams: {
        name: "",
        image: "",
        brief: "",
        releaseTime: "",
        releasePlace: "",
        filmType: "",
        duration: "",
        price: "",
        score: ""
      },
      dialogVisible: false,
      operationType: ""
    };
  },
  computed: {
    ...mapState({
      filmList: state => state.film.list,
      pagination: state => state.film.pagination
    })
  },
  created() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.$store.dispatch("film/page", this.searchParams).then(() => {
        this.list = this.filmList;
        this.page.currentPage = this.pagination.currentPage;
        this.page.pageSize = this.pagination.pageSize;
        this.page.total = this.pagination.total;
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
        this.$store.dispatch("film/deleteById", row.id).then(() => {
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
