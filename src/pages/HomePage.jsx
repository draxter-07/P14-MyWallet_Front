import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useState } from 'react'
import dotenv from 'dotenv'

dotenv.config()

export default function HomePage() {
  let dataTransactions = [{name: "Almoço mãe", date: "30/11", type: "negativo", value: "120,00"}, {name: "Salário", date: "15/11", type: "positivo", value: "3000,00"}]
  // função Axios para o dataTransactions já contém a soma do saldo
  function Saldo(){
    let sum = 0;
    let color;
    for (let a = 0; a < dataTransactions.length; a++){
      if (dataTransactions[a].type == "positivo"){
        sum = sum + Number(dataTransactions[a].value.replaceAll(",", "."));
      }
      else if (dataTransactions[a].type == "negativo"){
        sum = sum - Number(dataTransactions[a].value.replaceAll(",", "."));
      }
    }
    if (sum < 0){
      color = "negativo";
    }
    else if (sum >= 0){
      color = "positivo";
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
    return(
      <Value data-test="total-amount" color={color}>{sum}</Value>
    )
  }
  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, Fulano</h1>
        <BiExit data-test="logout"/>
      </Header>

      <TransactionsContainer>
        <ul>
          {dataTransactions.map(item =>
            <ListItemContainer>
              <div>
                <span>{item.date}</span>
                <strong data-test="registry-name">{item.name}</strong>
              </div>
              <Value data-test="registry-amount" color={item.type}>{item.value}</Value>
            </ListItemContainer>
          )}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Saldo/>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button>
          <AiOutlinePlusCircle />
          <p data-test="new-income">Nova <br /> entrada</p>
        </button>
        <button>
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
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
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