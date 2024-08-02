import React, { useState } from 'react';
import styled from 'styled-components';
import emailjs from 'emailjs-com';

const FormWrapper = styled.div`
  padding: 20px;
  background-color: #333;
  color: white;
  border-radius: 10px;
`;

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData, 'YOUR_USER_ID')
      .then((result) => {
        alert('Aplicação enviada com sucesso!');
      }, (error) => {
        console.error(error.text);
      });
  };

  return (
    <FormWrapper>
      <h2>Aplicar para Vaga</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Currículo:
          <textarea name="resume" value={formData.resume} onChange={handleChange}></textarea>
        </label>
        <br />
        <button type="submit">Enviar</button>
      </form>
    </FormWrapper>
  );
};

export default ApplicationForm;
