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
      const req = axios.post('http://localhost:5000/cadastro', objSign);
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
        <input placeholder="Nome" type="text" onChange={e => setName(e.target.value)} disabled={dis} value={name}/>
        <input placeholder="E-mail" type="email" onChange={e => setEmail(e.target.value)} disabled={dis} value={email}/>
        <input placeholder="Senha" type="password" autoComplete="new-password" onChange={e => setPassword(e.target.value)} disabled={dis} value={password}/>
        <input placeholder="Confirme a senha" type="password" autoComplete="new-password" onChange={e => setConfPassword(e.target.value)} disabled={dis} value={confPassword}/>
        <button type="submit">Cadastrar</button>
      </form>

      <Link>
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
