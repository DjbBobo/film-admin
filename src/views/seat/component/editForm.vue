<template>
  <div class="edit-form-container" v-loading="loading">
    <el-form ref="form" v-model="formData" label-width="80px">
      <el-form-item label="放映厅">
        <el-autocomplete
          v-model="formData.hallName"
          :debounce="300"
          :fetch-suggestions="querySearchAsyncHall"
          value-key="name"
          :hide-loading="true"
          placeholder="请输入内容"
          @select="handleSelectHall"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="排">
        <el-input v-model="formData.row"></el-input>
      </el-form-item>
      <el-form-item label="座">
        <el-input v-model="formData.col"></el-input>
      </el-form-item>
      <el-form-item label="X">
        <el-input v-model="formData.x"></el-input>
      </el-form-item>
      <el-form-item label="Y">
        <el-input v-model="formData.y"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    formParams: {
      type: Object
    },
    operationType: {
      type: String
    }
  },
  computed: {
    ...mapState({
      hallList: state => state.hall.list
    })
  },
  watch: {
    formParams: {
      handler(value) {
        this.formData = value;
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      formData: {},
      loading: false
    };
  },
  methods: {
    onSubmit() {
      this.loading = true;
      this.$store
        .dispatch("seat/" + this.operationType, this.formData)
        .then(res => {
          this.loading = false;
          this.$message({
            message: this.operationType == "save" ? "新增成功" : "修改成功",
            type: "success"
          });
          this.onCancel();
          this.$emit("getDataList");
        })
        .catch(res => {
          this.$message.error(res.message);
        });
    },
    onCancel() {
      this.$emit("toogleDialog");
    },
    querySearchAsyncHall(queryString, cb) {
      if (queryString) {
        this.$store.dispatch("hall/list", { name: queryString }).then(() => {
          cb(this.hallList);
        });
      }
    },
    handleSelectHall(item) {
      this.formData.hallId = item.id;
    }
  }
};
</script>

<style lang="stylus" scoped></style>