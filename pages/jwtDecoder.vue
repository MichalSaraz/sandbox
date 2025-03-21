<template>
    <section>
        <h1>JWT Decoder Tool</h1>

        <div class="container">
            <div class="input-area">
                <h2>Encoded</h2>
                <JwtTextarea
                    v-model="token"
                    variant="input"
                    :rows="8"
                    :cols="50"
                />
            </div>

            <div class="output-area">
                <h2>Decoded</h2>
                <JwtTextarea
                    v-model="decodedToken.header"
                    variant="header"
                    :rows="8"
                    :cols="50"
                />
                <JwtTextarea
                    v-model="decodedToken.payload"
                    variant="payload"
                    :rows="8"
                    :cols="50"
                />
            </div>
        </div>
        <p v-if="error" class="error">{{ error }}</p>
    </section>
</template>

<script lang="ts" setup>
const token = ref("");

const { error, token: decodedToken } = useJwtDecoder(token);
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

.container {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.input-area {
    flex: 1;
    padding: 10px;
}

.output-area {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.error {
    color: red;
    text-align: center;
    margin-top: 10px;
}
</style>
