'use strict'

function loadFromLocalStorage(key) {
    const data = localStorage.getItem(key)
    return JSON.parse(data)
}

function saveToLocalStorage(key, value) {
    const data = JSON.stringify(value)
    localStorage.setItem(key, data)
}