import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, History } from 'react-router-dom';
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
    BooksAPI.update({id: id}, shelf)
            .then( (data) => {
              this.getBookByID(id, shelf);
            });
  }

  getBookByID (id, shelf) {
    BooksAPI.get(id)
            .then((data) => {
              this.setState( (state) => {
                state.books = state.books
                                        .filter( item => (data.title !== item.title))
                                        .concat(data);
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

        <Route exact path="/" component={() => {
            return <Shelfs books={this.state.books} updateBook={this.updateBook.bind(this)} /> }
          } 
        />

        <Route path="/addBook" component={( {history} ) => {
            return <Search updateBook={ () => {
              this.updateBook.bind(this);
              history.push('/');
              }
             } /> 
          } }
        />  

      </div>
    )
  }
}

export default BooksApp;
