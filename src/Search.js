import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom';
import Book from './Book';

class Search extends React.Component {
    state = {
        search: '',
        results: []
    }

    handleSubmit (e) {
        e.preventDefault();

        BooksAPI.search( this.state.search)
                .then((data) => {
                    this.setState({
                        results: data
                    });
                }, () => {
                    console.log(this.state.results)
                });
    }

    handleChange (e) {
        e.preventDefault();

        this.setState({
            search: e.target.value
        })
    }

    render () {
        let results = this.state.results.map( (book, index) => {
            return <Book 
                        title={book.title}
                        author={book.authors && book.authors[0]}
                        url={ book.imageLinks && (book.imageLinks.thumbnail || book.imageLinks.smallThumbnail || '')} //some books don't have imagelink, this allows those to fail gracefully
                        key={book.author + book.title + index}
                    />
        });

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <input onChange={this.handleChange.bind(this)} type="text" placeholder="Search by title or author"/>
                        </form>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {results}
                    </ol>
                </div>
          </div>
        )
    }
}

export default Search;