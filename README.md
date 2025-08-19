# ConvertAudit UI

A modern React-based web application for conducting comprehensive SaaS landing page audits. ConvertAudit helps businesses analyze their landing pages to improve conversion rates and user experience.

## 🚀 Features

- **Multi-step ICP (Ideal Customer Profile) Form**: Guided questionnaire to understand your target audience and business goals
- **Landing Page Audit Tool**: Comprehensive analysis of landing page performance and conversion optimization
- **Modern UI/UX**: Built with shadcn/ui components and Tailwind CSS for a beautiful, responsive interface
- **Form Validation**: Real-time validation with helpful error messages
- **Theme Support**: Light/dark mode support (ready for implementation)
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Routing**: React Router DOM
- **State Management**: React Query (TanStack Query)
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React
- **Development**: ESLint, TypeScript, PostCSS

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ConvertAuditUI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 🏗️ Project Structure

```
ConvertAuditUI/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Header.tsx      # Application header
│   │   ├── ICPForm.tsx     # Multi-step ICP questionnaire
│   │   └── StepIndicator.tsx # Progress indicator
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Home page with ICP form
│   │   ├── Audit.tsx       # Landing page audit tool
│   │   └── NotFound.tsx    # 404 page
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and validators
│   ├── assets/             # Static assets
│   └── App.tsx             # Main application component
├── public/                 # Public assets
└── package.json           # Dependencies and scripts
```

## 🎯 Usage

### ICP Form (Home Page)
1. Navigate to the home page (`/`)
2. Complete the 3-step questionnaire:
   - **Step 1**: Define landing page goal and target customer
   - **Step 2**: Describe pain points and value proposition
   - **Step 3**: Add additional context (optional)
3. Click "Submit" to proceed to the audit page

### Landing Page Audit
1. On the audit page (`/audit`), enter your email and landing page URL
2. The system will analyze your landing page and provide insights
3. Receive a comprehensive audit report via email

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🎨 Customization

### Adding New Components
The project uses shadcn/ui for consistent component design. To add new components:

1. Use the shadcn/ui CLI:
   ```bash
   npx shadcn@latest add [component-name]
   ```

2. Or manually add components to `src/components/ui/`

### Styling
- Tailwind CSS classes are used throughout the application
- Custom CSS variables are defined in `src/index.css`
- Component variants are managed with `class-variance-authority`

### Theme Configuration
The application supports light/dark themes using `next-themes`. Theme switching can be enabled by uncommenting the theme toggle in `Header.tsx`.

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory for any environment-specific configuration:

```env
VITE_API_URL=your_api_url_here
VITE_APP_NAME=ConvertAudit
```

### Tailwind Configuration
Tailwind CSS is configured in `tailwind.config.ts` with custom colors and animations.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**ConvertAudit** - Transform your landing pages into conversion machines! 🚀
