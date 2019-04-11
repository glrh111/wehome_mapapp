#! /usr/bin/env python

"""
TODO:
1. location from gaode  https://lbs.amap.com/api/javascript-api/example/map/click-to-get-lnglat
2. AQI from http://www.pm25.in/api_doc  1.8
"""

import json
from  flask import Flask, request, render_template, jsonify
app = Flask(__name__)

# user need login to use this system

@app.route('/login', methods=['GET', 'POST'])
def login():
    # if request.method == 'POST':
    #     do_the_login()
    # else:
    #     show_the_login_form()
    return ""

@app.route('/', methods=["GET"])
def index():
    return render_template('index.html')

@app.route('/aqi', methods=['GET'])
def get_aqi():
    data = json.loads(request.form.get('data'))
    return jsonify({
        "aqi": 22,
    })

# @app.route('/')
# def hello_world():
#     return 'Hello World!'

if __name__ == '__main__':
    app.run()
