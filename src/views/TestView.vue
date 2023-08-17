<script setup>
import { onMounted, ref } from 'vue';
import { d$todo } from '@/stores/lists';
import BaseInput from '@comp/BaseInput.vue';

const store = d$todo();
const initInput = {
    id: '',
    title: '',
    description: '',
    category: '',
    completed: false
};
const input = ref({ ...initInput });
const editing = ref(false);

async function addData() {
    if (editing.value === false) {
        try {
            await store.a$add(input.value);
            resetForm();
        } catch (error) {
            console.error(error);
        }
    } else {
        try {
            await store.a$update(input.value.id, input.value);
            resetForm();
        } catch (error) {
            console.error(error);
        }
    }
}

onMounted(async () => {
    await store.a$list();
});

async function deleteData(index) {
    await store.a$remove(index);
}

function editData(param) {
    editing.value = param;
    Object.assign(input, ref({ ...store.getDetail(param) }));
}

async function toggleComplete(index) {
    try {
        let temp = store.getDetail(index);
        temp.completed = !temp.completed;
        console.log('log: ' + temp.completed);
        await store.a$update(temp.id, temp);
    } catch (error) {
        console.error(error);
    }
}

function resetForm() {
    editing.value = false;
    Object.assign(input, ref({ ...initInput }));
}
</script>

<template>
    <h1>List {{ $route.params?.id }}</h1>
    <div>
        <form @submit.prevent="addData()" @reset="resetForm()" method="post">
            <BaseInput
                v-model="input.title"
                name="Activity"
                placeholder="Add new activity"
                class="input"
                required
            />
            <BaseInput
                v-model="input.description"
                name="Description"
                placeholder="Add description"
                class="input"
            />
            <br />
            <input v-model="input.completed" type="checkbox" name="completed" id="completed" />
            Completed
            <br />
            <button type="submit">{{ editing !== false ? 'Edit' : 'Add' }}</button>
            <button type="reset">Cancel</button>
        </form>
    </div>

    <table class="table">
        <tr class="table-tr">
            <th>No.</th>
            <th>Nama Aktifitas</th>
            <th>Deskripsi Aktifitas</th>
            <th>Complete?</th>
            <th>Action</th>
        </tr>
        <template v-for="(item, index) in store.getList" v-bind:key="item.id">
            <tr class="table-tr">
                <td class="table-td">{{ item.id }}</td>
                <td class="table-td">{{ item.title }}</td>
                <td class="table-td">{{ item?.description ? `${item.description}` : '' }}</td>
                <td class="table-td" @click="toggleComplete(index)">
                    {{ item.completed ? '✓' : '✕' }}
                </td>
                <td class="table-td">
                    <button @click="deleteData(index)" :disabled="editing !== false">🗑️</button>
                    <button @click="editData(index)" :disabled="editing !== false">✏️</button>
                </td>
            </tr>
        </template>
    </table>
</template>

<style scoped lang="scss">
.input {
    padding: 0.5rem;
    font-size: 1rem;
}

.table-td {
    border-bottom: 1px solid white;
    text-align: center;
}
</style>
