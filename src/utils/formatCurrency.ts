const formatCurrency = (text: string) => {
  let unmaskedValue = text.replace(/\D/g, ''); // Remove qualquer caractere não numérico
  let numericValue = (parseFloat(unmaskedValue) / 100).toFixed(2); // Divide por 100 para colocar as casas decimais
  return numericValue
    .toString()
    .replace('.', ',') // Substitui o ponto pela vírgula
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Coloca os pontos de milhar
};

export default formatCurrency;
