# Convite Interativo de Aniversário · Liz e Laís (5 anos) 🩰✨

Convite de aniversário interativo, elegante e responsivo, projetado para compartilhamento direto pelo WhatsApp e redes sociais.

---

## 📁 Estrutura de Arquivos

```text
convite lis e lais/
├── index.html          # Estrutura semântica, metatags para WhatsApp (Open Graph), palco de teatro e modal
├── css/
│   └── style.css       # Estilos do palco, cortinas em veludo/cetim rosa, botões em rosa-claro e responsividade
├── js/
│   ├── config.js       # Arquivo de configuração fácil (WHATSAPP_NUMBER, MAPS_URL, presentes e dados)
│   └── script.js       # Abertura das cortinas, bloco clicável de mapa, confirmação e tela de presentes
├── assets/
│   ├── convite.jpg     # Imagem oficial do convite (proporção 2:3 estritamente preservada)
│   └── favicon.svg     # Ícone delicado com coração dourado para a aba do navegador
└── README.md           # Guia de uso, configuração e publicação
```

---

## ⚙️ Configurações (WhatsApp e Google Maps)

Toda a personalização de contatos e localização fica concentrada no arquivo [`js/config.js`](file:///D:/SITES/convite%20lis%20e%20lais/js/config.js):

### 1. Bloco “LOCALIZAÇÃO” (Google Maps)
O bloco inteiro de endereço no convite é um link clicável que direciona o convidado diretamente para o mapa:

```javascript
// Link exato do Salão de Festas do Parque das Árvores (Rua Mamoneira, 148):
MAPS_URL: "https://maps.app.goo.gl/wJiJAmkBE49C9xS3A",
```

* **Com link exato preenchido:** Tocar em qualquer parte do bloco de Localização abre diretamente o mapa no local exato do salão.
* **Se o campo for esvaziado (`""`):** O convite abre automaticamente uma busca no Google Maps por *“Rua Mamoneira, 148, Parque das Árvores”*.

### 2. Botão “Confirmar presença” (WhatsApp)
Ao lado do botão *“Sugestão de presente”*:

```javascript
// Número do WhatsApp com DDI (55) e DDD:
WHATSAPP_NUMBER: "5511981184384",

// Mensagem oficial pré-preenchida para o convidado enviar:
WHATSAPP_MESSAGE: "Oi! Confirmo minha presença no aniversário da Liz e da Laís! 🎀",
```

* **Com o número preenchido:** Ao tocar, abre a conversa com o número configurado com a mensagem pronta no campo de texto para o convidado revisar e enviar.
* **Se o número estiver vazio (`""`):** O botão permanece visível na prévia, porém com visual desabilitado e sem ação de clique até que um número válido seja preenchido.

---

## 🎁 Sugestão de Presente

O botão **"Sugestão de presente"** abre uma tela dedicada em formato modal com cantos arredondados, fundo branco e os itens:
* 👗 • Roupa tamanho 5/6
* 🩰 • Sapato tamanho 25/26
* 🧸 • Brinquedos

Ao tocar no botão **“← Voltar ao convite”**, a tela retorna imediatamente ao convite mantendo a cortina aberta.

---

## 🚀 Como Visualizar a Página Localmente

### Opção 1: Abrir diretamente no navegador
Dê um duplo clique no arquivo [`index.html`](file:///D:/SITES/convite%20lis%20e%20lais/index.html) para abrir no Chrome, Edge ou Safari.

### Opção 2: Servidor local
No terminal da pasta do projeto, execute:
```bash
npx serve .
```

---

## 🌐 Como Publicar na Web (Gratuito)

Basta enviar a pasta para qualquer hospedagem de sites estáticos:
* **Vercel** ou **Netlify Drop** (arraste a pasta na tela)
* **GitHub Pages**
* **Cloudflare Pages**
