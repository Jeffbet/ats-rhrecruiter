import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import styled, { createGlobalStyle } from 'styled-components';
import Home from './components/Home';
import Admin from './components/Admin';
import Candidate from './components/Candidate';
import Login from './components/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import TalentPool from './components/TalentPool';
import Dashboard from './components/backoffice';
import CookieConsent from './components/CookieConsent';

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    background: #000; /* Definido a cor de fundo desejada */
    color: #fff;
    font-family: 'Open Sans', sans-serif;
    min-height: 100vh;
  }
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [clients, setClients] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    setJobs(storedJobs);
  }, []);

  const addJob = (job) => {
    const updatedJobs = [...jobs, job];
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  };

  const editJob = (index, updatedJob) => {
    const updatedJobs = jobs.map((job, i) => (i === index ? updatedJob : job));
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  };

  const deleteJob = (index) => {
    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  };

  const addClient = (client) => {
    setClients([...clients, client]);
  };

  const applyToJob = (application) => {
    console.log('Aplicação recebida:', application);
    alert('Sua aplicação foi enviada com sucesso!');
  };

  return (
    <CookiesProvider>
      <Router basename="/ats-rhrecruiter">
        <AppWrapper>
          <GlobalStyle />
          <Header />
          <ContentWrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/secure-login-987654321" element={<Login setAuth={setIsAuthenticated} />} />
              <Route
                path="/admin"
                element={isAuthenticated ? (
                  <Admin jobs={jobs} onAddJob={addJob} onEditJob={editJob} onDeleteJob={deleteJob} />
                ) : (
                  <Navigate to="/secure-login-987654321" />
                )}
              />
              <Route path="/jobs" element={<Candidate jobs={jobs} onApply={applyToJob} />} />
              <Route path="/talent-pool" element={<TalentPool />} />
              <Route
                path="/dashboard"
                element={isAuthenticated ? (
                  <Dashboard jobs={jobs} clients={clients} onAddClient={addClient} onDeleteJob={deleteJob} />
                ) : (
                  <Navigate to="/secure-login-987654321" />
                )}
              />
            </Routes>
          </ContentWrapper>
          <Footer />
        </AppWrapper>
        <CookieConsent />
      </Router>
    </CookiesProvider>
  );
};

export default App;
