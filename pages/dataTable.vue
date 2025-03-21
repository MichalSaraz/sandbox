<template>
    <section class="container p-4 mx-auto">
        <h1>Data Table</h1>
        <table class="w-full text-center border border-red-500">
            <thead>
                <tr class="bg-gray-900">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Sex</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="person in people" :key="person.id">
                    <td>{{ person.id }}</td>
                    <td>{{ person.name }}</td>
                    <td>{{ person.age }}</td>
                    <td>{{ person.sex }}</td>
                    <td>
                        <button
                            class="p-2 text-white bg-red-500 rounded"
                            @click="removePerson(person.id)"
                        >
                            🧍➡️🗑️
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="mt-24">
            <form class="flex flex-col gap-4" @submit.prevent="addPerson">
                <label for="name">Name</label>
                <input
                    id="name"
                    v-model="name"
                    class="border border-red-500"
                    type="text"
                />
                <label for="age">Age</label>
                <input
                    id="age"
                    v-model="age"
                    class="border border-red-500"
                    type="number"
                />
                <span>Sex</span>
                <div class="flex flex-row gap-2">
                    <label for="sex-m">Male</label>
                    <input
                        id="sex-m"
                        v-model="sex"
                        name="sex"
                        type="radio"
                        value="M"
                        checked
                    />
                    <label for="sex-f">Female</label>
                    <input
                        id="sex-f"
                        v-model="sex"
                        name="sex"
                        type="radio"
                        value="F"
                    />
                </div>
                <input
                    type="submit"
                    class="p-2 text-white bg-red-500 rounded"
                    value="Add"
                />
            </form>
        </div>
    </section>
</template>
<script setup lang="ts">
interface Person {
    id: number;
    name: string;
    age: number;
    sex: "M" | "F";
}

const people = ref<Person[]>([
    {
        id: 1,
        name: "John Doe",
        age: 30,
        sex: "M",
    },
    {
        id: 2,
        name: "Jane Smith",
        age: 15,
        sex: "F",
    },
    {
        id: 3,
        name: "Mike Tyson",
        age: 45,
        sex: "M",
    },
    {
        id: 4,
        name: "Sara Connor",
        age: 25,
        sex: "F",
    },
    {
        id: 5,
        name: "Carl Cox",
        age: 60,
        sex: "M",
    },
]);

const name = ref<Person["name"]>("");
const age = ref<Person["age"]>(0);
const sex = ref<Person["sex"]>("M");

function addPerson(): void {
    if (name.value.length === 0 || age.value === 0) {
        return;
    }

    people.value.push({
        id: Math.max(...people.value.map((person) => person.id)) + 1,
        name: name.value,
        age: age.value,
        sex: sex.value,
    });
    name.value = "";
    age.value = 0;
    sex.value = "M";
}

function removePerson(id: number): void {
    people.value = people.value.filter((person) => person.id !== id);
}
</script>
