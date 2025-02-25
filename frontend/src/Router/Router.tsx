import { Routes,Route } from "react-router-dom"
import { Home } from "../components/Home"
import { MiddleVideo } from "../components/MiddleVideo"
import { NotFound } from "../components/Not Found"

export const Router=()=>{

    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />}/>
            <Route path='/video/:title' element={<MiddleVideo />}/>
        </Routes>
    )
}