<template>
  <div>
    <!-- 列表 -->
    
    <el-row :gutter="20">
      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>角色管理</el-breadcrumb-item>
</el-breadcrumb>
    <el-col :span="24">
        <!-- <el-form-item label="活动名称" prop="">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item> -->
        <el-col :span="5.5"><font size="5">角色名称: </font></el-col>
        <el-col :span="4">
    <el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
    <el-col :span="5.5"><font size="5">权限字符: </font> </el-col>
    <el-col :span="4">
    <el-input v-model="input1" placeholder="请输入内容"></el-input></el-col>
    <el-col :span="5.5"><font size="5">状态: </font></el-col>
            <el-col :span="4">
             <el-select v-model="queryInfo.userHidden" filterable placeholder="请选择">
               <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
               </el-option>
             </el-select>
          </el-col>
    </el-col>
    </el-row>
    <el-row >
        <el-col :span="24">
            <el-col :span="2"><font size="5">创建时间: </font></el-col>
        <el-col :span="10">
        <el-date-picker
      v-model="value2"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
        </el-col>
    <vab-query-form-left-panel>
        <el-button icon="el-icon-search" type="success">
          搜索
        </el-button>
        <el-button icon="el-icon-refresh-right" type="warning">
          重置
        </el-button>
        <el-button icon="el-icon-el-icon-plus" type="primary" @click="handleEdit(row)">
          添加
        </el-button>
        <el-button icon="el-icon-el-icon-plus" type="danger" @click="handleDelete">
          删除
        </el-button>
      </vab-query-form-left-panel>
    </el-col>
    </el-row>
    

    <el-table :data="studentList" stripe border>
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>      
      <el-table-column prop="userId" label="编号" width="100"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="150"></el-table-column>
      <el-table-column prop="quanxiang" label="权限字符" width="150"></el-table-column>
      <el-table-column prop="stage" label="状态" width="100">
          <el-switch v-model="value1" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-table-column>
      <el-table-column prop="date" label="添加日期" width="200"></el-table-column>
      <el-table-column prop="caozuo" label="操作" width="300">
           <template #default="{ row }">
        <el-button
          size="mini"
          @click="handleEdit(row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    <el-row>
        <el-col :span="1.5">
    <span class="demonstration">调整每页显示</span></el-col>
    <el-col :span="10">
    <el-pagination
      :current-page.sync="currentPage2"
      :page-sizes="[20, 30, 50, 100]"
      :page-size="30"
      layout="sizes, prev, pager, next"
      :total="1000">
    </el-pagination></el-col>
    </el-row>
    <table-edit ref="edit"></table-edit>
  </div>
</template>
 
<script>
import TableEdit from './components/TableEdit'
export default {
  components: {
      TableEdit,
    },
     methods: {
    handleEdit(row) {
      debugger
        this.$refs['edit'].showEdit(row)
      },
    handleDelete() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
      
  },
  data () {
    return {
      input: '',
      input1: '',
         options: [{
          value: '选项1',
          label: '所有'
        }, {
          value: '选项2',
          label: '正常'
        }, {
          value: '选项3',
          label: '停用'
        }],
        queryInfo: {
           userHidden :""
        },
        value1: true,
        value2: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      studentList: [
        {
          userId: '01',
          roleName: '系统管理员',
          quanxiang: 'Admin',
          stage: '18',
          date: '2022-11-21 10:10:10',
          caozuo:''
        },
        {
          userId: '02',
          roleName: '默认角色',
          quanxiang: 'User',
          stage: '21',
          date: '2022-11-21 10:10:10',
          caozuo:''
        },
        {
          userId: '03',
          roleName: '角色1',
          quanxiang: 'test',
          stage: '18',
          date: '2022-11-21 10:10:10',
          caozuo:''
        }
      ]
    }
  }
}
</script>
 
<style>
 .el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.el-breadcrumb {
   line-height: 5;
 }
</style>