#export FLASK_APP=application.py

from flask import Flask, escape, request, render_template, session, redirect
from login import LoginForm
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, send

app = Flask(__name__)

app.config['SECRET_KEY'] = 'ed1e96c2f1103d0289c5458c'
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///main.db"
socketio = SocketIO(app)

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
	return render_template("login.html", formFields=formFields)

@app.route('/admin')
def admin():
	return render_template("admin.html")

@app.route('/screen')
def screen():
	return render_template("gamescreen.html")


@socketio.on('message')
def handle(msg):
	print('Message: ' + msg)
	send(msg, broadcast=True)

if __name__=='__main__':
	socketio.run(app)
