'use strict'

var gBooks = [
    { id: 'bg4J78', title: 'The Adventures of Lori Ipsi', price: 120, imgUrl: '/img/the adventure.jpeg' },
    { id: 'xy5F92', title: 'World Atlas', price: 300, imgUrl: '/img/world atlas.jpeg' },
    { id: 'ab2X55', title: 'Zorba the Greek', price: 87, imgUrl: '/img/zorba.png' },
]

function getBooks() {
    return gBooks
}

function removeBook(id) {
    var bookIdx = gBooks.findIndex(book => book.id === id)
    gBooks.splice(bookIdx, 1)
}

function updateBook(id, price) {
    var book = gBooks.find(book => book.id === id)
    book.price = price
}

function addBook(bookName, bookPrice){
    var book = {
        id: makeId(),
        title: bookName,
        price: bookPrice,
        imgUrl: ''
    }

    gBooks.push(book)
}

function getBookById (id) {
    return gBooks.find(book => book.id === id)
}