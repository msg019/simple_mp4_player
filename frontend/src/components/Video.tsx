import { io }  from 'socket.io-client'
import  { useEffect, useRef, useState } from 'react'
import { useParams,Link } from 'react-router-dom'

interface Hidden{
    'image': boolean
}

const InitialHidden:Hidden={
    'image': false
}

export const Video=()=>{
    const videoBuffer=useRef<Array<string>>([])
    const [imageURL, setImageURL]= useState<string | null>(null)
    const [videoURL, setVideoURL]= useState<string | null>(null)
    const [hidden, setHidden]= useState<Hidden>(InitialHidden)
    const { title }= useParams()
    

    const clearCache=()=>{
        caches.keys()
            .then((names:string[])=>{
                names.forEach((name:string)=>{
                    caches.delete(name)
                })
            })
    }

    const freshVideo=()=>{
        const blob= new Blob(videoBuffer.current, {type: 'video/mp4'})
        setVideoURL(URL.createObjectURL(blob))
        setHidden({
            'image': true
        })
    }

    const loadImage=()=>{
        const data={
            'title':title
        }
        
        fetch('http://localhost:3000/images',{
            method:'POST',
            headers:{
                'Content-Type':'Application/json'
            },
            body:JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>{
            setImageURL(`data:image/jpg;base64,${data.image}`)
        })
        setHidden(prev=>{
            return{
                'image': prev.image
            }
        })

    }

    useEffect(()=>{

        clearCache()

        loadImage()

        const socket= io('http://localhost:3000')
        
        socket.emit('video',title )
        socket.on('data', (data:string)=>{
            videoBuffer.current.push(data)
            
        }) 
        
        return(()=>{
            socket.disconnect()
        })
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
   
    
    return(
    <div style={{padding:'2rem'}}>
        <div className='title-video-container'>
            <h1>{title}</h1>
        </div>
        <div className='back-container'>
            <Link className='link' to="/">Home</Link>
        </div>
        <div className='media-container'>

            {
                imageURL 
                    && 
                (
                <>
                    <img
                        id='idImage' 
                        src={imageURL}
                        alt={title}
                        hidden={hidden.image}
                    /> 
                    
                    <img 
                        id='playButton'
                        src='/play-button.svg'
                        hidden={hidden.image}
                        onClick={freshVideo}
                    /> 
                </>)
            }
            {
                videoURL &&
                <video
                    id='idVideo'
                    controls
                    src={videoURL}
                    autoPlay
                >
                </video>}
        </div>
    </div>
    )
}
