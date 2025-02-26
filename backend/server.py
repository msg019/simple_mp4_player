from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from dotenv import load_dotenv
import os
from function import listVideos, sendVideo, searchThumbnails, createThumbnail

env=load_dotenv()

PORT=os.getenv('PORT')
HOST=os.getenv('HOST')

app=Flask(__name__)
CORS(app, resources={r"/*":{"origins":"http://localhost:5173"}})

sockApp= SocketIO(app, cors_allowed_origins="http://localhost:5173")

@app.route('/')
def home():
    return 'Hello'

@app.route('/listvideos',methods=['POST'])
def list_videos():
    if request.method=='POST':
        createThumbnail()
        return jsonify(listVideos())

@app.route('/redi', methods=['GET'])
def redi():
    if request.method=='GET':
        title=request.args.get('title')
        if not title+'.mp4' in listVideos():
            return jsonify("Video doesn't exits"),400
        url=f'http://localhost:5173/video/{title}'
        return jsonify({'redirect': url}), 200

@app.route('/images', methods=['POST'])
def images():
    if request.method=='POST':
        title=request.json['title']
        
        return jsonify({'image':searchThumbnails(title)})

@sockApp.on('video')
def Video(title):
    sendVideo(title,emit)
   

if __name__== '__main__':
    sockApp.run(app=app,debug=True, host=HOST,port=PORT)


