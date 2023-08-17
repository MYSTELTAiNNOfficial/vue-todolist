
<script setup>

// Masih terdapat bug pada login bila mengganti halaman form ke register lalu kembali ke halaman form login
import { ref } from 'vue';
import { d$auth } from '@/stores/auth';
import BaseInput from '@comp/BaseInput.vue';
import router from '../router';

const authentication = d$auth;
const initInputLogin = {
    username: '',
    password: ''
};
const inputLogin = ref({ ...initInputLogin });
const initInputRegist = {
    name: '',
    username: '',
    password: ''
};
const inputRegist = ref({ ...initInputRegist });
const isLogin = ref(true);
const isTipShown = ref(false);

async function login() {
    try {
        await authentication().a$login(inputLogin.value);

        authentication().a$setUser();
        resetFormLogin();
        router.push({ name: 'profile', params: { id: authentication().g$user.id } });
    } catch (error) {
        console.error(error);
    }
}

async function register() {
    try {
        await authentication().a$register(inputRegist.value);
        resetFormRegist();
        toggleLogin();
    } catch (error) {
        console.error(error);
    }
}

function resetFormLogin() {
    Object.assign(inputLogin, ref({ ...initInputLogin }));
}

function resetFormRegist() {
    Object.assign(inputRegist, ref({ ...initInputRegist }));
}

function toggleLogin() {
    isLogin.value = !isLogin.value;
}

function toggleTip() {
    isTipShown.value = !isTipShown.value;
}
</script>

<template>
    <div>
        <tr>
            <td>
                <h1 @click="toggleLogin" @mouseover="toggleTip" @mouseleave="toggleTip">
                    {{ isLogin ? 'Login' : 'Register' }}
                </h1>
            </td>
            <td v-if="isTipShown">
                &nbsp;click to change page to {{ !isLogin ? 'Login' : 'Register' }}
            </td>
        </tr>
        <form
            @submit.prevent="login"
            @reset="resetFormLogin"
            v-if="!authentication.isLoggedin && isLogin"
            method="post"
        >
            <BaseInput
                v-model="inputLogin.username"
                name="Username"
                placeholder="Username"
                class="input"
                required
            />
            <BaseInput
                v-model="inputLogin.password"
                name="Password"
                placeholder="Password"
                class="input"
                type="password"
                required
            />
            <button type="submit">Login</button>
            <button type="reset">Cancel</button>
        </form>
        <form
            @submit.prevent="register"
            @reset="resetFormRegist"
            v-else-if="!authentication.isLoggedin && !isLogin"
            method="post"
        >
            <BaseInput
                v-model="inputRegist.name"
                name="Name"
                placeholder="Name"
                class="input"
                required
            />
            <BaseInput
                v-model="inputRegist.username"
                name="Username"
                placeholder="Username"
                class="input"
                required
            />
            <BaseInput
                v-model="inputRegist.password"
                name="Password"
                placeholder="Password"
                class="input"
                type="password"
                required
            />
            <button type="submit">Regist</button>
            <button type="reset">Cancel</button>
        </form>
        <h3 v-else>{{ authentication().g$user.id }}</h3>
    </div>
</template>
