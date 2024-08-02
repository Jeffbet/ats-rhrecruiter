import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import logo from '../assets/logo.jpg';
import { useCookies } from 'react-cookie';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #000;
  color: #fff;
  font-weight: bold;
  z-index: 1000; /* Certifique-se de que o z-index está acima do conteúdo abaixo */

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const Logo = styled.img`
  height: 50px;
  margin-right: 10px;
`;

const SiteName = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    display: ${props => (props.$isOpen ? 'flex' : 'none')};
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  font-size: 18px;
  position: relative;

  &:hover {
    color: #5da8ae;
  }

  &:hover::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #5da8ae;
    bottom: -5px;
    left: 0;
    transform: scaleX(1);
    transition: transform 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #5da8ae;
    bottom: -5px;
    left: 0;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cookies] = useCookies(['auth']);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleContactClick = () => {
    window.open('https://wa.me/5583998523253', '_blank');
  };

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <HeaderWrapper>
      <MenuButton onClick={toggleMenu}>☰</MenuButton>
      <LogoWrapper onClick={handleLogoClick}>
        <Logo src={logo} alt="RHRecruiter Logo" />
        <SiteName>RHRecruiter</SiteName>
      </LogoWrapper>
      <NavLinks $isOpen={isOpen}>
        <StyledNavLink to="/">Home</StyledNavLink>
        <StyledNavLink to="/jobs">Vagas</StyledNavLink>
        <StyledNavLink as="div" onClick={handleContactClick}>Contato</StyledNavLink>
        <StyledNavLink to="/talent-pool">Banco de Talentos</StyledNavLink>
        {cookies.auth === 'true' && <StyledNavLink to="/admin">Admin</StyledNavLink>}
      </NavLinks>
    </HeaderWrapper>
  );
};

export default Header;
