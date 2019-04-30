
  function calcular() {
    var gramas = alimento.value * pessoas.value; // cada alimento tem um value já com a porção para uma pessoa
    var tempo = gramas/20;
    quantidade = 'Coloque ${gramas} gramas e dois dedos água acima do alimento.'
    tempo = 'O tempo estimado para fazer esta receita é de $(minutos) minutos.';
    resultado.innerHTML = quantidade tempo;
}
