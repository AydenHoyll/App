from flask import Flask, jsonify
from flask_cors import CORS, cross_origin



app = Flask(__name__)
cors = CORS(app)

@app.route('/')

def hello():
    return jsonify(message="Flask ssss is on!!")

if __name__ == '__main__':
    app.run(debug=True)
