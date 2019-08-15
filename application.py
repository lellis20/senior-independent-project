from flask import Flask, escape, request, render_template, session, redirect
from login import LoginForm
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SECRET_KEY'] = 'ed1e96c2f1103d0289c5458c'
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///main.db"

@app.route('/')
@app.route('/front')
def front():
    return render_template("front.html")

@app.route('/game')
def game():
    return render_template("game.html")

@app.route('/login', methods=["GET", "POST"])
def login():
	formFields = LoginForm()
	if request.method == "POST":
		if formFields.validate_on_submit():
			if formFields.username.data == 'admin' and formFields.password.data == 'admin!':
				return render_template("admin.html")
			elif formFields.username.data == 'screen' and formFields.password.data == 'screen!':
				return render_template("gamescreen.html")
			else:
				return render_template("front.html")
		else:
			return render_template("login.html", formFields=formFields)		
	else:
		return render_template("login.html", formFields=formFields)

@app.route('/admin')
def admin():
	return render_template("admin.html")

@app.route('/screen')
def screen():
	return render_template("gamescreen.html")
