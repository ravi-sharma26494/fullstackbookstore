import React from 'react'
import './Booklist.css'

const BooksList = () => {
  return (
    <div className='booklist-container'>
        <div className='contents'>
            <div className='Header'>
                <h1>BooksList</h1>
            </div>
            <div className='add-books'>
                <button type="button">+ Add New Book</button>
            </div>

            <div className='books-section'>
                <div className='item-book'>
                    <div className='image-book'>
                        <img src='' alt='book-cover'/>
                    </div>
                    <div className='details-book'>
                        <p>Title</p>
                        <p>Author</p>
                        <p>Genre</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BooksList