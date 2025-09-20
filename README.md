# Payment Management System

This is a **Payment Management System** built with **Vue 3**, designed for both Admins and Users to manage payments in a fintech-like environment. The app provides a **dashboard**, **role-based features**, and interactive tables for users and payments.  

---

## Overview

The application supports **two roles**:

- **Admin** can:
  - View all users with their details (Name, Email, UPI ID, Phone Number, KYC Status).
  - View all payments between users.
  - Update the status of any payment (PENDING → SUCCESS / FAILED).
  - Filter payments by status (ALL, PENDING, SUCCESS, FAILED).

- **User** can:
  - Create new payments to other users.
  - View all payments they are involved in (sent or received).
  - Filter their payments by status (ALL, PENDING, SUCCESS, FAILED).

The **dashboard** provides an overview of total users, total payments, and counts of payments by status (SUCCESS, PENDING, FAILED), displayed in interactive cards.

---

## Data Structure

The system uses **mocked data** stored in JSON or LocalStorage for development purposes.

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/nikilsaini89/Payments-Management-System.git
cd Payments-Management-System

2. **Install dependencies:**

```bash
npm install


3. **Start the development server:**
```bash
npm run serve
