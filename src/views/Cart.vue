<template>
    <n-card title="购物车">
        <n-list>
            <n-list-item v-for="r in user.cart" :key="r.name">
                <n-thing>
                     {{r.author}}， ISBN：{{r.isbn}}，出版社： {{r.publisher}}
                    
                    <template  #header>
                        #{{r.id}} {{r.name}}
                    </template>
                </n-thing>
                <template #suffix>
                    <n-button type="error" @click="user.cart.splice(user.cart.findIndex((e) => e.id == r.id), 1)">
                        移除购物车
                    </n-button>
                </template>
            </n-list-item>
        </n-list>
        <template #header-extra>
            总额 {{user.cart.map(r => r.price).reduce((a, b) => a + b, 0)}} 元
            &nbsp;
            <n-button type="success" @click="order">
                结帐
            </n-button>
        </template>
    </n-card>
</template>
<script setup lang="ts">
import { Ref, ref } from 'vue';
import { useUserStore } from '../stores/user';
import axios from 'axios';
import { useDialog } from 'naive-ui';
import router from '../router';

const user = useUserStore();
type book = {
    name: string,
    isbn: string,
    author: string,
    publisher: string,
};
const dialog = useDialog();
if (!user.token) {
    router.push("/auth/login");
}
const order = () => {
    axios.get("http://localhost:8080/CourseDesign-war/User", {
        params: {
            page: "order",
            books: user.cart.map(r => r.id).join(","),
            token: user.token,
        }
    }).then(resp => {
        console.log(resp);
        if (resp.data.error) {
            dialog.error({
                title: '错误',
                content: resp.data.error
            })
        } else {
            // goto order
        }
    });
}
</script>
<style scoped lang="scss">
.n-card {
    margin: 24px;
}
</style>