import React, {useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import UpdateBookForm from './components/UpdateBookForm';
import { useDispatch } from 'react-redux';
import { addAuthor } from './store/authorsSlice';
import { addBook } from './store/booksSlice';
import { initialAuthors, initialBooks } from './initialData';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(Date.now());

    initialAuthors.forEach(author => {
      dispatch(addAuthor(author));
    });

    initialBooks.forEach(book => {
      dispatch(addBook(book));
      console.log(book)
    });
  }, [dispatch]);

  return (
      <Router>
          <h1>Library App</h1>
          <Routes>
            <Route path="/books" element={<BookList />} />
            <Route path="/books/new" element={<UpdateBookForm />} />
            <Route path="/books/edit/:id" element={<UpdateBookForm />} />
            <Route path="/" element={<BookList />} />
          </Routes>
      </Router>
  );
}

export default App;
