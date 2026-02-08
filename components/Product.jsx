import styles from "@/components/Product.module.css";
import Popup from 'reactjs-popup';
import Link from "next/link";
import { useEffect, useState } from 'react';

/**
 * Traduz o status do pagamento
 * @param {String} status - Status do pagamento 
 * @returns {String} Status traduzido
 */
function translateStatus(status) {
    const map = {
        approved: 'Aprovado',
        pending: 'Pendente',
        rejected: 'Rejeitado',
        cancelled: 'Cancelado',
    };
    return map[status] || status;
}

/**
 * Produtos disponíveis na loja
 */
export const PRODUCTS = {
    'Produtos': [
        {
            name: 'VIP',
            id: 'vip1',
            price: 10.64,
            description: 'O VIP é o rank mais popular do servidor, com várias vantagens legais como melhorias como /apelido e o /ec (ender chest)!',
            expanded_description: 'O VIP é o rank mais popular do servidor, com várias vantagens legais como melhorias cosméticas (/apelido) e o /ec (para abrir o ender chest)! Além disso, você ajuda a manter o servidor ativo e em crescimento. O VIP dura 30 dias e é renovável.',
            icon: 'https://minecraft.wiki/images/Apple_JE3_BE3.png?3853a',
            fields: [
                {
                    name: 'quantity',
                    type: 'number',
                    placeholder: 'Meses (1-12)',
                    required: true,
                    min: 1,
                    max: 12,
                },
            ],
        },
        {
            name: 'VIP+',
            id: 'vip2',
            price: 19.15,
            description: 'Quer mais? Um ender chest maior, opção de desligar spawn de phantoms e bigorna virtual com /anvil? O VIP+ é ideal para ostentar ainda mais!',
            expanded_description: 'Inclui todas as vantagens do VIP (/apelido e /ec) e ainda mais: ender chest aumentado, desligar spawn de phantoms e /anvil (bigorna virtual). O VIP+ dura 30 dias e é renovável.',
            icon: 'https://minecraft.wiki/images/Golden_Apple_JE2_BE2.png?aa827',
            fields: [
                {
                    name: 'quantity',
                    type: 'number',
                    placeholder: 'Meses (1-12)',
                    required: true,
                    min: 1,
                    max: 12,
                },
            ],
        },
        {
            name: 'MVP',
            id: 'vip3',
            price: 27.66,
            description: 'O melhor sempre fica por último! Tenha todas as vantagens de VIP e VIP+ somadas ao /craft e um ender chest ainda maior!',
            expanded_description: 'Tenha todas as vantagens do VIP (/ec e /apelido), VIP+ (/anvil, desligar spawn de phantoms) e ainda mais: ender chest ainda maior e /craft!. O VIP MVP dura 30 dias e é renovável.',
            icon: 'https://minecraft.wiki/images/Enchanted_Golden_Apple_JE2_BE2.gif?f4719',
            fields: [
                {
                    name: 'quantity',
                    type: 'number',
                    placeholder: 'Meses (1-12)',
                    required: true,
                    min: 1,
                    max: 12,
                },
            ],
        },
    ],
    'Upgrades': [
        {
            name: 'Melhorar VIP',
            id: 'vip_upgrade',
            price: 8.52,
            description: 'Se você comprou um VIP e quer melhorar pra VIP+ ou comprou VIP+ e quer melhorar pra MVP, compre para melhorar o seu VIP!',
            expanded_description: 'Se você comprou um VIP e quer melhorar pra VIP+ ou comprou VIP+ e quer melhorar pra MVP, compre para melhorar o seu VIP! (A compra da melhoria do VIP não altera a data de expiração do mesmo).',
            icon: 'https://minecraft.wiki/images/Gold_Ingot_JE4_BE2.png?80cd6',
        }
    ],
    'Roleplay': [
        {
            name: 'Mudar de Classe ou Raça',
            id: 'mudar_raça',
            price: 5.32,
            description: 'Altere a classe ou raça do seu personagem no servidor!',
            expanded_description: 'Compre o item "Mudar de Classe ou Raça" e tenha a liberdade de alterar a raça ou a classe do seu personagem no Legião Templária. Seja você um humano, elfo, anão ou qualquer outra raça disponível, essa compra permite que você mude sua raça atual para uma nova, além de escolher uma nova classe se for humano. Você irá escolher qual raça e classe quer dentro do Minecraft, após comprar.',
            icon: 'https://minecraft.wiki/images/Potion_of_Healing_JE2_BE2.png?d579c',
        }
    ],
    'Kits': [
        {
            name: 'Kit Nether',
            id: 'kit_nether',
            price: 6.39,
            description: 'Blocos de construção aleatórios da dimensão do Nether.',
            expanded_description: 'Na compra de um Kit Nether, você pode receber de 1 unidade a 1 pack de cada um dos seguintes itens: netherrack, areias da alma, pedras-negras, madeiras (carmesim OU distorcida), blocos de tijolos do nether, pedra luminosa, cogubrilho, cristal de quartzo, blocos de fungo do nether (azul OU vermelho, será o mesmo que a madeira). As quantidades são aleatórias por compra e dependerão da sua sorte, com pelo menos 1 de cada item sendo garantido.',
            icon: 'https://minecraft.wiki/images/Chest.gif?ca959',
            fields: [
                {
                    name: 'quantity',
                    type: 'number',
                    placeholder: 'Quantidade de kits (1-100)',
                    required: true,
                    min: 1,
                    max: 100,
                },
            ],
        },
        {
            name: 'Kit End',
            id: 'kit_end',
            price: 6.39,
            description: 'Blocos de construção aleatórios da dimensão do The End.',
            expanded_description: 'Na compra de um Kit End, você pode receber de 1 unidade a 1 pack de cada um dos seguintes itens: pedra do end, obsidian, lâmpada do end e bloco púrpura. As quantidades são aleatórias por compra e dependerão da sua sorte, com pelo menos 1 de cada item sendo garantido. Além disso, você ganha uma quantidade de 0 a 4 cascos de shulker.',
            icon: 'https://minecraft.wiki/images/Ender_Chest_JE2_BE2.gif?90e80',
            fields: [
                {
                    name: 'quantity',
                    type: 'number',
                    placeholder: 'Quantidade de kits (1-100)',
                    required: true,
                    min: 1,
                    max: 100,
                },
            ],
        }
    ],
    'Servidor': [
        {
            name: 'Banimento Temporário de Jogador',
            id: 'tempban',
            price: 5.32,
            description: 'Bane um jogador do servidor por um período temporário.',
            expanded_description: 'Compre o item "Banimento Temporário de Jogador" e escolha um jogador para ser banido do servidor. Essa é uma forma divertida de lidar com jogadores indesejados. Use com responsabilidade e divirta-se!',
            icon: 'https://minecraft.wiki/images/Barrier_%28held%29_JE2_BE2.png?c4806',
            fields: [
                {
                    name: 'quantity',
                    type: 'number',
                    placeholder: 'Duração do banimento em dias (1-365)',
                    required: true,
                    min: 1,
                    max: 365,
                },
            ]
        },
        {
            name: 'Desbanimento de Jogador',
            id: 'unban',
            price: 21.28,
            description: 'Desbane um jogador do servidor.',
            expanded_description: 'Compre o item "Desbanimento de Jogador" e escolha um jogador para ser desbanido do servidor. O desbanimento é imediato e o jogador poderá retornar ao servidor imediatamente após a compra.',
            icon: 'https://minecraft.wiki/images/Diamond_JE3_BE3.png?99d00',
        }
    ]
}

/**
 * Cupons disponíveis
 */
export const COUPONS = {
    'RENATO': 0.05,
    'JAKE': 0.05,
    'YOHAN': 0.05,
    'JUAN': 0.05,
    'MR': 0.05,
    'OLFS': 0.05,
    'SOBS5': 0.05,
    'BESBC': 0.05,
    'BELLS': 0.05,
    'EVELYN': 0.05
}

/**
 * Função para renderizar campos dinâmicos
 * @param {{}} field - Objeto do field dos produtos
 * @param {String} productName - Nome do produto
 * @returns {JSX.Element} Campo renderizado
 */
function renderField(field, productName) {
    const fieldId = `${productName}-${field.name}`;

    if (field.type === "select") {
        return (
            <select
                key={field.name}
                name={field.name}
                id={fieldId}
                required={field.required || false}
                defaultValue=""
            >
                <option value="" disabled>{field.placeholder}</option>
                {field.options?.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        );
    } else {
        if(field.name == 'quantity') return;
        return (
            <input
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                id={fieldId}
                required={field.required || false}
                min={field.min}
                max={field.max}
                defaultValue={field.defaultValue || ''}
            />
        );
    }
}

/**
 * Popup de compra do produto
 * @param {Object} properties
 * @param {{}} properties.product 
 * @returns {JSX.Element} Popup de compra do produto
 */
function ProductPopup({ product }) {
    const [currentStep, setCurrentStep] = useState('form');
    const [loading, setLoading] = useState(false);
    const [paymentData, setPaymentData] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [error, setError] = useState(null);
    const [pollingId, setPollingId] = useState(null);

    const [playerName, setPlayerName] = useState('');
    const [coupon, setCoupon] = useState('');
    const [previewPrice, setPreviewPrice] = useState(product.price);
    const [quantity, setQuantity] = useState(product.fields?.find(f => f.name === 'quantity')?.defaultValue || undefined);
    const [couponStatus, setCouponStatus] = useState(null);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            const response = await fetch('/api/sell', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setPaymentData(result);
                setCurrentStep('payment');
                startPaymentPolling(result.paymentId);
            } else {
                setError(result.message || 'Erro ao processar compra');
            }
        } catch (err) {
            setError('Erro de conexão. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    // Preview do preço considerando quantidade e cupom
    useEffect(() => {
        let basePrice = product.price;
        let qty = Number(quantity) || 1;
        let finalPrice = basePrice * qty;

        // Simulação de cupom (pode ser adaptado para API)
        if (Object.keys(COUPONS).includes(coupon.trim().toUpperCase())) {
            finalPrice = finalPrice * (1 - COUPONS[coupon.trim().toUpperCase()]);
            setCouponStatus(`Cupom aplicado: ${COUPONS[coupon.trim().toUpperCase()] * 100}% de desconto!`);
        } else if (coupon.trim()) {
            setCouponStatus('Cupom inválido ou expirado.');
        } else {
            setCouponStatus(null);
        }
        setPreviewPrice(finalPrice.toFixed(2));
    }, [quantity, coupon, product.price]);

    const startPaymentPolling = (paymentId) => {
        const interval = setInterval(async () => {
            try {
                const response = await fetch(`/api/payment-status/${paymentId}`);
                const result = await response.json();
                setPaymentStatus(result.status);
            } catch (err) {
                console.warn("Erro ao verificar pagamento", err);
            }
        }, 5000);

        setPollingId(interval);
        setTimeout(() => clearInterval(interval), 10 * 60 * 1000);
    };

    // useEffect para entrega automática quando aprovado
    useEffect(() => {
        if (paymentStatus === 'approved' && paymentData) {
            // Para o polling
            if (pollingId) clearInterval(pollingId);

            setCurrentStep('success');

            // Entrega o item
            fetch('/api/deliver', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    player: paymentData.player,
                    product: paymentData.product,
                    productName: paymentData.productName,
                    amount: paymentData.amount,
                    quantity: paymentData.quantity,
                    coupon: paymentData.coupon,
                    extra: {
                        color: paymentData.color,
                        custom_color: paymentData.custom_color,
                    }
                }),
            });
        }
    }, [paymentStatus, paymentData, pollingId]);

    const resetPopup = () => {
        setCurrentStep('form');
        setPaymentData(null);
        setError(null);
        setLoading(false);
        setPaymentStatus(null);
    };

    return (
        <Popup
            trigger={<button className="button"> COMPRAR! </button>}
            modal
            nested
            onClose={resetPopup}
        >
            {close => (
                <div className="modal">
                    <header className="header">
                        <span>
                            <img src={product.icon} alt={`Ícone de ${product.name}`} />
                            {product.name}
                        </span>
                        <span style={{fontFamily: 'Minecraftia', opacity: '75%'}}>
                            R${paymentData?.amount?.toFixed(2) || previewPrice}
                        </span>
                    </header>

                    <main className="content">
                        {currentStep === 'form' && (
                            <>
                                <p>{product.expanded_description}</p>

                                {error && (
                                    <div className="error-message" style={{ color: 'red', fontWeight: 'bold' }}>
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleFormSubmit}>
                                    <input type="hidden" name="product" value={product.id} />
                                    <input type="hidden" name="productName" value={product.name} />

                                    <div id={styles.playerInput}>
                                        <img 
                                            src={playerName.startsWith('_') ? 
                                                `https://api.creepernation.net/avatar/${playerName.slice(1)}/bedrock`
                                                : `https://mc-heads.net/avatar/${playerName}`} 
                                            width={160}
                                            height={160}
                                            onError={(e) => e.target.src = 'https://mc-heads.net/avatar/MHF_Steve'}
                                        />
                                        
                                        <input
                                            type="text"
                                            name="player"
                                            placeholder={'Nick do jogador...'}
                                            id={`${product.id}-player`}
                                            required={true}
                                            value={playerName}
                                            onChange={(e) => setPlayerName(e.target.value.replace(/[^a-zA-Z0-9_]/g, '').slice(0, 16))}
                                        />
                                    </div>
                                    
                                    {/* Campo de quantidade se existir */}
                                    {product.fields?.filter(field => field.name === 'quantity').map(field => (
                                        <input
                                            key={field.name}
                                            type="number"
                                            name="quantity"
                                            placeholder={field.placeholder}
                                            id={`${product.id}-quantity`}
                                            required={field.required || false}
                                            min={field.min}
                                            max={field.max}
                                            value={quantity}
                                            onChange={e => setQuantity(e.target.value)}
                                        />
                                    ))}

                                    {/* Outros campos */}
                                    {product.fields?.map(field => renderField(field, product.id))}
                                    
                                    {/* Campo de cupom de desconto */}
                                    <input
                                        type="text"
                                        name="coupon"
                                        id="coupon"
                                        placeholder="Cupom de desconto? (ex: SMP10)"
                                        value={coupon}
                                        onChange={e => setCoupon(e.target.value.toUpperCase().replace(/[^A-Z0-9]+/g, ''))}
                                    />
                                    {couponStatus && (
                                        <span style={{ color: couponStatus.includes('Cupom aplicado') ? 'lime' : 'red' }}>
                                            {couponStatus}
                                        </span>
                                    )}

                                    <p className={styles.terms}>Ao confirmar a compra do produto você afirma que concorda com nossos <Link href={'/terms'}>Termos de Uso</Link> e <Link href={'/privacy'}>Política de privacidade</Link>.</p>

                                    <div className="actions">
                                        <a onClick={close} disabled={loading}>Cancelar</a>
                                        <button type="submit" disabled={loading}>
                                            {loading ? 'Processando...' : 'Comprar!'}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}

                        {currentStep === 'payment' && paymentData && (
                            <div className={styles.paymentStep}>
                                <p>Escaneie o QR Code abaixo para efetuar o pagamento:</p>

                                <img
                                    src={`data:image/png;base64,${paymentData.qrCodeBase64}`}
                                    alt="QR Code PIX"
                                    style={{ maxWidth: '300px' }}
                                />
                                <div className={styles.paymentInfo}>
                                    <p>{translateStatus(paymentStatus)}</p>
                                </div>

                                <div className="actions">
                                    <div className={styles.pixCopyPaste}>
                                        <p>Ou copie o código PIX:</p>
                                        <div id={styles.pixCodeContainer}>
                                            <input
                                                type="text"
                                                value={paymentData.pixCode}
                                                name="pixCode"
                                                id="pixCode"
                                                readOnly
                                                onClick={(e) => e.target.select()}
                                            />
                                            <button
                                                onClick={() => navigator.clipboard.writeText(paymentData.pixCode)}
                                            >
                                                Copiar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 'success' && (
                            <div className={styles.successStep}>
                                <h3>🎉 Pagamento Confirmado!</h3>
                                <p>Sua compra foi processada com sucesso!</p>
                                <p>O produto {product.name} será entregue em breve no servidor.</p>

                                <div className="actions">
                                    <button onClick={close}>Fechar</button>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            )}
        </Popup>
    );
}

/**
 * Componente de produto
 * @param {Object} properties - Propriedades do componente
 * @param {{}} properties.product - Produto a ser exibido
 * @returns {JSX.Element} Componente de produto
 */
export default function Product({ product }) {
    return (
        <div className={styles.product}>
            <header>
                <h3>{product.name} <span>R${product.price}</span></h3>
                <img src={product.icon} alt={`Ícone de ${product.name}`} />

                <main>
                    <p>{product.description}</p>
                </main>
            </header>

            <footer>
                <ProductPopup product={product} />
            </footer>
        </div>
    );
}