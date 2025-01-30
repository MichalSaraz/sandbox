<template>
    <div>
        <label :for="id">Data:</label>
        <textarea
            :id="id"
            :class="displayVariant"
            readonly
            v-model="modelValue"
        />
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
    variant: "header" | "payload";
}

const props = defineProps<Props>();
const modelValue = defineModel<any>({});

const displayVariant = props.variant === "header" ? "header" : "payload";

const generateRandomID = () => {
    const randomNumber = Math.floor(Math.random() * 900) + 100;
    return `${props.variant}-${randomNumber}`;
};

const id = generateRandomID();
</script>
<style scoped>
textarea.header,
textarea.payload {
    height: 23vh;
    margin-top: 0;
}

textarea.header {
    background-color: #f0f8ff;
    border: 1px solid #4682b4;
    color: #4682b4;
}

textarea.payload {
    background-color: #fff8dc;
    border: 1px solid #daa520;
    color: #daa520;
}

textarea.header::placeholder {
    color: #4682b4;
}

textarea.payload::placeholder {
    color: #daa520;
}
</style>
