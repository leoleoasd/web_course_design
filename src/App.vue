<script setup lang="tsx">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'

import {
  darkTheme, useOsTheme, NIcon,
  zhCN, dateZhCN, MenuOption,
} from 'naive-ui';
import { ref, computed, h } from 'vue';
import { RouterLink } from 'vue-router';
import router from './router';
import { useUserStore } from './stores/user';

const osTheme = ref(useOsTheme());
const theme = (osTheme.value === 'dark' ? darkTheme : null);
const user = useUserStore();

function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = computed(() => {
  if (user.token) {
    return [
      {
        // search
        icon: renderIcon(<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><g><g><g><g><path d="M337.509,305.372h-17.501l-6.571-5.486c20.791-25.232,33.922-57.054,33.922-93.257 C347.358,127.632,283.896,64,205.135,64C127.452,64,64,127.632,64,206.629s63.452,142.628,142.225,142.628 c35.011,0,67.831-13.167,92.991-34.008l6.561,5.487v17.551L415.18,448L448,415.086L337.509,305.372z M206.225,305.372	c-54.702,0-98.463-43.887-98.463-98.743c0-54.858,43.761-98.742,98.463-98.742c54.7,0,98.462,43.884,98.462,98.742 C304.687,261.485,260.925,305.372,206.225,305.372z"></path></g></g></g></g></svg>),
        label: () => h(RouterLink, { to: '/search' }, '搜索'),
      },
  {
    label: () => 
      h(
        RouterLink,
        {
          to: {
            name: 'cart',
            params: {
              lang: 'zh-CN'
            }
          }
        },
        { default: () => '购物车 (' + user.cart.length + ")" }
      ),
      icon: renderIcon(<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M456.8 120.78a23.92 23.92 0 0 0-18.56-8.78H133.89l-6.13-34.78A16 16 0 0 0 112 64H48a16 16 0 0 0 0 32h50.58l45.66 258.78A16 16 0 0 0 160 368h256a16 16 0 0 0 0-32H173.42l-5.64-32h241.66A24.07 24.07 0 0 0 433 284.71l28.8-144a24 24 0 0 0-5-19.93z" fill="currentColor"></path></svg>
),
  },
  {
    // orders
    label: () => 
      h(
        RouterLink,
        {
          to: '/order'
        },
        { default: () => '订单' },
      ),
      icon: renderIcon(<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><g fill="none"><path d="M5 7.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zM10.5 8a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1zm0 3a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1zM5.085 2A1.5 1.5 0 0 1 6.5 1h3a1.5 1.5 0 0 1 1.415 1h.585A1.5 1.5 0 0 1 13 3.5v10a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 13.5v-10A1.5 1.5 0 0 1 4.5 2h.585zM6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM5.085 3H4.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5h-.585A1.5 1.5 0 0 1 9.5 4h-3a1.5 1.5 0 0 1-1.415-1z" fill="currentColor"></path></g></svg>),
  },
  {
    label: "退出",
    icon: NIcon.Logout,
    key: "logout"
  }
  ]
  } else {
    return [
  {
    label: () => 
      h(
        RouterLink,
        {
          to: {
            name: 'login',
            params: {
              lang: 'zh-CN'
            }
          }
        },
        { default: () => '登录' }
      ),
    icon: NIcon.Login,
  },
  {
    label: () => 
      h(
        RouterLink,
        {
          to: {
            name: 'register',
            params: {
              lang: 'zh-CN'
            }
          }
        },
        { default: () => '注册' }
      ),
    icon: NIcon.Register,
  },
];
  }
});
const onUpdate = (to: string) => {
  if (to === 'logout') {
    user.token = '';
    user.cart = [];
    router.push("/auth/login");
  }
};
</script>

<template>
    <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
    <n-notification-provider>
      <n-dialog-provider>
            <n-global-style/>
            <div class="row">
              <header>
                <div class="header">
                  <n-el tag="div" class="logo">
                    网上书店
                  </n-el>
                  <!-- <n-menu :options="leftMenuOptions" v-model:value="menuKey" mode="horizontal" @update:value="updateMenu" /> -->
                  <div class="space">

                  </div>
                  <n-menu :options="menuOptions" mode="horizontal" @update:value="onUpdate" />
                </div>
              </header>
            </div>
            <div class="row" id="body" style="height:calc(100vh - 61px);">
              <router-view></router-view>
            </div>
      </n-dialog-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<style lang="scss">
.header {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;

  .logo {
    width: 140px;
    flex-grow: 0;
    flex-shrink: 0;
    height: 100%;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0px 20px;

    img {
      margin-left: 20px;
    }
  }
  .item {
    margin: 0px 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title {
    margin-left: 25px;
    font-size: 25px;
  }

  .space {
    flex: 1;
  }

  :deep(.n-menu) {
    flex: auto 0 0;

    .n-menu-item {
      height: 60px
    }
  }
}


header {
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px #e7e7e7 solid;
}

body {
  --drawer-width: 400px;
  height: 100%;
}

.n-config-provider {
  height: 100%;
}

$small: 480px;

::-webkit-scrollbar {
  background-color: transparent;
  width: 8px;
  cursor: auto;
}

::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 10px;
  min-height: 10%;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #999;
}

#app {
  height: 100%;
  width: 100%;
}

.n-config-provider {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  align-items: stretch;
}

#body {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: overlay;
  width: 100%;

  .n-drawer-mask {
    display: none;
  }
}

body {
  overflow-y: overlay;
  min-height: 100%;
  display: flex;
  align-items: stretch;
}

html {
  height: 100%;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
