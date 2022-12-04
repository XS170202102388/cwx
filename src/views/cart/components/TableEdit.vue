<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="项编码" prop="system" >
        <el-input v-model.trim="form.system" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="项名称" prop="name">
        <el-input v-model.trim="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="show" label="状态" width="150">
          <el-switch v-model="value1" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-form-item>
      <el-form-item label="描述" prop="describe">
        <el-input v-model.trim="form.describe" autocomplete="off"></el-input>
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
          system: '',
          name: '',
          describe: ''
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
        } else {
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
