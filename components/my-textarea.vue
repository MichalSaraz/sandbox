<template>
    <div class="textarea-wrapper">
        <label class="textarea-label" v-if="title" for="textarea">{{
            props.title
        }}</label>
        <textarea v-model="modelValue" id="textarea" />
    </div>
</template>
<script lang="ts" setup>
interface Props {
    title?: string | null;
}

const props = withDefaults(defineProps<Props>(), {
    title: null,
});

const modelValue = defineModel<any>({});
</script>
<style scoped>
.textarea-wrapper {
    display: flex;
    flex-direction: column;
}

.textarea-label {
    margin-bottom: 8px;
    font-weight: bold;
}

textarea {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
    min-height: 100px;
}
</style>
