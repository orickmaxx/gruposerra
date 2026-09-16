import { Topo } from "@/components/home/topo";
import { ComoFunciona } from "@/components/home/confianca";
import { Depoimentos } from "@/components/home/depoimentos";
import { Planos, Inclusos } from "@/components/home/planos";
import { Comparador } from "@/components/home/comparador";
import { Servicos } from "@/components/home/servicos";
import { Clube } from "@/components/home/clube";
import { UnidadePerto } from "@/components/home/unidade-perto";
import { Sobre } from "@/components/home/sobre";
import { Historia } from "@/components/home/prova";
import { Despedidas } from "@/components/home/despedidas";
import { Duvidas, Fechamento } from "@/components/home/duvidas";
import { Formulario } from "@/components/home/formulario";
import { BarraFixaCelular } from "@/components/barra-emergencia";
import { WhatsAppFlutuante } from "@/components/whatsapp-flutuante";
import { DadosEstruturados } from "@/components/dados-estruturados";

/**
 * Ordem e COR das seções.
 *
 * Alternância aprendida lendo o index.html do Plano Florees: eles nunca
 * empilham faixa clara atrás de faixa clara, e usam um escuro dramático com
 * brilho radial para dar ritmo. Aqui são três momentos escuros bem espaçados,
 * mais um laranja no clube, que é a única seção alegre que uma funerária tem.
 *
 * ⛔ A LISTA ABAIXO É CONFERIDA, NÃO DECORATIVA. Ela já disse "17 seções"
 * enquanto o componente renderizava 14, e listou um bloco de Instagram que não
 * era importado por ninguém. Comentário que mente sobre o arquivo é pior que
 * comentário nenhum, porque a próxima pessoa decide com base nele. Seção nova
 * entra aqui no mesmo commit, com a superfície que ela realmente usa.
 *
 *   1  Topo ................. malha clara
 *   2  Depoimentos .......... ESCURO (palco)
 *   3  Como funciona ........ papel
 *   4  Planos ............... branco
 *   5  Comparador ........... papel
 *   6  Serviços ............. branco, e fecha em ESCURO no bloco do crematório
 *   7  O que está incluso ... ESCURO
 *   8  Clube ................ LARANJA
 *   9  Unidade mais perto ... branco
 *  10  Sobre e equipe ....... papel
 *  11  Linha do tempo ....... areia
 *  12  Últimas despedidas ... branco
 *  13  Dúvidas .............. papel
 *  14  Formulário ........... branco
 *  15  Fechamento ........... ESCURO
 */
export default function Home() {
  return (
    <>
      <DadosEstruturados />
      <Topo />
      <Depoimentos />
      <ComoFunciona />
      <Planos />
      <Comparador />
      <Servicos />
      <Inclusos />
      <Clube />
      <UnidadePerto />
      <Sobre />
      <Historia />
      <Despedidas />
      <Duvidas />
      <Formulario />
      <Fechamento />
      <BarraFixaCelular />
      <WhatsAppFlutuante />
    </>
  );
}
