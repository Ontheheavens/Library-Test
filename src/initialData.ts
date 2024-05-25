import { v4 as uuid } from 'uuid';
import {Author, Book} from "./types/types";

export const createAuthor = (name: string): Author => ({
    id: uuid(),
    name,
});

export const createBook = (title: string, authorIds: string[], publicationYear: number): Book => ({
    id: uuid(),
    title,
    authors: authorIds,
    publicationYear,
});

export const initialAuthors = [
    createAuthor('J.K. Rowling'),
    createAuthor('George R.R. Martin'),
    createAuthor('J.R.R. Tolkien'),
    createAuthor('Isaac Asimov'),
    createAuthor('Arthur C. Clarke'),
    createAuthor('Stephen King'),
    createAuthor('Agatha Christie'),
    createAuthor('Ernest Hemingway'),
    createAuthor('Mark Twain'),
    createAuthor('Jane Austen'),
    createAuthor('F. Scott Fitzgerald'),
    createAuthor('Charles Dickens'),
    createAuthor('Terry Pratchett'),
    createAuthor('Neil Gaiman'),
    createAuthor('Douglas Preston'),
    createAuthor('Lincoln Child'),
];

export const initialBooks = [
    createBook('Harry Potter and the Sorcerer\'s Stone', [initialAuthors[0].id], 1997),
    createBook('Harry Potter and the Chamber of Secrets', [initialAuthors[0].id], 1998),
    createBook('A Game of Thrones', [initialAuthors[1].id], 1996),
    // createBook('A Clash of Kings', [initialAuthors[1].id], 1998),
    // createBook('The Hobbit', [initialAuthors[2].id], 1937),
    // createBook('The Lord of the Rings', [initialAuthors[2].id], 1954),
    // createBook('Foundation', [initialAuthors[3].id], 1951),
    // createBook('I, Robot', [initialAuthors[3].id], 1950),
    // createBook('2001: A Space Odyssey', [initialAuthors[4].id], 1968),
    // createBook('Rendezvous with Rama', [initialAuthors[4].id], 1973),
    // createBook('The Shining', [initialAuthors[5].id], 1977),
    // createBook('It', [initialAuthors[5].id], 1986),
    // createBook('Murder on the Orient Express', [initialAuthors[6].id], 1934),
    // createBook('The ABC Murders', [initialAuthors[6].id], 1936),
    // createBook('The Old Man and the Sea', [initialAuthors[7].id], 1952),
    // createBook('A Farewell to Arms', [initialAuthors[7].id], 1929),
    // createBook('The Adventures of Tom Sawyer', [initialAuthors[8].id], 1876),
    // createBook('Adventures of Huckleberry Finn', [initialAuthors[8].id], 1884),
    // createBook('Pride and Prejudice', [initialAuthors[9].id], 1813),
    // createBook('Sense and Sensibility', [initialAuthors[9].id], 1811),
    // createBook('The Great Gatsby', [initialAuthors[10].id], 1925),
    // createBook('Tender Is the Night', [initialAuthors[10].id], 1934),
    // createBook('A Tale of Two Cities', [initialAuthors[11].id], 1859),
    // createBook('Great Expectations', [initialAuthors[11].id], 1861),
    // createBook('Good Omens', [initialAuthors[12].id, initialAuthors[13].id], 1990),
    // createBook('Relic', [initialAuthors[14].id, initialAuthors[15].id], 1995)
];