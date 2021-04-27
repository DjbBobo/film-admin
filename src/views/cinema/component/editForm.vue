<template>
  <div class="edit-form-container">
    <el-form ref="form" v-model="formData" label-width="80px">
      <el-form-item label="影院名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="地理位置">
        <el-cascader
          ref="cascader"
          v-model="value"
          :placeholder="formData.districtName"
          :options="treeData"
          @change="handleChange"
          :props="props"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="详细地点">
        <el-input v-model="formData.districtDetail"></el-input>
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
        this.value.push(value.provinceId);
        this.value.push(value.cityId);
        this.value.push(value.areaId);
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapState({
      treeData: state => state.district.treeData
    })
  },
  data() {
    return {
      formData: {
        name: "",
        districtDetail: "",
        provinceId: "",
        cityId: "",
        areaId: "",
        districtName: ""
      },
      props: {
        label: "name",
        value: "id"
      },
      value: []
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("cinema/" + this.operationType, this.formData)
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
      this.formData = {};
      this.$emit("toogleDialog");
    },
    handleChange() {
      this.formParams.provinceId = this.value[0];
      this.formParams.cityId = this.value[1];
      this.formParams.areaId = this.value[2];
    }
  }
};
</script>

<style lang="stylus" scoped></style>