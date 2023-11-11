from flask import Flask

app = Flask(__name__)

@app.route('/data')
def get_data():
    return {
        
    }
    
if __name__ == '__main__':
    app.run(debug = True)