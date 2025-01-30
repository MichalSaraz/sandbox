<template>
    <section>
        <h1>JWT Decoder Tool</h1>

        <div class="container">
            <div class="input-area">
                <h2>Encoded</h2>
                <textarea
                    v-model="token"
                    placeholder="Paste your JWT token here..."
                    rows="6"
                ></textarea>
            </div>

            <div class="output-area">
                <h2>Decoded</h2>
                <div>
                    <JwtTextarea
                        v-model="decodedToken.header"
                        variant="header"
                    />
                </div>
                <div>
                    <JwtTextarea
                        v-model="decodedToken.payload"
                        variant="payload"
                    />
                </div>
            </div>
        </div>

        <p v-if="error" class="error">{{ error }}</p>
    </section>
</template>

<script lang="ts" setup>
interface DecodedToken {
    header?: string;
    payload?: string;
}

const token = ref("");
const error = ref<string | null>(null);

const decodedToken: ComputedRef<DecodedToken> = computed(() => {
    if (!token.value) {
        error.value = null;
        return { header: "", payload: "" };
    }

    const [headerPart, payloadPart] = token.value.split(".");

    if (!headerPart || !payloadPart) {
        error.value = "Invalid JWT token";
        return { header: "", payload: "" };
    }

    const header = decodeBase64(headerPart);
    const payload = decodeBase64(payloadPart);

    if (!header || !payload) {
        error.value = "Invalid JWT token";
        return { header: "", payload: "" };
    }

    error.value = null;
    return {
        header,
        payload,
    };
});

function decodeBase64(encoded: string): string {
    const decoded = atob(encoded);
    return JSON.stringify(JSON.parse(decoded), null, 2);
}
</script>

<style scoped>
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

.container {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.input-area {
    flex: 1;
    padding: 10px;
}

textarea {
    width: 100%;
    font-family: monospace;
    font-size: 14px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    resize: none;
    margin-top: 0;
}

.input-area textarea {
    height: 50vh;
}

.output-area {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

h2 {
    margin-bottom: 20px;
}

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

h3.header {
    color: #4682b4;
}

h3.payload {
    color: #daa520;
}

.error {
    color: red;
    text-align: center;
    margin-top: 10px;
}

.output-area div {
    display: flex;
    flex-direction: column;
    margin-bottom: 4vh;
}

.input-area textarea,
.output-area textarea {
    border-radius: 4px;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

.output-area {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.output-area label:last-child textarea.payload {
    margin-bottom: 0;
}
</style>
