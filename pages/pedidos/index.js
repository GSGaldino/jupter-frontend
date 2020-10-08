import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';

import Header from '../components/Header';

import { SiAddthis } from 'react-icons/si';
import { BiArrowBack } from 'react-icons/bi';

export default function Home({ pedidos }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jupiter Pedidos</title>
      </Head>

      <Header />

      <div className={styles.pedidos}>
        <div className={styles.pedidosHead}>
          <Link href="/">
            <BiArrowBack
              color={"#333"}
              size={20}
            />
          </Link>
          <h2>Meus pedidos</h2>
          <Link href="/pedidos/novo">
            <SiAddthis
              color={"#333"}
              size={20}
            />
          </Link>
        </div>
        <div className={styles.metadata}>
          <p>Produto</p>
          <p>Previsão de entrega</p>
        </div>
        {pedidos.map((pedido, index) => {
          const dataEntrega = new Date(pedido.data_entrega);
          return (
            <Link href={`/pedidos/${pedido.id_pedido}`}>
              <div key={`pedido${index}`} className={styles.pedido}>
                <p>{pedido.produto_pedido}</p>
                <p>{`${dataEntrega.getDay()}/${dataEntrega.getMonth()}/${dataEntrega.getFullYear()}`}</p>
              </div>            
            </Link>
          )
        })}
      </div>

    </div>
  )
}

export const getStaticProps = async () => {
  const response = await fetch('http://localhost:5000/api/v1/pedidos');
  const pedidos = await response.json();

  return {
    props: {
      pedidos: pedidos,
    },
    revalidate: 10,
  }
}
