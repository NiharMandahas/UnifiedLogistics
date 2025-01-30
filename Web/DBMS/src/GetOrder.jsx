import Header from "./Header";
import Sidebar from "./Sidebar";
import FetchOrder from "./FetchOrder"

export default function Home(){
    return(
        <div>
            <Header/>
            <div style={{display:'flex'}}>
                <div><Sidebar/></div>
                <FetchOrder/>
            </div>
        </div>
    )
}