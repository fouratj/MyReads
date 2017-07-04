import React from 'react'
import * as BooksAPI from './BooksAPI'
import {  } from 'react-router-dom';

class Book extends React.Component {
    state = {
        'option': ''
    }

    handleSubmit(e) {
        this.setState({
            'option': e.target.value
        }, () => {
            console.log(this.state);
        })
    }
    render () {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + this.props.url + ')' }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={this.handleSubmit.bind(this)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">{this.props.author}</div>
            </div>

        )
    }
}

export default Book;

