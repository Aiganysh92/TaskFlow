# TaskFlow - Modern Task Manager

TaskFlow is a sleek, frontend-only task management web application built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**. It provides an intuitive interface to help users organize, prioritize, filter, and track their daily tasks with automated local storage persistence.

---

## Features

- 📊 **Dashboard Analytics**: Real-time count and percentage tracking for total, active, and completed tasks.
- ➕ **Task CRUD Operations**:
  - Add tasks with title, description, priority, and due date.
  - Edit existing tasks seamlessly via interactive modals.
  - Delete tasks with immediate UI updates.
  - Mark tasks as completed/incomplete.
- 🎯 **Priority & Due Date Tracking**: Assign High, Medium, or Low priorities and highlight overdue tasks.
- 🔍 **Search & Filter**:
  - Instant text search across task titles and descriptions.
  - Status tabs for All, Active, and Completed tasks.
  - Filter by priority levels.
  - Flexible sorting by Due Date, Priority, Creation Date, or Title (Ascending/Descending).
- 💾 **LocalStorage Persistence**: Automatically saves tasks locally in the browser so data persists across reloads.
- 📱 **Clean Responsive UI**: Blue and white theme built with Tailwind CSS, optimized for both desktop and mobile devices.

---

## Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Lucide React](https://lucide.dev/) Icons
- **Testing**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) + [jsdom](https://github.com/jsdom/jsdom)
- **Linting**: [ESLint](https://eslint.org/)
- **Containerization**: Multi-stage [Dockerfile](https://www.docker.com/) with [Nginx Alpine](https://www.nginx.com/)

---

## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: v18.x or higher (v20+ recommended)
- **npm**: v9.x or higher
- **Docker** (optional, for running in a container)

---

## Getting Started (Local Development)

### 1. Clone the repository
```bash
git clone <repository-url>
cd TaskFlow
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## Available NPM Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `npm run dev` | Starts the Vite local development server with HMR |
| `build` | `npm run build` | Runs TypeScript type check (`tsc`) and builds production assets into `dist/` |
| `lint` | `npm run lint` | Runs ESLint code check |
| `test` | `npm run test` | Runs test suite using Vitest |

---

## Docker Instructions

TaskFlow includes a multi-stage `Dockerfile` and `nginx.conf` designed to build the production assets using Node.js and serve them using Nginx Alpine.

### Build the Docker image
```bash
docker build -t taskflow .
```

### Run the Docker container
```bash
docker run -d -p 8080:80 --name taskflow-app taskflow
```
Access the application in your browser at `http://localhost:8080`.

---

## Testing

To run the unit and integration test suite:

```bash
npm run test
```

To run tests in single-run mode:
```bash
npm run test -- --run
```

---

## License

This project is open source and available under the [MIT License](LICENSE).
