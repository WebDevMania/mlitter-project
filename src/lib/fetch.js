import { HTTP_METHOD } from "./httpMethods"

const BASE_URL = "http://localhost:3000/api/"

async function get(url, headers = {}) {
    const res = await fetch(BASE_URL + url, {
        headers,
        method: HTTP_METHOD.GET
    })

    if (!res.ok) {
        throw new Error("Error occured")
    }

    const data = await res.json()

    return data
}

async function post(url, headers = {}, body = {}) {
    const res = await fetch(BASE_URL + url, {
        headers,
        method: HTTP_METHOD.POST,
        body: JSON.stringify(body)
    })
    if (!res.ok) {
        throw new Error("Error occured")
    }

    const data = await res.json()

    return data
}

async function put(url, headers = {}, body = {}) {
    const res = await fetch(BASE_URL + url, {
        headers,
        method: HTTP_METHOD.PUT,
        body: JSON.stringify(body)
    })
    if (!res.ok) {
        throw new Error("Error occured")
    }

    const data = await res.json()

    return data

}

async function del(url, headers = {}) {

    const res = await fetch(BASE_URL + url, {
        headers,
        method: HTTP_METHOD.DEL
    })
    if (!res.ok) {
        throw new Error("Error occured")
    }

    const data = await res.json()

    return data

}

export const api = {
    get,
    post,
    put,
    del
}