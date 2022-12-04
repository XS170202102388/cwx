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
      <el-form-item label="手机号码" prop="menuName">
        <el-input v-model.trim="form.number" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="登录账号" prop="loginName">
        <el-input v-model.trim="form.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="showList">
        <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="showList">
        <el-input v-model.trim="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="show" label="状态" width="150">
          <el-switch v-model="value1" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-form-item>
      <el-form-item label="备注" prop="phone">
        <el-input v-model.trim="form.phone" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">保存</el-button>
      <el-button type="primary" @click="close">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
  // import { doEdit } from '@/api/table'

  export default {
    name: 'TableEdit',
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
