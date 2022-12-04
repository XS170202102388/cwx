<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="租户中文名称" prop="chinese">
        <el-input v-model.trim="form.cnName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="租户英文名称" prop="english">
        <el-input v-model.trim="form.enName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="name">
        <el-input v-model.trim="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业电话" prop="phone">
        <el-input v-model.trim="form.phone" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  // import { doEdit } from '@/api/table'

  export default {
    name: 'TableEdit',
    data() {
      return {
        form: {
          chinese: '',
          author: '',
        },
        rules: {
          chinese: [{ required: true, trigger: 'blur', message: '请输入租户中文名称' }],
          english: [{ required: true, trigger: 'blur', message: '请输入租户英文名称' }],
          name: [{ required: true, trigger: 'blur', message: '请输入企业名称' }],
          phone: [{ required: true, trigger: 'blur', message: '请输入企业电话' }],
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
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const { msg } = await doEdit(this.form)
            this.$baseMessage(msg, 'success')
            this.$refs['form'].resetFields()
            this.dialogFormVisible = false
            this.$emit('fetch-data')
            this.form = this.$options.data().form
          } else {
            return false
          }
        })
      },
    },
  }
</script>
