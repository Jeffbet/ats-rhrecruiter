import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaUser, FaBriefcase, FaHistory, FaChartPie } from 'react-icons/fa';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(31, 47, 47, 0.8);
  z-index: -1;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #2f2f2f;
  color: #fff;
`;

const NavMenu = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    color: #5da8ae;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  width: 100%;
`;

const Section = styled.section`
  width: 100%;
  max-width: 1200px;
  background: rgba(47, 47, 47, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  padding: 20px;
  color: #fff;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  border-bottom: 1px solid #444;
  padding-bottom: 10px;
`;

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #5da8ae;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: #225e63;
  }
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

const Dashboard = ({ jobs, clients, onAddClient, onDeleteJob }) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('clients');
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    company: '',
    cnpj: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleAddClient = () => {
    onAddClient(newClient);
    setNewClient({ name: '', email: '', phone: '', address: '', company: '', cnpj: '' });
  };

  const handleGenerateCSV = () => {
    const csv = Papa.unparse(clients);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'clients.csv');
  };

  const handleGenerateXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(clients);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clients');
    XLSX.writeFile(workbook, 'clients.xlsx');
  };

  const renderJobList = (jobs) => {
    return jobs.map((job, index) => (
      <li key={index}>
        {job.jobTitle} - {job.status} - {job.companyName} - {job.jobLocation}
        <button onClick={() => onDeleteJob(index)}>Excluir</button>
      </li>
    ));
  };

  return (
    <>
      <BackgroundWrapper />
      <Header>
        <h1>ATS Backoffice</h1>
        <NavMenu>
          <NavItem onClick={() => setActiveSection('clients')}>
            <FaUser /> Clientes
          </NavItem>
          <NavItem onClick={() => setActiveSection('jobs')}>
            <FaBriefcase /> Vagas
          </NavItem>
          <NavItem onClick={() => setActiveSection('history')}>
            <FaHistory /> Histórico
          </NavItem>
          <NavItem onClick={() => setActiveSection('reports')}>
            <FaChartPie /> Relatórios
          </NavItem>
        </NavMenu>
      </Header>
      <MainContainer>
        {activeSection === 'clients' && (
          <Section>
            <SectionTitle>Clientes</SectionTitle>
            <SectionContent>
              <div>
                <h3>Adicionar Novo Cliente</h3>
                <Input
                  type="text"
                  name="name"
                  value={newClient.name}
                  onChange={handleInputChange}
                  placeholder="Nome"
                />
                <Input
                  type="email"
                  name="email"
                  value={newClient.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
                <Input
                  type="text"
                  name="phone"
                  value={newClient.phone}
                  onChange={handleInputChange}
                  placeholder="Telefone"
                />
                <Input
                  type="text"
                  name="address"
                  value={newClient.address}
                  onChange={handleInputChange}
                  placeholder="Endereço"
                />
                <Input
                  type="text"
                  name="company"
                  value={newClient.company}
                  onChange={handleInputChange}
                  placeholder="Empresa"
                />
                <Input
                  type="text"
                  name="cnpj"
                  value={newClient.cnpj}
                  onChange={handleInputChange}
                  placeholder="CNPJ"
                />
                <Button onClick={handleAddClient}>Adicionar Cliente</Button>
              </div>
              <div>
                <h3>Lista de Clientes</h3>
                <ul>
                  {clients.map((client, index) => (
                    <li key={index}>
                      {client.name} - {client.email} - {client.phone} - {client.address} - {client.company} - {client.cnpj}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionContent>
          </Section>
        )}
        {activeSection === 'jobs' && (
          <Section>
            <SectionTitle>Vagas</SectionTitle>
            <SectionContent>
              <h3>Vagas Ativas</h3>
              <ul>{renderJobList(jobs.filter(job => job.status === 'Ativa'))}</ul>
              <h3>Vagas em Espera</h3>
              <ul>{renderJobList(jobs.filter(job => job.status === 'Em Espera'))}</ul>
              <h3>Vagas Canceladas</h3>
              <ul>{renderJobList(jobs.filter(job => job.status === 'Cancelada'))}</ul>
            </SectionContent>
          </Section>
        )}
        {activeSection === 'history' && (
          <Section>
            <SectionTitle>Histórico</SectionTitle>
            <SectionContent>
              <p>Histórico de ações e mudanças no sistema.</p>
              {/* Adicione o conteúdo do histórico aqui */}
            </SectionContent>
          </Section>
        )}
        {activeSection === 'reports' && (
          <>
            <Section>
              <SectionTitle>Logs e Relatórios</SectionTitle>
              <SectionContent>
                <p>Geração de logs e relatórios com dados organizados.</p>
                <Button onClick={handleGenerateCSV}>Gerar CSV</Button>
                <Button onClick={handleGenerateXLSX}>Gerar XLSX</Button>
              </SectionContent>
            </Section>
            <Section>
              <SectionTitle>Dashboard de Relatórios</SectionTitle>
              <SectionContent>
                <p>Aqui você pode visualizar dados analíticos sobre o ATS, como número de vagas ativas, candidatos, clientes, etc.</p>
                {/* Adicione gráficos e outras visualizações de dados aqui */}
              </SectionContent>
            </Section>
          </>
        )}
      </MainContainer>
    </>
  );
};

export default Dashboard;
