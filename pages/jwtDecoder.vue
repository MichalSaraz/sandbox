<template>
    <section>
        <h1>JWT Decoder Tool</h1>

        <div class="container">
            <!-- Levá část: Vstupní pole pro JWT token -->
            <div class="input-area">
                <label>
                    <h2>Encoded</h2>
                    <textarea
                        v-model="token"
                        placeholder="Paste your JWT token here..."
                        rows="6"
                    ></textarea>
                </label>
            </div>

            <!-- Pravá část: Dekódované části -->
            <div class="output-area">
                <!-- Nadpis pro pravou část -->
                <h2>Decoded</h2>

                <!-- Dekódovaný header -->
                <label>
                    <textarea
                        readonly
                        class="header"
                        rows="5"
                        :placeholder="
                            decodedHeader
                                ? ''
                                : 'Decoded Header will appear here...'
                        "
                    >
                        {{
                            decodedHeader
                                ? "Decoded Header:\n\n" + decodedHeader
                                : ""
                        }}
                    </textarea>
                </label>

                <!-- Dekódovaný payload -->
                <label>
                    <textarea
                        readonly
                        class="payload"
                        rows="5"
                        :placeholder="
                            decodedPayload
                                ? ''
                                : 'Decoded Payload will appear here...'
                        "
                    >
                        {{
                            decodedPayload
                                ? "Decoded Payload:\n\n" + decodedPayload
                                : ""
                        }}
                    </textarea>
                </label>
            </div>
        </div>

        <!-- Chybová zpráva -->
        <p v-if="error" class="error">{{ error }}</p>
    </section>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

// Stav pro vstupní token
const token = ref("");

// Chybová zpráva
const error = ref("");

// Dekódovaný header
const decodedHeader = computed(() => {
    try {
        const [headerPart] = token.value.split(".");
        return headerPart ? decodeBase64(headerPart) : "";
    } catch (err) {
        error.value = "Invalid token format";
        return "";
    }
});

// Dekódovaný payload
const decodedPayload = computed(() => {
    try {
        const [, payloadPart] = token.value.split(".");
        return payloadPart ? decodeBase64(payloadPart) : "";
    } catch (err) {
        error.value = "Invalid token format";
        return "";
    }
});

// Pomocná funkce pro dekódování Base64
function decodeBase64(encoded: string): string {
    try {
        const decoded = atob(encoded);
        return JSON.stringify(JSON.parse(decoded), null, 2); // Formátovaný výstup JSONu
    } catch {
        error.value = "Invalid Base64 or JSON format";
        return "";
    }
}
</script>

<style scoped>
/* Základní styly */
section {
    font-family: Arial, sans-serif;
    max-width: 1200px;
    margin: auto;
    padding: 20px;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

h2,
h3 {
    margin-bottom: 10px;
}

/* Kontejner pro rozložení */
.container {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

/* Levá část: Vstupní pole */
.input-area {
    flex: 1;
    padding: 10px;
}

/* Textarea v levé části */
textarea {
    width: 100%;
    font-family: monospace;
    font-size: 14px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-sizing: border-box; /* Důležité pro správné zarovnání */
    resize: none;
    margin-top: 0; /* Ujistíme se, že nemáme žádný horní margin */
}

/* Levá textarea (pro token) */
.input-area textarea {
    height: 50vh; /* Výška pro levé textové pole */
}

/* Pravá část: Dekódované části */
.output-area {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* Ujistíme se, že textarey budou na začátku */
}

/* Nadpis pro pravou část */
h2 {
    margin-bottom: 20px;
}

/* Dekódované části - header a payload */
textarea.header,
textarea.payload {
    height: 23vh; /* Výška pro header a payload textareas */
    margin-top: 0; /* Ujistíme se, že nemáme žádný horní margin */
}

/* Barevné odlišení */
textarea.header {
    background-color: #f0f8ff; /* Světle modrá */
    border: 1px solid #4682b4; /* Tmavě modrá */
    color: #4682b4;
}

textarea.payload {
    background-color: #fff8dc; /* Světle žlutá */
    border: 1px solid #daa520; /* Zlatá */
    color: #daa520;
}

/* Placeholder pro header a payload - tmavě modrá a tmavě žlutá */
textarea.header::placeholder {
    color: #4682b4; /* Tmavě modrá */
}

textarea.payload::placeholder {
    color: #daa520; /* Tmavě žlutá */
}

h3.header {
    color: #4682b4;
}

h3.payload {
    color: #daa520;
}

/* Chybová zpráva */
.error {
    color: red;
    text-align: center;
    margin-top: 10px;
}

/* Úpravy zarovnání textarey v pravé části */
.output-area label {
    display: flex;
    flex-direction: column;
    margin-bottom: 4vh; /* Přidáme mezery mezi textareami v pravé části */
}

.output-area label textarea {
    margin-bottom: 0; /* Zajistí, že spodní okraj bude zarovnaný s levým textareou */
}

/* Zarovnání rámečku textareas */
.input-area textarea,
.output-area textarea {
    border-radius: 4px;
    border: 1px solid #ccc;
    box-sizing: border-box; /* Zajistíme, že padding a border neovlivní výšku */
}

/* Aby spodní okraj payload textarea byl ve stejné výšce jako levý textareu */
.output-area {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.output-area label:last-child textarea.payload {
    margin-bottom: 0; /* Zajistí, že spodní okraj bude zarovnaný s levým textareou */
}
</style>
