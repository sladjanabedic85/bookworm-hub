# Bookworm Hub – Development Prompts

This document contains the main prompts used during the development of the **Bookworm Hub** library management application with Lovable and Supabase.

The prompts document the development process, from the initial application requirements to database integration, authentication, and application behavior.

---

## 1. Initial Project Requirements

**Prompt:**

Create a React Library book borrowing application.

The application should be in English and have a modern, clean, responsive design.

The application should include:

- User registration using Supabase authentication
- User login functionality
- User logout functionality
- A form for borrowed books
- A page showing all users
- The possibility to click on a user's name to display the list of books borrowed by that user

The application should contain at least three pages, for example:

- Home page
- Data entry page
- Page for displaying users and borrowed books

The application should include navigation between pages.

The application should contain at least one data entry form.

Data entered through the form should be stored in the Supabase database.

The application should display data from the database on a separate page.

It is necessary to enable the display of details for one selected record. For example, in a library application, clicking on a user's name should display a list of books that the user has borrowed.

The application should contain basic user authentication:

- Registration
- Login
- Logout

---

## 2. Supabase Database

**Prompt:**

Generate SQL queries with tables for Supabase for the Library application.

---

## 3. Supabase Database Structure and Authentication

**Prompt:**

Please create the required database structure in the connected Supabase project.

### Profiles

Create a `profiles` table containing:

- `id` – UUID linked to the authenticated user's ID
- `full_name`
- `email`
- `created_at`

Automatically create a profile when a new user registers.

### Borrowings

Create a `borrowings` table containing:

- `id` – UUID primary key
- `user_id` – UUID referencing `profiles.id`
- `book_title`
- `author`
- `borrowed_at`
- `due_date`
- `returned`
- `created_at`

### Authentication

Use Supabase Auth for:

- Registration
- Login
- Logout

Each registered user should have a profile.

### Permissions / Row Level Security

Configure permissions so that:

- Authenticated users can view all members/profiles.
- Authenticated users can view all borrowings.
- A user can create, update and delete only their own borrowings.
- A user can update only their own profile.

Update the existing Shelfmark frontend so that registration, login, members and book loans use the connected Supabase project.

Please create/apply the necessary Supabase database migrations and update the application code accordingly.

---

## 4. Login Redirect

**Prompt:**

After successful login, redirect the user to the Home page.
