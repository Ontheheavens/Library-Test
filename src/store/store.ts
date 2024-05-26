import {configureStore} from '@reduxjs/toolkit';
import booksReducer from './booksSlice';
import authorsReducer from './authorsSlice';
import {initialAuthors, initialBooks} from './initialData';

const preloadedState = {
    books: { books: initialBooks },
    authors: { authors: initialAuthors },
};

const store = configureStore({
    reducer: {
        books: booksReducer,
        authors: authorsReducer,
    },
    preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;