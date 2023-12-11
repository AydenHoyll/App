from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from flask import request

app = Flask(__name__)

# cross_origin()
CORS(app)
@cross_origin(origins="http://localhost:3000")

@app.route('/api/data', methods=['GET'])
def get_data():
    nSamples = request.args.get('nSamples') 
    prompt = request.args.get('prompt') 
    try:
        if not prompt and not nSamples:
            raise Exception('Values not provided')
        
        # Process the data or perform any backend logic
        

        # For demonstration purposes: 
        result = f'Received data: {nSamples}, {prompt}'

        # Return a response
        return jsonify({'result': result})

    except Exception as e:
        # Handle the custom exception
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True)