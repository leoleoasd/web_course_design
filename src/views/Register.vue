<template>
    <n-card title="注册">
        <div class="container">
            <n-input v-model:value="username" round placeholder="用户名" />
            <n-input v-model:value="password" type="password" round placeholder="密码" />
            <n-input v-model:value="passwordConfirm" type="password" round placeholder="确认密码" />
            <n-button round @click="login">
                注册
            </n-button>
        </div>
        <template #action>
            已有账户？
            <router-link to="/auth/login">
                点击登录
            </router-link>
        </template>
    </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {useUserStore} from "../stores/user";
import axios from "axios";
import { useDialog } from 'naive-ui';
import router from '../router';

const dialog = useDialog();
const username = ref('');
const password = ref('');
const passwordConfirm = ref('');
const user = useUserStore();
const login = () => {
    if (password.value != passwordConfirm.value) {
        dialog.error({
            title: '错误',
            content: '两次密码不一致'
        })
        return;
    }
    axios.get("http://localhost:8080/CourseDesign-war/User", {
        params: {
            page: "register",
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