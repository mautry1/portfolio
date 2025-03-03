# Portfolio Website

This is a personal portfolio website built using a **React frontend** and a **Flask backend**. The site showcases projects, skills, and other relevant details.

## Features
- **Modern UI**: Built with React and styled with Tailwind CSS.
- **Backend API**: Flask-based backend serving project data.
- **Database Support**: Easily extendable for database integration.
- **Secure & Scalable**: Uses environment variables for sensitive data.

## Technologies Used
### Frontend:
- React (TypeScript)
- Tailwind CSS
- Vite

### Backend:
- Flask
- Python
- Flask-CORS
- Gunicorn (for production)

## Installation & Setup
### Prerequisites
- Node.js (for frontend)
- Python 3.x (for backend)

### Clone the Repository
```bash
git clone https://github.com/mautry1/portfolio.git
cd portfolio
```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd portfolio-backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # MacOS/Linux
   venv\Scripts\activate     # Windows
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file in `portfolio-backend` and configure environment variables.
5. Start the backend server:
   ```bash
   python app.py
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd portfolio-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Deployment
### Backend Deployment
For production, you can use **Gunicorn**:
```bash
cd portfolio-backend
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Frontend Deployment
To build and deploy the frontend:
```bash
cd portfolio-frontend
npm run build
```
The built files will be in the `dist/` folder, which can be deployed to platforms like **Vercel, Netlify, or an S3 bucket**.

## Environment Variables
Ensure you configure the required environment variables:
```
PORT=5000
SECRET_KEY=your_secret_key_here
DATABASE_URL=your_database_url_here
```

## License
This project is licensed under the MIT License.

## Author
Developed by **Micah Autry**.
