import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from 'axios'

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function signIn(event){
    event.preventDefault();
    const objSign = {email: email, password: password};
    axios.post(import.meta.env.VITE_API_URL + '/login', objSign)
      .then(resposta => {localStorage.setItem("MyWalletUser", resposta.data); navigate("/home")})
      .catch(response => alert(response.response.data));
  }
  return (
    <SingInContainer>
      <form onSubmit={event => signIn(event)}>
        <MyWalletLogo />
        <input data-test="email" placeholder="E-mail" type="email" onChange={e => setEmail(e.target.value)} value={email}/>
        <input data-test="password" placeholder="Senha" type="password" autoComplete="new-password" onChange={e => setPassword(e.target.value)} value={password}/>
        <button data-test="sign-in-submit" type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
