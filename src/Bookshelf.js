import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import Loader from 'react-loader-advanced';

/**
 * Array of the available bookshelf categories IDs.
 * @type {[string,string,string]}
 */
const BOOKSHELF_CATEGORY_IDS = [
	'currentlyReading',
	'wantToRead',
	'read',
];

/**
 *  Array of the available bookshelf categories names.
 *  The index matches the BOOKSHELF_CATEGORY_IDS
 * @type {[string,string,string]}
 */
const BOOKSHELF_CATEGORY_NAMES = [
	'Currently Reading',
	'Want to Read',
	'Read',
];

/**
 * Get the array of all available bookshelf categories IDs
 */
export const getBookshelfCategories = () => BOOKSHELF_CATEGORY_IDS;

/**
 * Return the bookshelf category name of the informed id or '' if the id doesn't belong to any category.
 * @param categoryId
 * @returns string
 */
export const getBookshelfCategoryName = (categoryId) => {
	const categoryInternalIndex = BOOKSHELF_CATEGORY_IDS.indexOf(categoryId);

	if (categoryInternalIndex === -1) {
		// If Category doesn't exists returns ''
		return '';
	}

	return BOOKSHELF_CATEGORY_NAMES[categoryInternalIndex];
};

class Bookshelf extends Component {

	static propTypes = {
		// List of books that belongs to the shelf
		books: PropTypes.array.isRequired,
		// Category ID of the shelf
		category: PropTypes.oneOf(BOOKSHELF_CATEGORY_IDS),
		onUpdateBook: PropTypes.func.isRequired
	};

	render() {
		const {books, onUpdateBook} = this.props;

		return (
			<ol>
				<CSSTransitionGroup
					transitionName="move-book-animation"
					className="books-grid"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}>
					{books.map((book) => (
						<li key={book.id}>
							<div className="book">
								<div className="book-top">
									<Loader show={('updating' in book) ? book.updating : false}
											message={<span><img src="three-dots.svg" width="50" alt=""/><div>Updating</div></span>}>
										<div className="book-cover" style={{
											width: 128,
											height: 193,
											backgroundImage: `url(${book.imageLinks.thumbnail})`
										}}>
										</div>
									</Loader>
									<div className="book-shelf-changer">
										<select
											onChange={(event) => {
												onUpdateBook(book, event.target.value);
												this.setState({updating: true})
											}}
											value={('shelf' in book) ? book.shelf : 'none'}>
											<option disabled>Move to...</option>
											{BOOKSHELF_CATEGORY_IDS.map((shelf) => (
												<option key={shelf}
														value={shelf}>{getBookshelfCategoryName(shelf)}</option>
											))}
											<option value="none">None</option>
										</select>
									</div>
								</div>
								<div className="book-title">{book.title}</div>
								<div className="book-authors">{('authors' in book) ? book.authors.join(', ') : ''}</div>
							</div>
						</li>
					))}
				</CSSTransitionGroup>
			</ol>
		);
	}
}

export default Bookshelf;