# App

## Running the App

Before running the app, make sure you have the required dependencies installed.

### Backend

In the app directory, set up a virtual environment (venv) to avoid CORS issues.

1. Navigate to the App directory: cd app

2. Create a virtual environment (venv):
  ```
 python -m venv venv
  ``` 

4. Activate the virtual environment:
- On macOS:
  ```
  source venv/bin/activate
  ```
- On Windows:
  ```
  .\venv\Scripts\activate
  ```

4. Install Flask and Flask CORS:
pip install flask
pip install flask_cors

### Frontend

Make sure you have Node.js installed.

1. Change the current directory to the front-end folder:
cd front/

2. Install all dependencies:
  ```
 npm install
  ``` 

### Running Both Backend and Frontend

Make sure the virtual environment is activated before starting the servers to avoid CORS problems.

#### Backend Server

1. Go to the App directory:
cd App

2. Start the development server:
  ```
 python3 app.py
  ``` 


#### Frontend Server

1. Go to the front-end directory:
cd front/

2. Start the development server:
  ```
 npm start
  ``` 
#####
Now you can access your application at the specified URLs. Happy hacking!




