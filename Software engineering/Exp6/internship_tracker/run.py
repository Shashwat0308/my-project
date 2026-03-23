#!/usr/bin/env python3
from app import app, db

with app.app_context():
    db.create_all()
    print("Database initialized.")

if __name__ == '__main__':
    print("Starting Internship Tracker at http://127.0.0.1:5000")
    print("Install deps first: pip install -r requirements.txt")
    app.run(debug=True)
