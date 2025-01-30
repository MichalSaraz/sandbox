<template>
    <h1 :class="className">{{ props.content }}</h1>
</template>
<script setup lang="ts">
interface Props {
    content: string;
    color?: "red" | "blue" | "green" | "yellow" | "none";
}

const props = withDefaults(defineProps<Props>(), {
    color: "none",
});

const className = props.color === "none" ? "title" : `title ${props.color}`;
</script>
<style scoped>
.title {
    letter-spacing: -0.025em;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 2.5em;
}

.red {
    color: red;
}

.blue {
    color: blue;
}

.green {
    color: green;
}

.yellow {
    color: yellow;
}
</style>
