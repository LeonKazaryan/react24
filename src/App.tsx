import React from "react";
import { useState } from "react";
import { Book } from "./book";
import { BooksStorage } from "./BooksStorage";
import Item from "antd/lib/list/Item";

function BooksList({ books }: any) {
  let [isGiven, setIsGiven] = useState([]);
  return (
    <div className="books_list">
      <ul>
        {books.map((book: any, index: number) => {
          isGiven.push(book.isGiven);
          return (
            <li key={index}>
              <p>Название книги: {book.name}</p>
              <p>Автор книги: {book.author}</p>
              <p>Дата публикации: {book.publishDate}</p>
              <p>Статус: {isGiven[index] ? "Выдана" : "Не выдана"}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  book.isGiven = !book.isGiven;
                  isGiven[index] = book.isGiven;
                  setIsGiven([...isGiven]);
                }}
              >
                {isGiven[index] ? "Изъять" : "Выдать"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function App() {
  let booksStorage = new BooksStorage();
  let [booksList, setBooksList] = useState<any>(() => {
    return localStorage.getItem("bookList") || [];
  });

  return (
    <div>
      <form name="bookData" id="bookData">
        <label>
          Название книги:
          <input type="text" name="bookName" id="bookName" required={true} />
        </label>
        <label>
          Автор книги:
          <input type="text" name="bookAuthor" id="bookAuthor" />
        </label>
        <label>
          Дата издания:
          <input type="date" name="publishDate" id="publishDate" />
        </label>
        <button
          onClick={(e) => {
            e.preventDefault();
            let formData = new FormData(
              document.querySelector("form") || undefined
            );
            // console.log(formData.get('bookName'));
            let bookTemplate = new Book(
              formData.get("bookName")?.toString() || "Default",
              formData.get("bookAuthor")?.toString() || "Default",
              formData.get("publishData")?.toString() ||
                new Date().getDate().toString()
            );
            bookTemplate.isGiven = false;
            booksStorage.addBook(bookTemplate);
            console.log("book added");
          }}
        >
          Добавить книгу
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setBooksList([]);
            booksList = [];
            booksStorage.getBooks().then((data) => {
              data.forEach((item: any) => {
                setBooksList((oldValue: any[]) => [...oldValue, item]);
                booksList.push(item);
              });
              // document.getElementById('books-list-container')?.append(BooksList(booksList).toString());
            });
          }}
        >
          Получить список книг
        </button>
      </form>
      <div id="books-list-container"></div>
      <BooksList books={booksList} />
    </div>
  );
}

export default App;
