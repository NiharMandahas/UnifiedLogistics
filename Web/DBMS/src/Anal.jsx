import CompanyAnalytics from './CompanyAnalytics'
import Header from './Header'
import Sidebar from './Sidebar'
export default function Anal(){
    return(
        <div className='Anal-Main'>
            <Header/>
            <div className='Anal-Content' style={{display:'flex'}}>
                <div>
                <Sidebar/>
                </div>
                <div style={{width: '90vw', height: '20vh'}}>
                <CompanyAnalytics/>
                </div>
            </div>
        </div>
    )
}