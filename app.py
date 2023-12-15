from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
from flask import request
from self_checkGPT_v5_updt import FactEvaluationModule
from flask_socketio import SocketIO
import time


app = Flask(__name__, static_url_path='', static_folder='front/build/')
socketio = SocketIO(app)


# @app.route("/", defaults={'path':''})
@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')


@app.route('/api/data', methods=['GET'])
def get_data():
    nSamples = request.args.get('nSamples') 
    prompt = request.args.get('prompt')
    llm_model='gpt-3.5-turbo'
    
    try:
        if not prompt and not nSamples:
            raise Exception('Values not provided')
        
        # Process the data or perform any backend logic
        nSamples = int(nSamples)
        module = FactEvaluationModule(socketio, llm_model)
        
        # Get initial response from LLM
        module.get_response(prompt)

        # Get N new prompts in a list, derived from the original user prompt. Will be used later to get the samples
        module.get_prompts(prompt, nSamples)
        
        # Get the N samples in a list from the LLM using the previously generated prompts list
        module.get_samples(nSamples)

        # Validate the response using the Prompts method
        module.validate_using_prompts()

        # Validate the response using the N-Gram method
        # module.validate_using_ngrams()
        
        # For demonstration purposes: 
        result = f'Retrieved {nSamples} samples from LLM'

        # Return a response
        return jsonify({'result': result})

    except Exception as ce:
        # Handle the custom exception
        return jsonify({'error': str(ce)})

# @app.route('/api/data', methods=['GET'])
# def get_data():
#     nSamples = request.args.get('nSamples') 
#     prompt = request.args.get('prompt') 
    
#     try:
#         if not prompt and not nSamples:
#             raise Exception('Values not provided')
        
#         # Process the data or perform any backend logic
#         nSamples = int(nSamples)
#         module = FactEvaluationModule(socketio)
#         module.evaluate_facts(nSamples)
#         # For demonstration purposes: 
#         result = f'Received data: {nSamples}, {prompt}, replies Flask'

#         # Return a response
#         return jsonify({'result': result})

#     except Exception as ce:
#         # Handle the custom exception
#         return jsonify({'error': str(ce)})
    



if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=2023)