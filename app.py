from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
from flask import request


app = Flask(__name__, static_url_path='', static_folder='front/build/')

# cross_origin()
# CORS(app)
# @cross_origin(origins="http://localhost:3000")
#one pathway to serve || nginx separate serving front and back 

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')


@app.route('/api/data', methods=['GET'])
def get_data():
    nSamples = request.args.get('nSamples') 
    prompt = request.args.get('prompt') 
    
    try:
        if not prompt and not nSamples:
            raise Exception('Values not provided')
        
        # Process the data or perform any backend logic
        
        # For demonstration purposes: 
        result = f'Received data: {nSamples}, {prompt}, replies Flask'

        # Return a response
        return jsonify({'result': result})

    except Exception as ce:
        # Handle the custom exception
        return jsonify({'error': str(ce)})



if __name__ == '__main__':
    app.run(debug=True)