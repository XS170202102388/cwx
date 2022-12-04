<template>
  <div>
    <!-- 列表 -->
    
    <el-row :gutter="20">
      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>租户管理</el-breadcrumb-item>
</el-breadcrumb>
    <el-col :span="24">
        <!-- <el-form-item label="活动名称" prop="">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item> -->
        <el-col :span="5.5"><font size="5">租户名称: </font></el-col>
        <el-col :span="4">
    <el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
    <el-col :span="5.5"><font size="5">企业名称: </font> </el-col>
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
      <el-table-column prop="cnName" label="租户中文名称" width="150"></el-table-column>
      <el-table-column prop="enName" label="租户英文名称" width="150"></el-table-column>
      <el-table-column prop="name" label="企业名称" width="150"></el-table-column>
      <el-table-column prop="phone" label="企业电话" width="150"></el-table-column>
      <el-table-column prop="responsibility" label="责任人" width="70"></el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tooltip
            :content="row.status"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="row.status | statusFilter">
              {{ row.status }}
            </el-tag>
          </el-tooltip>
        </template>
          <!-- <el-button type="primary" round>启用</el-button> -->
      </el-table-column>
      <el-table-column prop="date" label="添加日期" width="200"></el-table-column>
      <el-table-column prop="describe" label="租户描述" width="150"></el-table-column>
      <el-table-column prop="caozuo" label="操作" width="150">
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
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
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
  filters: {
      statusFilter(status) {
        const statusMap = {
          启用: 'success',
          草稿: 'gray',
          deleted: 'danger',
        }
        return statusMap[status]
      },
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
        // value1: true,
        value2: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      studentList: [
        { 
          id: '01',
          cnName: '深圳大数据治理中心',
          enName: 'Shenzhen Big Data Governance Center',
          name: '深圳大数据治理中心',
          phone: 13922331111,
          responsibility: '张三',
          describe: 'SHENZHEN',
          date: '2022-11-21 10:10:10',
          caozuo:'',
          status: '启用'
        },
        { 
          id: '02',
          cnName: '赛意信息科技',
          enName: 'SIE Information Technology',
          name: '赛意信息科技',
          phone: 15913694568,
          responsibility: '李四',
          describe: 'SIE',
          date: '2022-11-21 10:10:10',
          caozuo:'',
          status: '草稿'
        },
        { 
          id: '03',
          cnName: '腾讯',
          enName: 'tencent',
          name: '腾讯',
          phone: 13875618426,
          responsibility: '王五',
          describe: 'QQ',
          date: '2022-11-21 10:10:10',
          caozuo:'',
          status: '草稿'
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