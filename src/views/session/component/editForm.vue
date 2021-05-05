<template>
  <div class="edit-form-container" v-loading="loading">
    <el-form ref="form" v-model="formData" label-width="80px">
      <el-form-item label="影院名称">
        <el-autocomplete
          v-model="formData.cinemaName"
          :debounce="300"
          :fetch-suggestions="querySearchAsyncCinema"
          value-key="name"
          :hide-loading="true"
          placeholder="请输入内容"
          @select="handleSelectCinema"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="电影名称">
        <el-autocomplete
          v-model="formData.filmName"
          :debounce="300"
          :fetch-suggestions="querySearchAsyncFilm"
          value-key="name"
          :hide-loading="true"
          placeholder="请输入内容"
          @select="handleSelectFilm"
        ></el-autocomplete>
      </el-form-item>
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
      <el-form-item label="场次时间">
        <el-date-picker
          v-model="sessionTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="放映时间"
          end-placeholder="结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm"
          @change="changeTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="价格">
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
      cinemaList: state => state.cinema.list,
      filmList: state => state.film.list,
      hallList: state => state.hall.list
    })
  },
  watch: {
    formParams: {
      handler(value) {
        this.formData = value;
        this.sessionTime = [];
        if (value.sessionStartTime && value.sessionEndTime) {
          this.sessionTime.push(value.sessionStartTime);
          this.sessionTime.push(value.sessionEndTime);
        }
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      formData: {},
      sessionTime: [],
      loading: false
    };
  },
  methods: {
    onSubmit() {
      this.loading = true;
      this.$store
        .dispatch("session/" + this.operationType, this.formData)
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
    querySearchAsyncCinema(queryString, cb) {
      if (queryString) {
        this.$store.dispatch("cinema/list", { name: queryString }).then(() => {
          cb(this.cinemaList);
        });
      }
    },
    handleSelectCinema(item) {
      this.formData.cinemaId = item.id;
    },
    querySearchAsyncFilm(queryString, cb) {
      if (queryString) {
        this.$store.dispatch("film/list", { name: queryString }).then(() => {
          cb(this.filmList);
        });
      }
    },
    handleSelectFilm(item) {
      this.formData.filmId = item.id;
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
    },
    remoteCinemaMethod(queryString) {
      this.loading = true;
      this.$store.dispatch("cinema/list", { name: queryString }).then(() => {
        this.cinemas = this.cinemaList;
        this.loading = false;
      });
    },
    remoteFilmMethod(queryString) {
      this.loading = true;
      this.$store.dispatch("film/list", { name: queryString }).then(() => {
        this.films = this.filmList;
        this.loading = false;
      });
    },
    remoteHallMethod(queryString) {
      this.loading = true;
      this.$store.dispatch("hall/list", { name: queryString }).then(() => {
        this.halls = this.hallList;
        this.loading = false;
      });
    },
    changeTime() {
      this.formData.sessionStartTime = this.sessionTime[0];
      this.formData.sessionEndTime = this.sessionTime[1];
    }
  }
};
</script>

<style lang="stylus" scoped></style>