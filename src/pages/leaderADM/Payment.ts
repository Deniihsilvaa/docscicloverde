  export interface Payment {
    id: string; // tabela1.id
    user_id: string; // tabela2.nome (precisa ser associado através de um JOIN no banco)
    valor_total?: number | null; // tabela1.valor_total
    status: 'pending' | 'paid' | 'cancelled'; // tabela1.status
    ano: number;
    data_pagamento?: Date; // tabela1.data_pagamento
    mes_referente?: number; // tabela1.mes_referente
    yearRef: number; // tabela1.ano
    url?: string; // tabela1.url
    data_vencimento?: Date; // tabela1.data_vencimento
    type_pg: 'wage' | 'advance' | 'bonus' | 'other'; // tabela1.type_pg
  }
  