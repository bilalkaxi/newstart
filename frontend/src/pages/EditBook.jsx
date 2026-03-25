import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditBook = () => {
    const [title, setTitle] = React.useState('')
    const [author, setAuthor] = React.useState('')
    const [publishYear, setPublishYear] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:3000/books/${id}`)
            .then((res) => {
                const { title, author, publishYear } = res.data;
                setTitle(title);
                setAuthor(author);
                setPublishYear(publishYear);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                alert('Failed to fetch book');
                console.log(err);
            });
    }, [])
    const handleEditBook = () => {
        const data = {
            title,
            author,
            publishYear: Number(publishYear)
        };
        setLoading(true);
        axios
            .put(`http://localhost:3000/books/${id}`, data)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((err) => {
                setLoading(false);
                alert('Failed to save book');
                console.log(err);
            });

    }
    return (
        <div>
            <BackButton />
            <h1>Edit Book</h1>
            {loading ? <Spinner /> : ''}
            <div>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Author</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div>
                    <label>Publish Year</label>
                    <input
                        type="number"
                        value={publishYear}
                        onChange={(e) => setPublishYear(e.target.value)}
                    />
                </div>
                <button onClick={handleEditBook}> Edit</button>
            </div>
        </div>
    )
}

export default EditBook