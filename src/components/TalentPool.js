import React, { useState } from 'react';
import styled from 'styled-components';
import emailjs from 'emailjs-com';
import backgroundImage from '../assets/bancodetalentos.jpg';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-top: 10px;
  background-color: #1f2f2f;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 100vh;
`;

const FormWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 30px 20px;
  padding: 20px;
  background: rgba(47, 47, 47, 0.8);
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
  color: #5da8ae;
`;

const FormField = styled.div`
  margin-bottom: 30px;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #5da8ae;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #4f4f4f;
  color: #fff;
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

const FileInput = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #4f4f4f;
  color: #fff;
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

const ConfirmationMessage = styled.p`
  text-align: center;
  color: #5da8ae;
  margin-top: 20px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #2f2f2f;
  padding: 20px;
  border-radius: 10px;
  color: #fff;
  max-width: 500px;
  width: 90%;
  text-align: center;
`;

const CloseButton = styled.button`
  background: #5da8ae;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background: #225E63;
  }
`;

const states = [
  "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão",
  "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro",
  "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
];

const jobTitles = [
  // Tecnologia
  "Desenvolvedor Front-end", "Desenvolvedor Back-end", "Desenvolvedor Full Stack", "Analista de Dados", "Engenheiro de Software", "Administrador de Sistemas",
  "DevOps", "Cientista de Dados", "Engenheiro de Machine Learning", "Administrador de Banco de Dados",
  // Administração
  "Assistente Administrativo", "Analista Administrativo", "Gerente Administrativo", "Secretária Executiva",
  // Financeiro
  "Analista Financeiro", "Assistente Financeiro", "Gerente Financeiro", "Contador",
  // Marketing
  "Analista de Marketing", "Assistente de Marketing", "Gerente de Marketing", "Especialista em SEO",
  // Recursos Humanos
  "Analista de Recursos Humanos", "Assistente de Recursos Humanos", "Gerente de Recursos Humanos", "Recrutador",
  // Outros
  "Vendedor", "Operador de Caixa", "Atendente de Call Center", "Motorista", "Auxiliar de Serviços Gerais"
];

const TalentPool = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [state, setState] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [isPCD, setIsPCD] = useState(false);
  const [resume, setResume] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleWhatsappChange = (e) => {
    const value = e.target.value;
    const formattedValue = value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
    setWhatsapp(formattedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      whatsapp,
      state,
      jobTitle,
      isPCD: isPCD ? 'Sim' : 'Não',
      resume: resume ? resume.name : '' // Adiciona o nome do arquivo do currículo
    };

    emailjs.send('service_z9v57hn', 'template_69wl7qk', formData, 'KcEag2JM8hYaCVTjB')
      .then((result) => {
          console.log(result.text);
          setSubmitted(true);
      }, (error) => {
          console.log(error.text);
      });

    setName('');
    setEmail('');
    setWhatsapp('');
    setState('');
    setJobTitle('');
    setIsPCD(false);
    setResume(null);
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const closeModal = () => {
    setSubmitted(false);
  };

  return (
    <Container>
      <FormWrapper>
        <FormTitle>Cadastrar no Banco de Talentos</FormTitle>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label>Nome Completo</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormField>
          <FormField>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormField>
          <FormField>
            <Label>WhatsApp com DDD</Label>
            <Input
              type="text"
              value={whatsapp}
              onChange={handleWhatsappChange}
              placeholder="(99) 99999-9999"
              required
            />
          </FormField>
          <FormField>
            <Label>Estado</Label>
            <Select
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            >
              <option value="">Selecione o estado</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField>
            <Label>Cargo Pretendido</Label>
            <Select
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            >
              <option value="">Selecione o cargo</option>
              {jobTitles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField>
            <CheckboxLabel>
              <input
                type="checkbox"
                checked={isPCD}
                onChange={(e) => setIsPCD(e.target.checked)}
              />
              Sou PCD (Pessoa com Deficiência)
            </CheckboxLabel>
          </FormField>
          <FormField>
            <Label>Anexar Currículo (PDF)</Label>
            <FileInput
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              required
            />
          </FormField>
          <Button type="submit">Cadastrar no Banco de Talentos</Button>
        </form>
        {submitted && (
          <ModalOverlay onClick={closeModal}>
            <ModalContent>
              <h2>Cadastro realizado com sucesso!</h2>
              <CloseButton onClick={closeModal}>Fechar</CloseButton>
            </ModalContent>
          </ModalOverlay>
        )}
      </FormWrapper>
    </Container>
  );
};

export default TalentPool;
