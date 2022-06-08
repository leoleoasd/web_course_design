<template>
    <n-card class="oo-card" title="账单">
        <n-card v-for="o in order" :key="o.id" :title="'#' + o.id">
            <n-list>
                <n-list-item v-for="r in o.books" :key="r.name">
                    <n-thing>
                        {{r.author}}， ISBN：{{r.isbn}}，出版社： {{r.publisher}}，价格： {{r.price}}
                        
                        <template  #header>
                            #{{r.id}} {{r.name}}
                        </template>
                    </n-thing>
                </n-list-item>
            </n-list>
            <template #header-extra>
                总价格： {{o.books.map(r => r.price).reduce((a, b) => a + b, 0)}} 元
            </template>
        </n-card>
    </n-card>
</template>
<script setup lang="ts">
import { Ref, ref } from 'vue';
import { useUserStore } from '../stores/user';
import axios from 'axios';
import { useDialog } from 'naive-ui';

const user = useUserStore();
if (!user.token) {
    router.push("/auth/login");
}
type book = {
    name: string,
    isbn: string,
    author: string,
    publisher: string,
};
const dialog = useDialog();
const order = ref([]);
axios.get("http://localhost:8080/CourseDesign-war/User", {
    params: {
        page: "get_orders",
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
        order.value = resp.data;
    }
});
</script>
<style scoped lang="scss">
.oo-card {
    margin: 24px;
}
</style>