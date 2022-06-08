<template>
    <n-card title="登录">
        <div class="container">
            <n-input v-model:value="username" round placeholder="用户名" />
            <n-input v-model:value="password" type="password" round placeholder="密码" />
            <n-button round @click="login">
                登录
            </n-button>
        </div>
        <template #action>
            没有账户？
            <router-link to="/auth/register">
                点击注册
            </router-link>
        </template>
    </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {useUserStore} from "../stores/user";
import axios from "axios";
import { useMessage, useDialog } from 'naive-ui';
import router from '../router';

const dialog = useDialog();

const username = ref('');
const password = ref('');
const user = useUserStore();
const login = () => {
    console.log(username.value, password.value);
    axios.get("http://localhost:8080/CourseDesign-war/User", {
        params: {
            page: "login",
            username: username.value,
            password: password.value
        }
    }).then(resp => {
        console.log(resp);
        if (resp.data.error) {
            dialog.error({
                title: '错误',
                content: resp.data.error
            })
        } else {
            user.token = resp.data.token;
            router.push("/search");
        }
    });
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    row-gap: 14px;
}
</style>