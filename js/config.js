/**
 * =========================================================================
 * CONFIGURAÇÃO DO CONVITE - LIZ E LAÍS · 5 ANOS
 * =========================================================================
 * Preencha os campos abaixo com os dados da festa.
 * As alterações são refletidas automaticamente no convite.
 */

const CONVITE_CONFIG = {
  // -----------------------------------------------------------------------
  // 1. WhatsApp para confirmação de presença
  // -----------------------------------------------------------------------
  // Insira o número com DDI e DDD, apenas números.
  // Exemplo configurado: +55 11 98118-4384 -> "5511981184384"
  // REGRA: Se este campo ficar vazio (""), o botão "Confirmar presença"
  // continuará visível na prévia, porém desabilitado até ser preenchido.
  WHATSAPP_NUMBER: "5511981184384",

  // Mensagem oficial pré-preenchida no WhatsApp do convidado:
  WHATSAPP_MESSAGE: "Oi! Confirmo minha presença no aniversário da Liz e da Laís! 🎀",

  // -----------------------------------------------------------------------
  // 2. Link do Google Maps para a Localização
  // -----------------------------------------------------------------------
  // Link exato do Salão de Festas do Parque das Árvores (Rua Mamoneira, 148).
  // Se deixar vazio (""), o convite abre automaticamente uma busca no
  // Google Maps pelo endereço configurado em 'enderecoBusca'.
  MAPS_URL: "https://maps.app.goo.gl/wJiJAmkBE49C9xS3A",

  // Busca padrão de fallback caso MAPS_URL esteja vazio:
  enderecoBusca: "Rua Mamoneira, 148, Parque das Árvores",

  // -----------------------------------------------------------------------
  // 3. Sugestão de Presentes
  // -----------------------------------------------------------------------
  presentes: [
    { item: "Roupa", tamanho: "Tamanho 5/6", icone: "👗" },
    { item: "Sapato", tamanho: "Tamanho 25/26", icone: "🩰" },
    { item: "Brinquedos", tamanho: "Para soltar a imaginação!", icone: "🧸" }
  ],

  // -----------------------------------------------------------------------
  // 4. Informações da Festa
  // -----------------------------------------------------------------------
  aniversariantes: "Liz e Laís",
  idade: "5 anos",
  dataHora: "06/12, às 13h",
  localNome: "Parque das Árvores — Salão de Festas",
  endereco: "Rua Mamoneira, 148"
};

// Torna o objeto acessível globalmente no navegador
if (typeof window !== "undefined") {
  window.CONVITE_CONFIG = CONVITE_CONFIG;
}
