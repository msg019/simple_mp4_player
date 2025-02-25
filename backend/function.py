import time, os,base64, cv2

videosPath='./videos/'
miniaturesPath='./miniatures/'

def sendVideo(title, emit):
    try:
        with open(videosPath+title+'.mp4', 'rb') as file:
            chunk_size=1024 * 1024
            while True:
                chunk= file.read(chunk_size)
                emit('data', chunk)
                time.sleep(0.2)
    except:
        emit('data', 'Not found')

def listVideos():
    videos= os.listdir(videosPath)
    return videos
def listMiniature():
    return os.listdir(miniaturesPath)


def createMiniature():
    namesVideos=listVideos()
    miniatures=listMiniature()

    for name in namesVideos:
        if not name.replace('.mp4','.jpg') in miniatures:

            vid= cv2.VideoCapture(videosPath+name)
            if not vid: print('Error opening file')
            else:
                #Total frames from video
                frames= int(vid.get(cv2.CAP_PROP_FRAME_COUNT))
                #Obtain a random frame near to the middle and use it
                random_frame= frames//3
                vid.set(cv2.CAP_PROP_POS_FRAMES, random_frame)

                ret, frame= vid.read()
                if ret:
                    cv2.imwrite(miniaturesPath+name.replace('.mp4','.jpg'), frame)
                vid.release()


def searchMiniature(name):
    with open(miniaturesPath+name+'.jpg', 'rb') as image:
        str= base64.b64encode(image.read()).decode('utf-8')
        return str




  







