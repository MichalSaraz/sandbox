<template>
    <section>
        <h1>Counter Next Gen</h1>
        <div>{{ number }}</div>
        <button @click="increment">Increment</button>
        <br />
        <nuxt-link to="/counter">Basic Counter</nuxt-link>
    </section>
</template>
<script lang="ts" setup>
const { increment, number } = useCounter("next-gent");
</script>
