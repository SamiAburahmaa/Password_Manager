# Password Manager🔒💻👁️

## Introduction
The Password Manager is an application designed to help users manage their passwords securely and efficiently.

## Features
- User Authentication
- Password Encryption
- Create, Read, Update, and Delete Password Entries
- User-Friendly Interface

## Technologies
- Front-End: React, HTML, CSS, JavaScript
- Back-End: Node.js, Express
- Database: MySQL

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/SamiAburahmaa/Password_Manager.git
    cd Password_Manager
    ```

2. **Install dependencies:**
    ```bash
    npm install
    cd client
    npm install
    cd ..
    ```

3. **Set up the database:**
   - Create a database named `password_manager`.
   - Run the SQL scripts provided in the `/database` folder to set up the necessary tables.

4. **Configure environment variables:**
   - Create a `.env` file in the root directory with the following variables:
     ```env
     DB_HOST=your_database_host
     DB_USER=your_database_user
     DB_PASS=your_database_password
     DB_NAME=password_manager
     JWT_SECRET=your_jwt_secret
     ```

5. **Start the development server:**
    ```bash
    npm run dev
    ```

## Usage
- Register and log in to manage your passwords securely.

## Contact
- **Name**: Sami Aburahmaa
- **GitHub**: [SamiAburahmaa](https://github.com/SamiAburahmaa)
