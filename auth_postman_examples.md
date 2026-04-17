# Web Pulse - Postman Auth Testing Guide

Here are the example Postman requests structured in JSON format.

## 1. Registration (`POST /api/auth/register`)

**URL:** `http://localhost:5000/api/auth/register`
**Method:** `POST`
**Headers:**
- `Content-Type: application/json`

**Body (raw + JSON):**
```json
{
    "name": "Alex User",
    "email": "alex@example.com",
    "password": "securepassword123"
}
```

**Expected Responses:**
- `201 Created` - User registered successfully
- `400 Bad Request` - Email already exists (Error Handling)
- `400 Bad Request` - All fields are required (Validation Error)


## 2. Login (`POST /api/auth/login`)

**URL:** `http://localhost:5000/api/auth/login`
**Method:** `POST`
**Headers:**
- `Content-Type: application/json`

**Body (raw + JSON):**
```json
{
    "email": "alex@example.com",
    "password": "securepassword123"
}
```

**Expected Responses:**
- `200 OK` - Login successful (Returns JWT token)
- `404 Not Found` - User not found (Error Handling)
- `401 Unauthorized` - Invalid password (Error Handling)

**Example Successful Login Response:**
```json
{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI...",
    "user": {
        "id": 1,
        "name": "Alex User",
        "email": "alex@example.com",
        "role": "user"
    }
}
```

## 3. Using the Token (Testing Authenticated Routes via Middleware)

To access protected endpoints (e.g., creating a monitor), you need to include the token from the login response in your requests.

**Headers Configuration in Postman:**
Go to the **Authorization** tab of an endpoint you want to test.
- **Type:** Bearer Token
- **Token:** `<paste-your-jwt-token-here>`
*(Or manually set `Authorization: Bearer <your-token>` in the Headers tab).*
