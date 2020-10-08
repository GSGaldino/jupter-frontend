import Link from 'next/link';

import styles from '../../styles/Home.module.css';

export default function Header(){
  return (
    <header className={styles.header}>
      <Link href="/">
        <h1 style={{cursor: "pointer"}}>Jupiter Pedidos</h1>
      </Link>
    </header>
  )
}
