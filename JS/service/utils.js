'use strict'

function makeId(length = 6) {
    var id = ""
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for (var i = 0; i < length; i++) {
        id += possible.charAt(getRandomInt(0, possible.length))
    }

    return id
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}

function getRandomParagraph() {
    var randomParagraph = ''
    var randLength = getRandomInt(15, 41)
    for (var i = 0; i < randLength; i++) {
        randomParagraph += `${getRandomWord()} `
    }

    return randomParagraph
}

function getRandomWord() {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var randLength = getRandomInt(2, 8)
    var word = ''
    for (var i = 0; i < randLength; i++) {
        var randIdx = getRandomInt(0, letters.length)
        word += letters.charAt(randIdx)
    }

    return word
}