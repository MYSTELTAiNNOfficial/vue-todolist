import { parseJwt } from './helper'

const setCookie = (name, value, days) => {
    let expires = ''
    if (days) {
        const date = new Date()
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
        expires = '; expires=' + date.toUTCString()
    }
    document.cookie = `${name}=${value};${expires};path=/;`
}

const getCookie = (name) => {
    const cookies = `; ${document.cookie}`
    const byValue = cookies.split(`; ${name}=`)
    if (byValue.length === 2) return byValue.pop().split(';').shift()
}

const delCookie = (name) => {
    setCookie(name, '', -1)
}

const certCookie = () => {
    const token = getCookie('CERT')
    if (token) {
        const { id, name, role, exp } = parseJwt(token)
        if (!id) return delCookie('CERT')
        return {
            id,
            name,
            role,
            exp
        }
    }
    return {
        id: undefined,
        name: undefined,
        role: undefined,
        exp: undefined
    }
}

export { setCookie, getCookie, delCookie, certCookie }