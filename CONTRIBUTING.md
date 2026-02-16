# Contributing to ChakulaKonnect

##  Branch Naming Convention

**Format:** `<type>/<description>`

### Types:
- `feature/` - New features (e.g., `feature/user-authentication`)
- `fix/` - Bug fixes (e.g., `fix/login-error`)
- `docs/` - Documentation updates (e.g., `docs/api-endpoints`)
- `refactor/` - Code refactoring (e.g., `refactor/auth-service`)
- `test/` - Adding tests (e.g., `test/auth-controller`)

### Examples:
```
feature/food-listing-marketplace
fix/password-validation-bug
docs/update-readme
```

---

## Git Workflow

### 1. **Before Starting Work**
```bash
# Make sure you're on the main branch
git checkout main

# Pull the latest changes
git pull origin main

# Create your feature branch
git checkout -b feature/your-feature-name
```

### 2. **While Working**
```bash
# Check what files you've changed
git status

# Add files to staging
git add .

# Commit with a clear message
git commit -m "Add user registration endpoint"

# Push to your branch
git push origin feature/your-feature-name
```

### 3. **Creating a Pull Request**

1. Go to GitHub repository
2. Click "Pull Requests" → "New Pull Request"
3. Select your branch
4. Fill in the PR template (see below)
5. Request review from at least ONE team member
6. Wait for approval before merging

---

## Pull Request Template
```markdown
## Description
[What does this PR do?]

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation update
- [ ] Code refactoring

## Testing
- [ ] I have tested this locally
- [ ] Frontend and Backend integration tested (if applicable)

## Checklist
- [ ] Code follows project structure
- [ ] No console.log() left in production code
- [ ] Environment variables added to .env.example (if new ones)
- [ ] README updated (if needed)
```

---

## IMPORTANT RULES

### DO 
- **Always pull latest changes** before starting work
- **Create a new branch** for each feature/fix
- **Write clear commit messages** (e.g., "Add login API endpoint")
- **Test your code** before pushing
- **Request code review** before merging
- **Resolve merge conflicts** on your branch before PR

### DON'T 
- **NEVER push directly to `main` branch**
- **NEVER commit `.env` files**
- **NEVER commit `node_modules/`**
- **NEVER force push** (`git push -f`) unless you know what you're doing
- **NEVER merge your own PR** without review

---

##  Code Review Guidelines

### As a Reviewer:
- Check if code follows project structure
- Test the changes locally if possible
- Provide constructive feedback
- Approve only if everything works

### As an Author:
- Respond to review comments
- Make requested changes
- Re-request review after updates

---

##  Handling Merge Conflicts

If you get a merge conflict:
```bash
# 1. Pull latest main
git checkout main
git pull origin main

# 2. Go back to your branch
git checkout feature/your-feature

# 3. Merge main into your branch
git merge main

# 4. Resolve conflicts in your code editor
# (Look for <<<<<<< HEAD markers)

# 5. After resolving, commit
git add .
git commit -m "Resolve merge conflicts"
git push origin feature/your-feature
```

---

##  Need Help?
- Create an issue on GitHub
- Ask in the team chat
- Tag @backend-lead or @frontend-lead

---

**Remember:** Good collaboration = Successful project! 