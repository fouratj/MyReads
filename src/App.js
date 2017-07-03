import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link, Route } from 'react-router-dom';
import './App.css'
import Shelfs from './Shelfs';
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelfnames: ["Currently Reading", "Want to Read", "Read"]
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" component={() => {
          return <Shelfs shelves={this.state.shelfnames} />
        }} />
        <Route path="/addBook" component={Search} />  
      </div>
    )
  }
}

export default BooksApp
