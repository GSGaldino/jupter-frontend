import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

import Header from './components/Header';

export default function Home() {
  const [id, setId] = useState('');

  function handleForm(e){
    e.preventDefault();
    Router.push(`/pedidos/${id}`);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Jupiter Pedidos</title>
      </Head>

      <Header />

      <div className={styles.pedidos}>
        <div className={styles.pesquisa}>
          <h2>Pesquisar pedido</h2>
            <Link href="/pedidos/">
              Meus pedidos
            </Link>   
        </div>

        <div style={{padding: "20px"}}>
          <form onSubmit={(e) => handleForm(e)}>
            <label>
              ID do pedido:
              <input 
                type="text"
                onChange={e => setId(e.target.value)}
                style={{margin: "10px"}}
              />
            </label>
            <input type="submit" value="Pesquisar"/>
          </form>
        </div>
      </div>

    </div>
  )
}
