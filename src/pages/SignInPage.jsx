import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function signIn(){
    const objSign = {email: email, password: password};
    const req = axios.post(process.env.VITE_API_URL + '/login', objSign);
    req.then(navigate("/home")); //pegar o r.mesagecomo token
    req.catch(response => alert(response.message));
  }
  return (
    <SingInContainer>
      <form onSubmit={signIn}>
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
