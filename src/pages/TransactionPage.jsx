import styled from "styled-components"
import { useParams, useNavigate } from 'react-router-dom' 
import { useState } from 'react'
import dayjs from "dayjs"
import axios from "axios"

export default function TransactionsPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("MyWalletUser");
  if (token == "undefined"){
    window.location.assign("/");
  }
  axios.defaults.headers.common['Authorization'] = token;

  let type = useParams().tipo.toString();
  //[{name: "Almoço mãe", date: "30/11", type: "negativo", value: "120,00"}, {name: "Salário", date: "15/11", type: "positivo", value: "3000,00"}]
  const [value, setValue] = useState();
  const [name, setName] = useState("");

  function sendValue(event){
    event.preventDefault()
    const dayMonth = dayjs().format("DD/MM");
    let tipo;
    if (type == "entrada"){
      tipo = "positivo";
    }else{tipo = "negativo"};
    const objTrans = {name: name, date: dayMonth, type: tipo, value: value};
    axios.post(import.meta.env.VITE_API_URL + "/nova-transacao/" + type, objTrans)
      .then(resposta => navigate("/home"))
      .catch(response => alert(response.response.data))
  }

  return (
    <TransactionsContainer>
      <h1>Nova {type.replaceAll("saida", "saída")}</h1>
      <form onSubmit={event => sendValue(event)}>
        <input data-test="registry-amount-input" placeholder="Valor" type="text" onChange={e => setValue(e.target.value)} value={value}/>
        <input data-test="registry-name-input" placeholder="Descrição" type="text" onChange={e => setName(e.target.value)} value={name}/>
        <button data-test="registry-save">Salvar {type.replaceAll("saida", "saída")}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
