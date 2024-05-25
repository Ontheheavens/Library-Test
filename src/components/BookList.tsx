import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store/store';
import { Table, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { deleteBook } from '../store/booksSlice';
import {Book} from "../types/types";

const BookList: React.FC = () => {
    const books = useSelector((state: RootState) => state.books.books);
    const authors = useSelector((state: RootState) => state.authors.authors);
    const dispatch = useDispatch();

    const [selectedAuthor, setSelectedAuthor] = useState<string>('');

    const getAuthorNames = (authorIds: string[]): string => {
        return authorIds.map(id => {
            const author = authors.find(author => author.id === id);
            return author ? author.name : 'Unknown Author';
        }).join(', ');
    };

    // Filter books by selected author
    const filteredBooks = selectedAuthor ? books.filter(book => book.authors.includes(selectedAuthor))
        : books;

    // Sort a copy of book array by title; sorting array itself leads to type error.
    const sortedBooks = (filteredBooks: Book[]) => {
        filteredBooks.forEach(console.log);
        const sortedBooks = [...filteredBooks];
        sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
        return filteredBooks;
    };

    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <h2>Books</h2>
                </Col>
                <Col className="text-right">
                    <Link to={'/books/new'}>
                    <Button variant="primary">Add New Book</Button>
                    </Link>
                </Col>
            </Row>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formAuthorFilter">
                    <Form.Label column sm="2">Filter by Author</Form.Label>
                    <Col sm="6">
                        <Form.Control
                            as="select"
                            value={selectedAuthor}
                            onChange={(e) => setSelectedAuthor(e.target.value)}
                        >
                            <option value="">All Authors</option>
                            {authors.map(author => (
                                <option key={author.id} value={author.id}>
                                    {author.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Col>
                    <Col sm="4">
                        <Button variant="secondary" onClick={() => setSelectedAuthor('')}>
                            Apply Filter
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
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
                {books.map(book => (
                    <tr key={book.id}>
                        <td>{book.id}</td>
                        <td>{book.title}</td>
                        <td>{getAuthorNames(book.authors)}</td>
                        <td>{book.publicationYear}</td>
                        <td>
                            <Link to={`/books/edit/${book.id}`}>
                            <Button
                                variant="warning"
                                size="sm"
                                className="mr-2"
                            >
                                Edit
                            </Button>
                            </Link>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => {
                                    console.log(book.title)
                                    dispatch(deleteBook(book.id))}
                            }
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default BookList;