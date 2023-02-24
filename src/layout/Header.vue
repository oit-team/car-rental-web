<script>
export default {
  data: () => ({
  }),
  computed: {
    userName() {
      return sessionStorage.userName
    },
  },
  methods: {
    clickDropdown() {
      this.$router.push('/login')
    },
  },
}
</script>

<template>
  <ElHeader class="flex items-center justify-between border-b z-10">
    <div>
      <div class="flex items-center justify-center py-2">
        <ElAvatar class="mr-2" src="https://picsum.photos/40" />
        <div class="font-bold select-none">
          系统管理模板
        </div>
      </div>
    </div>
    <!--    <div>用户</div> -->
    <ElDropdown @command="clickDropdown">
      <span class="el-dropdown-link">
        {{ userName || '用户' }}
      </span>
      <ElDropdownMenu slot="dropdown">
        <ElDropdownItem>
          退出登录
        </ElDropdownItem>
      </ElDropdownMenu>
    </ElDropdown>
  </ElHeader>
</template>
