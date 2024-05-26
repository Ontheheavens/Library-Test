import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import { RootState } from '../store/store';
import {Table, Button, Container, Col, Form, Stack} from 'react-bootstrap';
import { deleteBook } from '../store/booksSlice';
import { Book } from "../types/types";

const BookList: React.FC = () => {
    const books = useSelector((state: RootState) => state.books.books);
    const authors = useSelector((state: RootState) => state.authors.authors);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [selectedAuthor, setSelectedAuthor] = useState<string>('');

    const getAuthorNames = (authorIds: string[]): string => {
        return authorIds.map(id => {
            const author = authors.find(author => author.id === id);
            return author ? author.name : 'Unknown Author';
        }).join(', ');
    };

    const filteredBooks = selectedAuthor ? books.filter(book => book.authors.includes(selectedAuthor))
        : books;

    const sortedBooks = (filteredBooks: Book[]) => {
        const sortedBooks = [...filteredBooks];
        sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
        return sortedBooks;
    };

    const handleEdit = (id: string) => {
        navigate(`/books/edit/${id}`);
    };

    return (
        <Container>
            <h2>Book List</h2>
            <Stack direction="horizontal" gap={3}>
                <Col xs="auto">
                    <Form.Select
                        value={selectedAuthor}
                        onChange={(e) => setSelectedAuthor(e.target.value)}
                    >
                        <option value="">All Authors</option>
                        {authors.map(author => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
                {/* Apply Filter button is wholly unnecessary here, as filtering is applied immediately on for change,*/}
                {/* but it is in the requirements, so whatever...*/}
                <Button variant="secondary" onClick={() => setSelectedAuthor(selectedAuthor)}>
                    Apply Filter
                </Button>
                <div className="flex ms-auto" />
                <Link to={'/books/new'} >
                    <Button variant="primary" style={{ color: 'white' }}>Add New Book</Button>
                </Link>
            </Stack>
            <div style={{ marginTop: '20px' }}>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Authors</th>
                        <th>Publication Year</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedBooks(filteredBooks).map(book => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{getAuthorNames(book.authors)}</td>
                            <td>{book.publicationYear}</td>
                            <td className="m-5">
                                <Stack direction="horizontal">
                                    <Button variant="warning" onClick={() => handleEdit(book.id)}>Edit</Button>
                                    <Button variant="danger" onClick={() => dispatch(deleteBook(book.id))}>Delete</Button>
                                </Stack>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default BookList;