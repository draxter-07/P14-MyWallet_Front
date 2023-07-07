import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from 'react'
import axios from 'axios'

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [dis, setDis] = useState(false);
  const navigate = useNavigate();
  function signUp(){
    setDis(!dis);
    // Verifica se a senha é a mesma
    if (password == confPassword && password != ''){
      // Envia para o backEnd
      const objSign = {name: name, email: email, password: password};
      const req = axios.post(import.meta.env.VITE_API_URL + '/cadastro', objSign);
      req.then(navigate("/"));
      req.catch(response => alert(response.message));
    }
    else{
      alert("As senhas inseridas não são as mesmas");
    }
    
  }
  return (
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input data-test="name" placeholder="Nome" type="text" onChange={e => setName(e.target.value)} disabled={dis} value={name}/>
        <input data-test="email" placeholder="E-mail" type="email" onChange={e => setEmail(e.target.value)} disabled={dis} value={email}/>
        <input data-test="password" placeholder="Senha" type="password" autoComplete="new-password" onChange={e => setPassword(e.target.value)} disabled={dis} value={password}/>
        <input data-test="conf-password" placeholder="Confirme a senha" type="password" autoComplete="new-password" onChange={e => setConfPassword(e.target.value)} disabled={dis} value={confPassword}/>
        <button data-test="sign-up-submit" type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
