import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImage from '../assets/backoffice.jpg';
import Modal from 'react-modal';
import Papa from 'papaparse';
import FileSaver from 'file-saver';

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${backgroundImage}) no-repeat center center/cover;
  z-index: -1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0px;
  background-color: rgba(31, 47, 47, 0.8);
  min-height: 100vh;
  position: relative;
  z-index: 1;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  background: rgba(47, 47, 47, 0.9);
  position: sticky;
  top: 0;
  z-index: 10;
`;

const FormWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 50px 20px;
  padding: 100px;
  background: #2f2f2f;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #fff;

  @media (max-width: 768px) {
    width: 95%;
    margin: 20px 10px;
    padding: 15px;
  }
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const FormField = styled.div`
  margin-bottom: 30px;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #4f4f4f;
  color: #fff;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 300px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #4f4f4f;
  color: #fff;
  resize: both;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #4f4f4f;
  color: #fff;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  color: #fff;

  input {
    margin-right: 10px;
  }
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px 20px;
  background: #5da8ae;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: #225E63;
  }
`;

const JobListWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 50px 20px;
  padding: 20px;
  background: #2f2f2f;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #fff;

  @media (max-width: 768px) {
    width: 95%;
    margin: 20px 10px;
    padding: 15px;
  }
`;

const JobTitle = styled.h2`
  color: #5da8ae;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    color: #225E63;
  }
`;

const JobDetails = styled.div`
  color: #fff;
  margin-bottom: 20px;
`;

const PreviewModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const PreviewModalTitle = styled.h3`
  margin-bottom: 20px;
`;

const FlexWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const states = [
  "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão",
  "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro",
  "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins",
];

const workModes = ["Remoto", "Híbrido", "Presencial"];

const benefitsOptions = [
  "Vale Refeição", "Vale Transporte", "Plano de Saúde", "Plano Odontológico", "Seguro de Vida",
  "Auxílio Creche", "Gympass", "Auxilio Home Office", "Outros"
];

const categories = [
  "Tecnologia", "Administração", "Recursos Humanos", "Financeiro", "Marketing", "PCD", "Afirmativa PCD", "Exclusiva PCD"
];

const currencies = ["R$", "US$", "Є"];

const Admin = () => {
  const [jobs, setJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobRequirements, setJobRequirements] = useState([]);
  const [jobLocation, setJobLocation] = useState('');
  const [jobWorkMode, setJobWorkMode] = useState('');
  const [jobBenefits, setJobBenefits] = useState([]);
  const [jobType, setJobType] = useState('');
  const [jobSalaryOption, setJobSalaryOption] = useState('');
  const [jobSalary, setJobSalary] = useState('');
  const [jobCurrency, setJobCurrency] = useState('');
  const [jobCategory, setJobCategory] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentJobIndex, setCurrentJobIndex] = useState(null);
  const [otherBenefits, setOtherBenefits] = useState('');
  const [previewJob, setPreviewJob] = useState(null);
  const [createdDate, setCreatedDate] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('error', handleError);
    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    setJobs(storedJobs);
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  const handleError = (event) => {
    if (event.message.includes('ResizeObserver loop completed with undelivered notifications')) {
      event.stopImmediatePropagation();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString('pt-BR');
    const job = {
      jobTitle,
      jobDescription,
      jobRequirements,
      jobLocation: [jobLocation],
      jobWorkMode: [jobWorkMode],
      jobBenefits: [...jobBenefits, otherBenefits].filter(Boolean),
      jobType: [jobType],
      jobSalary: jobSalaryOption === 'Especificar valor' ? `${jobCurrency} ${jobSalary}` : jobSalaryOption,
      jobCategory,
      companyName,
      createdDate: currentDate
    };
    setPreviewJob(job);
  };

  const confirmAddJob = () => {
    if (editMode) {
      const updatedJobs = jobs.map((job, index) =>
        index === currentJobIndex ? previewJob : job
      );
      setJobs(updatedJobs);
      localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    } else {
      const updatedJobs = [...jobs, previewJob];
      setJobs(updatedJobs);
      localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    }
    resetForm();
    closePreviewModal();
  };

  const resetForm = () => {
    setJobTitle('');
    setJobDescription('');
    setJobRequirements([]);
    setJobLocation('');
    setJobWorkMode('');
    setJobBenefits([]);
    setJobType('');
    setJobSalaryOption('');
    setJobSalary('');
    setJobCurrency('');
    setJobCategory([]);
    setCompanyName('');
    setEditMode(false);
    setCurrentJobIndex(null);
    setOtherBenefits('');
  };

  const handleEdit = (index) => {
    const job = jobs[index];
    setJobTitle(job.jobTitle);
    setJobDescription(job.jobDescription);
    setJobRequirements(job.jobRequirements);
    setJobLocation(Array.isArray(job.jobLocation) ? job.jobLocation[0] : job.jobLocation);
    setJobWorkMode(Array.isArray(job.jobWorkMode) ? job.jobWorkMode[0] : job.jobWorkMode);
    setJobBenefits(job.jobBenefits.filter(benefit => benefit !== 'Outros'));
    setOtherBenefits(job.jobBenefits.find(benefit => benefit === 'Outros') || '');
    setJobType(Array.isArray(job.jobType) ? job.jobType[0] : job.jobType);
    if (Array.isArray(job.jobSalary)) {
      setJobSalaryOption(job.jobSalary[0]);
      setJobSalary('');
      setJobCurrency('');
    } else {
      const [currency, salary] = job.jobSalary.split(' ');
      setJobSalaryOption('Especificar valor');
      setJobSalary(salary);
      setJobCurrency(currency);
    }
    setJobCategory(job.jobCategory);
    setCompanyName(job.companyName || '');
    setEditMode(true);
    setCurrentJobIndex(index);
    window.scrollTo(0, 0);
  };

  const handleDelete = (index) => {
    const password = prompt('Digite a senha para excluir a vaga:');
    if (password === '91085467Jp!') {
      const updatedJobs = jobs.filter((_, i) => i !== index);
      setJobs(updatedJobs);
      localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    } else {
      alert('Senha incorreta!');
    }
  };

  const handleRequirementChange = (e) => {
    const value = e.target.value;
    setJobRequirements(prevRequirements =>
      prevRequirements.includes(value)
        ? prevRequirements.filter(requirement => requirement !== value)
        : [...prevRequirements, value]
    );
  };

  const handleBenefitChange = (e) => {
    const value = e.target.value;
    setJobBenefits(prevBenefits =>
      prevBenefits.includes(value)
        ? prevBenefits.filter(benefit => benefit !== value)
        : [...prevBenefits, value]
    );
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setJobCategory(prevCategory =>
      prevCategory.includes(value)
        ? prevCategory.filter(category => category !== value)
        : [...prevCategory, value]
    );
  };

  const closePreviewModal = () => {
    setPreviewJob(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const data = results.data[0];
          setJobTitle(data['Título da Vaga']);
          setJobDescription(data['Descrição da Vaga']);
          setJobRequirements(data['Requisitos'].split(';'));
          setJobLocation(data['Localização']);
          setJobWorkMode(data['Modalidade']);
          setJobBenefits(data['Benefícios'].split(';'));
          setJobType(data['Tipo de Contratação']);
          if (data['Salário']) {
            setJobSalaryOption('Especificar valor');
            setJobSalary(data['Salário']);
            setJobCurrency(data['Moeda']);
          } else {
            setJobSalaryOption('A combinar');
            setJobSalary('');
            setJobCurrency('');
          }
          setJobCategory(data['Categoria/Setor'].split(';'));
          setCompanyName(data['Nome da Empresa']);
          setCreatedDate(data['Data de Criação']);
        },
      });
    }
  };

  const handleJSONUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        setJobTitle(data['jobTitle']);
        setJobDescription(data['jobDescription']);
        setJobRequirements(data['jobRequirements']);
        setJobLocation(data['jobLocation']);
        setJobWorkMode(data['jobWorkMode']);
        setJobBenefits(data['jobBenefits']);
        setJobType(data['jobType']);
        if (data['jobSalary']) {
          setJobSalaryOption('Especificar valor');
          setJobSalary(data['jobSalary']);
          setJobCurrency(data['jobCurrency']);
        } else {
          setJobSalaryOption('A combinar');
          setJobSalary('');
          setJobCurrency('');
        }
        setJobCategory(data['jobCategory']);
        setCompanyName(data['companyName']);
        setCreatedDate(data['createdDate']);
      } catch (error) {
        alert('Erro ao carregar o arquivo JSON. Verifique a estrutura do arquivo e tente novamente.');
      }
    };
    reader.readAsText(file);
  };

  const exportToCSV = () => {
    const csvData = jobs.map(job => ({
      'Título da Vaga': job.jobTitle,
      'Descrição da Vaga': job.jobDescription,
      'Requisitos': job.jobRequirements.join(';'),
      'Localização': job.jobLocation,
      'Modalidade': job.jobWorkMode,
      'Benefícios': job.jobBenefits.join(';'),
      'Tipo de Contratação': job.jobType,
      'Salário': job.jobSalary,
      'Moeda': job.jobCurrency,
      'Categoria/Setor': job.jobCategory.join(';'),
      'Nome da Empresa': job.companyName,
      'Data de Criação': job.createdDate
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, 'jobs.csv');
  };

  return (
    <>
      <BackgroundWrapper />
      <Container>
        <HeaderWrapper>
          <h1>ATS Admin</h1>
          <HeaderButtons>
            <Button onClick={() => navigate('/dashboard')}>Ir para Backoffice</Button>
            <Button onClick={exportToCSV}>Exportar CSV</Button>
            <Input type="file" accept=".csv" onChange={handleFileUpload} />
            <Input type="file" accept=".json" onChange={handleJSONUpload} />
          </HeaderButtons>
        </HeaderWrapper>
        <FormWrapper>
          <FormTitle>{editMode ? 'Editar Vaga' : 'Adicionar Vaga'}</FormTitle>
          <form onSubmit={handleSubmit}>
            <FormField>
              <Label>Título da Vaga</Label>
              <Input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
              />
            </FormField>
            <FormField>
              <Label>Descrição da Vaga</Label>
              <Textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
              />
            </FormField>
            <FormField>
              <Label>Requisitos</Label>
              <CheckboxWrapper>
                {["Graduação Completa", "Experiência Prévia", "Habilidades de Comunicação", "Trabalho em Equipe"].map((requirement) => (
                  <CheckboxLabel key={requirement}>
                    <input
                      type="checkbox"
                      value={requirement}
                      checked={jobRequirements.includes(requirement)}
                      onChange={handleRequirementChange}
                    />
                    {requirement}
                  </CheckboxLabel>
                ))}
              </CheckboxWrapper>
              <Input
                type="text"
                placeholder="Outros requisitos"
                value={jobRequirements.filter(requirement => !["Graduação Completa", "Experiência Prévia", "Habilidades de Comunicação", "Trabalho em Equipe"].includes(requirement)).join(', ')}
                onChange={(e) => setJobRequirements([...jobRequirements.filter(requirement => ["Graduação Completa", "Experiência Prévia", "Habilidades de Comunicação", "Trabalho em Equipe"].includes(requirement)), ...e.target.value.split(', ').filter(Boolean)])}
              />
            </FormField>
            <FormField>
              <Label>Localização e Modalidade de Trabalho</Label>
              <FlexWrapper>
                <Select
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                  required
                >
                  <option value="">Selecione a localização</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </Select>
                <Select
                  value={jobWorkMode}
                  onChange={(e) => setJobWorkMode(e.target.value)}
                  required
                >
                  <option value="">Selecione a modalidade</option>
                  {workModes.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </Select>
              </FlexWrapper>
            </FormField>
            <FormField>
              <Label>Tipo de Contratação</Label>
              <Select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                required
              >
                <option value="">Selecione</option>
                {["Tempo Integral", "Meio Período", "Contrato PJ", "CLT", "Estágio", "Temporário"].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField>
              <Label>Benefícios</Label>
              <CheckboxWrapper>
                {benefitsOptions.map((benefit) => (
                  <CheckboxLabel key={benefit}>
                    <input
                      type="checkbox"
                      value={benefit}
                      checked={jobBenefits.includes(benefit)}
                      onChange={handleBenefitChange}
                    />
                    {benefit}
                  </CheckboxLabel>
                ))}
              </CheckboxWrapper>
              {jobBenefits.includes('Outros') && (
                <Input
                  type="text"
                  placeholder="Descreva outros benefícios"
                  value={otherBenefits}
                  onChange={(e) => setOtherBenefits(e.target.value)}
                />
              )}
            </FormField>
            <FormField>
              <Label>Salário</Label>
              <FlexWrapper>
                <Select
                  value={jobSalaryOption}
                  onChange={(e) => setJobSalaryOption(e.target.value)}
                >
                  <option value="">Selecione</option>
                  <option value="A combinar">A combinar</option>
                  <option value="Pretensão salarial">Pretensão salarial</option>
                  <option value="Especificar valor">Especificar valor</option>
                </Select>
                {jobSalaryOption === 'Especificar valor' && (
                  <>
                    <Input
                      type="number"
                      value={jobSalary}
                      onChange={(e) => setJobSalary(e.target.value)}
                      placeholder="Digite o salário"
                    />
                    <Select
                      value={jobCurrency}
                      onChange={(e) => setJobCurrency(e.target.value)}
                      style={{ marginTop: '10px' }}
                    >
                      <option value="">Selecione a moeda</option>
                      {currencies.map((currency) => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </Select>
                  </>
                )}
              </FlexWrapper>
            </FormField>
            <FormField>
              <Label>Categoria/Setor</Label>
              <CheckboxWrapper>
                {categories.map((category) => (
                  <CheckboxLabel key={category}>
                    <input
                      type="checkbox"
                      value={category}
                      checked={jobCategory.includes(category)}
                      onChange={handleCategoryChange}
                    />
                    {category}
                  </CheckboxLabel>
                ))}
              </CheckboxWrapper>
            </FormField>
            <FormField>
              <Label>Nome da Empresa (Opcional)</Label>
              <Input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </FormField>
            <Button type="submit">{editMode ? 'Salvar Alterações' : 'Adicionar Vaga'}</Button>
          </form>
        </FormWrapper>
        <JobListWrapper>
          <h2>Vagas Adicionadas</h2>
          {jobs.map((job, index) => (
            <div key={index}>
              <JobTitle onClick={() => handleEdit(index)}>{job.jobTitle}</JobTitle>
              <JobDetails>
                <p><strong>Localização:</strong> {Array.isArray(job.jobLocation) ? job.jobLocation.join(', ') : job.jobLocation}</p>
                <p><strong>Modalidade:</strong> {Array.isArray(job.jobWorkMode) ? job.jobWorkMode.join(', ') : job.jobWorkMode}</p>
                <p><strong>Descrição:</strong> {job.jobDescription}</p>
                <p><strong>Requisitos:</strong> {job.jobRequirements.join(', ')}</p>
                <p><strong>Benefícios:</strong> {job.jobBenefits.join(', ')}</p>
                <p><strong>Tipo de Vaga:</strong> {Array.isArray(job.jobType) ? job.jobType.join(', ') : job.jobType}</p>
                <p><strong>Salário:</strong> {Array.isArray(job.jobSalary) ? job.jobSalary.join(', ') : job.jobSalary}</p>
                <p><strong>Categoria:</strong> {job.jobCategory.join(', ')}</p>
                <p><strong>Data de Publicação:</strong> {job.createdDate}</p>
                {job.companyName && <p><strong>Nome da Empresa:</strong> {job.companyName}</p>}
              </JobDetails>
              <Button onClick={() => handleEdit(index)}>Editar</Button>
              <Button onClick={() => handleDelete(index)}>Excluir</Button>
            </div>
          ))}
        </JobListWrapper>
      </Container>
      <Modal
        isOpen={!!previewJob}
        onRequestClose={closePreviewModal}
        contentLabel="Pré-visualização da Vaga"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000
          },
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
            width: '400px',
            maxWidth: '90%',
            maxHeight: '90%',
            overflow: 'auto',
            zIndex: 1001
          }
        }}
      >
        {previewJob && (
          <PreviewModalContent>
            <PreviewModalTitle>Pré-visualização da Vaga</PreviewModalTitle>
            <p><strong>Título:</strong> {previewJob.jobTitle}</p>
            <p><strong>Descrição:</strong> <ul><li>{previewJob.jobDescription}</li></ul></p>
            <p><strong>Requisitos:</strong> <ul>{previewJob.jobRequirements.map((req, i) => <li key={i}>{req}</li>)}</ul></p>
            <p><strong>Localização:</strong> <ul>{previewJob.jobLocation.map((loc, i) => <li key={i}>{loc}</li>)}</ul></p>
            <p><strong>Modalidade:</strong> <ul>{previewJob.jobWorkMode.map((mode, i) => <li key={i}>{mode}</li>)}</ul></p>
            <p><strong>Benefícios:</strong> <ul>{previewJob.jobBenefits.map((benefit, i) => <li key={i}>{benefit}</li>)}</ul></p>
            <p><strong>Tipo:</strong> <ul>{previewJob.jobType.map((type, i) => <li key={i}>{type}</li>)}</ul></p>
            <p><strong>Salário:</strong> {previewJob.jobSalary}</p>
            <p><strong>Categoria:</strong> <ul>{previewJob.jobCategory.map((cat, i) => <li key={i}>{cat}</li>)}</ul></p>
            <p><strong>Data de Publicação:</strong> {previewJob.createdDate}</p>
            <p><strong>Empresa:</strong> {previewJob.companyName}</p>
            <Button onClick={confirmAddJob}>Confirmar</Button>
            <Button onClick={closePreviewModal} style={{ backgroundColor: '#e74c3c' }}>Cancelar</Button>
          </PreviewModalContent>
        )}
      </Modal>
    </>
  );
};

export default Admin;
