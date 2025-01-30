import Mongo from "./Mongo"
import Sidebar from "./Sidebar"
import Header from "./Header"
import './NoSQL.css'
export default function NoSQL(){
    return(
        <div>
            <Header/>
        <div style={{display: "flex"}}>
            <div>
                <Sidebar/>
            </div>
            <div style={{marginLeft: "3vw", marginTop:"2vh"}}>
                <Mongo/>
            </div>
        </div>
        </div>

    )
}