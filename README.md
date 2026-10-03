# Bookworm Hub

Bookworm Hub is a modern and responsive library book borrowing application built with React and Supabase.

The application allows users to register, log in, manage their book borrowings, browse library members, and view books borrowed by individual users.

# Live Demo

Live application:
https://book-buddy-central-39.lovable.app/

Features

User registration

User login and logout

Supabase authentication

Add new book borrowings

View borrowed books

View all registered members

View books borrowed by a selected member

User-specific borrowing management

Responsive design

Supabase database integration

Row Level Security (RLS)

# Technologies

React

TypeScript

TanStack

Vite

Tailwind CSS

Supabase

Supabase Auth

PostgreSQL

Lovable

Git & GitHub

# Database

The application uses Supabase for data storage and authentication.

The main database tables are:

profiles

Stores information about registered users.

id

full_name

email

created_at

borrowings

Stores information about borrowed books.

id

user_id

book_title

author

borrowed_at

due_date

returned

created_at

# Authentication & Security

Authentication is handled using Supabase Auth.

Row Level Security (RLS) policies ensure that:

Authenticated users can view members and borrowings.

Users can create, update and delete only their own borrowings.

Users can update only their own profile.

# Development with Lovable

The application was developed with the assistance of Lovable.

The main prompts used during development are documented in:

PROMPTS.md

This file shows the development process, including the initial application requirements, Supabase database structure, authentication, permissions and application behavior.

# Run Locally

Clone the repository:

git clone https://github.com/sladjanabedic85/bookworm-hub.git

Navigate to the project directory:

cd bookworm-hub

Install dependencies:

npm install

Start the development server:

npm run dev

# Author

Sladjana Bedic

GitHub: https://github.com/sladjanabedic85
