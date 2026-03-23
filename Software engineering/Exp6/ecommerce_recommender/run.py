#!/usr/bin/env python3
from app import app, db

with app.app_context():
    db.create_all()
    print("Database initialized with sample products.")

if __name__ == '__main__':
    print("Starting E-Shop at http://127.0.0.1:5001")
    print("Install deps: pip install -r requirements.txt")
    app.run(debug=True, port=5001)
