import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import { FaUsers, FaBullseye, FaEye, FaHandsHelping, FaAccessibleIcon, FaSearch, FaStar } from 'react-icons/fa';
import logo from '../assets/logo.jpg'; // Adicione sua logo aqui
import recruiterImage from '../assets/home.jpg'; // Adicione a imagem do recrutador aqui
import bannerImage from '../assets/aboutus.jpg';

// Importando as fontes Roboto e Open Sans
import '@fontsource/roboto';
import '@fontsource/open-sans';

const float = keyframes`
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatey(-10px);
  }
  100% {
    transform: translatey(0px);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Column = keyframes`
  0% {
    height: 0;
  }
  50% {
    height: 100%;
  }
  100% {
    height: 0;
  }
`;

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100vh;
  text-align: left;
  font-family: 'Open Sans', sans-serif;
  position: relative;
  overflow: hidden;
  padding-left: 50px;
  background-color: #0d0d0d; /* Fundo cinza escuro */

  @media (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const Banner = styled.div`
  background-color: rgba(31, 31, 31, 0.9); /* Fundo cinza escuro */
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1;
  animation: ${float} 4s ease-in-out infinite;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  color: #fff;
  margin-bottom: 20px;
  font-size: 36px;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Subtitle = styled.h2`
  color: #aaa;
  margin-bottom: 30px;
  font-size: 24px;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 15px 30px;
  margin: 10px;
  background-color: ${props => props.primary ? '#5da8ae' : '#5da8ae'}; /* Cores dos botões alteradas para ciano e magenta */
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
  &:hover {
    background-color: ${props => props.primary ? '#225E63' : '#225E63'}; /* Cores ao passar o mouse */
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

const Header = styled.header`
  width: 100%;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Logo = styled.img`
  height: 50px;
  margin-right: 20px;

  @media (max-width: 768px) {
    height: 40px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 50%;
  background: url(${recruiterImage}) no-repeat center center;
  background-size: cover;
  z-index: 0;

  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
    opacity: 0.5;
  }
`;

const MarketingWrapper = styled.div`
  width: 100%;
  background: url(${bannerImage}) no-repeat center center;
  background-size: cover;
  color: #fff;
  text-align: center;
  animation: ${fadeIn} 2s ease-in;
  position: relative;
  z-index: 1;
`;

const MarketingSection = styled.section`
  width: 100%;
  padding: 60px 20px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  text-align: center;
  animation: ${fadeIn} 2s ease-in;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 40px 10px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  margin-bottom: 20px;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #5da8ae;
  }

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const SectionContent = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
  white-space: pre-line;
  font-family: 'Open Sans', sans-serif;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const InfoBoxWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const InfoBox = styled.div`
  width: 30%;
  margin: 20px;
  padding: 20px;
  background-color: rgba(47, 47, 47, 0.8);
  border: 1px solid #5da8ae;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  color: #fff;
  font-family: 'Open Sans', sans-serif;
  animation: ${fadeIn} 1.5s ease-in;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10px);
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const IconWrapper = styled.div`
  font-size: 36px;
  color: #5da8ae;
  margin-bottom: 10px;
`;

const HighlightBox = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  background-color: rgba(47, 47, 47, 0.8);
  border: 1px solid #5da8ae;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  color: #fff;
  font-size: 20px;
  font-family: 'Open Sans', sans-serif;
  animation: ${fadeIn} 1.5s ease-in;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FeedbackSection = styled.section`
  width: 100%;
  padding: 60px 20px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  text-align: center;
  animation: ${fadeIn} 2s ease-in;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 40px 10px;
  }
`;

const FeedbackForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeedbackInput = styled.input`
  width: 80%;
  margin: 10px 0;
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-family: 'Open Sans', sans-serif;
`;

const FeedbackTextarea = styled.textarea`
  width: 80%;
  margin: 10px 0;
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-family: 'Open Sans', sans-serif;
`;

const FeedbackButton = styled.button`
  padding: 15px 30px;
  background-color: #5da8ae;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  font-family: 'Open Sans', sans-serif;

  &:hover {
    background-color: #225E63;
  }
`;

const ThankYouMessage = styled.p`
  font-size: 24px;
  color: #5da8ae;
  font-family: 'Open Sans', sans-serif;
`;

const AnimatedColumns = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background-color: #0d0d0d;
  overflow: hidden;
  z-index: 0;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;

  div {
    width: 10px;
    background-color: rgba(0, 255, 255, 0.5);
    animation: ${Column} 2s infinite;

    &:nth-child(2n) {
      animation-delay: 1s;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ScrollWrapper = styled.div`
  scroll-behavior: smooth;
`;

const ScrollContent = styled.div`
  background-color: #0d0d0d;
`;

const Home = () => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    ScrollReveal().reveal('.reveal', {
      duration: 1000,
      distance: '50px',
      easing: 'ease-in-out',
      origin: 'bottom',
      reset: true,
    });
  }, [location]);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
  };

  return (
    <ScrollWrapper>
      <ScrollContent>
        <HomeWrapper>
          <AnimatedColumns>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </AnimatedColumns>
          <Banner className="reveal">
            <Title>Bem-vindo ao RHRecruiter!</Title>
            <Subtitle>Consultoria especializada em processos de recrutamento e seleção de profissionais para o MERCADO DE TRABALHO!</Subtitle>
            <div>
              <Button to="/jobs" primary>Sou candidato, procuro vagas</Button>
              <Button as="a" href="https://wa.me/5583998523253" target="_blank">Sou empresa, procuro profissionais</Button>
            </div>
          </Banner>
          <BackgroundImage />
        </HomeWrapper>
        <MarketingWrapper id="about">
          <MarketingSection>
            <SectionTitle className="reveal"><FaUsers /> Quem Somos</SectionTitle>
            <SectionContent className="reveal">
              Somos uma consultoria de recrutamento e seleção especializada em encontrar os melhores talentos para sua empresa.<br/>
              Nosso objetivo é transformar o processo de contratação, tornando-o mais eficiente e assertivo.<br/>
              Contamos com uma equipe de especialistas em recursos humanos que utiliza as melhores práticas e tecnologias para garantir que sua empresa encontre os profissionais ideais.
            </SectionContent>
            <InfoBoxWrapper className="reveal">
              <InfoBox>
                <IconWrapper><FaBullseye /></IconWrapper>
                <h3 style={{ color: '#fff' }}>Missão</h3>
                <p>Proporcionar a melhor experiência de recrutamento e seleção, conectando talentos excepcionais a empresas inovadoras.</p>
              </InfoBox>
              <InfoBox>
                <IconWrapper><FaEye /></IconWrapper>
                <h3 style={{ color: '#fff' }}>Visão</h3>
                <p>Ser a principal consultoria em recrutamento e seleção de profissionais de tecnologia, reconhecida pela excelência e inovação.</p>
              </InfoBox>
              <InfoBox>
                <IconWrapper><FaHandsHelping /></IconWrapper>
                <h3 style={{ color: '#fff' }}>Valores</h3>
                <p>Integridade, compromisso com resultados, inovação e respeito à diversidade.</p>
              </InfoBox>
            </InfoBoxWrapper>
          </MarketingSection>
          <MarketingSection>
            <HighlightBox className="reveal">
              <SectionTitle><FaAccessibleIcon /> Nosso Compromisso com a Acessibilidade</SectionTitle>
              <SectionContent>
                Estamos comprometidos em tornar nossa plataforma acessível para todos, independentemente de suas habilidades.
                Utilizamos cores contrastantes para garantir que todos possam ler e entender o conteúdo.
                Acreditamos na equidade de valores e na importância de proporcionar um ambiente inclusivo para todos os candidatos.
                Cada funcionalidade foi desenvolvida pensando na melhor experiência para todos os usuários.
              </SectionContent>
            </HighlightBox>
            <HighlightBox className="reveal">
              <SectionTitle><FaSearch /> Facilidade de Encontrar Vagas</SectionTitle>
              <SectionContent>
                Nosso ATS moderno e eficiente permite que os candidatos encontrem facilmente vagas relevantes através de filtros avançados.
                Com apenas alguns cliques, você pode filtrar vagas por localização, categoria, tipo de emprego e muito mais.
                Isso garante que você encontre rapidamente as oportunidades que melhor se alinham ao seu perfil, facilitando sua jornada profissional.
              </SectionContent>
            </HighlightBox>
            <HighlightBox className="reveal">
              <SectionTitle><FaStar /> Visibilidade e Modernidade</SectionTitle>
              <SectionContent>
                Para os recrutadores, nosso ATS oferece uma plataforma moderna com visibilidade aprimorada das candidaturas.
                Com ferramentas avançadas de gerenciamento de candidatos e relatórios detalhados, ajudamos a tornar o processo de recrutamento mais eficiente e eficaz.
                A nossa plataforma foi desenvolvida com as últimas tendências em tecnologia para garantir uma experiência de usuário superior,
                proporcionando um ambiente de recrutamento mais dinâmico e inovador.
              </SectionContent>
            </HighlightBox>
          </MarketingSection>
        </MarketingWrapper>
        <FeedbackSection>
          <SectionTitle
            style={{ transition: 'color 0.3s', color: feedbackSubmitted ? '#5da8ae' : '#fff' }}
            onMouseOver={(e) => e.target.style.color = '#5da8ae'}
            onMouseOut={(e) => e.target.style.color = feedbackSubmitted ? '#5da8ae' : '#fff'}
          >
            Envie seu Feedback
          </SectionTitle>
          {feedbackSubmitted ? (
            <ThankYouMessage>Obrigado pelo seu feedback!</ThankYouMessage>
          ) : (
            <FeedbackForm onSubmit={handleFeedbackSubmit}>
              <FeedbackInput type="text" placeholder="Seu Nome" required />
              <FeedbackInput type="email" placeholder="Seu Email" required />
              <FeedbackTextarea placeholder="Seu Feedback" required></FeedbackTextarea>
              <FeedbackButton type="submit">Enviar</FeedbackButton>
            </FeedbackForm>
          )}
        </FeedbackSection>
      </ScrollContent>
    </ScrollWrapper>
  );
};

export default Home;
