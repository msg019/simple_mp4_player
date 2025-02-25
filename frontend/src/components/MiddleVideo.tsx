import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchData } from "../functions/fetchData"
import { Video } from "./Video"
import { NotFound } from "./Not Found"
import { Loading } from "./Loading"

export const MiddleVideo=()=>{
    const [videos, setVideos]= useState<string[]>([])
    const { title }= useParams()
   
    useEffect(()=>{
        fetchData(setVideos)

    },[])

    if(!title){return}
    const isTitle=videos.includes(title)
    
    return(
        <>
    
            {
                videos.length==0 && !isTitle  
                    ? <Loading /> 
                    : isTitle ? <Video />
                    : <NotFound /> 
            
            }
        </>  
        
    )


}