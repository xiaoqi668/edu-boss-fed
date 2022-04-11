<template>
  <div class="role-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :model="form">
          <el-form-item label="角色名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" v-loading="isLoading">查询</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 显示对话框 -->
      <el-button @click="handleAdd">添加角色</el-button>
      <el-table :data="roles" style="width: 100%" v-loading="isLoading">
        <el-table-column prop="id" label="编号" />
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="createdTime" label="添加时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150px">
          <template slot-scope="scope">
            <div>
              <el-button
                type="text"
                @click="$router.push({
                  name: 'alloc-menu',
                  params: {
                    roleId: scope.row.id
                  }
                })"
              >分配菜单</el-button>
              <el-button type="text">分配资源</el-button>
            </div>
            <div>
              <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加角色的对话框结构 -->
      <el-dialog :title="isEdit ? '编辑角色' : '添加角色'" :visible.sync="dialogVisible" width="30%">
        <!-- 将添加与编辑功能单独封装到组件中 -->
        <create-or-edit
          :is-edit="isEdit"
          :role-id="roleId"
          @success="handleSuccess"
          @cancel="handleCancel"
        ></create-or-edit>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import CreateOrEdit from './CreateOrEdit'
// 引入请求方法
import { getRoles, deleteRole } from '@/services/role'

export default {
  name: 'RoleList',
  components: {
    CreateOrEdit
  },
  data () {
    return {
      form: {
        name: ''
      },
      isLoading: false,
      roles: [],
      // 控制对话框显示
      dialogVisible: false,
      // 控制对话框的功能状态
      isEdit: false,
      // 存储正在编辑的角色 ID
      roleId: ''
    }
  },
  created () {
    this.loadRoles()
  },
  methods: {
    // 点击添加按钮触发
    handleAdd () {
      this.dialogVisible = true
      this.isEdit = false
    },
    // 监听子组件取消状态
    handleCancel () {
      this.dialogVisible = false
    },
    // 监听子组件的添加状态，成功时触发
    handleSuccess () {
      // 隐藏对话框
      this.dialogVisible = false
      // 刷新列表
      this.loadRoles()
    },
    onReset () {
      this.form.name = ''
    },
    onSubmit () {
      this.loadRoles()
    },
    handleEdit (role) {
      this.dialogVisible = true
      this.isEdit = true
      this.roleId = role.id
    },
    // 删除角色
    handleDelete (role) {
      this.$confirm(`确认删除角色：${role.name}？`, '删除提示')
        .then(async () => {
          await deleteRole(role.id)
          this.$message.success('删除成功')
          this.loadRoles()
        })
        .catch(err => {
          if (err && err.response) {
            this.$message.error('删除失败，请重试')
          } else {
            this.$message.info('取消删除')
          }
        })
    },
    // 请求角色列表数据
    async loadRoles () {
      this.isLoading = true
      const { data } = await getRoles(this.form)
      this.roles = data.data.records
      this.isLoading = false
    }
  },
  filters: {
    // 日期过滤器
    dateFormat (date) {
      date = new Date(date)
      return `
        ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 
        ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
      `
    }
  }
}
</script>

<style lang="scss" scoped></style>
