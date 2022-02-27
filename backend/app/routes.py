import time
from app import app
from .ReadFolder import FolderContents
from flask import request, jsonify
import json


@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/campaigns', methods=['GET'])
def get_campaigns():
    base_path = app.config['SESSION_FOLDER']
    folder_data = FolderContents(base_path)
    campaigns = folder_data.get_campaigns()
    api_campaigns = folder_data.api_get_campaigns()
    return {'campaigns': api_campaigns, 'base_path': base_path}

@app.route('/campaigns', methods=['POST'])
def post_campaigns():
    if not request.is_json:
        return {"status": False}
    else:
        print(json.dumps(request.get_json(), indent=2))
        return {"status": True}
