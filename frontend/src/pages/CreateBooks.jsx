import React from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateBooks = () => {
    const [title, setTitle] = React.useState('')
    const [author, setAuthor] = React.useState('')
    const [publishYear, setPublishYear] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate();
    const handleSaveBook = () => {
        const data = {
            title,
            author,
            publishYear: Number(publishYear)
        };
        setLoading(true);
        axios
            .post('http://localhost:3000/books', data)
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
            <h1>Create Book</h1>
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
                <button onClick={handleSaveBook}> Create</button>
            </div>
        </div>
    )
}

export default CreateBooks