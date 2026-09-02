import { Topo } from "@/components/home/topo";
import { BarraConfianca, ComoFunciona, Garantias } from "@/components/home/confianca";
import { Depoimentos } from "@/components/home/depoimentos";
import { Planos, Inclusos } from "@/components/home/planos";
import { Comparador } from "@/components/home/comparador";
import { Servicos } from "@/components/home/servicos";
import { Clube } from "@/components/home/clube";
import { UnidadePerto } from "@/components/home/unidade-perto";
import { Sobre } from "@/components/home/sobre";
import { Historia } from "@/components/home/prova";
import { Instagram } from "@/components/home/instagram";
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
 *   1  Topo ................. malha clara
 *   2  Barra de confiança ... branco, fina, com a Lei 13.261/16
 *   3  Depoimentos .......... ESCURO (palco)
 *   4  Como funciona ........ papel
 *   5  Planos ............... branco
 *   6  Comparador ........... papel
 *   7  Serviços ............. branco
 *   8  O que está incluso ... ESCURO
 *   9  Garantias ............ branco
 *  10  Clube ................ LARANJA
 *  11  Unidade mais perto ... branco
 *  12  Sobre e equipe ....... papel
 *  13  Linha do tempo ....... branco
 *  14  Instagram ............ papel
 *  15  Dúvidas .............. branco
 *  16  Formulário ........... papel
 *  17  Fechamento ........... ESCURO
 */
export default function Home() {
  return (
    <>
      <DadosEstruturados />
      <Topo />
      <BarraConfianca />
      <Depoimentos />
      <ComoFunciona />
      <Planos />
      <Comparador />
      <Servicos />
      <Inclusos />
      <Garantias />
      <Clube />
      <UnidadePerto />
      <Sobre />
      <Historia />
      <Instagram />
      <Duvidas />
      <Formulario />
      <Fechamento />
      <BarraFixaCelular />
      <WhatsAppFlutuante />
    </>
  );
}
