from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "chrome-extension://pajldmegmplgpnkophacahbgnoojoagl"}})


@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    url = data.get("url")

    # Placeholder logic for analysis
    trust_score = 85
    message = f"The website '{url}' appears to be trustworthy."

    return jsonify({"score": trust_score, "message": message})

if __name__ == '__main__':
    app.run(debug=True)


