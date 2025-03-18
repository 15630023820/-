<template>
  <el-container>
    <el-aside>
      <el-menu
        router
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="getDefaultActive"
      >
        <GMenuItem :key="index" v-for="(it,index) in getMenu" :item="it" />
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <GBreadCrumb />
        <GDropDown info="Green" :items="dropList" @command="doCommand" />
      </el-header>
      <el-main>
        <div class="tag-box">
          <el-tag
            v-for="tag in tags"
            :key="tag.title"
            @click="$router.push(tag.route)"
            @close="doCloseTag(tag)"
            closable
          >{{tag.title}}</el-tag>
        </div>

        <!--  mode="out-in" 先出后进 -->
        <transition name="fade" mode="out-in">
          <!-- 缓存所有变化的插槽 -->
          <keep-alive :include="getTagsName" :exclude="excludeTags" :max="30">
            <router-view />
          </keep-alive>
        </transition>
      </el-main>
      <el-footer>版权所有 金渡教育 2023</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "Layout",
  methods: {
    // 关闭标签
    doCloseTag(tag) {
      this.removeTag(tag);// 从include删除
      // 利用exclude实现立刻销毁组件
      this.excludeTags.push(tag.route.name);
      this.$nextTick(() => {
        this.excludeTags = [];
      });
    },
    ...mapMutations({
      setMenu: "user/setMenu",
      setAccount: "user/setAccount",
      removeTag: "user/removeTag"
    }),
    doCommand(c) {
      console.log("command:", c);
      switch (c) {
        // case 'logout':
        //   // 方案1: 重新加载浏览器(用户体验略差，浏览器需要刷一下)
        //   window.sessionStorage.removeItem('token');
        //   window.location.reload();
        //   break;
        case "logout":
          // 方案1: 重新加载浏览器(用户体验略差，浏览器需要刷一下)
          window.sessionStorage.removeItem("token");
          this.setMenu([]);
          this.setAccount({
            account: "",
            password: "" // 赋值空对象，未来再动态添加对象可能会丢失vuex响应式，解决 => $set
          });
          this.$router.replace({ name: "login" });
          break;
      }
    }
  },
  data() {
    return {
      excludeTags: [],
      dropList: [
        { title: "退出", attrs: { command: "logout" } }, // v-bind="item.attrs"
        { title: "升级VIP", attrs: { disabled: true, divided: true } }
      ]
    };
  },
  computed: {
    getTagsName() {
      return this.tags.map(tag => {
        return tag.route.name;
      });
    },
    ...mapState({
      getMenu(state) {
        return state.user.menu;
      },
      getDefaultActive(state) {
        return state.user.activeUrl;
      }
    }),
    ...mapGetters({
      tags: "user/getCacheTags"
    })
  }
};
</script>

<style scoped lang="scss">
.el-header,
.el-footer {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  > .el-menu {
    height: 100vh;
    border-right: none;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}
.el-container {
  height: 100vh;
  .el-header {
    display: flex;
    justify-content: space-between;
    .el-breadcrumb {
      line-height: 60px;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.tag-box {
  text-align: left;
  margin-bottom: 8px;
}
.tag-box .el-tag {
  cursor: pointer;
  margin-right: 4px;
}
</style>