# Contributing to ConvertAudit

Thank you for your interest in contributing to ConvertAudit! This document provides guidelines and information for contributors.

## 🎯 How to Contribute

We welcome contributions from the community! Here are the main ways you can help:

### 🐛 Reporting Bugs

1. **Check existing issues** - Search the issues to see if the bug has already been reported
2. **Create a new issue** - Use the bug report template and include:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/OS information
   - Screenshots if applicable

### 💡 Suggesting Features

1. **Check existing issues** - Search for similar feature requests
2. **Create a feature request** - Use the feature request template and include:
   - Clear description of the feature
   - Use cases and benefits
   - Mockups or examples if possible

### 🔧 Code Contributions

#### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

#### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/bqthang0307/ConvertAuditUI.git
   cd ConvertAuditUI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

#### Development Guidelines

##### Code Style

- **TypeScript**: Use strict TypeScript configuration
- **ESLint**: Follow the project's ESLint rules
- **Prettier**: Use the project's Prettier configuration
- **Naming**: Use descriptive names for variables, functions, and components

##### Component Guidelines

- **shadcn/ui**: Use existing shadcn/ui components when possible
- **Props**: Use TypeScript interfaces for component props
- **Styling**: Use Tailwind CSS classes
- **Accessibility**: Follow ARIA guidelines and keyboard navigation

##### File Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── [Feature]/    # Feature-specific components
│   └── common/       # Shared components
├── pages/            # Page components
├── hooks/            # Custom React hooks
├── lib/              # Utilities and helpers
└── types/            # TypeScript type definitions
```

#### Testing

- **Manual Testing**: Test your changes in different browsers
- **Responsive Testing**: Test on mobile and desktop
- **Accessibility Testing**: Use screen readers and keyboard navigation

#### Commit Guidelines

Use conventional commit messages:

```
type(scope): description

feat: add new feature
fix: fix a bug
docs: update documentation
style: formatting changes
refactor: code refactoring
test: add tests
chore: maintenance tasks
```

Examples:
- `feat(audit): add email validation to audit form`
- `fix(icp): resolve step navigation issue`
- `docs: update README with new features`

#### Pull Request Process

1. **Update documentation** - Update README, comments, or other docs as needed
2. **Test thoroughly** - Ensure all functionality works correctly
3. **Create PR** - Use the PR template and include:
   - Description of changes
   - Screenshots if UI changes
   - Testing steps
   - Related issues

4. **Code Review** - Address feedback from maintainers
5. **Merge** - Once approved, your PR will be merged

## 🏗️ Project Architecture

### Key Technologies

- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components
- **React Router**: Client-side routing
- **React Query**: Server state management

### State Management

- **Local State**: Use React's `useState` for component-specific state
- **Form State**: Use React Hook Form for form management
- **Server State**: Use React Query for API data
- **Global State**: Consider Zustand or Context API for global state

### Styling Approach

- **Tailwind CSS**: Primary styling method
- **CSS Variables**: For theme customization
- **Component Variants**: Using `class-variance-authority`
- **Responsive Design**: Mobile-first approach

## 🐛 Common Issues

### Build Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run build
```

### Styling Issues

- Check Tailwind CSS classes are correct
- Verify CSS variables are defined
- Ensure responsive breakpoints are appropriate

### Component Issues

- Check prop types and interfaces
- Verify component imports
- Test component variants

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Community

- **Discussions**: Use GitHub Discussions for questions and ideas
- **Issues**: Report bugs and request features
- **Discord**: Join our community server (if available)

## 📄 License

By contributing to ConvertAudit, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to ConvertAudit! 🚀
