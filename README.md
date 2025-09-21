# Payment Management System

[![Vue.js](https://img.shields.io/badge/Vue.js-3-4FC08D?style=for-the-badge&logo=vue.js)](https://vuejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/npm.svg?style=for-the-badge)](https://www.npmjs.com/get-npm)

A **Payment Management System** built with **Vue 3** for Admins and Users. The app provides a dashboard, role-based features, and interactive tables for managing users and payments in a fintech environment.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Data Management](#data-management)
- [License](#license)

## Overview

This application simulates a payment management environment with two distinct user roles: **Admin** and **User**. It features a central dashboard for a high-level overview of key metrics, such as total users, total payments, and payment status distribution.

## Features

-   **Role-Based Access**: Separate views and permissions for Admins and Users.
-   **Admin Dashboard**:
    -   View all users and their details.
    -   View all payments in the system.
    -   Update payment status (`PENDING` → `SUCCESS` / `FAILED`).
-   **User Dashboard**:
    -   Create new payments to other users.
    -   View personal transaction history (sent or received).
-   **Dynamic Filtering**: Filter payments table by status (`ALL`, `PENDING`, `SUCCESS`, `FAILED`).
-   **Dashboard Cards**: At-a-glance view of total users, payments, and status counts.

## Tech Stack

-   **Frontend**: Vue 3 (Composition API)
-   **State Management**: Vuex
-   **Routing**: Vue Router
-   **Mock API**: Json Server
-   **Styling**: CSS

## Getting Started

Follow these instructions to get the project running on your local machine.

### Prerequisites

-   **Node.js** (v16 or higher)
-   **npm** (comes with Node.js)

Verify your installation:
```bash
node -v
npm -v
````

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/nikilsaini89/Payments-Management-System.git](https://github.com/nikilsaini89/Payments-Management-System.git)
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd Payments-Management-System
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Start the JSON server:**
    This will serve your users and payments data at `http://localhost:3000`.

    ```bash
    npx json-server --watch src/mock-data/data.json --port 3000

    ```

5.  **Start the development server:**
    The application will be available at `http://localhost:8080`.

    ```bash
    npm run serve
    ```

## Usage

Once the application is running, you can log in using the predefined credentials for either an **Admin** or a **User** to explore the different features available for each role.

  - As an **Admin**, you can manage users and update payment statuses.
  - As a **User**, you can create new payments and track your transaction history.

## Data Management

For development purposes, this project uses **mocked data**. The data for users and payments is stored locally, either in JSON files within the project or using the browser's `LocalStorage`. This allows the application to be fully interactive without requiring a backend connection.