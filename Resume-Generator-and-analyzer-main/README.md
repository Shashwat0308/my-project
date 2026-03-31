# NovaResume - AI-Powered Resume Builder

## Project Description
NovaResume is an advanced AI-powered resume builder and analyzer that helps users create ATS-optimized resumes, analyze their existing resumes, generate cover letters, and gain insights through comprehensive analytics. Built with modern web technologies, it provides a seamless experience for job seekers to enhance their career documents.

## Features

### 🔍 Resume Analysis
- **ATS Score Analysis**: Get instant feedback on how well your resume performs with Applicant Tracking Systems
- **Skill Gap Detection**: Identify missing keywords and skills for your target role
- **AI-Powered Suggestions**: Receive personalized recommendations to improve your resume
- **Comprehensive Insights**: Detailed breakdown of resume strengths and areas for improvement

### ✏️ Resume Generation
- **Multiple Templates**: Choose from various professional templates (Modern, Professional, Creative, etc.)
- **Live Preview**: Real-time preview of your resume as you edit
- **Customization Panel**: Adjust fonts, colors, spacing, and layout options
- **PDF Export**: Export high-quality PDFs ready for submission

### 📝 Cover Letter Generator
- **AI-Powered Generation**: Create personalized cover letters in seconds
- **Job-Specific Content**: Tailor letters based on job descriptions and company details
- **Professional Formatting**: Generate well-structured, ATS-friendly cover letters

### 📊 Analytics Dashboard
- **Skill Distribution Charts**: Visualize your skill set across different categories
- **Performance Metrics**: Track overall scores and improvement trends
- **Category Analysis**: Detailed breakdown of technical skills, soft skills, experience, and education

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Theme**: Modern dark UI with gradient accents
- **Smooth Animations**: Enhanced user experience with Framer Motion animations
- **Intuitive Navigation**: Easy-to-use interface with clear navigation

## Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for smooth interactions
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library
- **Radix UI** - Accessible component primitives

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **OpenAI API** - AI-powered content generation and analysis
- **PDF-parse** - PDF document parsing
- **Mammoth** - DOCX document parsing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- OpenAI API key (for AI features)

## Installation

### 1. Clone the Repository
```bash
git clone <your-github-repo-url>
cd ai-build-resum
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
```

Start the backend server:
```bash
npm run dev
```
The backend will start on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal, navigate back to the root directory, and install frontend dependencies:
```bash
cd ..
npm install
```

Start the development server:
```bash
npm run dev
```
The frontend will start on `http://localhost:3000`.

## Usage

### Getting Started
1. Open your browser and navigate to `http://localhost:3000`
2. Explore the different features using the navigation menu

### Resume Analyzer
1. Click on "Analyzer" in the navigation
2. Upload your resume (supports PDF and DOCX formats)
3. View your ATS score, skill analysis, and improvement suggestions
4. Review detailed feedback and recommendations

### Resume Generator
1. Navigate to "Generator" from the menu
2. Choose a template from the available options
3. Fill in your information or use the auto-generate feature
4. Customize the design using the design panel
5. Export your resume as a PDF

### Cover Letter Generator
1. Go to "Cover Letter" page
2. Fill in job details (position, company, hiring manager)
3. Optionally paste the job description for better personalization
4. Generate your cover letter with AI
5. Copy the result or download it

### Analytics Dashboard
1. Visit the "Analytics" page
2. View comprehensive charts and metrics
3. Analyze your skill distribution and performance scores
4. Track improvement areas and overall progress

## API Endpoints

The backend provides the following main endpoints:

- `POST /api/upload` - Upload and process resume files
- `POST /api/analyze` - Analyze resume content and provide feedback
- `POST /api/generate-cover-letter` - Generate AI-powered cover letters
- `GET /api/health` - Health check endpoint

## Environment Variables

### Backend (.env)
```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
NODE_ENV=development
```

## Development

### Running in Development Mode
```bash
# Frontend
npm run dev

# Backend (in separate terminal)
cd backend && npm run dev
```

### Building for Production
```bash
# Frontend
npm run build

# Backend
cd backend && npm start
```

### Testing
```bash
# Frontend
npm run test

# Backend
cd backend && npm test
```

## Project Structure
```
ai-build-resum/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── utils/
│       ├── ats.js
│       ├── llm.js
│       └── parser.js
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── ATSScoreCircle.jsx
│   │   ├── ResumeEditor.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── AnalyzerPage.jsx
│   │   ├── GeneratorPage.jsx
│   │   ├── CoverLetterPage.jsx
│   │   └── AnalyticsPage.jsx
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature-name`
6. Open a Pull Request

### Guidelines
- Follow the existing code style
- Write clear, concise commit messages
- Test your changes before submitting
- Update documentation as needed

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions:
- Check the Issues section on GitHub
- Create a new issue with detailed information
- Contact the maintainers

## Roadmap

- [ ] Mobile app version
- [ ] Additional resume templates
- [ ] Integration with LinkedIn
- [ ] Advanced analytics features
- [ ] Multi-language support
- [ ] Resume tracking and versioning

---

**Built with ❤️ using React, Node.js, and AI**
