export interface Book {
    id: string;
    title: string;
    authors: string[]; // Array of author IDs
    publicationYear: number;
}

export interface Author {
    id: string;
    name: string;
}