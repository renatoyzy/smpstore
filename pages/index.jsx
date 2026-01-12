import styles from "@/styles/pages/shop.module.css";
import { useEffect, useState } from "react";
import MainLayout from "@/layout/MainLayout";
import Product, { PRODUCTS } from "@/components/Product";
import CustomHead from "@/components/CustomHead";

export default function Home() {

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch('https://api.mcstatus.io/v2/status/java/enx-cirion-38.enx.host:11659');
        const data = await res.json();
        setStatus(data);
        console.log(data)
      } catch (error) {
        console.error('Erro ao buscar status:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStatus();
  }, []);

  return (
    <>
      <CustomHead 
        pageTitle="Ei Mine - Loja!"
        pageDescription="Compre ranks, kits e outros itens cosméticos para o Ei Mine. Apoie o servidor e melhore sua experiência de jogo!"
        pageUrl="https://eiminestore.vercel.app/"
      />

      <MainLayout>

        <main className={styles.main}>
          {
            loading===true && !status?.error && status?.online===false && 'Servidor offline' 
          }

          {
            status?.online && Object.keys(PRODUCTS).map(key => <>
              <h2 key={key}>{key}</h2> 
              <section className={styles.shop} key={`${key}-section`}>
                {PRODUCTS[key].map(p => <Product key={p.id} product={p}/>)}
              </section>
            </>)
          }

        </main>

      </MainLayout>
    </>
  );
}
