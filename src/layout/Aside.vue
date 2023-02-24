<script>
import { defineComponent } from 'vue'
import { keyBy } from 'lodash-es'
import { collapse, toggleCollapse } from './control'
import { getTreeMenuList } from '@/api/menu'

// const list = ref([])

// async function getTreeList() {
//   const res = await getTreeMenuList({
//     userId: sessionStorage.userId,
//     isShowMenu: '',
//     roleId: '',
//   })
//   console.log(res)
// }
export default defineComponent({
  data: () => ({
    list: [],
  }),
  computed: {

    collapse: () => collapse.value,
    menuMap() {
      const map = {}
      const assign = arr => Object.assign(map, keyBy(arr, 'menuId'))
      assign(this.list)
      this.list.forEach(item => assign(item.childrenMenu, 'menuId'))
      return map
    },
  },
  mounted() {
    this.getTreeList()
  },
  methods: {
    toggleCollapse,
    async getTreeList() {
      const res = await getTreeMenuList({
        userId: sessionStorage.userId,
      })
      this.list = res.body.resultList
    },
    change(id) {
      const item = this.menuMap[id]
      sessionStorage.setItem('headTitString', item.fieldDes)
      this.$router.push(/^\//.test(item.menuUrl) ? item.menuUrl : `/${item.menuUrl}`)
    },
  },
})
</script>

<template>
  <!--  <ElAside width="auto"> -->
  <!--    <ElMenu class="h-full flex flex-col" default-active="1-1" router unique-opened :collapse="collapse"> -->
  <!--      <ElSubmenu index="1"> -->
  <!--        <template slot="title"> -->
  <!--          <i class="el-icon-location" /> -->
  <!--          <span>管理</span> -->
  <!--        </template> -->
  <!--        <ElMenuItem index="1-1" route="/"> -->
  <!--          HOME -->
  <!--        </ElMenuItem> -->
  <!--        <ElMenuItem index="1-2" route="/manage/integrated-manage"> -->
  <!--          综合管理 -->
  <!--        </ElMenuItem> -->
  <!--        <ElMenuItem index="1-3" route="/manage/user-manage"> -->
  <!--          角色管理 -->
  <!--        </ElMenuItem> -->
  <!--      </ElSubmenu> -->
  <!--      &lt;!&ndash;      <ElMenuItem index="2"> &ndash;&gt; -->
  <!--      &lt;!&ndash;        <i class="el-icon-menu" /> &ndash;&gt; -->
  <!--      &lt;!&ndash;        <span slot="title">导航二</span> &ndash;&gt; -->
  <!--      &lt;!&ndash;      </ElMenuItem> &ndash;&gt; -->
  <!--      &lt;!&ndash;      <ElMenuItem index="3"> &ndash;&gt; -->
  <!--      &lt;!&ndash;        <i class="el-icon-document" /> &ndash;&gt; -->
  <!--      &lt;!&ndash;        <span slot="title">导航三</span> &ndash;&gt; -->
  <!--      &lt;!&ndash;      </ElMenuItem> &ndash;&gt; -->
  <!--      &lt;!&ndash;      <ElMenuItem index="4"> &ndash;&gt; -->
  <!--      &lt;!&ndash;        <i class="el-icon-setting" /> &ndash;&gt; -->
  <!--      &lt;!&ndash;        <span slot="title">导航四</span> &ndash;&gt; -->
  <!--      &lt;!&ndash;      </ElMenuItem> &ndash;&gt; -->
  <!--      <div class="absolute bottom-2 w-full text-center"> -->
  <!--        <i -->
  <!--          class="text-2xl text-gray-500 cursor-pointer" -->
  <!--          :class="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" -->
  <!--          @click="toggleCollapse()" -->
  <!--        /> -->
  <!--      </div> -->
  <!--    </ElMenu> -->
  <!--  </ElAside> -->
  <ElAside class="relative flex flex-col border-r" width="auto">
    <ElMenu class="flex-1 flex flex-col overflow-auto border-none" :collapse="collapse" unique-opened @select="change">
      <template v-for="item in list">
        <ElSubmenu v-if="item.childrenMenu" :key="item.menuId" :index="item.menuId">
          <template #title>
            <i :class="item.menuImg" />
            <span>{{ item.menuName }}</span>
          </template>
          <template v-if="item.childrenMenu">
            <ElMenuItem v-for="sub of item.childrenMenu" :key="sub.menuId" :index="sub.menuId">
              {{ sub.menuName }}
            </ElMenuItem>
          </template>
        </ElSubmenu>
        <ElMenuItem v-else :key="item.menuId" :index="item.menuId">
          <template #title>
            <i :class="item.menuImg" />
            <span>{{ item.menuName }}</span>
          </template>
        </ElMenuItem>
      </template>
    </ElMenu>

    <div class="w-full text-center py-2" style="backgroundColor:#F3F4F6">
      <ElTooltip effect="dark" :content="collapse ? '点击展开' : '点击折叠'" placement="top">
        <i
          class="text-2xl text-gray-500 cursor-pointer"
          :class="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          @click="toggleCollapse()"
        />
      </ElTooltip>
    </div>
  </ElAside>
</template>

<style lang="scss" scoped>
.el-menu {
  &:not(.el-menu--collapse) {
    width: 240px;
  }
}
</style>
