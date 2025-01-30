import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Button, Typography, Container } from '@mui/material';
import './Header.css';

export default function Header() {
  const { logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (isLoggedIn) {
      logout();
      navigate('/');
    } else {
      navigate('/LoginPage');
    }
  };

  return (
    <header className="header-container">
      <Container maxWidth="lg" className="header-content">
        <Typography variant="h5" className="header-title">
          Unified Logistic Platform
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAuthAction}
          className="header-button"
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </Button>
      </Container>
    </header>
  );
}
