<template>
    <section>
        <h1>Counter</h1>
        <div>{{ number }}</div>
        <button @click="increment">Increment</button>
        <br />
        <nuxt-link to="/counterNextGen">Next Gen Counter</nuxt-link>
    </section>
</template>
<script lang="ts" setup>
const { increment, number } = useCounter("basic");
</script>
