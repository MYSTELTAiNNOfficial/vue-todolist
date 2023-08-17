import { defineStore } from "pinia";
import { reactive, computed } from "vue";

import * as s$todo from '@/services/todo'

export const d$todo = defineStore('list', () => {
    const list = reactive([])

    async function a$list() {
        try {
            const { data } = await s$todo.list()
            list.splice(0, list.length, ...data)
            console.log(list)
        } catch ({ message, error }) {
            throw message ?? error
        }
    }

    async function a$add(body) {
        try{
            await s$todo.add(body)
            await a$list()
        }catch({message, error}){
            throw message ?? error
        }
    }

    function getDetail(param) {
        const data = {
            id: list[param].id,
            title: list[param].title,
            description: list[param].description,
            category: list[param].category,
            completed: list[param].completed,
        }
        console.log(data)
        return data
    }

    async function a$update (id, data) {
        try {
            await s$todo.edit(id, data)
            await a$list()
        } catch ({ message, error }) {
            throw message ?? error
        }
    }

    async function a$remove (index) {
        try {
            await s$todo.remove(index)
            await a$list()
        } catch ({ message, error }) {
            throw message ?? error
        }
    }

    const getList = computed(() => list)

    return { list, a$list, a$add, a$remove, getDetail, a$update, getList }
})