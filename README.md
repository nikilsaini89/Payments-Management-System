# Payment Management System

[![Vue.js](https://img.shields.io/badge/Vue.js-3-4FC08D?style=for-the-badge&logo=vue.js)](https://vuejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/npm.svg?style=for-the-badge)](https://www.npmjs.com/get-npm)

A **Payment Management System** built with **Vue 3**, designed for both Admins and Users to manage payments in a fintech-like environment. The app provides a **dashboard**, **role-based features**, and interactive tables for managing users and payments.

---

## Table of Contents

-   [Overview](#overview)
-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
-   [Usage](#usage)
-   [Data Management](#data-management)
-   [Contributing](#contributing)
-   [License](#license)

## Overview

This application simulates a payment management environment with two distinct user roles: **Admin** and **User**. It features a central dashboard that provides a high-level overview of key metrics, such as total users, total payments, and the status distribution of payments.

## Features

-   **Role-Based Access Control**: Separate views and permissions for Admins and regular Users.
-   **Admin Dashboard**:
    -   View a complete list of all users and their details (Name, Email, UPI ID, Phone, KYC Status).
    -   View a comprehensive list of all payments within the system.
    -   Update the status of any payment (from `PENDING` to `SUCCESS` or `FAILED`).
-   **User Dashboard**:
    -   Initiate new payments to other registered users.
    -   View a personalized history of all payments sent or received.
-   **Interactive Dashboard Cards**: At-a-glance view of total users, total payments, and counts for `SUCCESS`, `PENDING`, and `FAILED` payments.
-   **Dynamic Filtering**: Both Admins and Users can filter the payments table by status (`ALL`, `PENDING`, `SUCCESS`, `FAILED`).

## Tech Stack

-   **Frontend**: Vue 3 (Composition API)
-   **State Management**: Pinia
-   **Data Management**: Json Server
-   **Routing**: Vue Router
-   **Styling**: CSS

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have Node.js and npm installed on your system.
-   **Node.js** (v16 or higher recommended)
-   **npm** (comes with Node.js)

You can check your installation with:
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

4.  **Start the development server:**
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


## License

Distributed under the MIT License. See `LICENSE` for more information.

```
```