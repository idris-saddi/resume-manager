# Resume Manager API

## Description
The Resume Manager API is a backend system designed to manage resumes, skills, and users. It provides endpoints for creating, updating, and deleting resumes, as well as managing skills and user accounts. The API allows users to store and retrieve their resumes, manage their skills, and update their account information.

## Features
- **User Management:** Users can register, login, and update their account information.
- **Resume Management:** Users can create, update, and delete their resumes.
- **Skill Management:** Users can manage their skills, including adding new skills and updating existing ones.
- **Authentication and Authorization:** The API uses JWT (JSON Web Tokens) for authentication, allowing users to access their data securely.

## Technologies Used
- **NestJS:** A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **TypeORM:** An Object-Relational Mapping (ORM) library that supports various databases and simplifies database operations.
- **Swagger:** Used for API documentation to describe and document the endpoints, request/response bodies, and schemas.
- **bcrypt:** A library used for hashing passwords to ensure secure storage and authentication.
- **JWT:** JSON Web Tokens are used for authentication and authorization, providing a secure way to transmit information between parties.
-  **@ngneat/falso:** A library used for seeding database entities with fake data.

## Getting Started
To run the API locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-repo/resume-manager-api.git`
2. Install dependencies: `npm install`
3. Set up your environment variables (e.g., database connection string, JWT secret key).
```bash
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=myusername
DB_PASSWORD=mypassword
DB_DATABASE=mydatabase

JWT_SECRET=myjwtsecret
#Replace myusername, mypassword, mydatabase, and myjwtsecret with your actual database credentials and JWT secret.
```
5. Run the application: `npm start`

## Seeding the Database
You can seed the database with fake data using the @ngneat/falso library. To seed the database, run the following command:
```bash
npm run seed:db
```

## API Documentation
The API documentation can be accessed using Swagger UI. After running the application, navigate to `http://localhost:4949/api` in your browser to view the API documentation.

## Endpoints

### Skills

- **GET** `/skills`
  - Description: List all skills
  - Response: Array of [Skill](#skill) objects

- **POST** `/skills`
  - Description: Create a new skill
  - Request Body: [CreateSkillDto](#createskilldto)
  - Response: [Skill](#skill) object

- **PUT** `/skills/{id}`
  - Description: Update a skill
  - Parameters: Skill ID
  - Request Body: [UpdateSkillDto](#updateskilldto)
  - Response: [Skill](#skill) object

- **DELETE** `/skills/{id}`
  - Description: Delete a skill
  - Parameters: Skill ID

- **PATCH** `/skills/restore/{id}`
  - Description: Restore a deleted skill
  - Parameters: Skill ID
  - Response: [Skill](#skill) object

### Users

- **GET** `/users`
  - Description: List all users
  - Response: Array of [User](#user) objects

- **GET** `/users/page`
  - Description: Paginated list of users

- **GET** `/users/me`
  - Description: Get current user details

- **GET** `/users/{id}`
  - Description: Get user by ID
  - Parameters: User ID

- **PUT** `/users/{id}`
  - Description: Update user details
  - Parameters: User ID
  - Request Body: [UpdateUserDto](#updateuserdto)
  - Response: [User](#user) object

- **DELETE** `/users/{id}`
  - Description: Delete a user
  - Parameters: User ID

- **PATCH** `/users/restore/{id}`
  - Description: Restore a deleted user
  - Parameters: User ID
  - Response: [User](#user) object

### Resumes

- **GET** `/resumes`
  - Description: List all resumes
  - Response: Array of [Resume](#resume) objects

- **POST** `/resumes`
  - Description: Create a new resume
  - Request Body: [CreateResumeDto](#createresumedto)
  - Response: [Resume](#resume) object

- **GET** `/resumes/page`
  - Description: Paginated list of resumes

- **GET** `/resumes/{id}`
  - Description: Get resume by ID
  - Parameters: Resume ID

- **PUT** `/resumes/{id}`
  - Description: Update a resume
  - Parameters: Resume ID
  - Request Body: [UpdateResumeDto](#updateresumedto)
  - Response: [Resume](#resume) object

- **DELETE** `/resumes/{id}`
  - Description: Delete a resume
  - Parameters: Resume ID

- **GET** `/resumes/user/me`
  - Description: Get resumes of the current user

- **GET** `/resumes/user/{userId}`
  - Description: Get resumes of a user by ID
  - Parameters: User ID

- **PATCH** `/resumes/restore/{id}`
  - Description: Restore a deleted resume
  - Parameters: Resume ID

- **POST** `/resumes/upload`
  - Description: Upload an image for a resume

## Schemas

### LoginDto
- `email: string`
- `password: string`

### CreateUserDto
- `username: string`
- `email: string`
- `password: string`

### CreateSkillDto
- `label: string`

### UpdateSkillDto
- `label?: string`

### UpdateUserDto
- `username?: string`
- `email?: string`
- `password?: string`

### CreateResumeDto
- `firstname: string`
- `lastname: string`
- `age: number`
- `cin: string`
- `job: string`

### UpdateResumeDto
- `firstname?: string`
- `lastname?: string`
- `age?: number`
- `cin?: string`
- `job?: string`

## Authorization
Certain endpoints require users to have specific roles, such as admin or member, to access them. This is enforced using the AdminGuard guard.

## Contributing
Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.
