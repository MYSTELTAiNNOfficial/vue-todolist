import { defineStore } from "pinia";
import { reactive, computed } from "vue";

 export const useListStore = defineStore('list', () => {
    const list = reactive([
        {
            name: 'First',
        },
        {
            name: 'Second',
        },
    ])

    const getList = computed(() => list)

    function addToList(params) {
        if (params.name){
            list.push(params)
        }
        else{
            alert('Nama aktifitas tidak boleh kosong')
        }
    }

    function removeFromList(index) {
        list.splice(index, 1)
    }

    function getDetail(id) {
        console.log(list[id])
        const data = {
            name: list[id].name,
            desc: list[id].desc,
            complete: list[id].complete,
        }
        return data
    }

    function updateList(id, data) {
        list[id] = data
    }

    function updateComplete(id) {
        list[id].complete = !list[id].complete
    }

    return {list, getList, addToList, removeFromList, getDetail, updateList, updateComplete}
 })