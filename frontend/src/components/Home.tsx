import { useEffect,useState } from "react"
import { fetchData } from "../functions/fetchData"
import { Loading } from "./Loading"

export const Home=()=>{
  const [videos, setVideos]= useState<string[]>([])
  
 
  const redirectVideo=(title:string)=>{
     fetch(`http://localhost:3000/redi?title=${title}`,{
      method:'GET',
     })
     .then(res=>{
        if (res.status==200){
          return res.json().then(
            data=>{
              window.location.href = data.redirect
             }
          )
        }else{console.log("Video doesn't exits")}
      })
    }

    useEffect(()=>{
      fetchData(setVideos)

    },[])


    return(
        <>
          <div className="main-container">
            <h1>Video</h1>
          </div>
          <div className="main-container">
              <ul
                className="list-container"
              >
                {
                  videos.length==0 && <Loading />
                }
                {
                  videos.map((title,i)=>{
                    return(
                          <>
                            <li 
                              key={i}
                            >
                              {title}
                              <button 
                                onClick={()=>{redirectVideo(title)}}
                              >Watch
                              </button>
                            </li>
                          </>
                          ) 
                    })
                }
              </ul>
              </div>
        </>
    )
}