
# Library-Test

#### Book View:
![Book View](https://raw.githubusercontent.com/Ontheheavens/Library-Test/master/showcase/Books.png)

#### Author View:
![Author View](https://raw.githubusercontent.com/Ontheheavens/Library-Test/master/showcase/Authors.png)

## Application Requirements:
- Develop a single-page application (SPA) library with a list of books and authors using ReactJS.
- No backend development is required. The application starts without any data, and books are added and stored in the application's store within the browser session.

#### Page List:
1. **Book List**
   - Filter books by author
     - Dropdown list with single selection of available authors
     - Apply button - applies the filter with page refresh
   - Table of books sorted by title, with columns:
     - ID
     - Title
     - Author(s)
     - Publication Year
     - Edit button - navigates to the book editing page
     - Delete button - deletes the book
   - Add button - navigates to the book addition page

2. **Add/Edit Book Page**
   - Title field
   - Publication Year field
   - Authors field - multiple selection from available authors
   - Add/Save button

3. **Author List Page**
   - Table of authors sorted alphabetically, with columns:
     - ID
     - Full Name
     - Number of Books
     - Edit button - navigates to the author editing page
     - Delete button - deletes the author
   - Add button - navigates to the author addition page

4. **Add/Edit Author Page**
   - Full Name field
   - Add/Save button

#### Requirements:
1. A book can have multiple authors
2. An author can have multiple books
3. Different pages should have different URLs
4. Use Formik package with yup validation for forms, all form fields are mandatory
5. Choose between Redux, MobX, or MobX-state-tree for state store
6. TypeScript usage is preferred
7. Use functional components only, no class components allowed
8. Mandatory use of React hooks and custom hooks
9. Visual appearance (design/layout) will not be considered, default browser styles or Bootstrap will suffice
10. Provide a Git repository link where we can clone, install, and open the application locally in a browser.

## Available Scripts

### `npm start`
### `npm test`
### `npm run build`
