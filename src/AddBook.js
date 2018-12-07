import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import Book from './Book';
import {search} from './BooksAPI';

class AddBook extends Component {

  state = {
    newBooks: [],
    searchQuery: '',
  }

  static propTypes = {
    shelves: PropTypes.array.isRequired,
    myBooks: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired
  }

  updateQuery = (searchQuery) => {

    this.setState({searchQuery});

    searchQuery ?
      search(searchQuery).then((newBooks) =>
      {
        if (newBooks.length >= 0) {
          newBooks.sort(sortBy('title', 'authors'));
          this.setState({newBooks});
        } else {
          this.setState({newBooks: []});
        }
      }) :  this.setState({ newBooks: []
      });

  }

  onShelf = (book) => {
    let myBooks = this.props.myBooks;

    let bookIndex = myBooks.findIndex (myBook => myBook.id === book.id);

    bookIndex >= 0 ? book.shelf = myBooks[bookIndex].shelf : book.shelf = 'none';

    return book;
  }

  render() {
    return (
      <div className = "search-books" >
        <div className = "search-books-bar" >
          <Link className = "close-search" to = "/" > Close </Link>
          <div className = "search-books-input-wrapper" >
            < input
              type = "text"
              placeholder = "Search by title or author"
              value = {this.state.searchQuery}
              onChange = {(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>

        { this.state.newBooks.length !== 0 && (
          <div className = "search-books-results" >
            <ol className = "books-grid">
              {
                this.state.newBooks
                  .map(book => (
                    <Book key = {book.id}
                      shelves = {this.props.shelves}
                      book = {this.onShelf(book)}
                      myBooks = {this.props.myBooks}
                      updateBookShelf = {this.props.updateBookShelf}
                    />))
              }
            </ol>
          </div>
        )}
      </div>
    );
  }
}

export default AddBook;
