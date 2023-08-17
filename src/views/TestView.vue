<script setup>
import { ref } from 'vue';
import { useListStore } from '@/stores/lists';
import BaseInput from '@comp/BaseInput.vue';

const store = useListStore();
const initInput = {
    name: '',
    desc: '',
    complete: false
};
const input = ref({ ...initInput });
const editing = ref(false);

function addData() {
    if (editing.value === false) {
        store.addToList({ ...input.value });
        Object.assign(input, ref({ ...initInput }));
    } else {
        store.updateList(editing.value, { ...input.value });
        editing.value = false;
        Object.assign(input, ref({ ...initInput }));
    }
}

function deleteData(index) {
    store.removeFromList(index);
}

function editData(param) {
    editing.value = param;
    //Object.assign(input, ref({ ...store.getDetail(param) })); //tidak bisa
    input.value = { ...store.getDetail(param) };
}

function toggleComplete(index) {
    store.updateComplete(index, { complete: !store.getList[index].complete });
}

function resetForm() {
    editing.value = false;
    Object.assign(input, ref({ ...initInput }));
}
</script>

<template>
    <h1>List {{ $route.params?.id }}</h1>
    <div>
        <form @submit.prevent="addData" @reset="resetForm()" method="post">
            <BaseInput
                v-model="input.name"
                name="Activity"
                placeholder="Add new activity"
                class="input"
                required
            />
            <BaseInput
                v-model="input.desc"
                name="Description"
                placeholder="Add description"
                class="input"
            />
            <br />
            <input v-model="input.complete" type="checkbox" name="completed" id="completed" />
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
        <template v-for="(item, index) in store.getList" v-bind:key="index">
            <tr class="table-tr">
                <td class="table-td">{{ index + 1 }}</td>
                <td class="table-td">{{ item.name }}</td>
                <td class="table-td">{{ item?.desc ? `${item.desc}` : '' }}</td>
                <td class="table-td" @click="toggleComplete(index)">
                    {{ item.complete ? '✓' : '✕' }}
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
