import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Author } from '../types/types';
import {RootState} from "./store";

interface AuthorsState {
    authors: Author[];
}

const initialState: AuthorsState = {
    authors: [],
};

const authorsSlice = createSlice({
    name: 'authors',
    initialState,
    reducers: {
        addAuthor: (state, action: PayloadAction<Author>) => {
            state.authors.push(action.payload);
        },
        updateAuthor: (state, action: PayloadAction<Author>) => {
            const index = state.authors.findIndex(author => author.id === action.payload.id);
            if (index !== -1) {
                state.authors[index] = action.payload;
            }
        },
        deleteAuthor: (state, action: PayloadAction<string>) => {
            state.authors = state.authors.filter(author => author.id !== action.payload);
        },
    },
});

export const selectAuthorByName = (name: string) => createSelector(
    (state: RootState) => state.authors.authors,
    (authors: Author[]) => authors.find(author => author.name === name)
);

export const { addAuthor, updateAuthor, deleteAuthor } = authorsSlice.actions;
export default authorsSlice.reducer;