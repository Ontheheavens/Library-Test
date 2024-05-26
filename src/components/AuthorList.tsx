import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { deleteAuthor } from '../store/authorsSlice';
import { Author } from '../types/types';

const AuthorList: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authors = useSelector((state: RootState) => state.authors.authors);
    const books = useSelector((state: RootState) => state.books.books);

    const authorBookCounts: { [authorId: string]: number } = {};
    authors.forEach(author => {
        authorBookCounts[author.id] = books.filter(book => book.authors.includes(author.id)).length;
    });

    const handleEdit = (id: string) => {
        navigate(`/authors/edit/${id}`);
    };

    const handleDelete = (id: string) => {
        dispatch(deleteAuthor(id));
    };

    const sortedAuthors = [...authors].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div>
            <h2>Authors</h2>
            <Button onClick={() => navigate('/authors/add')} className="mb-3">Add Author</Button>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Book Count</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {sortedAuthors.map((author: Author) => (
                    <tr key={author.id}>
                        <td>{author.id}</td>
                        <td>{author.name}</td>
                        <td>{authorBookCounts[author.id]}</td>
                        <td className="m-5">
                            <Button variant="warning" onClick={() => handleEdit(author.id)}>Edit</Button>{' '}
                            <Button variant="danger" onClick={() => handleDelete(author.id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AuthorList;