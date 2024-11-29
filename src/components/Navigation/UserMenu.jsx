import React from 'react';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default UserMenu;
