import "./Home.css"
import Header from './Header'
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';

export default function Home(){
    const navigate = useNavigate();
    const { logout, isLoggedIn } = useAuth();
    return(
        <>
        <Header/>
        <div className="Home-Main">
            <div className="Home-img-div">
                <img className="Home-img" src="Home.gif"></img>
            </div>
            <div className="Home-button" onClick={() => {isLoggedIn ? navigate("/SQL") : navigate("/LoginPage")}}>
                <button className="button">{isLoggedIn ? 'Explore' : 'Login'}</button>
            </div>
        </div>
        </>
    )
}