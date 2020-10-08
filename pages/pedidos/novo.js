import Head from 'next/head';
import Router from 'next/router';
import Header from '../components/Header';
import { useState } from 'react';

import styles from '../../styles/Home.module.css';

export default function Novo() {
  const [produto, setProduto] = useState('Máquina do tempo');
  const [dataEntrega, setDataEntrega] = useState('');

  async function handleForm(e) {
    e.preventDefault();
    const agora = new Date().getTime();
    const entrega = new Date(dataEntrega).getTime();

    if(agora > entrega){
      return alert('A data de entrega não pode ser menor que hoje!')
    }

    const response = await fetch("http://localhost:5000/api/v1/pedidos", { 
      
      // Adding method type 
      method: "POST", 
        
      // Adding body or contents to send 
      body: JSON.stringify({ 
          produto_pedido: produto, 
          data_pedido: agora, 
          data_entrega: entrega 
      }), 
        
      // Adding headers to the request 
      headers: { 
          "Content-type": "application/json; charset=UTF-8"
      } 
  }) 

    alert(`Produto ${produto} reservado com sucesso!`);
    Router.push('/pedidos');

  }

  return (
    <div>
      <Head>
        <title>Jupiter | Novo pedido</title>
      </Head>

      <Header />

      <div className={styles.container}>
        <form
          className={styles.pedidos}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
          onSubmit={e => handleForm(e)}
          >
          <label>
            Escolha um produto
            <select id="produto" onChange={e => setProduto(e.target.value)} required>
              <option value="Máquina do tempo">Máquina do tempo</option>
              <option value="Poço dos desejos">Poço dos desejos</option>
              <option value="Lamborghini">Lamborghini</option>
              <option value="Castelo disney">Castelo disney</option>
              <option value="Avião Particular">Avião Particular</option>
            </select>
          </label>

          <label>
            Data de entrega
            <input type="date" onChange={e => setDataEntrega(e.target.value)} required/>
          </label>

          <input type="submit" value="Pedir!" />
        </form>
      </div>
    </div>
  )
}
