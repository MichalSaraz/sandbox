<template>
    <section class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-4xl font-black tracking-tight">
            Welcome to Airport IS
        </h1>
        <small class="mt-2 text-sm italic text-gray-400"
            >Please enter your email and password to login</small
        >
        <form class="flex flex-col items-center mt-4" @submit.prevent="login">
            <label for="email">Email</label>
            <input
                id="email"
                v-model="email"
                class="p-2 border border-black rounded-xl"
                type="text"
                required
            />
            <label for="password">Password</label>
            <input
                id="password"
                v-model="password"
                class="p-2 border border-black rounded-xl"
                type="password"
                required
            />
            <div class="flex flex-row mt-6 gap-x-3">
                <button
                    class="px-4 py-1 font-bold text-white bg-green-500 border-4 border-transparent rounded-xl hover:border-green-500 hover:text-green-500 hover:border-4 hover:bg-transparent"
                    type="submit"
                >
                    Login
                </button>
                <button
                    class="px-4 py-1 font-bold text-white border-4 border-transparent rounded-xl bg-amber-500 hover:border-amber-500 hover:text-amber-500 hover:border-4 hover:bg-transparent"
                    type="submit"
                >
                    Register
                </button>
            </div>
        </form>
        <p
            v-if="error"
            style="color: red; font-size: xx-large; font-weight: bold"
            class="error"
        >
            {{ error }}
        </p>
        <p
            v-if="isLoginSuccessful"
            style="color: green; font-size: xx-large; font-weight: bold"
        >
            Login successful
        </p>
    </section>
</template>

<script lang="ts" setup>
const email = ref("");
const password = ref("");
const error = ref("");
const isLoginSuccessful = ref(false);

function login() {
    const emailRegex: RegExp =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    isLoginSuccessful.value = false;

    if (!email.value.match(emailRegex)) {
        error.value = "Invalid email";
        return;
    }

    if (password.value.length < 8) {
        error.value = "Password must be at least 8 characters";
        return;
    }

    isLoginSuccessful.value = true;
    error.value = "";
}
</script>
