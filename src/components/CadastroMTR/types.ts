// src/components/CadastroMTR/types.ts
export interface MTRData {
  id: number;
  mtr: string;
  situacao: string;
  responsavelemissao: string;
  gerador: string;
  transportadornome: string;
  quantidaderecebida: string;
  dataemissao: string;
  geradorunidade: string;
  transportadoraunidade: string;
  transportadorunidade: string;
  cdfnumero: string;
  classe: string;
  tipomanifesto: string;
  tratamento: string;
  unidade: string;  
  url: string;
}
interface PlanilhaRow {
  MTR: string;
  tipomanifesto?: string;
  responsavelemissao?: string;
  gerador?: string;
  // Adicione mais campos conforme necessário...
}