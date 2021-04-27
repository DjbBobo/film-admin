<template>
  <div class="edit-form-container">
    <el-form ref="form" v-model="formData" label-width="80px">
      <el-form-item label="电影名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="海报">
        <el-input v-model="formData.image"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="formData.brief"></el-input>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-input v-model="formData.releaseTime"></el-input>
      </el-form-item>
      <el-form-item label="发布递点">
        <el-input v-model="formData.releasePlace"></el-input>
      </el-form-item>
      <el-form-item label="电影类型">
        <el-input v-model="formData.filmType"></el-input>
      </el-form-item>
      <el-form-item label="时长">
        <el-input v-model="formData.duration"></el-input>
      </el-form-item>
      <el-form-item label="票价">
        <el-input v-model="formData.price"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
  data() {
    return {
      formData: {
        name: "",
        image: "",
        brief: "",
        releaseTime: "",
        releasePlace: "",
        filmType: "",
        duration: "",
        price: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("film/" + this.operationType, this.formData)
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
    }
  }
};
</script>

<style lang="stylus" scoped></style>