import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom';
import './App.css'
import Shelfs from './Shelfs';
import Search from './Search'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.getBookByID = this.getBookByID.bind(this);
  }
  state = {
    books: []
  }

  componentDidMount () {
    BooksAPI.getAll()
            .then((data) => {
                this.setState({
                  books: data
                });
            });
  }

  updateBook (id, shelf) {
    console.log(id, " ", shelf)
    var self = this;
    BooksAPI.update(id, shelf)
            .then( (data) => {
              this.getBookByID(id, shelf);
            });

    
  }

  getBookByID (id, shelf) {
    BooksAPI.get(id)
            .then((data) => {
              data["shelf"] = shelf;
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
        <Route path="/addBook" component={() => {
            return <Search updateBook={this.updateBook.bind(this)} /> }
          } 
        />  
      </div>
    )
  }
}

export default BooksApp;
