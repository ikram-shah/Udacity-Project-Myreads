import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShelfPicker from './ShelfPicker';


class Book extends Component {
  static propTypes = {
    shelves: PropTypes.array.isRequired,
    book: PropTypes.object.isRequired,
    myBooks: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired
  }

  setAuthors () {

    let authorList = '';
    let book = this.props.book;
    if (book.hasOwnProperty('authors')) {
      book.authors.forEach (author => {
        authorList += author += ', ';
      });}
    return authorList.slice(0, -2);
  }

  render() {

    let bookAuthors = this.setAuthors ();
    return (
      <li key={this.props.book.id}>
        <div className="book">
          <div className="book-top">

            { /* Use class default for books that don't have a cover.
                 Else, use the supplied book cover image */

              this.props.book.hasOwnProperty('imageLinks')?
                (<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.smallThumbnail})`}}> </div>) :
                (<div className="book-cover" style={{ width: 128, height: 193}}></div>)
            }

            { /* Render the shelf picker for this book */}

            <ShelfPicker
              shelves = {this.props.shelves}
              book = {this.props.book}
              myBooks = {this.props.myBooks}
              updateBookShelf = {this.props.updateBookShelf}
            />
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{bookAuthors}</div>
        </div>
      </li>
    );}
}

export default Book;
