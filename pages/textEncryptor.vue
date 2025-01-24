<template>
    <section>
        <h1>Caesar Cipher Tool</h1>

        <label>
            Enter text:
            <input v-model="text" type="text" placeholder="Type here..." />
        </label>

        <label>
            Shift amount:
            <input
                v-model.number="shift"
                type="number"
                min="1"
                placeholder="Enter shift value..."
            />
        </label>

        <label>
            Select action:
            <select v-model="action">
                <option value="encrypt">Encrypt</option>
                <option value="decrypt">Decrypt</option>
            </select>
        </label>

        <div v-if="result !== ''">
            <h2>Result:</h2>
            <p>
                <strong>{{ result }}</strong>
            </p>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

// Reactive state for user inputs
const text = ref("");
const shift = ref(1);
const action = ref("encrypt"); // Default action is "encrypt"

// Computed property for reactivity
const result = computed(() => {
    if (!text.value || shift.value <= 0) {
        return "Please enter valid text and shift amount.";
    }

    return action.value === "encrypt"
        ? encryptText(text.value, shift.value)
        : decryptText(text.value, shift.value);
});

// Function to encrypt the text using Caesar cipher
function encryptText(input: string, shiftAmount: number): string {
    return input
        .split("")
        .map((char) => applyShift(char, shiftAmount))
        .join("");
}

// Function to decrypt the text using Caesar cipher
function decryptText(input: string, shiftAmount: number): string {
    return input
        .split("")
        .map((char) => applyShift(char, -shiftAmount))
        .join("");
}

// Helper function to apply shift to a character
function applyShift(char: string, shiftAmount: number): string {
    if (char.match(/[a-zA-Z]/)) {
        const isUpperCase = char === char.toUpperCase();
        const baseCode = isUpperCase ? 65 : 97; // ASCII for 'A' or 'a'
        const charCode = char.charCodeAt(0);
        const normalizedShift = ((shiftAmount % 26) + 26) % 26; // Normalize shift
        const newCode =
            ((charCode - baseCode + normalizedShift) % 26) + baseCode;
        return String.fromCharCode(newCode);
    }
    return char; // Non-alphabetic characters remain unchanged
}
</script>

<style scoped>
section {
    font-family: Arial, sans-serif;
    max-width: 500px;
    margin: auto;
    text-align: center;
}
label {
    display: block;
    margin: 10px 0;
}
input,
select {
    margin: 5px 0;
    padding: 5px;
    font-size: 16px;
}
h2 {
    margin-top: 20px;
}
strong {
    color: #4caf50;
}
</style>
