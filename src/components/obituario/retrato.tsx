import { IconeRetrato } from "../icones";

/**
 * Retrato da pessoa.
 *
 * ⛔ POR QUE NÃO HÁ FOTO AQUI. A alternativa seria rosto de banco de imagem ou
 * rosto gerado, e as duas colocam a imagem de uma pessoa que não morreu na
 * página que anuncia uma morte. Numa demonstração isso é constrangedor; num
 * site no ar é um problema de outra ordem. A silhueta anônima diz "ainda não há
 * retrato" sem afirmar nada sobre ninguém.
 *
 * Quando o sistema real entrar, a família manda a foto e este componente
 * recebe `src`. Nada mais muda: a moldura, a proporção e o tom continuam iguais,
 * que é o mesmo contrato de `moldura-foto.tsx`.
 */
export function Retrato({
  nome,
  className = "",
  proporcao = "1/1",
}: {
  nome: string;
  className?: string;
  proporcao?: string;
}) {
  return (
    <div
      style={{ aspectRatio: proporcao }}
      role="img"
      aria-label={`Sem retrato de ${nome}`}
      className={`relative flex items-center justify-center overflow-hidden rounded-serra bg-pedra-100 ${className}`}
    >
      {/* Um fio de luz diagonal, o mesmo gesto das superfícies escuras do site,
          para a área não ler como bloco cinza esquecido. */}
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-pedra-200/60"
      />
      <IconeRetrato className="relative size-[45%] text-pedra-300" />
    </div>
  );
}
