import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom';
import './App.css'
import Shelfs from './Shelfs';
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount () {
    this.getAllBooks();
  }

  updateBook (id, shelf) {
    console.log('updateBook')
    BooksAPI.update({id: id}, shelf)
            .then( (data) => {
              console.log(data);
              this.getBookByID(id, shelf);
            });
  }

  getBookByID (id, shelf) {
    console.log('getBookByID')
    BooksAPI.get(id)
            .then((data) => {
              this.setState( (state) => {
                state.books = state.books
                                    .filter( item => (data.id !== item.id)) //filters out current book, if present
                                    .concat(data); // concats new book with previous state
              });
            });
  }

  getAllBooks () {
    BooksAPI.getAll()
            .then((data) => {
                this.setState({
                  books: data
                });
            });
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/" render={() => {
            return <Shelfs books={this.state.books} updateBook={this.updateBook.bind(this)} /> }
          } 
        />

        <Route path="/search" render={( {history} ) => (
            <Search
              updateBook={ (id, shelf) => {
                this.updateBook(id, shelf);
                history.push('/');
              }
              }
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp;
