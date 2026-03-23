from flask import Flask, render_template, request, redirect, url_for, flash
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, DateField
from wtforms.validators import DataRequired, Email, Length, EqualTo, Regexp, ValidationError
from datetime import datetime, timedelta
import bcrypt
import os
import secrets
from dotenv import load_dotenv
import sys
sys.path.append('.')
# Create app first
app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') or 'dev-ecommerce-key-change-in-prod'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce_users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message = 'Please log in to shop.'

# Define models here to avoid circular import
from flask_login import UserMixin

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
    recommendations = db.relationship('Product', secondary='user_recs', backref='users')

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

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50))

user_recs = db.Table('user_recs',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('product_id', db.Integer, db.ForeignKey('product.id'), primary_key=True)
)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class RegistrationForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=2, max=50)])
    father_name = StringField("Father's Name", validators=[DataRequired(), Length(min=2, max=50)])
    mobile = StringField('Mobile Number', validators=[DataRequired(), Regexp(r'^\d{10}$', message='Enter 10-digit mobile')])
    email = StringField('Email', validators=[DataRequired(), Email()])
    dob = DateField('Date of Birth', validators=[DataRequired()], format='%Y-%m-%d')
    username = StringField('Username', validators=[DataRequired(), Length(min=4, max=20)])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=8)])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Register')

    def validate_username(self, field):
        if User.query.filter_by(username=field.data).first():
            raise ValidationError('Username is taken.')

    def validate_email(self, field):
        if User.query.filter_by(email=field.data).first():
            raise ValidationError('Email is already registered.')

    def validate_mobile(self, field):
        if User.query.filter_by(mobile=field.data).first():
            raise ValidationError('Mobile is already registered.')

class LoginForm(FlaskForm):
    login_field = StringField('Username or Email', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')

class ForgotForm(FlaskForm):
    recovery_field = StringField('Email or Mobile', validators=[DataRequired()])
    submit = SubmitField('Send Reset Instructions')

class ResetPasswordForm(FlaskForm):
    password = PasswordField('New Password', validators=[DataRequired(), Length(min=8)])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Reset Password')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(
            name=form.name.data,
            father_name=form.father_name.data,
            mobile=form.mobile.data,
            email=form.email.data,
            dob=form.dob.data,
            username=form.username.data
        )
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Registration successful! Please log in.', 'success')
        return redirect(url_for('login'))
    return render_template('register.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter(
            (User.username == form.login_field.data) | (User.email == form.login_field.data)
        ).first()
        if user and user.check_password(form.password.data):
            login_user(user)
            return redirect(url_for('dashboard'))
        flash('Invalid credentials.', 'danger')
    return render_template('login.html', form=form)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/forgot', methods=['GET', 'POST'])
def forgot():
    form = ForgotForm()
    if form.validate_on_submit():
        user = User.query.filter(
            (User.email == form.recovery_field.data) | (User.mobile == form.recovery_field.data)
        ).first()
        if user:
            token = user.set_reset_token()
            print(f"Reset token for {user.email}: {token} (valid 5min)")
            flash('Reset instructions sent (check console for demo token).', 'info')
        else:
            flash('No account found.', 'warning')
        return redirect(url_for('reset', token='demo'))
    return render_template('forgot.html', form=form)

@app.route('/reset/<token>', methods=['GET', 'POST'])
def reset(token):
    user = User.query.filter_by(reset_token=token).first()
    if not user or not user.verify_reset_token(token):
        flash('Invalid/expired token.', 'danger')
        return redirect(url_for('forgot'))
    form = ResetPasswordForm()
    if form.validate_on_submit():
        user.set_password(form.password.data)
        user.reset_token = None
        user.reset_expiry = None
        db.session.commit()
        flash('Password reset successful!', 'success')
        return redirect(url_for('login'))
    return render_template('reset.html', form=form)

@app.route('/dashboard')
@login_required
def dashboard():
    # Placeholder recs
    products = Product.query.limit(5).all()
    return render_template('dashboard.html', products=products)

@app.route('/')
def index():
    return redirect(url_for('login'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        # Seed products
        if Product.query.count() == 0:
            products = [
                Product(name='Laptop', price=999.99, category='Electronics'),
                Product(name='Phone', price=699.99, category='Electronics'),
                Product(name='Shirt', price=29.99, category='Clothing')
            ]
            for p in products:
                db.session.add(p)
            db.session.commit()
    app.run(debug=True)
