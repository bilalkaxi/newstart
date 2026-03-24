import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/spinner'
const ShowBook = () => {
    const [book, setBook] = useState({})
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/books/${id}`)
                    .then((response) => {
                        setBook(response.data)
                        console.log(response.data)
                        setLoading(false)
                    })
            } catch (error) {
                console.error(error)
                setLoading(false)
            }
        }

        fetchBook()
    }, [id])
    return (
        <div>
            <BackButton />
            <h1>Show Book</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div>
                    <p><strong>Id:</strong> {book.id}</p>
                    <p><strong>Title:</strong> {book.title}</p>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Published Year:</strong> {book.publishYear}</p>
                    <p><strong>Created At:</strong> {book.createdAt ? new Date(book.createdAt).toLocaleString() : 'N/A'}</p>
                    <p><strong>Updated At:</strong> {book.updatedAt ? new Date(book.updatedAt).toLocaleString() : 'N/A'}</p>
                </div>
            )}
        </div>
    )
}

export default ShowBook