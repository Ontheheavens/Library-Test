import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types/types';

interface BooksState {
    books: Book[];
}

const initialState: BooksState = {
    books: [],
};

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action: PayloadAction<Book>) => {
            state.books.push(action.payload);
        },
        updateBook: (state, action: PayloadAction<Book>) => {
            const index = state.books.findIndex(book => book.id === action.payload.id);
            if (index !== -1) {
                state.books[index] = action.payload;
            }
        },
        deleteBook: (state, action: PayloadAction<string>) => {
            state.books = state.books.filter(book => book.id !== action.payload);
        },
    },
});

export const { addBook, updateBook, deleteBook } = booksSlice.actions;
export default booksSlice.reducer;