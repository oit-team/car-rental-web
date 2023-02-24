<script>
import { defineComponent } from 'vue'
import { addDeptInfo, delDeptInfo, getDeptList, updateDeptInfo } from '@/api/manage'

export default defineComponent({
  data: () => ({
    filterText: '',
    orgList: [],
    curCheckedKey: '', // 当前选中节点key
    now_nodeInfo: {}, // 当前选中node节点详情
    orgListLoading: false, // 左侧树形结构数据获取情况
    divisionDrawer: false, // 是否显示新增部门抽屉
    showPanel: false, // 是否显示过滤input
    handleClickFlag: false, // 左侧树形  右键弹框
    editOrAdd: 'a',
    divisionForm: {
      deptName: '',
      describe: '',
      parentId: 0,
    },
    divisionRules: {
      deptName: [
        { required: true, message: '部门名称不能为空', trigger: 'blur' },
      ],
      describe: [
        { required: true, message: '部门描述不能为空', trigger: 'blur' },
      ],
    },
  }),
  computed: {},
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
  },
  created() {
    this.getDeptList()
  },
  methods: {
    addDivision() {
      this.editOrAdd = 'a'
      this.divisionDrawer = true
    },
    // 获取树形结构数据
    async getDeptList() {
      const res = await getDeptList()
      this.orgList = res.body.result
    },
    // 树节点搜索过滤
    filterNode(value, data) {
      if (!value) return true
      return data.deptName.includes(value)
    },
    allowDrag(draggingNode) {
      return !draggingNode.data.label.includes('三级 3-2-2')
    },
    nodeRightClick(MouseEvent, object, Node, VueComponent) {
      // console.log('节点右击------', MouseEvent, object, Node, VueComponent)
      this.handleClickFlag = true
      this.now_nodeInfo = Node.data
    },
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.editOrAdd === 'a') {
            await this.$confirm('确定新增吗', '提示')
            await addDeptInfo({ ...this.divisionForm })
            this.$message.success('新增成功')
          }
          else {
            await this.$confirm('确定修改吗', '提示')
            await updateDeptInfo({ ...this.divisionForm })
            this.$message.success('修改成功')
          }
          this.divisionDrawer = false
          this.getDeptList()
        }
      })
    },
    async clickDel() {
      this.handleClickFlag = false
      await this.$confirm('确定删除吗', '提示', { type: 'warning' })
      await delDeptInfo({ deptId: this.now_nodeInfo.deptId })
      this.$message.success('删除成功')
      this.getDeptList()
    },
    clickEdit() {
      this.handleClickFlag = false
      this.editOrAdd = 'e'
      this.divisionForm = this.now_nodeInfo
      this.divisionDrawer = true
    },
  },
})
</script>

<template>
  <div class="bg-white w-full h-full p-3">
    <div class="flex h-full">
      <!--      左侧树形结构 -->
      <div class="h-full text-sm">
        <!--      顶部按钮 -->
        <div class="w-[12vw] flex flex-col">
          <div class="w-full flex p-2 box-border">
            <ElTooltip content="新增区域部门" placement="top">
              <ElButton type="danger" icon="el-icon-plus" small circle @click="addDivision" />
            </ElTooltip>
            <ElTooltip content="搜索" placement="top">
              <ElButton type="primary" icon="el-icon-search" small circle @click="showPanel = !showPanel" />
            </ElTooltip>
          </div>
          <div v-show="showPanel" class="p-2 box-border">
            <ElInput
              v-model.trim="filterText"
              placeholder="关键字过滤"
              clearable
            />
          </div>
          <div ref="orgTree" class="orgTreeBox">
            <ElTree
              v-if="orgList && orgList.length > 0"
              ref="tree"
              :data="orgList"
              icon-class="el-icon-s-shop"
              highlight-current
              :props="{ children: 'childrenList', label: 'deptName' }"
              node-key="deptId"
              :current-node-key="curCheckedKey"
              :allow-drag="allowDrag"
              :filter-node-method="filterNode"
              @node-contextmenu="nodeRightClick"
            >
              <div slot-scope="{ data }" class="custom-tree-node">
                <span>{{ data.deptName }}</span>
                <span v-if="data.isShop === '2'" style="margin-left:30px;" @click.stop="getTreeOrgList()"><i style="font-size:16px;" class="el-icon-refresh" /></span>
              </div>
            </ElTree>
            <div v-else class="flex justify-center items-center">
              <div v-if="!orgListLoading" style="line-height:200px;">
                加载中...
              </div>
              <div v-if="orgListLoading" style="line-height:100px;">
                暂无数据
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="width:1px;background-color:#ddd;margin-left:6px;" />
      <!--      右侧表格 -->
      <div class="flex-1" />
    </div>

    <ElDrawer
      title="部门信息"
      :visible.sync="divisionDrawer"
      direction="rtl"
    >
      <div class="h-full flex flex-col p-4 justify-between box-border">
        <ElForm ref="divisionForm" :model="divisionForm" :rules="divisionRules" label-width="80px">
          <ElFormItem prop="deptName" label="部门名称">
            <ElInput v-model="divisionForm.deptName" />
          </ElFormItem>
          <ElFormItem prop="describe" label="描述">
            <ElInput v-model="divisionForm.describe" />
          </ElFormItem>
        </ElForm>
        <div class="w-full flex justify-around">
          <ElButton type="primary" @click="onSubmit('divisionForm')">
            确定
          </ElButton>
          <ElButton>取消</ElButton>
        </div>
      </div>
    </ElDrawer>

    <ElDialog
      title="操作"
      :visible.sync="handleClickFlag"
      center
      width="270px"
    >
      <div class="flex justify-around items-center">
        <ElButton size="small" @click="clickEdit">
          编 辑
        </ElButton>
        <ElButton size="small" @click="clickDel">
          删 除
        </ElButton>
      </div>
    </ElDialog>
  </div>
</template>

<style lang="scss" scoped>
:deep{
  .el-tooltip{
    padding: 7px !important;
  }
  .el-tree-node{
    padding: 0 5px;
  }
  #brandInteManage .leftTreeCon .orgTreeBox >>> .el-tree {
    min-width: 100%;
    padding-right: 6px;
    display: inline-block;
    margin-bottom: 6px;
  }
  .el-tree .el-tree-node__content {
    height: 38px;
  }
  .el-tree-node:focus > .el-tree-node__content {
    color: #1978FE;
  }
  .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: #C5DDFF;
    color: #1978FE;
  }
  .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content:hover {
    background-color: #F5F7FA;
  }
}
</style>
