import Head from 'next/head';

/**
 * Retorna um Head com embed prontinho pro discord
 * @param {Object} properties - Propriedades do head
 * @param {String} properties.pageTitle - Título da página
 * @param {String} properties.pageDescription - Descrição da página
 * @param {String} properties.pageImage - Imagem da página
 * @param {String} properties.pageImageAlt - Texto alternativo da imagem
 * @param {String} properties.pageUrl - URL da página
 * @returns 
 */
export default function CustomHead({
    pageTitle="Ei Mine - Minecraft de verdade!",
    pageDescription="Participe do SMP mais raiz do Brasil, com semi-anarquia, liberdade e sobrevivência de verdade!",
    pageImage="/favicon.png",
    pageImageAlt="Ícone do Ei Mine",
    pageUrl="https://eiminestore.vercel.app/"
}) {
    return (
        <Head>
            <title>{pageTitle}</title>
            <meta name={`description`} content={pageDescription} />
            <meta content={`#373737`} name={`theme-color`} />
            <meta name={`viewport`} content={`width=device-width, initial-scale=1.0, viewport-fit=cover`} />
            <link rel={`icon`} href={pageImage} />

            <meta property={`og:title`} content={pageTitle} />
            <meta property={`og:description`} content={pageDescription} />
            <meta property={`og:url`} content={pageUrl} />
            <meta property={`og:type`} content={`website`} />
            <meta property={`og:image`} content={pageImage} />
            <meta property={`og:image:width`} content={`630`} />
            <meta property={`og:image:height`} content={`630`} />

            <meta property={`og:image:alt`} content={pageImageAlt} />

            <meta name={`twitter:card`} content={`summary_large_image`} />
            <meta name={`twitter:title`} content={pageTitle} />
            <meta name={`twitter:description`} content={pageDescription} />
            <meta name={`twitter:image`} content={pageImage} />

        </Head>
    )
}