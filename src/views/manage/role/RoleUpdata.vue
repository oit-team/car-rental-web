<script>
import { getTreeMenuList } from '@/api/menu'
import { insertRole, updateRoleById } from '@/api/manage'
export default {
  name: 'AddRole',
  data() {
    return {
      updateRoleLoading: false,
      menuIds: '',
      content: '',
      editFlag: true, // 判断是否出现重置
      menuList: [], // 树形菜单列表
      title: '',
      ruleForm: {},
      roleId: null,
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个汉字', trigger: 'blur' },
        ],
        roleRemark: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 2, max: 32, message: '长度在 2 到 32 个汉字', trigger: 'blur' },
        ],
      },
      // 菜单
      roleIds: [],
      defaultExpandedKeys: [],
      defaultCheckedKeys: [],
      defaultProps: {
        children: 'childrenMenu',
        label: 'menuName',
      },
    }
  },
  created() {
    this.type = this.$route.params?.type || ''
    if (this.$route.params && this.$route.params.item) {
      const item = JSON.parse(JSON.stringify(this.$route.params?.item))
      this.ruleForm.roleName = item?.roleName
      this.ruleForm.roleRemark = item?.roleRemark
      this.roleId = item?.roleId
    }
    this.content = this.type === 'add' ? '新增角色' : '编辑角色'
    this.getHomeMenuList()
  },

  methods: {
    goBack() {
      this.$router.go(-1)
      this.resetForm('ruleForm')
      this.$refs.tree.setCheckedKeys([])
    },
    // 获取菜单树
    async getHomeMenuList() {
      const con = {
        roleId: this.roleId || '0',
        userId: '0',
        isShowMenu: '0',
      }
      const res = await getTreeMenuList(con)
      this.menuList = res.body.resultList
      // 初始默认勾选项
      this.defaultCheckedKeys = res.body.menuIdList || []
    },
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateRoleLoading = true
          const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys() // 半选中的节点所组成的数组
          const checkedKeys = this.$refs.tree.getCheckedKeys() // 选中的节点所组成的数组
          halfCheckedKeys.forEach((item, i) => checkedKeys.push(halfCheckedKeys[i]))

          this.menuIds = checkedKeys
          if (this.type === 'add') {
            const con = {
              roleName: this.ruleForm.roleName,
              roleCode: this.ruleForm.roleCode,
              roleRemark: this.ruleForm.roleRemark,
              userId: sessionStorage.userId,
              roleId: this.ruleForm.roleId,
              menuIds: this.menuIds.toString(),
            }

            updateRoleById(con).then((res) => {
              if (res.head.status === 0) {
                this.$message({
                  message: '角色修改成功！',
                  type: 'success',
                })
                this.$router.go(-1)
              }
            }).catch((err) => {
              this.$message({
                message: err.message,
                type: 'warning',
              })
            }).finally(() => {
              this.updateRoleLoading = false
            })
          }
          else {
            const con = {
              roleName: this.ruleForm.roleName,
              roleCode: this.ruleForm.roleCode,
              roleRemark: this.ruleForm.roleRemark,
              roleId: this.roleId,
              menuIds: this.menuIds.toString(),
            }
            updateRoleById(con).then((res) => {
              if (res.head.status === 0) {
                this.$message({
                  message: '角色修改成功！',
                  type: 'success',
                })
                this.$router.go(-1)
              }
            }).catch((err) => {
              this.$message({
                message: err.message,
                type: 'warning',
              })
            }).finally(() => {
              this.updateRoleLoading = false
            })
          }
        }
        else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<template>
  <div id="addRole" class="pageCommonStyle page-container text-sm bg-white p-3">
    <ElPageHeader :content="content" @back="goBack" />
    <ElDivider />
    <ElForm ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
      <ElFormItem label="角色名称" prop="roleName">
        <ElInput v-model="ruleForm.roleName" style="width:60%;" maxlength="10" placeholder="请选择角色名称" />
      </ElFormItem>
      <ElFormItem label="角色描述" prop="roleRemark">
        <ElInput v-model="ruleForm.roleRemark" style="width:60%;" maxlength="32" placeholder="请输入角色描述" />
      </ElFormItem>
      <ElFormItem label="菜单权限">
        <ElTree
          ref="tree"
          :data="menuList"
          node-key="menuId"
          default-expand-all
          :expand-on-click-node="false"
          :default-checked-keys="defaultCheckedKeys"
          :props="defaultProps"
          :show-checkbox="true"
        />
      </ElFormItem>
      <ElFormItem>
        <ElButton size="small" icon="el-icon-check" type="primary" :loading="updateRoleLoading" @click="submitForm('ruleForm')">
          保存
        </ElButton>
        <ElButton v-if="editFlag" size="small" icon="el-icon-refresh" @click="resetForm('ruleForm')">
          重置
        </ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
#addRole{
  min-height: 82vh;
}
</style>
