# FETCH 🧭

**FETCH** is a **smart lost and found system for school communities**, built with **Next.js 16** and **Supabase**, designed to help students, and staff efficiently report, track, and recover lost items.

This project is developed as a **final academic requirement** for the following courses:

- **Systems Integration and Architecture 1**
- **Database Administration**
- **Web Development**

---

## 🛠 Technology Stack

### Frontend
- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** – accessible and reusable UI components
- **Magic UI** – animated and modern UI components

### Backend
- **Next.js API Routes / Server Actions**
- **Node.js**

### Database & Backend Services
- **Supabase**
  - PostgreSQL database
  - Authentication
  - Row Level Security (RLS)

### Other Tools
- Git & GitHub (version control)
- RESTful APIs
- Environment-based configuration

---

## 🏗 System Architecture

FETCH follows a **client–server architecture**:

- **Client Layer**: Next.js frontend handling UI and user interaction
- **Application Layer**: API routes and server actions handling business logic
- **Data Layer**: Supabase PostgreSQL database managing persistent data

This layered architecture ensures scalability, maintainability, and secure data access.

---

## 🗄 Database Design

FETCH uses **Supabase PostgreSQL** as its primary database. The schema is normalized and designed to support secure, efficient, and reliable lost-and-found operations.

### Core Tables

#### Profile
- Connects application users to **Supabase Authentication**
- Stores user roles for authorization and access control

---

#### Student
- Stores student information
- Used for submitting and tracking lost item reports

---

#### SecurityPersonnel
- Stores campus security and lost-and-found staff information
- Responsible for logging found items and verifying claims

---

#### LostItemReport
- Stores reports of lost items submitted by students
- Tracks item details, category, and report status

---

#### FoundItem
- Stores items found and logged by security personnel
- Includes location and current return status

---

#### Match
- Represents potential matches between lost and found items
- Used to notify students of possible item recovery

---

#### Claim
- Tracks ownership claims made by students for found items
- Managed and verified by security personnel

---

#### Notification
- Stores system-generated notifications sent to students
- Tracks read and unread notification status

---

### Security & Integrity
- Database relationships enforce referential integrity
- Indexes improve query performance
- **Supabase Row Level Security (RLS)** ensures role-based access control

---

## 🤝 Contributing

Please follow the guidelines below to maintain code quality and consistency.

---

### 🌱 Branching Workflow

This project follows a structured Git workflow:

- **`main`**
  - Production-ready code only
  - Automatically deployed to production

- **`dev`**
  - Active development branch
  - Used for preview and testing deployments

- **Topic branches**
  - Created from `dev`
  - Merged back into `dev` via Pull Requests

**Branch flow:**
```topic/* → dev → main```

---

### 🛠 How to Contribute

1. Fork the repository
2. Create a new branch from `dev`
   ```bash
   git checkout dev
   git checkout -b feat/your-feature-name
   ```
3. Make your changes
4. Commit using Conventional Commits with optional scopes
   ```bash
   <type>(<scope>): <short description>
   ```
Examples with scopes:
```
feat(lost-item): implement automatic item matching
fix(claim): prevent duplicate approvals
docs(readme): update contributing section
style(ui): improve card styling
chore(deps): update Supabase SDK
```
5. Push your branch
   ```bash
   git push origin feat/your-feature-name
   ```
6. Open a Pull Request targeting `dev`

---

### 🏷 Branch Naming Conventions

Create branches using the following prefixes:

| Prefix | Purpose |
|------|--------|
| `feat/` | New features |
| `fix/` | Bug fixes |
| `docs/` | Documentation changes |
| `style/` | UI or styling changes |
| `refactor/` | Code refactoring |
| `test/` | Adding or updating tests |
| `chore/` | Maintenance tasks |
| `perf/` | Performance improvements |

**Examples:**
```
feat/lost-item-matching
fix/claim-approval-bug
docs/update-readme
chore/update-dependencies
```
---
### ✅ Commit Message Guidelines
Format with optional scope:
```
<type>(<scope>): <short description>
```
Common types:
- `feat` – new feature
- `fix` – bug fix
- `docs` – documentation
- `style` – formatting/UI changes
- `refactor` – code restructuring
- `test` – tests
- `chore` – maintenance
- `perf` – performance improvements
Example:
```
feat(profile): add user avatar upload
fix(notification): mark as read on click
docs(README): add installation instructions
```

---

## 📋 Contribution Rules

- Keep pull requests focused and small
- Follow existing code style and patterns
- Ensure the app builds and runs correctly
- Update documentation when necessary
- All changes must go through dev before reaching main

Thank you for contributing to **FETCH 🙌**
