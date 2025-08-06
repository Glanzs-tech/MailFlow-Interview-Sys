#!/bin/bash

# MailFlow Interview Project Setup Script
echo "🚀 Setting up MailFlow Interview Project..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Create project directories
echo "📁 Creating project structure..."
mkdir -p frontend/src/{components,pages,utils,hooks,store}
mkdir -p backend/src/{routes,models,middleware,services,utils}
mkdir -p database/{migrations,seeds}

# Create basic frontend package.json
echo "📦 Setting up frontend..."
cat > frontend/package.json << 'EOF'
{
  "name": "mailflow-frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5",
    "axios": "^1.6.0",
    "react-router-dom": "^6.8.0",
    "react-hook-form": "^7.43.0",
    "tailwindcss": "^3.3.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
EOF

# Create basic backend package.json
echo "📦 Setting up backend..."
cat > backend/package.json << 'EOF'
{
  "name": "mailflow-backend",
  "version": "1.0.0",
  "description": "MailFlow Backend API",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "jsonwebtoken": "^9.0.0",
    "bcryptjs": "^2.4.3",
    "@sendgrid/mail": "^7.7.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.20",
    "jest": "^29.5.0",
    "supertest": "^6.3.3"
  }
}
EOF

# Create basic environment files
echo "🔧 Creating environment templates..."
cat > .env.example << 'EOF'
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/mailflow

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Service
SENDGRID_API_KEY=your-sendgrid-api-key

# AI Service
OPENAI_API_KEY=your-openai-api-key

# App URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000
EOF

cat > frontend/.env.example << 'EOF'
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
EOF

cat > backend/.env.example << 'EOF'
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/mailflow
JWT_SECRET=your-super-secret-jwt-key
SENDGRID_API_KEY=your-sendgrid-api-key
OPENAI_API_KEY=your-openai-api-key
FRONTEND_URL=http://localhost:3000
EOF

# Create basic gitignore
echo "📝 Creating .gitignore..."
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
*/node_modules/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
build/
dist/
*/build/
*/dist/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Docker
docker-compose.override.yml

# Database
*.sqlite
*.db
EOF

echo "✅ Project structure created successfully!"
echo ""
echo "🎯 Next Steps:"
echo "1. Copy .env.example to .env and fill in your API keys"
echo "2. Read docs/PHASE_1_GUIDE.md for detailed instructions"
echo "3. Create your development branch: git checkout -b phase-1/your-name-core-platform"
echo "4. Start building! 🚀"
echo ""
echo "📚 Quick Commands:"
echo "  npm run install:all  # Install all dependencies"
echo "  npm run dev          # Start development servers"
echo "  npm run docker:up    # Run with Docker"
echo ""
echo "Happy coding! 🎉"
EOF

# Make setup script executable
chmod +x setup.sh

echo "✅ Setup script created successfully!"