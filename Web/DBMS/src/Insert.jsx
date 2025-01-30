import Sidebar from './Sidebar'
import Update from './Update'
import Header from './Header'
import './Insert.css'
export default function SQL(){
    return(
        <div><Header/>
        <div className='Insert'>
            <div className="Insert-sidebar"><Sidebar></Sidebar></div>
            <div className="Insert-textEditor"><Update></Update></div>
        </div>
        </div>
    )
}