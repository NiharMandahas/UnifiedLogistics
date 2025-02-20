import Home from './Home'
import { BrowserRouter as Router, Routes, Route,useLocation  } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css"; 
import SQL from './SQL';
import NoSQL from './NoSQL';
import LoginPage from './LoginPage';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Anal from './Anal';
import GetOrder from './GetOrder'
import Insert from './Insert';
import Display from './Display'
function App() {
  const location = useLocation();

  return (
      <div>
        <AuthProvider>
        <TransitionGroup>
                <CSSTransition key={location.key} classNames="fade" timeout={500}>
                    <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/SQL" element={<SQL />} />
            <Route path='/NoSQL' element={<NoSQL />}/>
            <Route path='/Company' element={<Anal/>}/>
            <Route path='/LoginPage' element={<LoginPage/>}/>
            <Route path='/GetOrder' element={<GetOrder/>}/>
            <Route path='/update' element={<Insert/>}/>
            <Route path='/display' element={<Display/>}/>
            </Routes>
                </CSSTransition>
            </TransitionGroup>
        </AuthProvider>
      </div>
  )
}
export default function AppWrapper() {
  return (
      <Router>
          <App />
      </Router>
  );
}


