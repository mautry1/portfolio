# backend/app.py
import os
import atexit
from datetime import datetime
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId, json_util
from apscheduler.schedulers.background import BackgroundScheduler
from pymongo.errors import ConnectionFailure, OperationFailure


# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.config.update(
    SECRET_KEY=os.getenv('SECRET_KEY', 'fallback-secret-key'),
    MONGO_URI=os.getenv('MONGO_URI'),
    DEBUG=os.getenv('FLASK_ENV') == 'development'
)

# Database connection with verification
try:
    client = MongoClient(app.config['MONGO_URI'], serverSelectionTimeoutMS=5000)
    client.admin.command('ping')  # Verify connection
    db = client.portfolio
    projects_collection = db.projects
    print("✅ Successfully connected to MongoDB")
except ConnectionFailure as e:
    print(f"❌ MongoDB connection failed: {str(e)}")
    raise RuntimeError("Database connection failed") from e


# Enable CORS
CORS(app, resources={r"/*": {"origins": "*"}})

# JSON serializer for MongoDB ObjectId
def json_response(data):
    return json_util.dumps(data), 200, {'Content-Type': 'application/json'}

# Error handler
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# API Routes
@app.route('/api/projects', methods=['GET'])
def get_projects():
    try:
        projects = list(projects_collection.find().sort('createdAt', -1))
        return json_util.dumps({'projects': projects}), 200, {'Content-Type': 'application/json'}
    except Exception as e:
        app.logger.error(f'Database error: {str(e)}')
        return jsonify({'error': 'Database query failed', 'code': e.code}), 500
    except Exception as e:
        app.logger.error(f'Unexpected error: {str(e)}')
        return jsonify({'error': 'Database operation failed'}), 500
    
@app.route('/api/projects', methods=['POST'])
def create_project():
    try:
        data = request.get_json()
        
        project = {
            'title': data['title'],
            'description': data['description'],
            'techStack': data['techStack'],
            'githubLink': data.get('githubLink', ''),
            'liveDemoLink': data.get('liveDemoLink', ''),
            'image': data.get('image', ''),
            'createdAt': datetime.utcnow()
        }
        
        result = projects_collection.insert_one(project)
        return json_response({'_id': str(result.inserted_id)})
    except KeyError as e:
        return jsonify({'error': f'Missing required field: {str(e)}'}), 400
    except Exception as e:
        app.logger.error(f'Insert error: {str(e)}')
        return jsonify({'error': 'Project creation failed'}), 500

# Health check endpoint
@app.route('/health')
def health_check():
    return jsonify({'status': 'healthy', 'timestamp': datetime.utcnow().isoformat()})

scheduler = BackgroundScheduler()
scheduler.add_job(
    func=lambda: projects_collection.find_one(),
    trigger="interval",
    minutes=3,
    misfire_grace_time=300
)
scheduler.start()

# Shutdown scheduler when app exits
atexit.register(lambda: scheduler.shutdown())

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port)