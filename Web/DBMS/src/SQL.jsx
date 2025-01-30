import Sidebar from './Sidebar'
import TextEditor from './TextEditor'
import Header from './Header'
import './SQL.css'
export default function SQL(){
    return(
        <div><Header/>
        <div className='SQL'>
            <div className="SQL-sidebar"><Sidebar></Sidebar></div>
            <div className="SQL-textEditor"><TextEditor></TextEditor></div>
        </div>
        </div>
    )
}