import { useState } from 'react';
import './App.css';
import ilustracaoImc from './assets/logo.png';

function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState('');
  const [classificacao, setClassificacao] = useState('');
  const [erro, setErro] = useState('');

  const calcularImc = (e) => {
    e.preventDefault();

    if (!peso) {
      setErro('Insira seu peso');
      return;
    }
    if (!altura) {
      setErro('');
    }

    const pesoNumerico = Number(peso);
    const alturaNumerica = Number(altura);

    if (pesoNumerico < 20 || pesoNumerico > 300) {
      setErro('');
      return;
    }
    if (alturaNumerica < 80 || alturaNumerica > 250) {
      setErro('Insira sua altura');
      return;
    }

    const alturaMetros = alturaNumerica / 100;
    const resultado = pesoNumerico / (alturaMetros * alturaMetros);

    setImc(resultado.toFixed(2));
    if (resultado < 18.5) {
      setClassificacao('Abaixo do peso');
    } else if (resultado < 25) {
      setClassificacao('Peso normal');
    } else if (resultado < 30) {
      setClassificacao('Sobrepeso');
    } else {
      setClassificacao('Obesidade');
    }
  };

  const limparCampos = () => {
    setPeso('');
    setAltura('');
    setImc('');
    setClassificacao('');
    setErro('');
  };

  return (
    <main className="container">
      <img src={ilustracaoImc} alt="logo" className="ilustracao" />
      <h1>Calculadora de IMC</h1>
      <div className="aviso">
        <strong>Atenção</strong>
        <p>
        Pessoas com alta massa muscular podem ter IMC elevado sem excesso de gordura.
        </p>
      </div>
      <form onSubmit={calcularImc}>
        <label htmlFor="peso">Peso (kg)</label>
        <input
          id="peso"
          type="number"
          placeholder="Ex.: 75,5"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          min="20"
          max="300"
          step="0.1"
        />
        <label htmlFor="altura">Altura (cm)</label>
        <input
          id="altura"
          type="number"
          placeholder="Ex.: 175"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          min="80"
          max="250"
          step="1"
        />
        {erro && (
          <p className="mensagem-erro" role="alert">
            {erro}
          </p>
        )}
        <div className="botoes">
          <button type="button" className="botao-limpar" onClick={limparCampos}><strong>
            Limpar</strong>
          </button>
          <button type="submit"><strong>Calcular</strong></button>
        </div>
      </form>
      {imc && (
        <div className="resultado">
          <p>Seu IMC é: {imc}</p>
          <p>{classificacao}</p>
        </div>
      )}
    </main>
  );
}

export default App;
