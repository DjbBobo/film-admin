<template>
  <div class="edit-form-container">
    <el-form ref="form" v-model="formData" label-width="80px">
      <el-form-item label="电影名称">
        <el-autocomplete
          v-model="formData.filmName"
          :debounce="300"
          :fetch-suggestions="querySearchAsync"
          value-key="name"
          :hide-loading="true"
          placeholder="请输入内容"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="位置">
        <el-select v-model="formData.position" placeholder="请选择">
          <el-option label="热映" :value="Number.parseInt(1)"></el-option>
          <el-option label="待映" :value="Number.parseInt(2)"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formData.enable" placeholder="请选择">
          <el-option label="启用" :value="Number.parseInt(1)"></el-option>
          <el-option label="禁用" :value="Number.parseInt(2)"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="formData.sort" :min="1" label="排序"></el-input-number>
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
  watch: {
    formParams: {
      handler(value) {
        this.formData = value;
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapState({
      filmList: state => state.film.list
    })
  },
  data() {
    return {
      formData: {},
      filmName: ""
    };
  },
  methods: {
    onSubmit() {
      if (this.formData.position == "1") {
        this.formData.type = "1";
      } else if (this.formData.position == "2") {
        this.formData.type = "2";
      }
      this.$store
        .dispatch("mainSwiper/" + this.operationType, this.formData)
        .then(res => {
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
    querySearchAsync(queryString, cb) {
      if (queryString) {
        this.$store.dispatch("film/list", { name: queryString }).then(() => {
          cb(this.filmList);
        });
      }
    },
    handleSelect(item) {
      this.formData.filmId = item.id;
    }
  }
};
</script>

<style lang="stylus" scoped></style>