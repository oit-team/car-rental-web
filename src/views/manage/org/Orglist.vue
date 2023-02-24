<script>
import { defineComponent } from 'vue'
import { delOrgInfo, getTreeOrgList } from '@/api/manage'

export default defineComponent({
  components: {
  },
  data() {
    return {
      data: [],
    }
  },
  computed: {
    tablePageOption() {
      return {
        promise: this.loadData,
        actions: [
          {
            slot: 'addConfig',
          },
        ],
        table: {
          data: this.data?.result,
          actions: {
            width: 150,
            buttons: [
              {
                tip: '编辑',
                type: 'success',
                icon: 'el-icon-edit',
                click: ({ row }) => this.$router.push({
                  name: 'OrgUpdata',
                  params: {
                    item: row,
                    type: 'edit',
                  },
                }),
              }, {
                tip: '删除',
                type: 'danger',
                icon: 'el-icon-delete',
                click: ({ row }) => {
                  this.$confirm('此操作将永久删除该区域, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                  }).then(async () => {
                    await delOrgInfo({ orgId: row.orgId })
                    await this.$refs.table.loadData()
                    this.$message.success('操作成功')
                  })
                },
              }],
          },
        },
        pager: {
          total: this.data?.count,
        },
      }
    },
  },
  methods: {
    async loadData(params) {
      const res = await getTreeOrgList({ ...params })
      this.data = res.body
    },
    toAdd() {
      this.$router.push({
        name: 'OrgUpdata',
        params: {
          type: 'add',
        },
      })
    },
  },
})
</script>

<template>
  <div class="w-full h-full p-3 bg-white">
    <div class="h-full">
      <TablePage v-bind="tablePageOption" ref="table" auto field-key="1677210107896">
        <template slot="actions:addConfig">
          <ElButton size="small" type="primary" icon="el-icon-plus" @click="toAdd">
            新增
          </ElButton>
        </template>
      </TablePage>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
