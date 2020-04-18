import json
from time import time
from random import random
from flask import Flask, render_template, make_response, request, jsonify, abort, redirect, url_for


app = Flask(__name__)

thing = [[],[]]
@app.route('/')
def hello_world():
    return render_template('index.html')

# @app.route('/live-data')
# def live_data():
#     # Create a PHP array and echo it as JSON
#     data = [time() * 1000, random() * 100]
#     response = make_response(json.dumps(data))
#     response.content_type = 'application/json'
#     return response

# @app.route('/live-data', methods=['POST', 'GET'])
# def add_message():
#     content = jsonify('')
#     if request.method == "POST":
#         content = request.get_json()
#         print([content['obs_datetime'], content['observed']])
#         return content
#     elif request.method == 'GET':
#         return jsonify([content['obs_datetime'], content['observed']])
#     else:
#         return redirect(url_for('bad_request'))

@app.route('/live-data', methods=['POST'])
def post_data():
    global thing
    if not request.json or not 'observed' in request.json:
        abort(400)
    content = request.get_json()
    thing = [
    [content['obs_datetime'], content['observed']], [content['pred_datetime'], float(content['predict'])]
    ]
    return jsonify(thing), 201

@app.route('/live-data', methods=['GET'])
def get_data():
    global thing
    if len(thing) == 0:
        print('fuck')
        abort(404)
    print(thing)
    return jsonify(thing)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=31700)
