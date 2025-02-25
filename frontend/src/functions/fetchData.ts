import { Dispatch, SetStateAction } from "react"

export const fetchData= async(setVideos:Dispatch<SetStateAction<string[]>>)=>{
    try{
      const res= await fetch('http://localhost:3000/listvideos',{
        method: 'POST',
        headers:{
          'Content-typed': 'application/json'
        },})
      const data= await res.json()
      data.map((video:string)=>{
        setVideos((prev:string[])=>{
          return [...prev, video.replace('.mp4','')]
        })
      })
    }catch (error){
      console.error(error)
    }       
  }
