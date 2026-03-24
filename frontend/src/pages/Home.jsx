import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/spinner'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:3000/books')
            .then(res => {
                setBooks(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Spinner />;
    }


    return (
        <div>
            <div>
                <h1>Books List</h1>
                <Link to="/books/create">
                    <MdOutlineAddBox size={30} />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (

                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Publish year</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={book.id}>
                                <td>{index + 1}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.publishYear}</td>
                                <td>
                                    <div>
                                        <Link to={`/books/details/${book.id}`}>
                                            <BsInfoCircle size={20} />
                                        </Link>
                                        <Link to={`/books/edit/${book.id}`}>
                                            <AiOutlineEdit size={20} />
                                        </Link>
                                        <Link to={`/books/delete/${book.id}`}>
                                            <MdOutlineDelete size={20} />
                                        </Link>

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
export default Home