'use strict'

var gFilterBy = ''
var gBooks

var gQueryOptions = {
    filterBy: { title: '', minRating: 1 },
    sortBy: { sortField: '', sortDir: 0 },
    page: { idx: 0, size: 5 },
}

_createBooks()

function _createBooks() {
    gBooks = loadFromLocalStorage('books')

    if (gBooks && gBooks.length > 0) return

    gBooks = [
        { id: 'bg4J78', title: 'The Adventures of Lori Ipsi', price: 120, imgUrl: '/img/the adventure.jpeg', rating: 2 },
        { id: 'xy5F92', title: 'World Atlas', price: 300, imgUrl: '/img/world atlas.jpeg', rating: 3 },
        { id: 'ab2X55', title: 'Zorba the Greek', price: 87, imgUrl: '/img/zorba.png', rating: 1 },
        { id: '3Tw45h', title: 'Long Shadows', price: 100, imgUrl: '/img/long shadows.jpeg', rating: 5 },
        { id: 'DDf352', title: 'The Lord Of The Rings, The Two Towers', price: 350, imgUrl: '/img/the lord of the rings the two towers.jpeg', rating: 4 },
        { id: 'Aqt72W', title: 'Shantaram', price: 200, imgUrl: '/img/shantaram.jpeg', rating: 4 },
        { id: 'LI440F', title: 'The Hobbit', price: 80, imgUrl: '/img/the hobbit.png', rating: 2 },
        { id: 'C4He31', title: 'End Game', price: 75, imgUrl: '/img/end game.jpeg', rating: 1 },
        { id: '99YyX3', title: 'The Forgotten', price: 120, imgUrl: '/img/the forgotten.jpeg', rating: 5 },
        { id: 'rT6o12', title: 'The Escape', price: 150, imgUrl: '/img/the escape.jpeg', rating: 3 },
    ]
    _saveBooks()
}

function getBooks() {
    const { filterBy, sortBy, page } = gQueryOptions

    var books = gBooks.filter(book => book.title.toLowerCase().includes(filterBy.title.toLowerCase()))
    books = books.filter(book => book.rating >= filterBy.minRating)

    if (sortBy.sortField) {
        books.sort((a, b) => {
            if (a[sortBy.sortField] > b[sortBy.sortField]) return sortBy.sortDir
            if (a[sortBy.sortField] < b[sortBy.sortField]) return -sortBy.sortDir
            return 0
        })
    }

    const startIdx = page.idx * page.size
    books = books.slice(startIdx, startIdx + page.size)

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
        imgUrl: '',
        rating: getRandomInt(1, 6)
    }

    gBooks.push(book)
    _saveBooks()
}

function getBookById(id) {
    var book = gBooks.find(book => book.id === id)
    return book
}

function updateRating(bookId, diff) {
    const book = getBookById(bookId)
    const newRating = book.rating + diff

    if (newRating > 0 && newRating <= 5) {
        book.rating = newRating
        _saveBooks()
    }

    return book
}

function _saveBooks() {
    saveToLocalStorage('books', gBooks)
}

function setFilterBy(title, minRating) {
    gQueryOptions.filterBy = { title, minRating: +minRating }
}

function resetFilter() {
    gQueryOptions.filterBy = { title: '', minRating: 1 }
}

function setSortBy(sorter, direction) {
    gQueryOptions.sortBy = { sortField: sorter, sortDir: direction }
}

function setPage(diff) {
    const maxPage = Math.ceil(gBooks.length / gQueryOptions.page.size) - 1

    if (gQueryOptions.page.idx + diff < 0) return gQueryOptions.page.idx = maxPage
    if (gQueryOptions.page.idx + diff > maxPage) return gQueryOptions.page.idx = 0
    gQueryOptions.page.idx += diff
}

function getStatistics(books) {
    return books.reduce((acc, book) => {
        if (book.price < 80) acc.cheap++
        else if (book.price >= 80 && book.price < 200) acc.average++
        else acc.expensive++
        return acc
    }, { cheap: 0, average: 0, expensive: 0 })
}

function getQueryOptions() {
    return gQueryOptions
}