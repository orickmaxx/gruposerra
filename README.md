# Site do Grupo Serra

Site novo do **Grupo Serra Funerárias**, funerária de Campinas com 8 unidades na
região metropolitana. Substitui o site atual (`gruposerra.com.br`), que roda em
OctoberCMS num nginx de 2019.

> ⚠️ **Ambiente de homologação.** Ainda não é o site do cliente. Há conteúdo
> pendente (fotos, história da empresa, carência dos planos) e tudo o que falta
> está **declarado na própria tela**, nunca inventado.

## Rodar

```bash
cd web
npm install
npm run dev
```

Abre em `http://localhost:3000`.

## Estrutura

```
.
├── web/                 o site (Next.js 16 + React 19 + TypeScript + Tailwind v4)
│   ├── src/app/         rotas: home, planos, blog, unidades, legais, sitemap, OG
│   ├── src/components/  componentes, e src/components/home/ as seções da home
│   ├── src/data/        dados reais: unidades, planos, depoimentos, benefícios, artigos
│   ├── src/lib/         constantes da empresa e configuração de medição
│   └── scripts/         verificação por Playwright (captura, movimento, interação)
├── marca/               logo, favicon e brasão originais do cliente
├── CLAUDE.md            dossiê da empresa: dados legais, paleta medida, auditoria do site antigo
├── PRODUCT.md           verdade de produto: usuários, princípios, régua de acabamento
└── ANALISE-FLOREES.md   comparação contra os sites de referência, com o que falta
```

**Na Vercel, o Root Directory precisa ser `web`.**

## Variáveis de ambiente

Copie `web/.env.example` para `web/.env.local`. Nenhuma é obrigatória para
rodar, mas duas importam em produção:

| Variável | Para quê |
|---|---|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4. Sem ela, o site não mede nada. |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Pixel da Meta. |
| `LEAD_WEBHOOK_URL` | **Para onde vai o lead do formulário.** Sem ela o contato é gravado em disco, e na Vercel o disco não persiste: o lead se perde. |

Nenhuma tag de medição carrega antes do aceite no banner de cookies. O Consent
Mode v2 entra com tudo **negado por padrão**.

## Verificação

Os scripts provam o comportamento em Chrome de verdade, em vez de confiar em
inspeção visual. Com o site servindo em `BASE`:

```bash
cd web
npm run build && npx next start -p 4360

BASE=http://127.0.0.1:4360 node scripts/verificar-novos.mjs      # cookies, formulário, 404
BASE=http://127.0.0.1:4360 node scripts/verificar-interacao.mjs  # carrossel e geolocalização
BASE=http://127.0.0.1:4360 node scripts/verificar-movimento.mjs  # revelação e sem-JS
BASE=http://127.0.0.1:4360 node scripts/capturar.mjs             # capturas desktop e celular
```

⛔ A captura de celular sai em **segmentos**: o Chrome corta `fullPage` em
~16384px sem avisar, e a home passa disso. Segmento é a única captura confiável.

## O que ainda falta, e depende do cliente

1. **Fotografia**: fachada das 8 unidades, equipe, frota, interior do Memorial.
   Os espaços já estão dimensionados no site.
2. **Carência, idade limite e regra de reajuste** dos planos. Não estão
   publicados em lugar nenhum e não foram estimados.
3. **A história contada pela empresa**: quem fundou e em que circunstância. O
   ano de 1961 não tem documento público, e o CNPJ ativo é de 1992.
4. **Encarregado de dados (DPO)** para a política de privacidade, exigido pelo
   art. 41 da LGPD.
5. **Autorização de uso** do nome e da foto das 9 pessoas cujos depoimentos
   públicos do Google são reproduzidos aqui.
6. Revisão do jurídico nas páginas `/privacidade` e `/termos`.
