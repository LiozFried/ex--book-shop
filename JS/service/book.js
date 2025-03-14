'use strict'

var gFilterBy = ''
var gBooks
_createBooks()

function _createBooks() {
    gBooks = loadFromLocalStorage('books')

    if (gBooks && gBooks.length > 0) return

    gBooks = [
        { id: 'bg4J78', title: 'The Adventures of Lori Ipsi', price: 120, imgUrl: '/img/the adventure.jpeg' },
        { id: 'xy5F92', title: 'World Atlas', price: 300, imgUrl: '/img/world atlas.jpeg' },
        { id: 'ab2X55', title: 'Zorba the Greek', price: 87, imgUrl: '/img/zorba.png' },
    ]
    _saveBooks()
}

function getBooks() {
    if (!gFilterBy) return gBooks

    var books = gBooks.filter((book) =>
        book.title.toLowerCase().includes(gFilterBy.toLowerCase())
    )
    return books
}

function removeBook(id) {
    var bookIdx = gBooks.findIndex(book => book.id === id)
    gBooks.splice(bookIdx, 1)
    _saveBooks()
}

function updateBook(id, price) {
    var book = gBooks.find(book => book.id === id)
    book.price = price
    _saveBooks()
}

function addBook(bookName, bookPrice) {
    var book = {
        id: makeId(),
        title: bookName,
        price: bookPrice,
        imgUrl: ''
    }

    gBooks.push(book)
    _saveBooks()
}

function getBookById(id) {
    var book = gBooks.find(book => book.id === id)
    return book
}

function _saveBooks() {
    saveToLocalStorage('books', gBooks)
}

function searchBook(filterBy) {
    gFilterBy = filterBy
}

function getStatistics() {
    return gBooks.reduce((acc, book) => {
        if (book.price < 80) acc.cheap++
        else if (book.price >= 80 && book.price < 200) acc.average++
        else acc.expensive++
        return acc
    }, { cheap: 0, average: 0, expensive: 0 })
}