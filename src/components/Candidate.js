import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { FaWhatsapp, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import backgroundImage from '../assets/candidate.jpg';

// Definindo o elemento do aplicativo para o react-modal
Modal.setAppElement('#root');

// Definições de estilo
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-top: 60px;
  background-color: #1f2f2f;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
  }
`;

const FilterWrapper = styled.div`
  max-width: 250px;
  width: 100%;
  margin: 20px;
  padding: 20px;
  background: rgba(47, 47, 47, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #fff;

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 10px 0;
  }
`;

const FilterTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 10px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #4f4f4f;
  color: #fff;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #4f4f4f;
  color: #fff;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const JobListWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 20px;
  padding: 20px;
  background: rgba(47, 47, 47, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #fff;
  flex-grow: 1;

  @media (max-width: 768px) {
    margin: 10px 0;
    padding: 15px;
  }
`;

const JobListTitle = styled.h2`
  color: #fff;
  text-align: center;
  font-size: 60px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const JobWrapper = styled.div`
  margin-bottom: 30px;
  border-bottom: 1px solid #444;
  padding-bottom: 20px;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
    padding-bottom: 15px;
  }
`;

const JobTitle = styled.h3`
  color: #5da8ae;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  cursor: pointer;

  &:hover {
    color: #225E63;
  }

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 15px;
  }
`;

const JobDetails = styled.div`
  color: #fff;
  margin-bottom: 20px;
  text-align: left;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const DetailTitle = styled.p`
  font-weight: bold;
  margin: 10px 0 5px;

  @media (max-width: 768px) {
    margin: 8px 0 4px;
  }
`;

const ListItem = styled.li`
  margin-bottom: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
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
    background: #225E63;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

const ShareButton = styled.a`
  display: inline-block;
  padding: 10px;
  background: #25d366;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-size: 16px;

  &:hover {
    background: #128c7e;
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
  }
`;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#2f2f2f',
    color: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '500px',
    maxWidth: '90%',
    overflow: 'auto',
  },
};

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 10px 20px;
  margin: 0 5px;
  background: ${props => props.active ? '#5da8ae' : '#4f4f4f'};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #225E63;
  }

  &:disabled {
    background: #999;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
  }
`;

const paginate = (array, page_size, page_number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};

// Vagas iniciais fixas e editáveis
const initialJobs = [
  {
    jobTitle: "Desenvolvedor Backend",
    jobDescription: "O Desenvolvedor Backend será responsável por desenvolver e manter a lógica de servidor, bancos de dados e integração com APIs. Requisitos incluem experiência com Node.js, MongoDB, e implementação de microservices.",
    jobRequirements: ["Graduação Completa", "Experiência Prévia", "Conhecimento em Node.js", "Banco de Dados MongoDB", "Desenvolvimento de APIs RESTful"],
    jobLocation: ["Rio de Janeiro"],
    jobWorkMode: ["Híbrido"],
    jobBenefits: ["Vale Refeição", "Plano de Saúde", "Gympass"],
    jobType: ["Contrato PJ"],
    jobSalary: "R$ 9000,00",
    jobCategory: ["Tecnologia"],
    companyName: "Innovative Solutions",
    createdDate: "05/07/2024"
  },
  {
    jobTitle: "Analista de Service Desk",
    jobDescription: "Ser responsável pelo atendimento aos usuários da plataforma pelos canais, chat e e-mail; Abertura e acompanhamento de chamados; Garantir a entrega de demandas solicitadas. Analisar os incidentes e solicitações de suporte e serviços atendendo pronta e corretamente as solicitações dos clientes, registrando e solucionando conforme procedimento técnicos; Atuar na resolução de problemas e dúvidas dos clientes; Responder pela gestão eficaz do relacionamento e feedback com os clientes; Garantir a alta satisfação do cliente sendo medido por métricas de avaliação de Tickets (CSAT) Reunir informações estruturadas e orientadas por dados e interagir com o time de Customer Success.",
    jobRequirements: ["Graduação Completa", "Experiência Prévia", "Área de Formação: Sistemas de Informação, Análise de Sistemas ou Sistemas para Internet", "Desejável: Conhecimento em ferramentas de help desk (Freshdesk, ZenDesk, MilDesk, etc) E atendimento b2b para ecommerce"],
    jobLocation: ["Minas Gerais"],
    jobWorkMode: ["Home Office"],
    jobBenefits: ["Vale Refeição", "Plano de Saúde", "Gympass"],
    jobType: ["Contrato PJ"],
    jobSalary: "R$ 2000,00",
    jobCategory: ["Tecnologia"],
    companyName: "Innovative Solutions",
    createdDate: "05/07/2024"
  },
  {
    jobTitle: "Analista de Marketing",
    jobDescription: "O Analista de Marketing será responsável por desenvolver e executar estratégias de marketing digital, analisar métricas de desempenho e colaborar com a equipe de vendas.",
    jobRequirements: ["Graduação em Marketing", "Experiência Prévia", "Conhecimento em SEO/SEM", "Gerenciamento de Redes Sociais"],
    jobLocation: ["São Paulo"],
    jobWorkMode: ["Presencial"],
    jobBenefits: ["Vale Refeição", "Vale Transporte", "Plano Odontológico"],
    jobType: ["CLT"],
    jobSalary: "R$ 5000,00",
    jobCategory: ["Marketing"],
    companyName: "Market Leaders",
    createdDate: "10/07/2024"
  },
  {
    jobTitle: "Designer Gráfico",
    jobDescription: "O Designer Gráfico será responsável por criar elementos visuais atraentes para campanhas publicitárias, sites e redes sociais. Necessário conhecimento em ferramentas como Photoshop e Illustrator.",
    jobRequirements: ["Graduação em Design", "Experiência Prévia", "Conhecimento em Photoshop e Illustrator", "Criatividade e Inovação"],
    jobLocation: ["Belo Horizonte"],
    jobWorkMode: ["Remoto"],
    jobBenefits: ["Vale Refeição", "Plano de Saúde", "Home Office"],
    jobType: ["CLT"],
    jobSalary: "R$ 4500,00",
    jobCategory: ["Design", "Marketing"],
    companyName: "Creative Studio",
    createdDate: "12/07/2024"
  },
  {
    jobTitle: "Gerente de Projetos",
    jobDescription: "O Gerente de Projetos será responsável por planejar, executar e finalizar projetos de acordo com prazos e orçamento. Necessário experiência em metodologias ágeis.",
    jobRequirements: ["Graduação em Engenharia", "Certificação PMP", "Experiência em Metodologias Ágeis", "Gerenciamento de Equipes"],
    jobLocation: ["Porto Alegre"],
    jobWorkMode: ["Híbrido"],
    jobBenefits: ["Vale Refeição", "Plano de Saúde", "Seguro de Vida"],
    jobType: ["CLT"],
    jobSalary: "R$ 11000,00",
    jobCategory: ["Gestão", "Tecnologia"],
    companyName: "Project Masters",
    createdDate: "15/07/2024"
  },
  {
    jobTitle: "Especialista em Segurança da Informação",
    jobDescription: "O Especialista em Segurança da Informação será responsável por proteger os sistemas e dados da empresa contra ameaças cibernéticas.",
    jobRequirements: ["Graduação em Ciência da Computação", "Certificação CISSP", "Experiência em Segurança Cibernética", "Conhecimento em Redes e Firewall"],
    jobLocation: ["Brasília"],
    jobWorkMode: ["Presencial"],
    jobBenefits: ["Vale Refeição", "Plano de Saúde", "Plano Odontológico"],
    jobType: ["CLT"],
    jobSalary: "R$ 13000,00",
    jobCategory: ["Tecnologia", "Segurança"],
    companyName: "SecureTech",
    createdDate: "20/07/2024"
  },
  {
    jobTitle: "Engenheiro de Dados",
    jobDescription: "O Engenheiro de Dados será responsável por projetar, construir e manter sistemas de dados escaláveis e eficientes.",
    jobRequirements: ["Graduação em Engenharia da Computação", "Experiência com ETL", "Conhecimento em Big Data", "Programação em Python"],
    jobLocation: ["Curitiba"],
    jobWorkMode: ["Remoto"],
    jobBenefits: ["Vale Refeição", "Gympass", "Auxílio Home Office"],
    jobType: ["CLT"],
    jobSalary: "R$ 12000,00",
    jobCategory: ["Tecnologia", "Dados"],
    companyName: "DataCorp",
    createdDate: "22/07/2024"
  },
  {
    jobTitle: "Especialista em UX/UI",
    jobDescription: "O Especialista em UX/UI será responsável por criar experiências de usuário intuitivas e visualmente atraentes.",
    jobRequirements: ["Graduação em Design", "Experiência com UX/UI", "Conhecimento em Ferramentas de Prototipagem", "Empatia com o Usuário"],
    jobLocation: ["Florianópolis"],
    jobWorkMode: ["Híbrido"],
    jobBenefits: ["Vale Refeição", "Vale Transporte", "Plano de Saúde"],
    jobType: ["CLT"],
    jobSalary: "R$ 8000,00",
    jobCategory: ["Design", "Tecnologia"],
    companyName: "UXDesigners",
    createdDate: "25/07/2024"
  },
  {
    jobTitle: "Analista de Sistemas",
    jobDescription: "O Analista de Sistemas será responsável por analisar, projetar e implementar soluções de software para melhorar os processos de negócios.",
    jobRequirements: ["Graduação em Sistemas de Informação", "Experiência Prévia", "Conhecimento em Análise de Requisitos", "Programação em Java"],
    jobLocation: ["Recife"],
    jobWorkMode: ["Remoto"],
    jobBenefits: ["Vale Refeição", "Plano de Saúde", "Auxílio Home Office"],
    jobType: ["CLT"],
    jobSalary: "R$ 7500,00",
    jobCategory: ["Tecnologia"],
    companyName: "SystemAnalyzers",
    createdDate: "28/07/2024"
  },
  {
    jobTitle: "Consultor SAP",
    jobDescription: "O Consultor SAP será responsável por implementar e customizar soluções SAP para atender às necessidades dos clientes.",
    jobRequirements: ["Graduação em Administração ou TI", "Experiência com SAP", "Conhecimento em Módulos FI/CO", "Habilidades de Comunicação"],
    jobLocation: ["Salvador"],
    jobWorkMode: ["Híbrido"],
    jobBenefits: ["Vale Refeição", "Plano de Saúde", "Seguro de Vida"],
    jobType: ["CLT"],
    jobSalary: "R$ 14000,00",
    jobCategory: ["Consultoria", "Tecnologia"],
    companyName: "SAPConsult",
    createdDate: "30/07/2024"
  },
  {
    jobTitle: "Product Owner",
    jobDescription: "O Product Owner será responsável por definir e priorizar o backlog do produto, garantindo que as entregas atendam às necessidades dos clientes e do negócio.",
    jobRequirements: ["Graduação em Administração", "Certificação CSPO", "Experiência em Gestão de Produtos", "Conhecimento em Metodologias Ágeis"],
    jobLocation: ["Fortaleza"],
    jobWorkMode: ["Presencial"],
    jobBenefits: ["Vale Refeição", "Plano de Saúde", "Plano Odontológico"],
    jobType: ["CLT"],
    jobSalary: "R$ 10000,00",
    jobCategory: ["Gestão", "Tecnologia"],
    companyName: "ProductManagers",
    createdDate: "02/07/2024"
  }
];

const Candidate = ({ onApply }) => {
  const [jobs, setJobs] = useState([...initialJobs]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [filterState, setFilterState] = useState('');
  const [modalFilterState, setModalFilterState] = useState('');
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterCLT, setFilterCLT] = useState(false);
  const [filterPJ, setFilterPJ] = useState(false);
  const [filterInternship, setFilterInternship] = useState(false);
  const [filterWorkMode, setFilterWorkMode] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPCD, setIsPCD] = useState(false);
  const [disabilityType, setDisabilityType] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');
  const [confirmationIsOpen, setConfirmationIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const formRef = useRef();

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    if (storedJobs.length > 0) {
      setJobs([...initialJobs, ...storedJobs]);
    }
  }, []);

  const states = [
    "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão",
    "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro",
    "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins",
  ];

  const categories = [
    "Tecnologia", "Administração", "Recursos Humanos", "Financeiro", "Marketing", "PCD", "Afirmativa PCD", "Exclusiva PCD"
  ];

  const workModes = ["Remoto", "Híbrido", "Presencial"];

  const disabilityTypes = [
    "Física",
    "Auditiva",
    "Visual",
    "Intelectual",
    "Psicosocial",
    "Múltipla"
  ];

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'state') {
      setFilterState(value);
    } else if (name === 'category') {
      const newCategory = [...filterCategory];
      if (checked) {
        newCategory.push(value);
      } else {
        const index = newCategory.indexOf(value);
        if (index > -1) {
          newCategory.splice(index, 1);
        }
      }
      setFilterCategory(newCategory);
    } else if (name === 'clt') {
      setFilterCLT(checked);
    } else if (name === 'pj') {
      setFilterPJ(checked);
    } else if (name === 'internship') {
      setFilterInternship(checked);
    } else if (name === 'workMode') {
      const newWorkMode = [...filterWorkMode];
      if (checked) {
        newWorkMode.push(value);
      } else {
        const index = newWorkMode.indexOf(value);
        if (index > -1) {
          newWorkMode.splice(index, 1);
        }
      }
      setFilterWorkMode(newWorkMode);
    }
    setCurrentPage(1); // Reset the current page to 1 whenever a filter is applied
  };

  const handleModalFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'state') {
      setModalFilterState(value);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const jobCategories = Array.isArray(job.jobCategory) ? job.jobCategory : (job.jobCategory || "").split(', ');
    const jobTypes = Array.isArray(job.jobType) ? job.jobType : (job.jobType || "").split(', ');
    const jobWorkModes = Array.isArray(job.jobWorkMode) ? job.jobWorkMode : (job.jobWorkMode || "").split(', ');

    return (
      (filterState === '' || job.jobLocation.includes(filterState)) &&
      (filterCategory.length === 0 || filterCategory.some(category => jobCategories.includes(category))) &&
      (!filterCLT || jobTypes.includes('CLT')) &&
      (!filterPJ || jobTypes.includes('Contrato PJ')) &&
      (!filterInternship || jobTypes.includes('Estágio')) &&
      (filterWorkMode.length === 0 || filterWorkMode.some(mode => jobWorkModes.includes(mode))) &&
      (searchTerm === '' || job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const jobsPerPage = 10;
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const paginatedJobs = paginate(filteredJobs, jobsPerPage, currentPage);

  const handleApply = (e) => {
    e.preventDefault();
    if (selectedJob && name && whatsapp && email && resume && (selectedJob.jobSalary !== 'Pretensão salarial' || expectedSalary)) {
        if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(whatsapp)) {
            alert('Por favor, insira um número de WhatsApp válido com DDD no formato "(99) 99999-9999".');
            return;
        }

        const formData = {
            jobTitle: selectedJob.jobTitle,
            jobDescription: selectedJob.jobDescription,
            jobRequirements: selectedJob.jobRequirements,
            jobLocation: selectedJob.jobLocation,
            jobWorkMode: selectedJob.jobWorkMode,
            jobBenefits: selectedJob.jobBenefits,
            jobType: selectedJob.jobType,
            jobSalary: selectedJob.jobSalary,
            jobCategory: selectedJob.jobCategory,
            companyName: selectedJob.companyName,
            createdDate: selectedJob.createdDate,
            name: name,
            whatsapp: whatsapp,
            email: email,
            resume: resume ? resume.name : '',
            isPCD: isPCD ? 'Sim' : 'Não',
            disabilityType: disabilityType,
            expectedSalary: expectedSalary,
        };

        emailjs.send('service_z9v57hn', 'template_pvhvu2p', formData, 'KcEag2JM8hYaCVTjB')
            .then((result) => {
                console.log(result.text);
                setConfirmationIsOpen(true);
            }, (error) => {
                console.log(error.text);
                alert('Houve um erro ao enviar sua aplicação. Por favor, tente novamente.');
            });

        onApply({
            job: selectedJob,
            name,
            whatsapp,
            email,
            resume,
            isPCD,
            disabilityType,
            expectedSalary
        });

        resetForm();
        closeModal();
    } else {
        alert('Por favor, preencha todos os campos e anexe o currículo em PDF.');
    }
  };

  const resetForm = () => {
    setName('');
    setWhatsapp('');
    setEmail('');
    setResume(null);
    setIsPCD(false);
    setDisabilityType('');
    setExpectedSalary('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResume(file);
    } else {
      alert('Por favor, anexe um arquivo PDF.');
    }
  };

  const handleWhatsappChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (value.length > 5) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else {
      value = value.replace(/^(\d*)/, '($1');
    }
    setWhatsapp(value);
  };

  const openModal = (job) => {
    setSelectedJob(job);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeConfirmationModal = () => {
    setConfirmationIsOpen(false);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <Container>
        <FilterWrapper>
          <FilterTitle>Filtrar Vagas</FilterTitle>
          <FormField>
            <Label>Estado</Label>
            <Select name="state" value={filterState} onChange={handleFilterChange}>
              <option value="">Todos</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField>
            <Label>Modalidade</Label>
            <CheckboxWrapper>
              {workModes.map((mode) => (
                <CheckboxLabel key={mode}>
                  <input
                    type="checkbox"
                    name="workMode"
                    value={mode}
                    checked={filterWorkMode.includes(mode)}
                    onChange={handleFilterChange}
                  />
                  {mode}
                </CheckboxLabel>
              ))}
            </CheckboxWrapper>
          </FormField>
          <FormField>
            <Label>Categoria</Label>
            <CheckboxWrapper>
              {categories.map((category) => (
                <CheckboxLabel key={category}>
                  <input
                    type="checkbox"
                    name="category"
                    value={category}
                    checked={filterCategory.includes(category)}
                    onChange={handleFilterChange}
                  />
                  {category}
                </CheckboxLabel>
              ))}
            </CheckboxWrapper>
          </FormField>
          <FormField>
            <CheckboxLabel>
              <input
                type="checkbox"
                name="clt"
                checked={filterCLT}
                onChange={handleFilterChange}
              />
              CLT
            </CheckboxLabel>
            <CheckboxLabel>
              <input
                type="checkbox"
                name="pj"
                checked={filterPJ}
                onChange={handleFilterChange}
              />
              Contrato PJ
            </CheckboxLabel>
            <CheckboxLabel>
              <input
                type="checkbox"
                name="internship"
                checked={filterInternship}
                onChange={handleFilterChange}
              />
              Estágio
            </CheckboxLabel>
          </FormField>
          <FormField>
            <Label>Pesquisar Vaga</Label>
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite o nome da vaga"
            />
          </FormField>
        </FilterWrapper>

        <JobListWrapper>
          <JobListTitle>Vagas Disponíveis</JobListTitle>
          {filteredJobs.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#fff' }}>Nenhuma vaga encontrada com os filtros selecionados.</p>
          ) : (
            paginatedJobs.map((job, index) => (
              <JobWrapper key={index}>
                <JobTitle onClick={() => openModal(job)}>{job.jobTitle}</JobTitle>
                <p style={{ fontSize: '12px', textAlign: 'center', color: '#ccc' }}>Publicado em: {job.createdDate}</p>
                <JobDetails>
                  <DetailTitle>Localização:</DetailTitle>
                  <ul>{Array.isArray(job.jobLocation) ? job.jobLocation.map((loc, i) => <ListItem key={i}>{loc}</ListItem>) : <ListItem>{job.jobLocation}</ListItem>}</ul>
                  <DetailTitle>Modalidade:</DetailTitle>
                  <ul>{Array.isArray(job.jobWorkMode) ? job.jobWorkMode.map((mode, i) => <ListItem key={i}>{mode}</ListItem>) : <ListItem>{job.jobWorkMode}</ListItem>}</ul>
                  <DetailTitle>Descrição:</DetailTitle>
                  <ul><ListItem>{job.jobDescription}</ListItem></ul>
                  <DetailTitle>Requisitos:</DetailTitle>
                  <ul>{Array.isArray(job.jobRequirements) ? job.jobRequirements.map((req, i) => <ListItem key={i}>{req}</ListItem>) : <ListItem>{job.jobRequirements}</ListItem>}</ul>
                  <DetailTitle>Benefícios:</DetailTitle>
                  <ul>{Array.isArray(job.jobBenefits) ? job.jobBenefits.map((benefit, i) => <ListItem key={i}>{benefit}</ListItem>) : <ListItem>{job.jobBenefits}</ListItem>}</ul>
                  <DetailTitle>Tipo de Vaga:</DetailTitle>
                  <ul>{Array.isArray(job.jobType) ? job.jobType.map((type, i) => <ListItem key={i}>{type}</ListItem>) : <ListItem>{job.jobType}</ListItem>}</ul>
                  <DetailTitle>Salário:</DetailTitle>
                  <ul>{Array.isArray(job.jobSalary) ? job.jobSalary.map((salary, i) => <ListItem key={i}>{salary}</ListItem>) : <ListItem>{job.jobSalary}</ListItem>}</ul>
                  <DetailTitle>Categoria:</DetailTitle>
                  <ul>{Array.isArray(job.jobCategory) ? job.jobCategory.map((cat, i) => <ListItem key={i}>{cat}</ListItem>) : <ListItem>{job.jobCategory}</ListItem>}</ul>
                </JobDetails>
                <ButtonWrapper>
                  <Button onClick={() => openModal(job)}>Candidatar-se</Button>
                  <ShareButton
                    href={`https://wa.me/?text=Confira esta vaga: ${job.jobTitle} - ${job.jobLocation} - ${window.location.href}`}
                    target="_blank"
                  >
                    <FaWhatsapp />
                  </ShareButton>
                  <ShareButton
                    href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                    target="_blank"
                    style={{ background: '#4267B2' }}
                  >
                    <FaFacebook />
                  </ShareButton>
                  <ShareButton
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${job.jobTitle}&summary=${job.jobDescription}&source=LinkedIn`}
                    target="_blank"
                    style={{ background: '#2867B2' }}
                  >
                    <FaLinkedin />
                  </ShareButton>
                  <ShareButton
                    href={`https://www.instagram.com/?url=${window.location.href}`}
                    target="_blank"
                    style={{ background: '#E1306C' }}
                  >
                    <FaInstagram />
                  </ShareButton>
                </ButtonWrapper>
              </JobWrapper>
            ))
          )}
          <PaginationWrapper>
            <PageButton onClick={goToPreviousPage} disabled={currentPage === 1}>Anterior</PageButton>
            {[...Array(totalPages)].map((_, index) => (
              <PageButton key={index + 1} active={currentPage === index + 1} onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </PageButton>
            ))}
            <PageButton onClick={goToNextPage} disabled={currentPage === totalPages}>Próximo</PageButton>
          </PaginationWrapper>
        </JobListWrapper>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Candidatar-se à Vaga"
        >
          {selectedJob && (
            <div>
              <h2>Candidatar-se à Vaga: {selectedJob.jobTitle}</h2>
              <form ref={formRef} onSubmit={handleApply}>
                <input type="hidden" name="jobTitle" value={selectedJob.jobTitle} />
                <input type="hidden" name="jobDescription" value={selectedJob.jobDescription} />
                <input type="hidden" name="jobRequirements" value={selectedJob.jobRequirements} />
                <input type="hidden" name="jobLocation" value={selectedJob.jobLocation} />
                <input type="hidden" name="jobWorkMode" value={selectedJob.jobWorkMode} />
                <input type="hidden" name="jobBenefits" value={selectedJob.jobBenefits} />
                <input type="hidden" name="jobType" value={selectedJob.jobType} />
                <input type="hidden" name="jobSalary" value={selectedJob.jobSalary} />
                <input type="hidden" name="jobCategory" value={selectedJob.jobCategory} />
                <input type="hidden" name="companyName" value={selectedJob.companyName} />
                <input type="hidden" name="createdDate" value={selectedJob.createdDate} />

                <FormField>
                  <Label>Nome</Label>
                  <Input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome completo"
                    required
                  />
                </FormField>
                <FormField>
                  <Label>WhatsApp com DDD</Label>
                  <Input
                    type="text"
                    name="whatsapp"
                    value={whatsapp}
                    onChange={handleWhatsappChange}
                    placeholder="(99) 99999-9999"
                    required
                  />
                </FormField>
                <FormField>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu e-mail aqui"
                    required
                  />
                </FormField>
                {selectedJob.jobSalary === 'Pretensão salarial' && (
                  <FormField>
                    <Label>Pretensão Salarial</Label>
                    <Input
                      type="number"
                      name="expectedSalary"
                      value={expectedSalary}
                      onChange={(e) => setExpectedSalary(e.target.value)}
                      placeholder="Digite sua pretensão salarial"
                      required
                    />
                  </FormField>
                )}
                <FormField>
                  <Label>Estado</Label>
                  <Select name="state" value={modalFilterState} onChange={handleModalFilterChange}>
                    <option value="">Todos</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </Select>
                </FormField>
                <FormField>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      name="isPCD"
                      checked={isPCD}
                      onChange={(e) => setIsPCD(e.target.checked)}
                    />
                    Sou PCD
                  </CheckboxLabel>
                </FormField>
                {isPCD && (
                  <FormField>
                    <Label>Tipo de Deficiência</Label>
                    <Select
                      name="disabilityType"
                      value={disabilityType}
                      onChange={(e) => setDisabilityType(e.target.value)}
                      required
                    >
                      <option value="">Selecione</option>
                      {disabilityTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </Select>
                  </FormField>
                )}
                <FormField>
                  <Label>Anexar Currículo (PDF)</Label>
                  <Input
                    type="file"
                    name="resume"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    required
                  />
                </FormField>
                <Button type="submit">Enviar Candidatura</Button>
                <Button onClick={closeModal} style={{ marginTop: '10px', background: '#e74c3c' }}>Cancelar</Button>
              </form>
            </div>
          )}
        </Modal>

        <Modal
          isOpen={confirmationIsOpen}
          onRequestClose={closeConfirmationModal}
          style={customStyles}
          contentLabel="Confirmação"
        >
          <div>
            <h2>Sua candidatura foi enviada com sucesso!</h2>
            <Button onClick={closeConfirmationModal}>Fechar</Button>
          </div>
        </Modal>
      </Container>
    </>
  );
};

export default Candidate;
