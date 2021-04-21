from flask import Flask, render_template, request, jsonify
from scrapers.ml import MLApi
from scrapers.olx import OLXApi
from peewee import SqliteDatabase
from db.db import Db as dbm


def session_for(username, password):
    return "69696969"


def get_user(token):
    user = None
    if token == "69696969":
        user = {
            "id": 1,
            "username": "julian",
            "password": "julian",
            "email": "julian@mail.com",
        }
    return user


app = Flask(__name__)


@app.route("/")
def index():
    term = request.args.get('q', default='', type=str)
    if not term:
        return render_template("index.html")

    return jsonify([*MLApi.search(term), *OLXApi.search(term)])


@app.route("/api/save", methods=["POST"])
def save():
    token = request.cookies.get("session_token")
    data = request.json
    status = dbm.saveTrackings(get_user(token), data)
    return jsonify({"saved": status})


@app.route("/login", methods=["POST"])
def login():
    username = request.json['username']
    password = request.json['password']
    token = session_for(username, password)
    return jsonify({"token": token})


@app.route("/api/trackings", methods=["GET"])
def trackings():
    token = request.cookies.get("session_token")
    results = dbm.getUserTrackings(get_user(token)['id'])

    return jsonify(results)


@app.route("/api/me", methods=["GET"])
def me():
    token = request.cookies.get("session_token")
    return jsonify(get_user(token))


if __name__ == "__main__":
    app.run()
