/*
 * @Author: jiea
 * @Date: 2022-05-05 20:26:18
 * @LastEditors: jiea
 * @LastEditTime: 2022-05-05 20:27:28
 * @Description: desc
 */
<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="profile.token">
           <li><a href="javascript:;"><i class="iconfont icon-user"></i>{{profile.account}}</a></li>
        <li><a href="javascript:;">退出登录</a></li>
        </template>
      <template v-else>
          <li>
            <RouterLink to="/login"/>
          </li>
        <li><a href="javascript:;">免费注册</a></li>
      </template>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li><a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a></li>
      </ul>
    </div>
  </nav>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const profile = computed(() => {
  return store.state.user.profile
})
</script>
<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
