<template>
    <section>
        <h1>Password Match</h1>
        <input v-model="password" type="password"><br>
        <input v-model="passwordConfirm" type="password"><br>
        <p v-if="password.length > 0 && passwordConfirm.length > 0">
            {{ result }}
        </p>
    </section>
</template>

<script lang="ts" setup>

const password = ref('');
const passwordConfirm = ref('');

const result = computed(() => {
    return password.value === passwordConfirm.value ? 'Passwords match' : 'Passwords do not match';
});

</script>
