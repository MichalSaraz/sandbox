<template>
    <section class="container p-4 mx-auto">
        <h1 class="text-4xl font-bold text-center mb-8 text-blue-600">
            ToDo List
        </h1>

        <form
            class="flex flex-col gap-6 mb-16 mx-auto max-w-2xl px-4"
            @submit.prevent="addTask"
        >
            <div class="flex flex-col mt-6">
                <label for="title" class="font-bold text-lg mb-2">Title:</label>
                <input
                    id="title"
                    v-model="title"
                    class="border border-blue-500 rounded py-2 px-4"
                    type="text"
                    placeholder="Enter task title"
                    required
                />
            </div>

            <div class="flex flex-col mt-8">
                <label for="description" class="font-bold text-lg mb-2"
                    >Description:</label
                >
                <textarea
                    id="description"
                    v-model="description"
                    class="border border-blue-500 rounded py-2 px-4"
                    rows="2"
                    placeholder="Enter task description"
                ></textarea>
            </div>

            <div class="flex flex-col mt-8">
                <label for="deadline" class="font-bold text-lg mb-2"
                    >Deadline:</label
                >
                <input
                    id="deadline"
                    v-model="deadline"
                    class="border border-blue-500 rounded py-2 px-4"
                    type="date"
                    required
                />
            </div>

            <div class="text-center mt-8">
                <input
                    type="submit"
                    class="py-2 px-6 text-white bg-blue-500 hover:bg-blue-600 font-semibold rounded cursor-pointer"
                    value="Add Task"
                />
            </div>
        </form>

        <div>
            <h2 class="text-xl font-bold mb-6 mt-16">Tasks</h2>

            <table class="w-full text-center border border-gray-300 mb-8">
                <thead>
                    <tr class="bg-gray-900 text-white">
                        <th>Title</th>
                        <th>Description</th>
                        <th>Deadline</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="task in sortedTasks"
                        :key="task.id"
                        :class="task.done ? 'bg-green-300' : 'bg-red-100'"
                    >
                        <td>{{ task.title }}</td>
                        <td>{{ task.description }}</td>
                        <td>{{ task.deadline }}</td>
                        <td>{{ task.done ? "Done" : "Pending" }}</td>
                        <td>
                            <button
                                class="p-2 text-white bg-green-500 rounded mx-1"
                                @click="toggleTaskStatus(task.id)"
                            >
                                {{ task.done ? "Undo" : "Done" }}
                            </button>
                            <button
                                class="p-2 text-white bg-yellow-500 rounded mx-1"
                                @click="editTask(task)"
                            >
                                Edit
                            </button>
                            <button
                                class="p-2 text-white bg-red-500 rounded mx-1"
                                @click="removeTask(task.id)"
                            >
                                ❌
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script lang="ts" setup>
/**
 * TODO List
 * Create an app that allows users to add, remove, edit and mark items as done.
 * Every item should have a title a description and a deadline.
 * Items marked as done should be displayed in a different color or separated visually.
 * Items should be sorted by deadline.
 */

interface Task {
    id: number;
    title: string;
    description: string;
    deadline: string;
    done: boolean;
}

const tasks = ref<Task[]>([]);

const title = ref<string>("");
const description = ref<string>("");
const deadline = ref<string>("");

function addTask() {
    if (!title.value || !deadline.value) return;

    tasks.value.push({
        id: Math.max(0, ...tasks.value.map((t) => t.id)) + 1,
        title: title.value,
        description: description.value,
        deadline: deadline.value,
        done: false,
    });

    title.value = "";
    description.value = "";
    deadline.value = "";
}

function removeTask(id: number) {
    tasks.value = tasks.value.filter((task) => task.id !== id);
}

function toggleTaskStatus(id: number) {
    const task = tasks.value.find((t) => t.id === id);
    if (task) task.done = !task.done;
}

function editTask(task: Task) {
    title.value = task.title;
    description.value = task.description;
    deadline.value = task.deadline;

    removeTask(task.id);
}

const sortedTasks = computed(() => {
    return tasks.value
        .slice()
        .sort((a, b) => a.deadline.localeCompare(b.deadline));
});
</script>

<style scoped>
table th,
table td {
    padding: 8px;
}
tr.bg-green-300 {
    background-color: #d4edda;
}
tr.bg-red-100 {
    background-color: #f8d7da;
}
</style>
