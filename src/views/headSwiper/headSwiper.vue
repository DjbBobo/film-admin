<template>
  <div class="headSwiper-container" v-loading="loading">
    <el-card class="box-card">
      <el-form
        ref="form"
        v-model="searchParams"
        :inline="true"
        label-width="80px"
        class="text item"
      >
        <el-form-item label="图片Url">
          <el-input v-model="searchParams.imageUrl" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchParams.enable" placeholder="请选择">
            <el-option label="启用" :value="Number.parseInt(1)"></el-option>
            <el-option label="禁用" :value="Number.parseInt(2)"></el-option>
          </el-select>
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
        <el-table-column prop="imageUrl" label="图片Url" width="300" show-overflow-tooltip />
        <el-table-column prop="redirectUrl" label="重定向Url" width="300" show-overflow-tooltip />
        <el-table-column align="center" prop="sort" label="排序" width="180" />
        <el-table-column
          align="center"
          prop="enable"
          label="状态"
          :formatter="enableFormatter"
          width="180"
        />
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
        name: ""
      },
      formParams: {
        imageUrl: "",
        redirectUrl: "",
        sort: "",
        enable: true
      },
      dialogVisible: false,
      operationType: ""
    };
  },
  computed: {
    ...mapState({
      headSwiperList: state => state.headSwiper.list,
      pagination: state => state.headSwiper.pagination
    })
  },
  created() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.loading = true;
      this.$store.dispatch("headSwiper/list", this.searchParams).then(() => {
        this.list = this.headSwiperList;
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
        this.$store.dispatch("headSwiper/deleteById", row.id).then(() => {
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
    enableFormatter(row, column) {
      let enable = row.enable;
      if (enable === 1) {
        return "启用";
      } else {
        return "禁用";
      }
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
