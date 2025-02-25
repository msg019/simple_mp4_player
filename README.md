# SIMPLE_MP4_PLAYER

## Description
Send small mp4 videos from the server to the client and play them back on the client


## Technologies Used
- **Backend:** Flask, Flask-SocketIO
- **Frontend:** React, Vite, Socket.io-client


## Prerequisites 
- Python: 3.13.0
- Node.js: v20.12.2
- React: 18.3
- Vite: 4.5.3

## Instalations

### clone repository
git clone https://github.com/msg019/simple_mp4_player.git    
cd simple_mp4_player  

### set up Backend
IMPORTANT--> In the videos folder, put the videos with mp4 extension

cd backend  
python -m venv venv  
venv/Scripts/activate  //Windows  
pip install -r requirements.txt  
python server.py  

### set up Frontend
cd frontend  
npm install  
npm run dev  


