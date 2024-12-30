//funcao que recebe um valor e retorna um valor formatado em moeda
export const formtMoney = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}