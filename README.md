# Redis Clone - Proof of Concept

## Overview

This project is a proof of concept to clone some functionalities of Redis. The goal is to implement the basic functionalities of an in-memory key-value database.

## Use Cases

### **User Management**
- [x] **User Registration**: Allow new users to register.
- [x] **User Login**: Authenticate existing users.
- [x] **Tokens and Sessions**: Manage user sessions and authentication tokens.

### **Database Management**
- [x] **Create Database**: Allow users to create a database by providing: name, host, port, and password.
- [x] **Create Environments**: Create different environments (development, testing, production).
- [x] **Environment-specific Databases**: Allow creation of one or more databases for each environment.

### **Advanced Data Types**
- [ ] **Lists**: Implement lists and associated operations (LPUSH, RPUSH, LPOP, RPOP).
- [ ] **Sets**: Implement sets and associated operations (SADD, SREM, SMEMBERS).
- [x] **Hashes**: Implement hashes and associated operations (HSET, HGET, HDEL).

### **Security and Authentication**
- [x] **User Roles and Permissions**: Implement different levels of access and permissions for users.
- [x] **Encryption**: Implement encryption for sensitive data.

### **API and Integration**
- [x] **REST API**: Create a REST API to interact with the database.


