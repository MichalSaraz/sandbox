<template>
    <div class="textarea-container">
        <label :for="id">{{ label }}</label>
        <textarea
            :id="id"
            v-model="modelValue"
            :class="props.variant"
            :rows="rows"
            :cols="cols"
            :placeholder="placeholder"
            :readonly="variant !== 'input'"
        ></textarea>
    </div>
</template>

<script setup lang="ts">
/**
 * 1. Přidat variantu pro input
 * 2. Přidat label k variantě pro input
 * 3. Label udělat dynamicky podle varianty:
 *    - header -> "Header"
 *    - payload -> "Payload"
 *    - input -> "Token"
 * 4. Nastylovat input podle varianty
 * 5. Nastavit placeholder podle varianty
 * 6. Přidat možnost nastavit velikost (počet řádků a sloupců) a toto nastavení použít (nenastavovat velikost pomocí CSS)
 */

interface Props {
    variant: "header" | "payload" | "input";
    rows?: number;
    cols?: number;
}

const props = defineProps<Props>();
const modelValue = defineModel<string>({});

const generateRandomID = () => {
    return `${props.variant}-${useId()}`;
};

const id = generateRandomID();

const label =
    props.variant === "header"
        ? "Header"
        : props.variant === "payload"
        ? "Payload"
        : "Token";

const placeholder =
    props.variant === "header"
        ? "JWT Header"
        : props.variant === "payload"
        ? "JWT Payload"
        : "Paste your JWT token here...";
</script>

<style scoped>
.textarea-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

label {
    font-weight: bold;
    margin-bottom: 5px;
}

textarea {
    width: 100%;
    font-family: monospace;
    font-size: 14px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    resize: vertical;
}

textarea.header {
    background-color: #f0f8ff;
    border: 1px solid #4682b4;
    color: #4682b4;
    height: 10vh;
}

textarea.payload {
    background-color: #fff8dc;
    border: 1px solid #daa520;
    color: #daa520;
    height: 10vh;
}

textarea.input {
    background-color: #f5f5f5;
    border: 1px solid #808080;
    color: #333;
    height: 15vh;
}

textarea.header::placeholder {
    color: #4682b4;
}

textarea.payload::placeholder {
    color: #daa520;
}

textarea.input::placeholder {
    color: #808080;
}
</style>
