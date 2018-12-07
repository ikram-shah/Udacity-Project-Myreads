import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import {getAll} from './BooksAPI';
import Book from './Book';

class BookCase extends Component {

  static propTypes = {
    shelves: PropTypes.array.isRequired,
    myBooks: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired
  }

  componentDidMount() {

    getAll().then((myBooks) => {
      if (myBooks.length >= 0) {
        myBooks.sort(sortBy('title', 'authors'));
        this.setState({myBooks: myBooks});
      } else {
        this.setState({myBooks: []});
      }
    });
  }
 
  render() {

    return (

      <div className='bookshelf'>

        {/* map each shelf */}

        {this.props.shelves.map(shelf => (
          <div key={shelf.name}>
            <h2  className="bookshelf-title" > {shelf.name} </h2>
            <ol className="books-grid">
              {this.props.myBooks

              /* filter the books for the current bookshelf */

                .filter ((book) => {return book.shelf === shelf.tag;})

              /* now map the books and add them to the shelf */

                .map(book => (
                  <Book key={book.id}
                    shelves={this.props.shelves}
                    book={book}
                    myBooks={this.props.myBooks}
                    updateBookShelf = {this.props.updateBookShelf}
                  />
                ))}
            </ol>
          </div>
        ))}
      </div>
    );
  }
}
export default BookCase;
