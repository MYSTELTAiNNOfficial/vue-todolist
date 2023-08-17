import { defineStore } from "pinia";
import { computed } from 'vue';
import { setCookie, certCookie } from '@/plugins/cookies'

import * as s$auth from '@/services/auth'

export const d$auth = defineStore('auth', () => {
    const dataUser = {
        id: undefined,
        name: undefined,
        role: undefined,
    }

    async function a$setUser() {
        try {
            const { id, name, role } = certCookie()
            dataUser.id = id
            dataUser.name = name
            dataUser.role = role
            console.log(dataUser)
            console.log('success')
            return true
        } catch (error) {
            dataUser.id = undefined
            dataUser.name = undefined
            dataUser.role = undefined
            throw error
        }
    }

    async function a$login(body) {
        try {
            const { data } = await s$auth.login(body)
            setCookie('CERT', data.token, { datetime: data.exp })
            return true
        } catch ({ error, message }) {
            throw message ?? error
        }
    }

    async function a$register(body) {
        try {
            await s$auth.register(body)
            console.log(body)
            return true
        } catch ({ error, message }) {
            throw message ?? error
        }
    }

    const g$user = computed(() => dataUser)
    const isLoggedIn = computed(() => !!dataUser.id)

    return { dataUser, a$setUser, a$login, a$register, g$user, isLoggedIn }
})