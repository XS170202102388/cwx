<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="角色名称" prop="chinese" >
        <el-input v-model.trim="form.cnName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="权限字符" prop="menuName">
        <el-input v-model.trim="form.enName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="显示顺序" prop="showList">
        <el-input v-model.trim="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="show" label="状态" width="150">
          <el-switch v-model="value1" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-form-item>
      <el-form-item label="备注" prop="phone">
        <el-input v-model.trim="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜单权限" prop="phone">
        <el-checkbox v-model="checked1">展开/折叠</el-checkbox>
        <el-checkbox v-model="checked2">全选/不全选</el-checkbox>
        <el-checkbox v-model="checked3">父子联动</el-checkbox>
        <el-tree
  :data="data1"
  show-checkbox
  node-key="id"
  :default-checked-keys="[5]"
  :props="defaultProps">
</el-tree>
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
         data1: [{
          id: 1,
          label: '系统管理',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '系统监控',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '系统维护',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        checked1: false,
        checked2: false,
        checked3: true,
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
