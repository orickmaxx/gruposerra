"use client";

import { useEffect, useState } from "react";
import { UNIDADES, distanciaKm, unidadeMaisPerto, type Unidade } from "@/data/unidades";
import { SITE } from "@/lib/site";
import { IconeAbaixo, IconeLocal, IconeRelogio, IconeSeta, IconeTelefone } from "../icones";

/**
 * "Qual unidade eu chamo?"
 *
 * Comeca na Matriz, que e a resposta certa para a maioria e a unica que
 * funciona sem JS e sem permissao. Se a pessoa autorizar a localizacao, troca
 * pela mais proxima e mostra a distancia.
 *
 * ⛔ NAO pede a permissao sozinho ao abrir a pagina. Pedir geolocalizacao sem
 * gesto e o padrao que o navegador pune e que a pessoa nega por reflexo, e aqui
 * negar significa ficar sem o telefone certo. Quem chega as 3 da manha nao vai
 * reabrir a aba para consertar isso: o botao e explicito, diz para que serve, e
 * a Matriz continua clicavel o tempo todo.
 *
 * A coordenada nunca sai do navegador. Nao ha requisicao, nao ha registro, nao
 * ha cookie: a conta de distancia roda aqui mesmo, com a lista que ja veio no
 * HTML.
 */
export function UnidadePerto() {
  const [ordem, setOrdem] = useState<Unidade[]>(UNIDADES);
  const [distancias, setDistancias] = useState<Record<string, number> | null>(null);
  const [estado, setEstado] = useState<"parado" | "buscando" | "ok" | "negado" | "indisponivel">(
    "parado"
  );
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    if (!("geolocation" in navigator)) setEstado("indisponivel");
  }, []);

  const localizar = () => {
    if (!("geolocation" in navigator)) return setEstado("indisponivel");
    setEstado("buscando");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const eu = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        const perto = unidadeMaisPerto(eu);
        const d: Record<string, number> = {};
        for (const u of perto) d[u.slug] = distanciaKm(eu, u);
        setOrdem(perto);
        setDistancias(d);
        setEstado("ok");
      },
      () => setEstado("negado"),
      { enableHighAccuracy: false, timeout: 9000, maximumAge: 600000 }
    );
  };

  const escolhida = ordem[0];
  const outras = ordem.slice(1);

  /* O plantao tem dois numeros e a matriz usa um deles. Sem isto, quando a
     unidade escolhida era a matriz, o cartao mostrava (19) 3775-9752 duas
     vezes, uma embaixo da outra. */
  const plantao =
    escolhida.telefone === SITE.emergencia.rotulo
      ? SITE.emergenciaAlt
      : SITE.emergencia;

  return (
    <section className="bg-white py-12 md:py-20" id="unidades">
      <div className="mx-auto max-w-[76rem] px-5" data-revela>
        {/* Cabeca centralizada: e uma secao de oferta, nao de narrativa. */}
        <div className="mx-auto max-w-[46rem] text-center">
          <h2 className="text-t2">
            {estado === "ok" ? "A unidade mais perto de você" : "Qual unidade chamar"}
          </h2>
          <p className="mx-auto mt-5 max-w-[56ch] text-lead text-pedra-600">
            {estado === "ok"
              ? "Ordenamos as 8 unidades pela distância até onde você está agora. Nada disso sai do seu navegador."
              : "São 8 unidades na região de Campinas, cada uma com telefone e equipe na cidade. Se preferir, deixe o site achar a mais perto."}
          </p>

          {estado !== "ok" && (
            <button
              type="button"
              onClick={localizar}
              disabled={estado === "buscando" || estado === "indisponivel"}
              className="mt-8 inline-flex min-h-[3.25rem] items-center gap-2.5 rounded-serra border border-serra-300 bg-white px-6 font-semibold text-serra-600 shadow-baixa transition-all duration-300 hover:-translate-y-0.5 hover:border-serra-400 hover:bg-serra-50 disabled:translate-y-0 disabled:opacity-60"
            >
              <IconeLocal className="size-5 shrink-0" />
              {estado === "buscando" ? "Localizando…" : "Usar minha localização"}
            </button>
          )}
        </div>

        {estado === "negado" && (
          <p className="mx-auto mt-6 max-w-[62ch] rounded-serra border border-linha bg-white px-5 py-4 text-center text-[0.9375rem] text-pedra-700">
            Sem problema, a localização continua desligada. Abaixo está a
            matriz, e a lista completa das 8 unidades está logo em seguida.
          </p>
        )}

        {/* --- a unidade escolhida --- */}
        <article className="cartao mt-10 overflow-hidden rounded-serra-lg border border-serra-200 bg-white shadow-media">
          <div className="grid gap-8 p-7 md:grid-cols-[1.25fr_1fr] md:p-9">
            <div>
              <p className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-serra-500/10 px-3 py-1 text-[0.8125rem] font-bold text-serra-600">
                  <IconeLocal className="size-4 shrink-0" />
                  {estado === "ok" ? "Mais perto de você" : "Matriz"}
                </span>
                {distancias && (
                  <span className="numerais text-[0.875rem] text-pedra-600">
                    a {distancias[escolhida.slug].toFixed(1).replace(".", ",")} km daqui
                  </span>
                )}
              </p>

              <h3 className="mt-4 text-t3">{escolhida.nome}</h3>

              <p className="mt-4 flex gap-3 text-corpo">
                <IconeLocal className="mt-1 size-5 shrink-0 text-pedra-400" />
                <span>
                  {escolhida.logradouro}
                  <br />
                  <span className="text-pedra-600">
                    {escolhida.bairro}, {escolhida.cidade}/{escolhida.uf}
                    {escolhida.cep ? ` · CEP ${escolhida.cep}` : ""}
                  </span>
                </span>
              </p>

              <p className="mt-3 flex gap-3 text-[0.9375rem] text-pedra-600">
                <IconeRelogio className="mt-0.5 size-5 shrink-0 text-pedra-400" />
                <span>
                  {escolhida.horario}
                  <br />
                  <span className="font-semibold text-corpo">
                    Óbito: 24 horas, todos os dias.
                  </span>
                </span>
              </p>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${escolhida.logradouro}, ${escolhida.bairro}, ${escolhida.cidade} ${escolhida.uf}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-texto mt-5 inline-flex items-center gap-2 font-semibold text-serra-600"
              >
                Como chegar
                <IconeSeta className="size-4 shrink-0" />
              </a>
            </div>

            <div className="flex flex-col gap-3 md:border-l md:border-linha md:pl-8">
              <a
                href={`tel:${escolhida.tel}`}
                className="botao-cheio flex min-h-[3.5rem] items-center justify-center gap-2.5 rounded-serra px-5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
              >
                <IconeTelefone className="size-5 shrink-0" />
                <span className="numerais">{escolhida.telefone}</span>
              </a>
              <a
                href={`tel:${plantao.tel}`}
                className="flex min-h-[3.5rem] items-center justify-center gap-2.5 rounded-serra border border-serra-200 bg-white px-5 font-semibold text-serra-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-serra-400 hover:bg-serra-50"
              >
                <IconeTelefone className="size-5 shrink-0" />
                <span className="numerais">{plantao.rotulo}</span>
              </a>
              <p className="text-center text-[0.8125rem] leading-relaxed text-pedra-600">
                O segundo número atende óbito em qualquer cidade, 24 horas.
              </p>
            </div>
          </div>
        </article>

        {/* --- as outras --- */}
        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          className="mt-6 inline-flex min-h-[3rem] items-center gap-2 rounded-serra border border-linha bg-white px-5 font-semibold text-pedra-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-serra-300 hover:text-serra-600"
        >
          {aberto ? "Esconder as outras unidades" : `Ver as outras ${outras.length} unidades`}
          <IconeAbaixo
            className={`size-5 shrink-0 transition-transform duration-300 ${aberto ? "rotate-180" : ""}`}
          />
        </button>

        {aberto && (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {outras.map((u) => (
              <li key={u.slug}>
                <article className="cartao flex h-full flex-col rounded-serra-lg border border-linha bg-white p-6 shadow-baixa">
                  <h3 className="font-display text-[1.0625rem] font-bold text-tinta">
                    {u.nome}
                  </h3>
                  {distancias && (
                    <p className="numerais mt-1 text-[0.8125rem] text-pedra-600">
                      a {distancias[u.slug].toFixed(1).replace(".", ",")} km daqui
                    </p>
                  )}
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-corpo">
                    {u.logradouro}
                    <br />
                    <span className="text-pedra-600">
                      {u.bairro}, {u.cidade}/{u.uf}
                    </span>
                  </p>
                  <a
                    href={`tel:${u.tel}`}
                    className="mt-5 inline-flex min-h-[2.75rem] items-center gap-2.5 rounded-serra border border-serra-200 px-4 font-semibold text-serra-600 transition-colors hover:border-serra-400 hover:bg-serra-50"
                  >
                    <IconeTelefone className="size-[1.05rem] shrink-0" />
                    <span className="numerais">{u.telefone}</span>
                  </a>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
