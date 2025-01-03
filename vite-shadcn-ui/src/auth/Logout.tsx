// auth/Logout.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/authSlice';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  if (!user) {
    return null;
  }

  return (
<div className="flex flex-col space-y-2">
      <button onClick={handleLogout} className="ml-4 px-4 py-2 text-white rounded">
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
