<template>
  <div>
    <!-- 列表 -->
    
    <el-row :gutter="20">
    <el-col :span="24">
        <!-- <el-form-item label="活动名称" prop="">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item> -->
        <el-col :span="5.5"><font size="5">菜单名称: </font></el-col>
        <el-col :span="4">
    <el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
    <!-- <el-col :span="5.5"><font size="5">权限字符: </font> </el-col>
    <el-col :span="4">
    <el-input v-model="input" placeholder="请输入内容"></el-input></el-col> -->
    <el-col :span="5.5"><font size="5">菜单状态: </font></el-col>
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
            <!-- <el-col :span="2"><font size="5">创建时间: </font></el-col>
        <el-col :span="10">
        <el-date-picker
      v-model="value2"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
        </el-col> -->
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
    

    <el-table :data="studentList" stripe border row-key="id"
    default-expand-all
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"> 
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>      
      <el-table-column prop="menuName" label="菜单名称" width="150"></el-table-column>
      <el-table-column prop="sort" label="排序" width="150"></el-table-column>
      <el-table-column prop="address" label="请求地址" width="150"></el-table-column>
      <el-table-column prop="type" label="类型" width="150"></el-table-column>
      <el-table-column prop="show" label="可见" width="150">
          <el-switch v-model="value1" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-table-column>
      <el-table-column prop="quanxian" label="权限标识" width="150"></el-table-column>
      <el-table-column prop="date" label="添加日期" width="200"></el-table-column>
      <el-table-column prop="caozuo" label="操作" width="150">
           <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      :page-size="100"
      layout="sizes, prev, pager, next"
      :total="1000">
    </el-pagination></el-col>
    </el-row>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
         options: [{
          value: '选项1',
          label: '所有'
        }, {
          value: '选项2',
          label: '显示'
        }, {
          value: '选项3',
          label: '隐藏'
        }],
        queryInfo: {
           userHidden :""
        },
         value1: true,
        value2: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      studentList: [
        { 
          id: 1,
          menuName: '基础数据',
          sort: '1',
          address: '#',
          type: '目录',
          date: '2022-11-21 10:10:10',
          quanxian: '-',
          caozuo:'',
          show: true
        },
        {
          id: 2,
          menuName: 'Lookup配置',
          sort: '1',
          address: '/online',
          type: '菜单',
          date: '2022-11-21 10:10:10',
          quanxian: '-',
          caozuo:'',
          show: true
        },
        { 
          id: 3,
          menuName: '系统管理',
          sort: '1',
          address: '男',
          type: '目录',
          date: '2022-11-21 10:10:10',
          quanxian: '-',
          caozuo:'',
          show: true,
          children: [{
              id: 31,
              menuName: '角色管理',
              sort: '2',
              address: '/system/role',
              type: '菜单',
              date: '2022-11-21 10:10:10',
              quanxian: 'system:role',
              caozuo:'',
              show: true,
              Children: [{
                id: 311,
              menuName: '角色管理',
              sort: '3',
              address: '/system/role',
              type: '菜单',
              date: '2022-11-21 10:10:10',
              quanxian: 'system',
              caozuo:'',
              show: true,
              }]
            }, {
              id: 32,
              menuName: '用户管理',
              sort: '2',
              address: 'system/user',
              type: '菜单',
              date: '2022-11-21 10:10:10',
              quanxian: 'system:user',
              caozuo:'',
              show: true
          }]
        },
        {
          id: 4,
          menuName: 'aa',
          sort: 'aa',
          address: '男',
          type: 18,
          date: '2022-11-21 10:10:10',
          quanxian: '',
          caozuo:'',
          show: true
        },
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
</style>