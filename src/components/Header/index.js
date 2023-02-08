import React from 'react';
import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaCircle,
  FaPowerOff,
  FaExclamation,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';
import { Nav } from './styled';

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogoutAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.target.setAttribute('display', 'none');
  };

  const handleLogout = () => {
    dispatch(actions.loginFailure());
    history.push('/login');
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/register">
        <FaUserAlt size={24} />
      </Link>

      {isLoggedIn ? (
        <>
          <FaPowerOff
            onClick={handleLogoutAsk}
            size={24}
            cursor="pointer"
            display="block"
          />
          <FaExclamation
            onClick={handleLogout}
            size={24}
            cursor="pointer"
            display="none"
          />
        </>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={24} />
        </Link>
      )}

      <FaCircle size={24} color={isLoggedIn ? '#66ff33' : 'red'} />
    </Nav>
  );
}
