import styles from "@/styles/pages/terms.module.css";
import MainLayout from "@/layout/MainLayout";
import Link from "next/link";
import CustomHead from "@/components/CustomHead";

export default function Terms() {

  return (
    <>
      <CustomHead
        pageTitle="Ei Mine - Termos de Uso"
        pageDescription="Leia os termos de uso da loja do Ei Mine e saiba mais sobre suas responsabilidades ao utilizar nossos serviços."
        pageUrl="https://smpraiz.com.br/terms"
      />

      <MainLayout>

        <main className={styles.main}>
          
          <h1>Termos de uso</h1>

          <div className={styles.container}>
            <p>
              Ao utilizar nossa loja, você concorda com os seguintes termos de uso:
            </p>
            <p>
              1. Uso da Loja: Você concorda em usar a loja apenas para fins legais e de acordo com todas as leis aplicáveis. É proibido o uso da loja para qualquer atividade fraudulenta ou ilegal.
            </p>
            <p>
              2. Conta de Usuário: Você é responsável por manter a confidencialidade das informações da sua conta, incluindo sua senha. Qualquer atividade realizada através da sua conta é de sua responsabilidade.
            </p>
            <p>
              3. Compras e Pagamentos: Todas as compras feitas na loja são finais. Não oferecemos reembolsos, exceto quando exigido por lei ou quando a entrega do produto não for viável. Reservamo-nos o direito de recusar ou cancelar qualquer pedido a nosso critério.
            </p>
            <p>
              4. Modificações nos Termos: Reservamo-nos o direito de modificar estes termos a qualquer momento. Quaisquer alterações serão publicadas nesta página e entrarão em vigor imediatamente após a publicação.
            </p>
            <p>
              5. Limitação de Responsabilidade: Não seremos responsáveis por quaisquer danos diretos, indiretos, incidentais ou consequenciais decorrentes do uso ou incapacidade de uso da loja.
            </p>
            <p>
              6. Lei Aplicável: Estes termos serão regidos e interpretados de acordo com as leis do Brasil.
            </p>
            <p>
              O uso contínuo ou realização de qualquer compra em nosso site será considerado como aceitação dos nossos termos de uso. Se você tiver alguma dúvida sobre estes termos, entre em contato conosco no <Link href={'/discord'}>Discord do Ei Mine</Link> antes de usar a loja.
            </p>
          </div>

        </main>

      </MainLayout>
    </>
  );
}
