<template>
    <n-card title="搜索">
        <div class="row">
            <n-input-group>
                <n-input v-model:value="search">
                
                </n-input>
                <n-button @click="doSearch">
                    搜索
                </n-button>
            </n-input-group>
        </div>
        <n-list>
            <n-list-item v-for="r in result" :key="r.name">
                <n-thing>
                     {{r.author}}， ISBN：{{r.isbn}}，出版社： {{r.publisher}}
                    
                    <template  #header>
                        #{{r.id}} {{r.name}}
                    </template>
                </n-thing>
                <template #suffix>
                    <n-button @click="add(r)" v-if="user.cart.findIndex((e) => e.id == r.id) === -1">
                        加入购物车
                    </n-button>
                    <n-button type="error" @click="user.cart.splice(user.cart.findIndex((e) => e.id == r.id), 1)" v-else>
                        移除购物车
                    </n-button>
                </template>
            </n-list-item>
        </n-list>
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
const search = ref('');
const result: Ref<Array<book>> = ref([]);
const dialog = useDialog();
const doSearch = () => {
    console.log(search.value);
    
    axios.get("http://localhost:8080/CourseDesign-war/User", {
        params: {
            page: "search",
            query: search.value,
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
            result.value = resp.data;
        }
    });
}
const add = (r: book) => {
    user.cart.push(r);
}
</script>
<style scoped lang="scss">
.n-card {
    margin: 24px;
}
</style>