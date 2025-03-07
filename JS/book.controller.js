'use strict'

onInit()

function onInit() {
    renderBooks()
}

function renderBooks() {
    const elBooksTable = document.querySelector('.books-table')
    var strHtml = '<thead> <tr> <th>Title</th> <th>Price</th> <th>Action</th> </tr> </thead> '

    const books = getBooks()
    strHtml += books.map(book => `
        <tr>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td>
            <button onclick="onDetailsBook(event, '${book.id}')">Read</button> 
            <button onclick="onUpdateBook('${book.id}')">Update</button> 
            <button onclick="onRemoveBook('${book.id}')">Delete</button>
            </td>
        </tr>
        `).join('')
    elBooksTable.innerHTML = strHtml
}

function onRemoveBook(id) {
    removeBook(id)
    renderBooks()
}

function onUpdateBook(id) {
    var newPrice = +prompt('What is the new price?')
    updateBook(id, newPrice)
    renderBooks()
}

function onAddBook() {
    var newBookName = prompt('What is the name of the new book?')
    var newBookPrice = +prompt('What is the price of the new book?')
    addBook(newBookName, newBookPrice)
    renderBooks()
}

function onDetailsBook(ev, id) {
    ev.stopPropagation()

    const elModal = document.querySelector('.modal')
    const elBookDetails = elModal.querySelector('pre')

    const book = getBookById(id)
    elBookDetails.innerText = JSON.stringify(book, null, 4)

    elModal.showModal()
}