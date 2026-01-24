// pages/api/deliver.js
import { Rcon } from "rcon-client";

async function sendDiscordNotification({ player, productName, amount = 1, quantity = 1, coupon = null }) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  let fields = [
    { name: "Jogador", value: `\`${player}\``, inline: true },
    { name: "Produto", value: `\`${productName}\``, inline: true },
    { name: "Valor", value: `R$ ${amount.toFixed(2)}`, inline: true },
  ]

  Number(quantity) > 1 && fields.push({ name: "Quantidade", value: `${quantity}`, inline: true });
  coupon && fields.push({ name: "Cupom", value: `\`${coupon}\``, inline: true });

  const embed = {
    title: "🛒 Nova compra no Legião Templária!",
    color: 0x00FF00,
    fields,
    timestamp: new Date().toISOString(),
    footer: { text: "Legião Templária - Minecraft Medieval!" }
  };

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ embeds: [embed] }),
  });
}

/**
 * Gera o comando de acordo com o produto comprado
 */
function buildCommand({ player, product, extra, quantity=1 }) {
  switch (product) {
    case 'kitnether':
      return `smpstore kitnether ${player} ${quantity}`;
    case 'kitend':
      return `smpstore kitend ${player} ${quantity}`;
    default:
      return `msg ${player} Obrigado pela compra no Legião Templária!`;
  }
}

/**
 * Entrega o item no servidor via RCON
 * @param {Request} req 
 * @param {Response} res 
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { player, product, productName, extra, quantity, coupon } = req.body;

  if (!player || !product) {
    return res.status(400).json({ message: 'Dados insuficientes para entrega' });
  }

  // Garante que a quantidade seja passada para o comando
  const command = buildCommand({ player, product, extra, quantity: quantity || 1 });

  try {
    const rcon = await Rcon.connect({
      host: process.env.RCON_HOST,
      port: process.env.RCON_PORT,
      password: process.env.RCON_PASSWORD
    });

    const response = await rcon.send(command);
    await rcon.end();

    // Envia aviso para o Discord
    await sendDiscordNotification({
      player,
      productName,
      amount: req.body.amount || 1,
      quantity: quantity || 1,
      coupon: coupon,
    });

    return res.status(200).json({ success: true, response });
  } catch (err) {
    console.error('Erro RCON:', err);
    return res.status(500).json({ message: 'Erro ao conectar no servidor' });
  }
}