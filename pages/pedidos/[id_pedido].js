import { useRouter } from 'next/router';
import Header from '../components/Header';

import styles from '../../styles/Pedido.module.css';

export default function Pedido({ data }) {
  const { query } = useRouter();
  const produto = data.produto_pedido;
  const id_pedido = data.id_pedido;
  const data_pedido = new Date(data.data_pedido);
  const data_entrega = new Date(data.data_entrega);
  const entregue = data.entregue;

  return (
    <>
      <Header />
        <div className={styles.pedido}>
          <div className={styles.box}>
            <p>{`ID do pedido: ${id_pedido}`}</p>
            <p>{`Você comprou: ${produto}`}</p>
            <div>
              <p>{`Você pediu em: ${data_pedido.getDay()}/${data_pedido.getMonth()}/${data_pedido.getFullYear()}`}</p>
              <p>{`Chegará em: ${data_entrega.getDay()}/${data_entrega.getMonth()}/${data_entrega.getFullYear()}`}</p>
            </div>
          </div>
        </div>
    </>
  )
}

export const getStaticPaths = async () => {
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/pedidos`);
  const data = await response.json();
  const paths = data.map(pedido => {
    return { params: { id_pedido: pedido.id_pedido } }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const pedido = context.params.id_pedido;
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/pedidos/${pedido}`);
  const data = await response.json();

  return {
    props: {
      data,
    }
  }
}
