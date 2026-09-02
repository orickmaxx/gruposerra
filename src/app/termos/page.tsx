import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { Lista, PaginaLegal, Secao } from "@/components/pagina-legal";
import { Pendencia } from "@/components/ui";

export const metadata: Metadata = {
  title: "Termos de uso",
  description:
    "As regras de uso do site do Grupo Serra: o que a informação publicada aqui significa, o que ela não substitui e a quem recorrer.",
  alternates: { canonical: "/termos" },
};

/**
 * Termos de uso.
 *
 * O site atual do cliente não tem. O ponto que mais importa aqui é o item 3:
 * deixar explícito que o site é informativo e que o contrato do plano é o
 * documento que vale. Preço "a partir de" numa página é a origem clássica de
 * briga no Procon.
 */
export default function Termos() {
  return (
    <PaginaLegal
      titulo="Termos de uso"
      atualizado="2 de setembro de 2026"
      resumo="As regras de uso deste site, e o que a informação publicada aqui significa. Em uma frase: o site informa, o contrato obriga."
    >
      <div className="mb-10">
        <Pendencia>
          <strong className="font-semibold text-tinta">Pendente antes de publicar:</strong> revisão
          pelo jurídico do Grupo Serra. Este texto foi escrito por quem construiu o site.
        </Pendencia>
      </div>

      <Secao n={1} titulo="Quem mantém este site">
        <p>
          Este site é mantido pela <strong>{SITE.razaoSocial}</strong>, CNPJ {SITE.cnpj}, com sede
          na {SITE.matriz.rua}, {SITE.matriz.bairro}, {SITE.matriz.cidade}/{SITE.matriz.uf}. Ao
          navegar aqui, você concorda com estes termos.
        </p>
      </Secao>

      <Secao n={2} titulo="Para que ele serve">
        <p>
          Para apresentar os serviços do Grupo Serra, mostrar onde ficam as unidades, permitir que
          você entre em contato e trazer conteúdo informativo sobre luto e planejamento funerário.
        </p>
      </Secao>

      <Secao n={3} titulo="O site informa, o contrato obriga">
        <p>
          Esta é a parte mais importante desta página. Nada do que está publicado aqui substitui o
          contrato do plano de assistência funerária.
        </p>
        <Lista
          itens={[
            <>
              Os valores aparecem como <strong>&ldquo;a partir de&rdquo;</strong>. O valor que vale
              para você depende de quantas pessoas entram no contrato e das condições vigentes na
              contratação.
            </>,
            <>
              <strong>Carência, idade limite e regra de reajuste</strong> não estão publicados neste
              site. Exija esses três itens por escrito antes de assinar qualquer coisa, aqui ou em
              qualquer concorrente.
            </>,
            <>
              A cobertura efetiva, as exclusões e as regras de uso são as do contrato assinado, e é
              ele que prevalece em caso de divergência com qualquer página deste site.
            </>,
            <>
              O contrato de plano de assistência funerária é regido pela{" "}
              <strong>Lei Federal nº 13.261/2016</strong> e pelo Código de Defesa do Consumidor.
            </>,
          ]}
        />
      </Secao>

      <Secao n={4} titulo="O conteúdo do blog não é orientação profissional">
        <p>
          Os textos publicados aqui são informativos. Eles não substituem orientação médica,
          psicológica ou jurídica, e as regras práticas podem variar conforme o município. Em
          situação de risco à vida, procure atendimento imediato; o CVV atende gratuitamente pelo
          188, 24 horas.
        </p>
      </Secao>

      <Secao n={5} titulo="Uso permitido">
        <p>Você pode usar este site livremente para se informar e para entrar em contato. Não pode:</p>
        <Lista
          itens={[
            "usar o site para fim ilícito, ofensivo ou que prejudique terceiros",
            "tentar obter acesso não autorizado a sistemas, dados ou contas",
            "extrair conteúdo em massa por meios automatizados para reuso comercial",
            "enviar, pelo formulário, dado de outra pessoa sem que ela saiba e autorize",
          ]}
        />
      </Secao>

      <Secao n={6} titulo="Serviços e páginas de terceiros">
        <p>
          Algumas funções levam você para fora daqui: a segunda via de boleto, o Clube de Benefícios,
          o site do Complexo Memorial Hortolândia, o WhatsApp, o Instagram e as avaliações no Google.
          Cada um tem termos e política próprios, e o Grupo Serra não responde pelo conteúdo nem pela
          disponibilidade deles.
        </p>
      </Secao>

      <Secao n={7} titulo="Depoimentos publicados">
        <p>
          Os depoimentos exibidos neste site são avaliações públicas feitas por clientes no Google,
          reproduzidas na íntegra, sem edição de texto, e cada uma leva de volta à avaliação
          original. Se você é autor de uma delas e não quer que apareça aqui, escreva para{" "}
          <a href={`mailto:${SITE.email}`} className="link-texto font-semibold">
            {SITE.email}
          </a>{" "}
          que ela é retirada.
        </p>
      </Secao>

      <Secao n={8} titulo="Propriedade intelectual">
        <p>
          A marca, o logotipo, os textos e o desenho deste site pertencem ao Grupo Serra ou a quem
          licenciou o uso. Reprodução sem autorização não é permitida, salvo citação com indicação
          da fonte.
        </p>
      </Secao>

      <Secao n={9} titulo="Disponibilidade e limitação de responsabilidade">
        <p>
          O site pode ficar fora do ar para manutenção ou por causa alheia à empresa. Isso não afeta
          o atendimento de óbito, que é feito por telefone, 24 horas, todos os dias, pelo{" "}
          <a href={`tel:${SITE.emergencia.tel}`} className="link-texto font-semibold">
            {SITE.emergencia.rotulo}
          </a>
          . Em caso de urgência, ligue: não dependa do site.
        </p>
      </Secao>

      <Secao n={10} titulo="Mudanças, lei aplicável e foro">
        <p>
          Estes termos podem mudar, e a data no topo indica a versão vigente. Aplica-se a lei
          brasileira. Fica eleito o foro da comarca de {SITE.matriz.cidade}/{SITE.matriz.uf} para
          dirimir controvérsias, sem prejuízo do direito do consumidor de acionar o foro do seu
          domicílio.
        </p>
        <p>
          Veja também a{" "}
          <Link href="/privacidade" className="link-texto font-semibold">
            política de privacidade
          </Link>
          .
        </p>
      </Secao>
    </PaginaLegal>
  );
}
