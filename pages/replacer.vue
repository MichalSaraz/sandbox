<template>
    <section>
        <h1>Replacer</h1>
        <textarea v-model="input" /><br>
        <textarea v-model="output" /><br>
        <button @click="replaceText">Replace</button><br>
    </section>
</template>

<script lang="ts" setup>

const input = ref('veverka je veverka');
const output = ref('');

const replaceText = () => {
    return input.value.replace(/veverka/g, '🐿️')
};

</script>
