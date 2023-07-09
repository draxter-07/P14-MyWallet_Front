import styled from "styled-components"
import { useParams } from 'react-router-dom' 

export default function TransactionsPage() {
  let type = useParams().tipo.toString();
  //[{name: "Almoço mãe", date: "30/11", type: "negativo", value: "120,00"}, {name: "Salário", date: "15/11", type: "positivo", value: "3000,00"}]
  return (
    <TransactionsContainer>
      <h1>Nova {type}</h1>
      <form>
        <input data-test="registry-amount-input" placeholder="Valor" type="text"/>
        <input data-test="registry-name-input" placeholder="Descrição" type="text" />
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
