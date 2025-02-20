import Sidebar from './Sidebar'
import DatabaseDashboard from './DatabaseDashboard'
import Header from './Header'
import './SQL.css'
export default function Display(){
    return(
        <div><Header/>
        <div className='SQL'>
            <div className="SQL-sidebar"><Sidebar></Sidebar></div>
            <div className><DatabaseDashboard></DatabaseDashboard></div>
        </div>
        </div>
    )
}