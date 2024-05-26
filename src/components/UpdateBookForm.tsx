import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addBook, updateBook } from '../store/booksSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Select from 'react-select'; // Import React-Select
import { Book } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

const UpdateBookForm: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { bookID } = useParams<{ bookID: string }>();
    const book = useSelector((state: RootState) => state.books.books.find((b: Book) => b.id === bookID));
    const authors = useSelector((state: RootState) => state.authors.authors);

    const configureForm = withFormik({
        mapPropsToValues: () => ({
            title: book?.title || '',
            publicationYear: book?.publicationYear || undefined,
            authors: book?.authors || [],
        }),
        validationSchema: Yup.object({
            title: Yup.string().required('Required'),
            publicationYear: Yup.number().required('Required'),
            authors: Yup.array().min(1, 'At least one author is required').required('Required'),
        }),
        handleSubmit(values: Partial<Book>): void {
            if (book) {
                dispatch(updateBook({ ...book, ...values } as Book));
            } else {
                dispatch(addBook({ id: uuidv4(), ...values } as Book));
            }
            navigate('/books');
        }
    });

    const authorOptions = authors.map(author => ({
        value: author.id,
        label: author.name
    }));

    const ConstructedForm = (props : any) => {
        const {
            values,
            touched,
            errors,
            handleChange,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
        } = props;

        return (
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        onChange={handleChange}
                        value={values.title}
                        isInvalid={touched.title && !!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="publicationYear">
                    <Form.Label>Publication Year</Form.Label>
                    <Form.Control
                        type="number"
                        name="publicationYear"
                        onChange={handleChange}
                        value={values.publicationYear}
                        isInvalid={touched.publicationYear && !!errors.publicationYear}
                    />
                    <Form.Control.Feedback type="invalid">{errors.publicationYear}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="authors">
                    <Form.Label>Authors</Form.Label>
                    <Select
                        id="authors"
                        options={authorOptions}
                        value={authorOptions.filter(option => values.authors?.includes(option.value))}
                        onChange={(selectedOptions) => setFieldValue('authors', selectedOptions.map(option => option.value))}
                        onBlur={() => setFieldTouched("authors", true)}
                        closeMenuOnSelect={false}
                        isMulti
                    />
                    {/*CSS validation is unsatisfactory here, needs time to implement properly.*/}
                    {errors.authors && touched.authors && (
                        <div style={{ color: "red", marginTop: ".5rem" }}>
                            {errors.authors}
                        </div>
                    )}
                </Form.Group>
                <Button className="mt-3 w-auto" type="submit">{book ? 'Save' : 'Add'}</Button>
            </Form>
        );
    };

    const CompletedForm = configureForm(ConstructedForm);

    return (
        <Container>
            <h2>{book ? 'Edit Book' : 'Add New Book'}</h2>
            <Row className="justify-content-md-center">
                <Col md={9}>
                    <CompletedForm />
                </Col>
            </Row>
        </Container>
    );
};

export default UpdateBookForm;