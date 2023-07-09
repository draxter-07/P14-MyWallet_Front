import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("MyWalletUser");
  if (token == "undefined"){
    window.location.assign("/");
  }
  axios.defaults.headers.common['Authorization'] = token;
  

  const [dataTransactions, setDataTrans] = useState([]);
  const [user, setUser] = useState("");
  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + "/home")
      .then(resposta => {setDataTrans(resposta.data.transactions.reverse()); setUser(resposta.data.name)})
      .catch(response => alert(response.response.data));
    }, []);

  function Saldo(){
    let sum = 0;
    for (let a = 0; a < dataTransactions.length; a++){
      if (dataTransactions[a].type == "positivo"){
        sum = sum + Number(dataTransactions[a].value.replaceAll(",", "."));
      }
      else if (dataTransactions[a].type == "negativo"){
        sum = sum - Number(dataTransactions[a].value.replaceAll(",", "."));
      }
    }
    sum = sum.toString().replaceAll("-", "").replace(".", ",");
    // Formatação do número
    let foundComa = -1;
    for (let b = 0; b < sum.length; b++){
      if (sum[b] == ","){
        foundComa = b;
      }
    }
    if (foundComa == -1){
      sum = sum + ",00";
    }
    else if (foundComa == sum.length - 2){
      sum = sum + "0";
    }
    const Value = styled.div`
      font-size: 16px;
      text-align: right;
      color: ${sum > 0 ? "green": "red"}
    `
    return(
      <Value data-test="total-amount">{sum}</Value>
    )
  }

  function Valor(prop){
    const Value = styled.div`
      font-size: 16px;
      text-align: right;
      color: ${prop.color == "positivo" ? "green": "red"}
    `
    let sum = prop.value.replaceAll(".", ",");
    let color;
    if (sum < 0){
      color = "negativo";
    }
    else if (sum >= 0){
      color = "positivo";
    }
    let foundComa = -1;
    for (let b = 0; b < sum.length; b++){
      if (sum[b] == ","){
        foundComa = b;
      }
    }
    if (foundComa == -1){
      sum = sum + ",00";
    }
    else if (foundComa == sum.length - 2){
      sum = sum + "0";
    }
    return(
      <Value data-test="registry-amount">{sum}</Value>
    )
  }

  function logout(event){
    event.preventDefault();
    localStorage.setItem("MyWalletUser", undefined);
    navigate("/");
  }

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {user}</h1>
        <BiExit data-test="logout" onClick={event => logout(event)}/>
      </Header>

      <TransactionsContainer>
        <ul>
          {dataTransactions.map(item =>
            <ListItemContainer>
              <div>
                <span>{item.date}</span>
                <strong data-test="registry-name">{item.name}</strong>
              </div>
              <Valor color={item.type} value={item.value}/>
            </ListItemContainer>
          )}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Saldo/>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={event => {event.preventDefault(); navigate("/nova-transacao/entrada")}}>
          <AiOutlinePlusCircle />
          <p data-test="new-income">Nova <br /> entrada</p>
        </button>
        <button onClick={event => {event.preventDefault(); navigate("/nova-transacao/saida")}}> 
          <AiOutlineMinusCircle />
          <p data-test="new-expense">Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`