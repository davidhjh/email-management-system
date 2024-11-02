# Email Management System

This project is a backend email management microservice with a frontend interface. Users can add, update, fetch, and delete emails with optional file attachments. The backend is developed with Spring Boot, and the frontend is built using React.

## Technologies Used
- **Backend**: Java, Spring Boot, PostgreSQL
- **Frontend**: React, Javascript, Axios, React Router
- **Other Tools**: CSS, Postman (for API testing)

## Features
- **Add Email**: Create a new email with attachments as an optional field
- **Update Email**: Edit an existing email and update its details with the given ID
- **Fetch Emails**: View a list of saved emails in the system from the given ID
- **Delete Email**: Remove an email from the system based on the given ID

## Prerequisites to Run this Application
- **Java**: Ensure you have Java 11 or higher installed.
- **Node.js and npm**: Required to run the frontend React app.
- **Maven**: Used for managing Java dependencies.
- **PostgreSQL**: The database system used to store emails and attachments.

## Setup Instructions

### 1. Clone the repository
```bash
~> git clone https://github.com/davidhjh/email-management-system.git
~> cd email-management-system
```

### 2. Backend Setup
1. **Configure the database**:
   - Open `email-service-backend/src/main/resources/application.properties` and configure your PostgreSQL database:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/your_database_name
   spring.datasource.username=your_database_username
   spring.datasource.password=your_database_password
   ```
2. **Build and run the backend with mvn**:
   - Navigate to the backend directory, before running the mvn commands
   ```bash
   ~/email-management-system> cd ./email-management-system
   ~/email-management-system/email-service-backend> mvn clean install
   ...
   ~/email-management-system/email-service-backend> mvn spring-boot:run
   ...
   ```
   - The backend server will be available at `http://localhost:8080`.

### 3. Frontend Setup
1. **Install dependencies and run the frontend with npm**:
   ```bash
   ~/email-management-system/email-service-backend> cd ../email-service-frontend
   ~/email-management-system/email-service-frontend> npm install
   ...
   ~/email-management-system/email-service-frontend> npm start
   ...
   ```
   - The backend server will be available at `http://localhost:3000`.

## Usage
### Once the app is running:
- Access the frontend at `http://localhost:3000`
- Follow the feature links to each component to interact with the database

### Key Endpoints:
- Create Email: `POST /api/emails`
- Update Email: `PUT /api/emails/{id}`
- Delete Email: `DELETE /api/emails/{id}`
- Fetch Email: `GET /api/emails/{id}`

In case you want to interact with the backend directly.