import type { Metadata } from "next";
import { ProximaEtapa } from "@/components/proxima-etapa";

export const metadata: Metadata = {
  title: "Contato",
  description: "Telefone, WhatsApp, e-mail e as 8 unidades. E o formulário para quem prefere escrever.",
  alternates: { canonical: "/contato" },
  openGraph: { title: "Contato", description: "Telefone, WhatsApp, e-mail e as 8 unidades. E o formulário para quem prefere escrever.", url: "/contato" },
};

export default function Pagina() {
  return (
    <ProximaEtapa
      titulo="Contato"
      resumo="Telefone, WhatsApp, e-mail e as 8 unidades. E o formulário para quem prefere escrever."
      previsto={[
        "Telefone 24h em destaque, antes de qualquer formulário",
        "Formulário curto, com mensagem de erro em português claro",
        "As 8 unidades com telefone local",
        "Trabalhe conosco, que hoje é só um campo de upload sem uma linha sobre a empresa",
      ]}
    />
  );
}
