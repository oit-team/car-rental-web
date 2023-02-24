<script>
import crypto from '../utils/crypto'
import { getCodeImg, userLogin } from '../api/login'

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      ruleForm: {
        userName: '',
        passWord: '',
        checkCode: '',
      },
      rules: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        passWord: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ],
        checkCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
        ],
      },
      labelPosition: 'left',
      imgUrl: '',
      brandList: [], // 超级管理员登录时返回的品牌列表

    }
  },
  created() {
    this.getImg()
  },
  methods: {
    async getImg() {
      const res = await getCodeImg({}, {
        responseType: 'arraybuffer',
      })
      const img = new Blob([res], { type: 'image/png' })
      this.imgUrl = window.URL.createObjectURL(img)
    },
    login(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const encryPwd = crypto.encrypt(this.ruleForm.passWord)
          const res = await userLogin({
            userName: this.ruleForm.userName,
            passWord: encryPwd,
            checkCode: this.ruleForm.checkCode,
          })
          this.$message.success('登录成功')
          sessionStorage.userId = res.body.userId
          sessionStorage.userName = res.body.userName
          sessionStorage.accessToken = res.body.accessToken
          this.$router.push('/')
        }
      })
    },
  },

}
</script>

<template>
  <div class="w-full h-full">
    <div class="w-full h-full flex items-center justify-center bg-lime-600">
      <!--      <div class="w-1/2 h-3/5 shadow shadow-gray-500/50 flex items-center overflow-hidden"> -->
      <div class="w-1/2 h-3/5 flex items-center overflow-hidden">
        <div class="w-full" />
        <div class="w-1/2 h-full flex flex-col items-center justify-center">
          <div class="">
            <!--            <div class="right_title"> -->
            <!--              高单易管家 -->
            <!--            </div> -->
            <ElForm ref="ruleForm" :model="ruleForm" :rules="rules">
              <ElFormItem prop="userName">
                <ElInput v-model.trim="ruleForm.userName" clearable placeholder="请输入用户名" />
              </ElFormItem>
              <ElFormItem prop="passWord">
                <ElInput v-model.trim="ruleForm.passWord" type="password" clearable placeholder="请输入密码" />
              </ElFormItem>
              <ElFormItem prop="checkCode" class="flex items-center">
                <div class="flex items-center">
                  <ElImage :src="imgUrl" alt="" class="mr-2" />
                  <ElInput
                    v-model.trim="ruleForm.checkCode"
                    placeholder="请输入验证码"
                    @keyup.enter.native="login('ruleForm')"
                  />
                </div>
              </ElFormItem>
            </ElForm>

            <!--            <div class="w-full h-[40px] flex items-center mb-8"> -->
            <!--            </div> -->
            <ElButton type="primary" class="w-full" @click="login('ruleForm')">
              登 录
            </ElButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep{
  .el-input-group__prepend{
    padding: 0 !important;
  }
}
</style>
