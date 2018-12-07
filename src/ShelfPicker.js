import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ShelfPicker extends Component {

  static propTypes = {
    shelves: PropTypes.array.isRequired,
    book: PropTypes.object.isRequired,
    myBooks: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired
  }

  render() {

    return (
      <div className="book-shelf-changer">
        <select
          onChange={
            /* set up the select event */
            (event) => this.props.updateBookShelf (this.props.book, event.target.value, this.props.myBooks)}
          value = {
            /* default to the book shelf property.  If the book does not have
               a shelf, then set to None */

            this.props.book.shelf || 'none'}
        >
          {/* TODO:  Set based on shelves state, not hard coded */}
          <option value="move" disabled>Move to...</option>
          {this.props.shelves
            .map(shelf => (
              <option key = {shelf.id} value={shelf.tag}>{shelf.pickerText}</option>
            ))}
          <option value="none">None</option>
        </select>
      </div>
    );}
}

export default ShelfPicker;
