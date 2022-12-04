<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="上级菜单" prop="chinese" >
        <el-input v-model.trim="form.cnName" autocomplete="off" placeholder="主菜单" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="菜单类型" prop="menuType">
        <el-radio v-model="radio" label="1">目录</el-radio>
        <el-radio v-model="radio" label="2">菜单</el-radio>
        <el-radio v-model="radio" label="3">按钮</el-radio>
        </el-form-item>
      <el-form-item label="菜单名称" prop="menuName">
        <el-input v-model.trim="form.enName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="显示顺序" prop="showList">
        <el-input v-model.trim="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="phone">
        <el-input v-model.trim="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="show" label="菜单状态" width="150">
          <el-switch v-model="value1" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
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
        radio: '1',
        form: {
          chinese: '',
          author: '',
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
