'use strict'

onInit()

function onInit() {
    renderBooks()
}

function renderBooks() {
    const elBooksTable = document.querySelector('.books-table')
    var strHtml = ''
    const books = getBooks()
    strHtml += books.map(book => `
        <tr>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td>${book.rating}</td>
            <td>
            <button onclick="onDetailsBook(event, '${book.id}')">Read</button> 
            <button onclick="onUpdateBook('${book.id}')">Update</button> 
            <button onclick="onRemoveBook('${book.id}')">Delete</button>
            </td>
        </tr>
        `).join('')
    elBooksTable.innerHTML = strHtml
    renderStatistics(books)
}

function renderStatistics(books) {
    var statistics = getStatistics(books)
    const elStatistics = document.querySelector('footer')
    elStatistics.querySelector('.expensive span').innerText = statistics.expensive
    elStatistics.querySelector('.average span').innerText = statistics.average
    elStatistics.querySelector('.cheap span').innerText = statistics.cheap
}

function onRemoveBook(id) {
    removeBook(id)
    renderBooks()
    openActionsModal('delete')
}

function onUpdateBook(id) {
    var newPrice = +prompt('What is the new price?')
    if (isNaN(newPrice)) return
    updateBook(id, newPrice)
    renderBooks()
    openActionsModal('update')
}

function onAddBook() {
    var newBookName = prompt('What is the name of the new book?')
    var newBookPrice = +prompt('What is the price of the new book?')
    if (isNaN(newBookPrice) || !newBookName) return
    addBook(newBookName, newBookPrice)
    renderBooks()
    openActionsModal('add')
}

function onDetailsBook(ev, id) {
    ev.stopPropagation()

    const elModal = document.querySelector('.modal')
    const elBookDetails = elModal.querySelector('pre')
    const elTitle = elBookDetails.querySelector('h3 span')
    const elPrice = elBookDetails.querySelector('.price span')
    const elDescription = elBookDetails.querySelector('p span')
    const elBookImg = elModal.querySelector('img')
    const elRating = elBookDetails.querySelector('.rate')

    const book = getBookById(id)

    elTitle.innerText = book.title
    elPrice.innerText = book.price
    elDescription.innerText = getRandomParagraph()
    elBookImg.src = book.imgUrl
    elRating.innerText = book.rating

    elModal.dataset.bookId = id

    elModal.showModal()
}

function onUpdateRating(ev, diff) {
    ev.preventDefault()

    const elModal = document.querySelector('.modal')
    const bookId = elModal.dataset.bookId
    const book = updateRating(bookId, +diff)

    elModal.querySelector('.rate').innerText = book.rating
    renderBooks()
}

function onSetFilterBy() {
    const title = document.querySelector('.book-title').value
    const minRating = document.querySelector('.min-rating').value

    setFilterBy(title, minRating)
    renderBooks()
}

function onResetFilter() {
    resetFilter()
    renderBooks()

    document.querySelector('.book-title').value = ''
    document.querySelector('.min-rating').value = 1
}

function onSort(elBtn, sorter, direction) {
    const elBtns = document.querySelectorAll('.sort')
    elBtns.forEach(btn => btn.classList.remove('active'))
    elBtn.classList.add('active')

    setSortBy(sorter, direction)
    renderBooks()
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