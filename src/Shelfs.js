import React from 'react'
import { Link } from 'react-router-dom';
import Shelf from './Shelf'; 

// spelt shelves wrong
class Shelfs extends React.Component {

    render() {

        let wantToRead = this.props.books.filter( book => (book.shelf === "wantToRead")),
            read = this.props.books.filter( book => (book.shelf === "read")),
            currentlyReading = this.props.books.filter( book => (book.shelf === "currentlyReading"));
        // Broke out each individual shelf into it's own component manually instead of programmatically
        // since it is a static app, and for now, that makes it easier to reason about this way
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>

                <Shelf 
                    key="currentlyReading" 
                    title="Currently Reading" 
                    books={currentlyReading}
                    updateBook={this.props.updateBook}
                     />
                <Shelf 
                    key="wantToRead" 
                    title="Want to Read" 
                    books={wantToRead}
                    updateBook={this.props.updateBook}
                     />
                <Shelf 
                    key="read" 
                    title="Read" 
                    books={read}
                    updateBook={this.props.updateBook}
                     />

                <div className="open-search">
                    <Link to="addBook">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default Shelfs;