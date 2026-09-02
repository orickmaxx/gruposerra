import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { Lista, PaginaLegal, Secao } from "@/components/pagina-legal";
import { Pendencia } from "@/components/ui";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description:
    "Como o Grupo Serra trata os dados pessoais de quem usa este site, segundo a LGPD: o que é coletado, para quê, por quanto tempo e como pedir a exclusão.",
  alternates: { canonical: "/privacidade" },
  robots: { index: true, follow: true },
};

/**
 * Política de privacidade.
 *
 * A do site ATUAL do cliente não nomeia a empresa, não traz o CNPJ, não indica
 * encarregado de dados e cita a LGPD uma vez de passagem, sobre câmara de
 * mediação (ver CLAUDE.md 9.5). Isto aqui é o conserto.
 *
 * ⚠️ Escrito por quem faz o site, não por advogado. Antes de ir ao ar, o
 * jurídico do Grupo Serra precisa revisar, e o campo do encarregado de dados
 * precisa ser preenchido com uma pessoa de verdade: sem isso a política está
 * incompleta perante o art. 41 da LGPD.
 */
export default function Privacidade() {
  return (
    <PaginaLegal
      titulo="Política de privacidade"
      atualizado="2 de setembro de 2026"
      resumo="O que este site coleta, por que, por quanto tempo e o que você pode exigir a qualquer momento. Escrito para ser lido, não para se proteger de você."
    >
      <div className="mb-10">
        <Pendencia>
          <strong className="font-semibold text-tinta">Pendente antes de publicar:</strong> o nome e
          o contato do encarregado de dados (DPO) do Grupo Serra, exigidos pelo art. 41 da LGPD, e a
          revisão do jurídico da empresa. Enquanto isso não vier, os pedidos sobre dados chegam pelo
          e-mail institucional abaixo.
        </Pendencia>
      </div>

      <Secao n={1} titulo="Quem trata os seus dados">
        <p>
          O controlador dos dados é a <strong>{SITE.razaoSocial}</strong>, inscrita no CNPJ sob o
          nº <strong>{SITE.cnpj}</strong>, com sede na {SITE.matriz.rua}, {SITE.matriz.bairro},{" "}
          {SITE.matriz.cidade}/{SITE.matriz.uf}, CEP {SITE.matriz.cep}, conhecida comercialmente
          como {SITE.nomeCompleto}.
        </p>
        <p>
          Contato para assuntos de dados pessoais:{" "}
          <a href={`mailto:${SITE.email}`} className="link-texto font-semibold">
            {SITE.email}
          </a>{" "}
          ou {SITE.emergencia.rotulo}.
        </p>
      </Secao>

      <Secao n={2} titulo="Que dados este site coleta">
        <p>Só existem três situações em que este site recebe algo seu.</p>
        <Lista
          itens={[
            <>
              <strong>Quando você preenche o formulário de contato:</strong> nome, WhatsApp, cidade,
              assunto e a mensagem que você escrever. Todos vêm de você, por sua iniciativa.
            </>,
            <>
              <strong>Quando você aceita os cookies de medição:</strong> dados de navegação como
              páginas vistas, tempo de permanência, origem da visita, tipo de aparelho e uma
              identificação anônima gerada pelas ferramentas de medição. Se você recusar, nada disso
              é coletado.
            </>,
            <>
              <strong>Quando você pede para o site achar a unidade mais perto:</strong> a sua
              localização aproximada é lida pelo navegador, usada para ordenar as 8 unidades por
              distância e descartada em seguida. Essa coordenada <strong>não sai do seu
              aparelho</strong>: não é enviada a nenhum servidor, não é gravada e não é registrada
              em lugar nenhum.
            </>,
          ]}
        />
        <p>
          Este site não pede CPF, não pede dados de pagamento e não coleta dado sensível. Se alguma
          página pedir isso a você em nome do Grupo Serra, desconfie e ligue para a empresa.
        </p>
      </Secao>

      <Secao n={3} titulo="Para que servem, e com que base legal">
        <Lista
          itens={[
            <>
              <strong>Responder ao seu contato</strong> e apresentar os planos. Base legal:
              procedimentos preliminares a pedido do titular (art. 7º, V da LGPD).
            </>,
            <>
              <strong>Entender como o site é usado</strong>, para melhorá-lo. Base legal: o seu
              consentimento (art. 7º, I), que você dá ou recusa no aviso de cookies e pode mudar
              quando quiser.
            </>,
            <>
              <strong>Segurança e funcionamento</strong> do próprio site. Base legal: legítimo
              interesse (art. 7º, IX), limitado ao necessário.
            </>,
          ]}
        />
        <p>
          Os seus dados <strong>não são vendidos</strong> e não são cedidos para terceiros fazerem
          publicidade própria.
        </p>
      </Secao>

      <Secao n={4} titulo="Com quem os dados são compartilhados">
        <Lista
          itens={[
            <>
              <strong>Hospedagem do site</strong>, que processa os acessos para entregar as páginas.
            </>,
            <>
              <strong>Ferramentas de medição</strong> (Google Analytics e, se ativado, Meta Pixel),{" "}
              <strong>somente se você aceitar</strong> os cookies de medição. Elas operam com
              consentimento negado por padrão neste site.
            </>,
            <>
              <strong>A equipe do Grupo Serra</strong> que vai responder ao seu contato, incluindo a
              unidade da cidade que você escolheu.
            </>,
          ]}
        />
      </Secao>

      <Secao n={5} titulo="Por quanto tempo ficam guardados">
        <Lista
          itens={[
            <>
              <strong>Contato pelo formulário:</strong> pelo tempo necessário para atender e, depois,
              pelo prazo em que a empresa precise comprovar o atendimento. Você pode pedir a exclusão
              antes disso.
            </>,
            <>
              <strong>Dados de medição:</strong> pelo prazo padrão da ferramenta, contado da sua
              última visita.
            </>,
            <>
              <strong>Localização:</strong> nada é guardado. A conta de distância acontece no seu
              navegador e some quando você fecha a página.
            </>,
          ]}
        />
      </Secao>

      <Secao n={6} titulo="Os seus direitos">
        <p>
          O art. 18 da LGPD garante a você, sobre os seus dados, o direito de pedir a qualquer
          momento:
        </p>
        <Lista
          itens={[
            "confirmação de que existe tratamento, e acesso aos dados",
            "correção de dado incompleto, inexato ou desatualizado",
            "anonimização, bloqueio ou eliminação de dado desnecessário ou tratado fora da lei",
            "portabilidade a outro fornecedor",
            "eliminação dos dados tratados com base no seu consentimento",
            "informação sobre com quem a empresa compartilhou os seus dados",
            "informação sobre o que acontece se você não consentir",
            "revogação do consentimento, a qualquer tempo",
          ]}
        />
        <p>
          Para exercer qualquer um deles, escreva para{" "}
          <a href={`mailto:${SITE.email}`} className="link-texto font-semibold">
            {SITE.email}
          </a>
          . A empresa responde no prazo legal. Você também pode reclamar à ANPD.
        </p>
      </Secao>

      <Secao n={7} titulo="Cookies">
        <p>Este site usa duas categorias, e só uma depende de você.</p>
        <Lista
          itens={[
            <>
              <strong>Necessários:</strong> fazem o site funcionar e guardam a sua própria escolha
              sobre cookies. Não dá para desligar, porque sem eles o site não funciona.
            </>,
            <>
              <strong>De medição:</strong> ajudam a entender o uso do site.{" "}
              <strong>Entram desligados</strong> e só passam a funcionar se você aceitar.
            </>,
          ]}
        />
        <p>
          Você pode mudar de ideia quando quiser:{" "}
          <button
            type="button"
            data-cookies-abrir
            className="link-texto font-semibold text-serra-600"
          >
            reabrir a escolha de cookies
          </button>
          . A sua decisão fica gravada no seu próprio navegador, não em um servidor nosso.
        </p>
      </Secao>

      <Secao n={8} titulo="Crianças e adolescentes">
        <p>
          Este site não é destinado a menores de 18 anos e não coleta dados de crianças de forma
          consciente. Se você é responsável e acredita que uma criança enviou dados aqui, escreva
          para {SITE.email} que a empresa apaga.
        </p>
      </Secao>

      <Secao n={9} titulo="Segurança">
        <p>
          O site é servido por conexão criptografada (HTTPS) e o acesso aos contatos recebidos é
          restrito à equipe que precisa responder. Nenhum sistema é perfeito: se houver incidente de
          segurança relevante, o Grupo Serra comunicará os titulares e a ANPD, como manda o art. 48
          da LGPD.
        </p>
      </Secao>

      <Secao n={10} titulo="Mudanças nesta política">
        <p>
          Quando esta política mudar, a data no topo muda junto. Alterações relevantes são avisadas
          no próprio site. Consulte também os{" "}
          <Link href="/termos" className="link-texto font-semibold">
            termos de uso
          </Link>
          .
        </p>
      </Secao>
    </PaginaLegal>
  );
}
