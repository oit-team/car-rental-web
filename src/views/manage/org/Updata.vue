<script>
import { defineComponent } from 'vue'
import { addOrgInfo, updateOrgById } from '@/api/manage'
export default defineComponent({
  components: {},
  data() {
    return {
      content: '',
      formData: {
        orgName: '',
        parentId: 0,
        path: '0',
        address: '',
      },
      rules: {
        orgName: [
          { required: true, message: '区域名称不能为空', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '区域地址不能为空', trigger: 'blur' },
        ],
      },
      orgId: 0,
    }
  },
  computed: {},
  watch: {},
  created() {
    this.type = this.$route.params?.type || ''
    const item = this.$route.params.item || {}
    if (this.$route.params.item) {
      this.formData.orgName = item.orgName
      this.formData.address = item.address
      this.orgId = item.orgId
    }
    this.content = this.type === 'add' ? '新增区域' : '编辑区域'
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.type === 'add') {
            await this.$confirm('确定新增吗', '提示')
            await addOrgInfo({
              ...this.formData,
            })
            this.$router.go(-1)
          }
          else {
            await this.$confirm('确定修改吗', '提示', { type: 'warning' })
            await updateOrgById({
              orgId: this.orgId,
              ...this.formData,
            })
            this.$router.go(-1)
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
})
</script>

<template>
  <div class="w-full h-full bg-white p-3">
    <ElPageHeader :content="content" @back="$router.back()" />
    <ElForm ref="form" :model="formData" label-width="100px" :rules="rules" class="w-1/2 my-4">
      <ElFormItem prop="orgName" label="区域名称">
        <ElInput v-model="formData.orgName" />
      </ElFormItem>
      <ElFormItem prop="address" label="区域地址">
        <ElInput v-model="formData.address" />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="submitForm('form')">
          确定
        </ElButton>
        <ElButton @click="resetForm('form')">
          重置
        </ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>

</style>
