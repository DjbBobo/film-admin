<template>
  <div class="edit-form-container">
    <el-form ref="form" v-model="formData" label-width="80px">
      <el-form-item label="演员姓名">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="图片Url">
        <el-input v-model="formData.image"></el-input>
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
        image: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("actor/" + this.operationType, this.formData)
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