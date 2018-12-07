import React from 'react';
import { Route, Link } from 'react-router-dom';
import BookCase from './BookCase';
import AddBook from './AddBook';
import {getAll, update} from './BooksAPI';
import sortBy from 'sort-by';
import './App.css';


class App extends React.Component {

  /*  Set the state for the shelves.  You can add new shelves or change the existing ones here*/

  state = {
    shelves: [
      {id: 1, name: 'Books I am currently reading', tag: 'currentlyReading', pickerText: 'Currently Reading'},
      {id: 2, name: 'Books I want to read', tag: 'wantToRead', pickerText: 'Want to Read'},
      {id: 3, name: 'Books I have finished reading', tag: 'read', pickerText: 'Read'}
    ],
    myBooks: []
  };


  componentDidMount() {

    // retrieve all of my books using getAll from BooksAPI, then set the state for the books
    getAll().then((myBooks) => {
      if (myBooks.length >= 0) {
        myBooks.sort(sortBy('title', 'authors'));
        this.setState({myBooks});
      } else {
        this.setState({myBooks: []});
      }
    });
  }

  updateBookShelf = (changedBook, newShelf, books) => {

    /* Locate the current book index in the books object array */

    let bookIndex = books.findIndex (book => book.id === changedBook.id);

    /*  If book is already in Book Case, then update the book.  Else, add book to the Book Case*/
    changedBook.shelf = newShelf;
    bookIndex >= 0 ?
      (books[bookIndex] = changedBook) :
      (books.push(changedBook));

    /* Update books database using the update function from BooksAPI */
    update (changedBook, newShelf);

    /* Call setState to update books */

    this.setState({ myBooks: books.sort(sortBy('title', 'authors')) });
  }

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>My Reads</h1>
          </div>

          { /*Set up the route for the main page:  BookCase */ }

          <Route exact path="/"  render={() => (
            <div>
              <BookCase
                shelves={this.state.shelves}
                myBooks = {this.state.myBooks}
                updateBookShelf = {this.updateBookShelf}
              />
              <Link className = "open-search"to="/search">Add a book</Link>
            </div>
          )}/>
          { /*Set up the route for the search page:  AddBook */}

          <Route path="/search" render={() => (
            <div className="list-books'title">
              <h1>Add To My Book List</h1>
              <div>
                <AddBook
                  shelves={this.state.shelves}
                  myBooks = {this.state.myBooks}
                  updateBookShelf = {this.updateBookShelf}
                />
              </div>
            </div>
          )}/>
        </div>
      </div>
    );
  }
}

export default App;
