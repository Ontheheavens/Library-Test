import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { RootState } from '../store/store';
import { addAuthor, updateAuthor } from '../store/authorsSlice';
import { Author } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

const AuthorForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { authorID } = useParams<{ authorID: string }>();
    const author = useSelector((state: RootState) =>
        state.authors.authors.find((a: Author) => a.id === authorID)
    );

    const formik = useFormik({
        initialValues: {
            name: author?.name || '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
        }),
        onSubmit: (values: Partial<Author>) => {
            if (author) {
                dispatch(updateAuthor({ ...author, ...values } as Author));
            } else {
                dispatch(addAuthor({ id: uuidv4(), ...values } as Author));
            }
            navigate('/authors');
        },
    });

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2>{author ? 'Edit Author' : 'Add Author'}</h2>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                isInvalid={formik.touched.name && !!formik.errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit">{author ? 'Save' : 'Add'}</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AuthorForm;