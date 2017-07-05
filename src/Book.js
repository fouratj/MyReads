import React from 'react'

// Created a Book component that encapsulates each book object
class Book extends React.Component {
    state = {
        'option': '' //user option such as currentlyReading etc
    }

    handleChange(e) {
        this.setState({
            'option': e.target.value
        }, () => {
            this.props.updateBook(this.props.book.id, this.state.option);
        });
    }
                              
    render () {
        let url = this.props.book.imageLinks && (this.props.book.imageLinks.thumbnail || this.props.book.imageLinks.smallThumbnail || '');
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + url + ')' }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={this.handleChange.bind(this)}>
                            <option value="none" selected>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{this.props.book.author}</div>
            </div>
        )
    }
}

export default Book;

