import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import backgroundImage from '../assets/home.jpg';

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${backgroundImage}) no-repeat center center/cover;
  z-index: -1;
`;

const LoginWrapper = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 50px;
  background: rgba(47, 47, 47, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #fff;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const FormField = styled.div`
  margin-bottom: 15px;
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

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px 50px;
  background: #5da8ae;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background: #225E63;
  }
`;

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['auth']);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username === 'JeffenGinner' && password === '91085467Jp!@') {
      setCookie('auth', 'true', { path: '/' });
      setAuth(true);
      navigate('/admin');
    } else {
      alert('Usuário ou senha incorretos!');
    }
  };

  return (
    <>
      <BackgroundWrapper />
      <LoginWrapper>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <FormField>
            <Label>Usuário</Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormField>
          <FormField>
            <Label>Senha</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormField>
          <Button type="submit">Entrar</Button>
        </form>
      </LoginWrapper>
    </>
  );
};

export default Login;
