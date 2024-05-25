import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addBook, updateBook } from '../store/booksSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Book } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

const UpdateBookForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { bookID } = useParams<{ bookID: string }>();
    const book = useSelector((state: RootState) => state.books.books.find((b: { id: string; }) => b.id === bookID));
    const authors = useSelector((state: RootState) => state.authors.authors);

    const formik = useFormik({
        initialValues: {
            title: book?.title || '',
            publicationYear: book?.publicationYear || 0,
            authors: book?.authors || [],
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Required'),
            publicationYear: Yup.number().required('Required'),
            authors: Yup.array().min(1, 'At least one author is required').required('Required'),
        }),
        onSubmit: (values: Partial<Book>) => {
            if (book) {
                dispatch(updateBook({ ...book, ...values } as Book));
            } else {
                dispatch(addBook({ id: uuidv4(), ...values } as Book));
            }
            navigate('/books');
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input id="title" name="title" type="text" onChange={formik.handleChange} value={formik.values.title} />
                {formik.errors.title && <div>{formik.errors.title}</div>}
            </div>
            <div>
                <label htmlFor="publicationYear">Publication Year</label>
                <input id="publicationYear" name="publicationYear" type="number" onChange={formik.handleChange} value={formik.values.publicationYear} />
                {formik.errors.publicationYear && <div>{formik.errors.publicationYear}</div>}
            </div>
            <div>
                <label htmlFor="authors">Authors</label>
                <select multiple id="authors" name="authors" onChange={formik.handleChange} value={formik.values.authors}>
                    {authors.map(author => (
                        <option key={author.id} value={author.id}>{author.name}</option>
                    ))}
                </select>
                {formik.errors.authors && <div>{formik.errors.authors}</div>}
            </div>
            <button type="submit">{book ? 'Save' : 'Add'}</button>
        </form>
    );
};

export default UpdateBookForm;