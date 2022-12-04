<template>
  <el-row>
    <el-col :span="20" :key="'o'">
      <el-card :body-style="{ padding: '300px' }">
        <span class="wenzi">权限管理系统</span>
        <!-- <img
          src="../../assets/img/bj1.jpg"
          class="image"
        /> -->
      </el-card>
    </el-col>
    <!-- <el-col :span="8">
      <el-card :body-style="{ padding: '0px' }">
        <img
          src="../../assets/img/bj2.jpg"
          class="image"
        />
      </el-card>
    </el-col> -->
  </el-row>
</template>

<style>
.wenzi {
  font-size: 40px;
  align-content: center;

}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
    };
  },
};
</script>
