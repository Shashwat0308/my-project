from app import db
from flask_login import UserMixin
import bcrypt
import secrets
from datetime import datetime, timedelta

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    father_name = db.Column(db.String(50), nullable=False)
    mobile = db.Column(db.String(10), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    dob = db.Column(db.Date, nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    reset_token = db.Column(db.String(100), default=None)
    reset_expiry = db.Column(db.DateTime, default=None)

    def set_password(self, password):
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))

    def set_reset_token(self):
        token = secrets.token_urlsafe(32)
        self.reset_token = token
        self.reset_expiry = datetime.utcnow() + timedelta(minutes=5)
        db.session.commit()
        return token

    def verify_reset_token(self, token):
        if self.reset_token == token and self.reset_expiry > datetime.utcnow():
            return True
        self.reset_token = None
        self.reset_expiry = None
        db.session.commit()
        return False
