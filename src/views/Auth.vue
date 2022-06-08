<template>
    <n-grid :cols="3" style="height: 100%">
        <n-gi :offset="1">
            <router-view></router-view>
        </n-gi>
    </n-grid>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.n-grid div[style="grid-column: span 2 / span 2; margin-left: calc(((100% - 0px) / 2) * 1 + 0px);"] {
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: center;
    align-items: center;
    align-content: center;
}
</style>