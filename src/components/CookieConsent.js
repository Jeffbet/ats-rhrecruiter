import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';

const CookieConsentWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  text-align: center;
  z-index: 1000;
`;

const Button = styled.button`
  background: #5da8ae;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: #225E63;
  }
`;

const CookieConsent = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['userConsent']);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!cookies.userConsent) {
      setShow(true);
    }
  }, [cookies]);

  const handleAccept = () => {
    setCookie('userConsent', 'accepted', { path: '/', maxAge: 31536000 });
    setShow(false);
  };

  const handleDecline = () => {
    setCookie('userConsent', 'declined', { path: '/', maxAge: 31536000 });
    setShow(false);
  };

  if (!show) {
    return null;
  }

  return (
    <CookieConsentWrapper>
      Este site usa cookies para melhorar a experiência do usuário. Ao continuar navegando, você concorda com o uso de cookies.
      <Button onClick={handleAccept}>Aceitar</Button>
      <Button onClick={handleDecline}>Negar</Button>
    </CookieConsentWrapper>
  );
};

export default CookieConsent;
