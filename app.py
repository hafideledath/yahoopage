from tokenize import String
from flask import Flask, render_template, request
import requests
import json
import datetime
from urllib import parse

app = Flask(__name__)

@app.route("/")
def index():
    date = datetime.datetime.now()
    weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][date.weekday()]
    month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.month - 1]
    hour = date.hour
    if hour < 12:
        time = "morning"
    elif hour < 18:
        time = "afternoon"
    elif hour < 21:
        time = "evening"
    else:
        time = "night"
    details = json.loads(requests.get("https://api.weatherapi.com/v1/current.json?key=a576bf7b5eca4df09f695518220810&q=Dubai").text)
    autocomplete_results = []
    return render_template("index.html", weather_icon=details["current"]["condition"]["icon"], weather_type=details["current"]["condition"]["text"], temperature=str(round(details['current']['temp_f'])) + "˚", city="Dubai", time=time, weekday=weekday, date=date.day, month=month, results=autocomplete_results)

@app.route("/search")
def search():
    q = request.args.get("q")
    results = []
    if q:
        for result in json.loads(requests.get("https://sugg.search.yahoo.net/sg/?output=json&nresults=10&command={}".format(parse.quote(q))).text)["gossip"]["results"]:
            results.append(result["key"])
    return results