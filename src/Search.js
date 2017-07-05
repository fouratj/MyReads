import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom';
import Book from './Book';

// This component encapsulates the Search Tab

class Search extends React.Component {
    state = {
        search: '', //this is the user's input
        results: [] //response from the server, if any
    }

    handleSubmit () {
        BooksAPI.search( this.state.search )
                .then((data) => {
                    if (data) { //to guard against undefined
                        this.setState({
                            results: data || [] 
                        });
                    }
                    
                });
    }

    handleChange (e) {
        e.preventDefault();

        this.setState({
            search: e.target.value
        }, () => {
            this.handleSubmit(); // submits forms so user can see prelimirary results
        })
    }

    render () {
        let results = this.state.results.map( (book, index) => {
            return <Book 
                        book={book}
                        key={book.author + book.title + index}
                        updateBook={this.props.updateBook}
                    />
        });

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input onChange={this.handleChange.bind(this)} type="text" placeholder="Search by title or author"/>
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