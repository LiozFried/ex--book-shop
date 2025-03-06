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
            <td><button>Read</button><button>Update</button><button>Delete</button></td>
        </tr>
        `).join('')
    elBooksTable.innerHTML = strHtml    
}