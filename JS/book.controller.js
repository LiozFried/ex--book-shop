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
    openActionsModal('delete')
}

function onUpdateBook(id) {
    var newPrice = +prompt('What is the new price?')
    updateBook(id, newPrice)
    renderBooks()
    openActionsModal('update')
}

function onAddBook() {
    var newBookName = prompt('What is the name of the new book?')
    var newBookPrice = +prompt('What is the price of the new book?')
    addBook(newBookName, newBookPrice)
    renderBooks()
    openActionsModal('add')
}

function onDetailsBook(ev, id) {
    ev.stopPropagation()

    const elModal = document.querySelector('.modal')
    const elBookDetails = elModal.querySelector('pre')
    const elTitle = elBookDetails.querySelector('h3 span')
    const elPrice = elBookDetails.querySelector('h4 span')
    const elDescription = elBookDetails.querySelector('p span')
    const elBookImg = elModal.querySelector('img')

    const book = getBookById(id)

    elTitle.innerText = book.title
    elPrice.innerText = book.price
    elDescription.innerText = getRandomParagraph()
    elBookImg.src = book.imgUrl

    elModal.showModal()
}

function onSearchBook(searchValue) {
    searchBook(searchValue)
    renderBooks()
}

function onResetSearch() {
    searchBook('')
    renderBooks()

    document.querySelector('.book-title').value = ''
}

function openActionsModal(action) {
    var modalText = ''
    if (action === 'delete') modalText = 'Book has removed'
    else if (action === 'update') modalText = 'Books price has changed'
    else if (action === 'add') modalText = 'New book has added'
    else return

    const elActionModal = document.querySelector('.actions-modal')
    elActionModal.innerText = modalText
    elActionModal.style.display = 'block'

    setTimeout(() =>
        elActionModal.style.display = 'none'
        , 2000)
}