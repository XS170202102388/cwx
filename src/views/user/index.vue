<template>
  <div>
    <!--Layout布局-->
    <el-row > 
      <el-col :span="24">
        <el-row :gutter="20">
          <el-col :span="4">
            <!--搜索区域-->
            <el-input
              placeholder="请输入内容"
              v-model="queryInfo.keyword"
              clearable
              @clear="getUserList"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getUserList"
              ></el-button>
            </el-input>
          </el-col>
          <el-col :span="5.5">
            <font size="3">状态:</font>
             <el-select v-model="queryInfo.userHidden" filterable placeholder="请选择">
               <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
               </el-option>
             </el-select>
          </el-col>
          <el-col :span="9">
          <div class="block">
    <span class="demonstration">创建时间由：</span>
    <el-date-picker
      v-model="queryInfo.dateRangeArr"
      type="daterange"
      value-format="yyyy-MM-dd"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
  </el-col>
          <el-col :span="2.5">
            <el-button type="primary" plain
            icon="el-icon-search"
             @click="getUserList0"
              >查询</el-button
            >
            </el-col>

          <el-col :span="2.5">
            <el-button type="success" plain @click="addDialogVisible = true"
              >新增</el-button
            >
          </el-col>
          <el-col :span="2.5">
            <el-button type="danger" plain @click="batchDeleteUser"
                >删除
              </el-button>
              </el-col>
          <!-- <el-col :span="2.5">
            <el-button type="danger" @click="batchDeleteUser"
              >批量删除</el-button
            >
          </el-col> -->
        </el-row>
      </el-col>
      <el-col :span="24">
        <!--表格-->
        <el-table
          :data="userList"
          border
          stripe
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="40"> </el-table-column>
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="userName" label="姓名" width="80"></el-table-column>
          <el-table-column prop="loginName" label="用户名"  width="100"></el-table-column>
          <el-table-column prop="sex" label="性别" width="55"></el-table-column>
          <el-table-column prop="address" label="联系电话"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="createTime" label="新建时间"></el-table-column>
          <el-table-column prop="updateTime" label="最后修改时间"></el-table-column>
          <el-table-column prop="userHidden" label="状态" width="55"></el-table-column>
          <el-table-column label="操作" width="300" align="center">
            <!-- 作用域插槽 -->
            <template slot-scope="scope">
              <!--修改按钮-->
              <el-button
                type="primary" 
                icon="el-icon-edit" circle
                @click="showEditDialog(scope.row)"
              ></el-button>
              <!--删除按钮-->
              <el-button
                type="danger"
                icon="el-icon-delete" circle
                @click="removeUserById(scope.row.id)"
              ></el-button>
              <el-button
                type="danger"
                circle
                @click="wuDialogVisible = true"
              >无效</el-button>
              <el-button
                type="primary"
                circle
                @click="showEditDialog1(scope.row)"
              >设置角色</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <!--分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNo"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-row>
    <!--添加用户的对话框-->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="addDialogClosed"
    >
      <!--内容主体区域-->
      <el-form :model="userForm" label-width="70px" :rules="rules">
        <el-form-item label="登录名" prop="loginName" :required="true" >
          <el-input v-model="userForm.loginName"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName" :required="true">
          <el-input v-model="userForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :required="true">
          <el-input v-model="userForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="userForm.sex" label="男">男</el-radio>
          <el-radio v-model="userForm.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="address">
          <el-input v-model="userForm.address"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="userHidden" :required="true">
          <el-radio v-model="userForm.userHidden" label="有效">有效</el-radio>  
          <el-radio v-model="userForm.userHidden" label="无效">无效</el-radio>
        </el-form-item>
      </el-form>
      <!--底部按钮区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改用户的对话框-->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="30%">
      <!--内容主体区域-->
      <el-form :model="editForm" label-width="70px" :rules="rules" ref="editUser">
       <el-form-item label="登录名" prop="loginName" >
          <el-input v-model="editForm.loginName"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName" :required="true">
          <el-input v-model="editForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :required="true">
          <el-input v-model="editForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="editForm.sex" label="男">男</el-radio>
          <el-radio v-model="editForm.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="address">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="userHidden" :required="true">
          <el-radio v-model="editForm.userHidden" label="有效">有效</el-radio>
          <el-radio v-model="editForm.userHidden" label="无效">无效</el-radio>
        </el-form-item>
      </el-form>
      <!--底部按钮区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser('editUser')">确 定</el-button>
      </span>
    </el-dialog>

     <el-dialog title="删除用户" :visible.sync="delDialogVisible" width="25%">
      <!--内容主体区域-->
     
        <p style="font-size : 40px">确认删除用户?</p>
      
      <!--底部按钮区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>

<el-dialog title="无效用户" :visible.sync="wuDialogVisible" width="25%">
      <!--内容主体区域-->
     
        <p style="font-size : 40px">选择用户状态</p>
        <el-form :model="editForm" label-width="70px" :rules="rules" ref='editForm'>
        <el-form-item label="状态" prop="userHidden" :required="true">
          <el-radio v-model="editForm.userHidden" label="有效">有效</el-radio>
          <el-radio v-model="editForm.userHidden" label="无效">无效</el-radio>
        </el-form-item>
      </el-form>
      <!--底部按钮区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="wuDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser('editForm')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="设置角色"
      :visible.sync="setDialogVisible"
      width="50%"
      @close="setDialogClosed"
    >
      
      <el-form :model="setForm" :rules="rules" label-width="70px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="setForm.userName" disabled="true"></el-input>
        </el-form-item>
         <el-table
          :data="roleList"
          border
          stripe
         ref="multipleTable" @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="roleId" label="序号"></el-table-column>
          <el-table-column prop="roleRemarks" label="角色编码"></el-table-column>
          <el-table-column prop="roleName" label="角色名称"></el-table-column>
          <el-table-column prop="roleCreateTime" label="生效日期"></el-table-column>
          <el-table-column prop="roleHidden" label="状态"></el-table-column>

        </el-table>
        
      </el-form>
     
      <span slot="footer" class="dialog-footer">
        <el-button @click="setDialogVisible = false">取 消</el-button>
        <el-button type="primary" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userList, userAdd, userUpdate, userDelete, userBatchDelete,userList0} from "@/api/user"
import { roleList} from "@/api/role";
export default {
  data() {

    // let validateInput = (rule, value, callback) => {
    //     if (!this.checkSpecialKey(value)) {
    //       callback(new Error("不能含有特殊字符！！"));
    //     } else {
    //       callback();
    //     }}

    return {

       pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: '',
        value2: '',

       options: [{
          value: '效',
          label: '全部'
        }, {
          value: '有效',
          label: '有效'
        }, {
          value: '无效',
          label: '无效'
        } ],
        value: '全部',

      userList: [], // 用户列表
      roleList: [], //角色列表
      total: 0, // 用户总数
      // 获取用户列表的参数对象
      queryInfo: {
        // userHidden: "有效", // 查询参数
        userHidden :"",
        startTime : "", // 查询参数
        endTime: "", // 查询参数
        keyword: "", // 查询参数
        dateRangeArr:[],//界面时间数组
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页显示条数
      },
      addDialogVisible: false, // 控制添加用户对话框是否显示
      userForm: {
        //用户
        loginName: "",
        userName: "",
        password: "",
        sex: "",
        email: "",
        address: "",
        userHidden: "",
      },
      editDialogVisible: false, // 控制修改用户信息对话框是否显示
      editForm: {
        // id: "",
        // loginName: "",
        // userName: "",
        // password: "",
        // sex: "",
        // email: "",
        // address: "",
      },
      delDialogVisible: false,
      setDialogVisible: false,
      wuDialogVisible: false,
      setForm: {
        userName: "",
        roleId:"",
        roleRemarks: "",
        roleName: "",
        roleCreateTime: "",
        roleHidden: "",
      },
      multipleSelection: [],
      ids: [],

      rules: {
       
        loginName:[{ trigger:'blur',
        validator:function(rule, value, callback){ 
              if (
                value==''
              ) {
                 callback(new Error("请输入登录名"));
              } else if(/^[0-9a-zA-Z\u4e00-\u9fa5]*$/i.test(
                  value
                ) == false

              ) {console.log(2)
                callback(new Error("不能带有特殊字符"));
                
              } else {
                console.log(1)
                callback();
              }
        }},
        {min: 4, max: 20, message: '用户名长度4-20字符', trigger: 'blur'}],
        userName:[{required: true, message:'请输入姓名', trigger:'blur'}],
        password:[{required: true, message:'请输入密码', trigger:'blur'},
        {min: 6, max: 20, message: '密码长度6-20字符', trigger: 'blur'}],
        userHidden:[{required: true, message:'请选择状态', trigger:'blur'}],
        email: [
          // {required: true,message: "请输入邮箱",trigger: "blur"},
          {
            validator: function(rule, value, callback) {
              if (
                /^\w{1,64}@[a-z0-9\-]{1,256}(\.[a-z]{2,6}){1,2}$/i.test(
                  value
                ) == false
              ) {
                callback(new Error("邮箱格式错误"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      },

    };
  },
  created() {
    // 生命周期函数
    this.getUserList();
    this.getRoleList();
  },
  methods: {

//  currentSel(selVal) {
//        this.name = selVal.label;
//        console.log("选择的name为：" + this.name);
//        console.log(selVal);
//      },



//  selectChange(val) {
//       var obj = {};
//       obj = this.options.find(function(item) {
//         return item.value === val;
//       });
//       console.log("label为", obj.label, "value为", val);
//     },


// checkSpecialKey(str) {
//         let specialKey = "[`~!#$^&*()=|{}':;'\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'";
//         for (let i = 0; i < str.length; i++) {
//           if (specialKey.indexOf(str.substr(i, 1)) != -1) {
//             return false;
//           }
//         }
//         return true;
//       },


    getUserList() {
      this.queryInfo.startTime=this.queryInfo.dateRangeArr[0];
      this.queryInfo.endTime=this.queryInfo.dateRangeArr[1];
      userList(this.queryInfo)
        .then((res) => {
          if (res.data.code === 200) {
            //用户列表
            this.userList = res.data.data.records;
            this.total = res.data.data.total;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUserList0() {
       this.queryInfo.startTime=this.queryInfo.dateRangeArr[0];
      this.queryInfo.endTime=this.queryInfo.dateRangeArr[1];
      userList0(this.queryInfo)
        .then((res) => {
          if (res.data.code === 200) {
            //用户列表
            this.userList = res.data.data.records;
            this.total = res.data.data.total;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getRoleList() {
      roleList(this.queryInfo)
        .then((res) => {
          if (res.data.code === 200) {
            //用户列表
            this.roleList = res.data.data.records;
            this.total = res.data.data.total;
         //   console.log(this.roleList)
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pageSize = newSize;
      // 重新发起请求用户列表
      this.getRoleList();
    },
    // 监听 当前页码值 改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pageNo = newPage;
      // 重新发起请求用户列表
      this.getRoleList();
    },

    // 监听 pageSize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pageSize = newSize;
      // 重新发起请求用户列表
      this.getUserList();
    },
    // 监听 当前页码值 改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pageNo = newPage;
      // 重新发起请求用户列表
      this.getUserList();
    },
    //添加用户
    addUser() {
      userAdd(this.userForm)
        .then((res) => {
          if (res.data.code === 200) {
            this.addDialogVisible = false;
            this.getUserList();
            this.$message({
              message: "添加用户成功",
              type: "success",
            });
          } else {
            this.$message.error("添加用户失败");
          }
        })
        .catch((err) => {
          this.$message.error("添加用户异常");
          console.log(err);
        });
    },

    // 监听 添加用户对话框的关闭事件
    addDialogClosed() {
      // 表单内容重置为空
      this.$refs.addFormRef.resetFields();
    },

    // 监听 修改用户状态
    showEditDialog(userinfo) {
      this.editDialogVisible = true;
      console.log(userinfo);
      this.editForm =JSON.parse(JSON.stringify(userinfo)) ;
    },
    showEditDialog1(userinfo) {
      this.setDialogVisible = true;
      console.log(userinfo);
      this.setForm = userinfo;
    },
    //修改用户
    editUser(formName) {
      
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.wuDialogVisible=false
                  userUpdate(this.editForm)
        .then((res) => {
          if (res.data.code === 200) {
            this.editDialogVisible = false;
            this.getUserList();
            this.$message({
              message: "修改用户成功",
              type: "success",
            });
          } else {
            this.$message.error("修改用户失败");
          }
        })
        .catch((err) => {
          this.$message.error("修改用户异常");
          console.loge(err);
        });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      

    },
    // 根据ID删除对应的用户信息
    async removeUserById(id) {
      // 弹框 询问用户是否删除
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult == "confirm") {
        //删除用户
        userDelete(id)
          .then((res) => {
            if (res.data.code === 200) {
              this.getUserList();
              this.$message({
                message: "删除用户成功",
                type: "success",
              });
            } else {
              this.$message.error("删除用户失败");
            }
          })
          .catch((err) => {
            this.$message.error("删除用户异常");
            console.log(err);
          });
      }
    },
    //批量选中事件处理
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
      //向被删除的ids赋值
      this.multipleSelection.forEach((item) => {
        this.ids.push(item.id);
        console.log(this.ids);
      });
    },

    handleSelectionChange(val) {
	if(val.length > 1) {
		this.$refs.multipleTable.clearSelection();               //清除
        this.$refs.multipleTable.toggleRowSelection(val.pop());  //pop：最后一个
	} else {
        this.multipleSelection = val;         //multipleSelection：当前选择的数组
	}
},


   

    //批量删除用户
    async batchDeleteUser(){
     // 弹框 询问用户是否删除
      const confirmResult = await this.$confirm(
        "此操作将永久删除用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消删除，则返回值为字符串 cancel
      if (confirmResult == "confirm") {
        //批量删除用户
        userBatchDelete(this.ids)
          .then((res) => {
            if (res.data.code === 200) {
              this.$message({
                message: "批量删除用户成功",
                type: "success",
              });
              this.getUserList();
            } else {
              this.$message.error("批量删除用户失败");
            }
          })
          .catch((err) => {
            this.$message.error("批量删除用户异常");
            console.log(err);
          });
      }
    }
  },
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1) !important;
  /* height: 60pt; */
}
</style>



//  <el-table-column type="selection" width="40"> </el-table-column>
//           <el-table-column type="index" label="序号"></el-table-column>
//           <el-table-column prop="userName" label="姓名" width="80"></el-table-column>
//           <el-table-column prop="LoginName" label="用户名"  width="100"></el-table-column>
//           <el-table-column prop="userSex" label="性别" width="55"></el-table-column>
//           <el-table-column prop="userNumber" label="联系电话"></el-table-column>
//           <el-table-column prop="userEmail" label="邮箱"></el-table-column>
//           <el-table-column prop="userCreateTime" label="新建时间"></el-table-column>
//           <el-table-column prop="userUpdateTime" label="最后修改时间"></el-table-column>
//           <el-table-column prop="userHidden" label="状态" width="55"></el-table-column>
//           <el-table-column label="操作" width="300">