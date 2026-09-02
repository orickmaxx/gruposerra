/**
 * Medição do site.
 *
 * ⛔ NENHUM ID É INVENTADO. Os identificadores vêm de variável de ambiente e,
 * enquanto não existirem, nada é carregado. Um GA4 chutado não mede errado: ele
 * manda dado da sua empresa para a propriedade de outra pessoa.
 *
 * O site atual do cliente ainda tem `UA-163314961-1`, um Universal Analytics
 * que o Google desligou em julho de 2023: a empresa está sem medir nada há mais
 * de três anos (ver CLAUDE.md 9.3). Isso aqui é o conserto.
 *
 * Tudo carrega SÓ depois do consentimento, e o consentimento entra NEGADO por
 * padrão via Consent Mode v2 (ver components/consentimento.tsx).
 */

export const MEDICAO = {
  ga4: process.env.NEXT_PUBLIC_GA_ID ?? "",
  gtm: process.env.NEXT_PUBLIC_GTM_ID ?? "",
  metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
} as const;

export const TEM_MEDICAO =
  Boolean(MEDICAO.ga4) || Boolean(MEDICAO.gtm) || Boolean(MEDICAO.metaPixel);

/** Chave da escolha da pessoa. Fica no navegador dela, em lugar nenhum mais. */
export const CHAVE_CONSENTIMENTO = "serra_consentimento";

export type Consentimento = "aceito" | "recusado";

/**
 * Consent Mode v2 com tudo NEGADO por padrão.
 *
 * Precisa rodar ANTES de qualquer tag, por isso vai inline no <head> e não como
 * componente. `wait_for_update` dá 500ms para a escolha guardada ser aplicada
 * antes de a tag decidir sozinha.
 */
export const SCRIPT_PADRAO_NEGADO = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
try {
  var e = localStorage.getItem('${CHAVE_CONSENTIMENTO}');
  if (e === 'aceito') {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
  }
} catch (x) {}
`.trim();
