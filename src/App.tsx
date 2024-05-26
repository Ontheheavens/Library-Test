import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookList from './components/BookList';
import UpdateBookForm from './components/UpdateBookForm';
import AuthorList from "./components/AuthorList";
import AuthorForm from "./components/AuthorForm";

function App() {
    return (
        <div className="App">
            <Router>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link className="navbar-brand" to="/">Library App</Link>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/books">Books</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/authors">Authors</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="container mt-4">
                    <Routes>
                        <Route path="/" element={<BookList />} />
                        <Route path="/books" element={<BookList />} />
                        <Route path="/books/new" element={<UpdateBookForm />} />
                        <Route path="/books/edit/:bookID" element={<UpdateBookForm />} />
                        <Route path="/authors" element={<AuthorList />} />
                        <Route path="/authors/add" element={<AuthorForm />} />
                        <Route path="/authors/edit/:authorID" element={<AuthorForm />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
