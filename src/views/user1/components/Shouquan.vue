<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="用户名称" prop="chinese" >
        <el-input v-model.trim="form.loginName" autocomplete="off" :disabled="abc"></el-input>
      </el-form-item>
      <el-form-item label="登录账号" prop="loginName">
        <el-input v-model.trim="form.userName" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="日期"
      width="120">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">保存</el-button>
      <el-button type="primary" @click="close">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
  // import { doEdit } from '@/api/table'

  export default {
    name: 'Shouquan',
    data() {
      return {
         options: [{
          value: '选项1',
          label: '男'
        }, {
          value: '选项2',
          label: '女'
        }],
        value: '男',
        form: {
          loginName: '',
          number: '',
          email: '',
          userName: ''
        },
        rules: {
          // chinese: [{ required: true, trigger: 'blur', message: '请输入租户中文名称' }],
          // english: [{ required: true, trigger: 'blur', message: '请输入租户英文名称' }],
          // name: [{ required: true, trigger: 'blur', message: '请输入企业名称' }],
          // phone: [{ required: true, trigger: 'blur', message: '请输入企业电话' }],
        },
        chinese: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        debugger
        if (!row) {
          this.title = '添加'
          this.abc = false
        } else {
          this.abc = true
          this.title = '编辑'
          this.form = Object.assign({}, row)
        }
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      // save() {
      //   this.$refs['form'].validate(async (valid) => {
      //     if (valid) {
      //       const { msg } = await doEdit(this.form)
      //       this.$baseMessage(msg, 'success')
      //       this.$refs['form'].resetFields()
      //       this.dialogFormVisible = false
      //       this.$emit('fetch-data')
      //       this.form = this.$options.data().form
      //     } else {
      //       return false
      //     }
      //   })
      // },
    },
  }
</script>
