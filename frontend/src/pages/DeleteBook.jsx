import React from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axois from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
const DeleteBook = () => {
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()
    const { id } = useParams();
    const handleDeleteBook = async () => {
        setLoading(true)
        axios
            .delete(`http://localhost:3000/books/${id}`)
            .then((res) => {
                setLoading(false)
                navigate('/')
            })
            .catch((err) => {
                setLoading(false)
                alert('Failed to delete book')
                console.log(err)
            });
    }
    return (
        <div>
            <BackButton />
            <h1 className='text-2xl font-bold mb-4'>Delete Book</h1>
            {loading ? <Spinner /> : ''}
            <div>
                <h3>Are you sure you want to delete this book?</h3>
                <button onClick={handleDeleteBook} className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default DeleteBook