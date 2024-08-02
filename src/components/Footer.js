import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  width: 100%;
  padding: 10px;
  background-color: #000;
  color: white;
  text-align: center;
  position: relative;
  bottom: 0;
  left: 0;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Footer = React.memo(() => {
  return (
    <FooterWrapper>
      <p>© 2024 RHRecruiter. Todos os direitos reservados.</p>
    </FooterWrapper>
  );
});

export default Footer;
