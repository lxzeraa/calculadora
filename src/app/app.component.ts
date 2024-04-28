import { Component, OnInit} from '@angular/core';
import { CalculadoraService } from './calculadora.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  private num1: string;
  private num2: string;
  private resultado: number;
  private operacao: string;

  constructor(private calculadoraService: CalculadoraService) { }

  ngOnInit() {
    this.limpar();
  }
  /**
  * Inicializa todos os operadores para os valoreess padrao
  * 
  * @return void
  */
  limpar(): void {
    this.num1 = '0';
    this.num2 = null;
    this.resultado = null;
    this.operacao = null;
  }
  /**
   * Adiciona o numero selecionado para calculo posteriormente
   * 
   * @param string numero
   * @return void
   */
  adicionarNumero(numero: string): void {
    if (this.operacao === null) {
      this.num1 = this.concatenarNumero(this.num1, numero);
    } else {
      this.num2 = this.concatenarNumero(this.num2, numero);
    }
  }

  /**
   * Retorna o valor concatenado. Trata o separador decimal
   * 
   *  @param string numAtual
   *  @param string numConcat
   *  @return string
   */
  concatenarNumero(numAtual: string, numConcat: string): string {
    //caso contenha apenas '0' ou null, reinicia o valor
    if (numAtual === '0' || numAtual === null) {
      numAtual = '';
    }
    // se o primeiro digito for um '.', concatena '0' antes do ponto
    if (numConcat === '.' && numAtual === '') {
      return '0.';
    }

    //se caso '.' digitado e ja contenha um '.' apenas retorna
    if (numConcat === '.' && numAtual.indexOf('.') > -1) {
      return numAtual;
    }

    return numAtual + numConcat;

  }
  /**
   * Executa logica quando um operador for selecionado.
   * Caso ja possua uma operacao selecionada, executa a 
   * operacao anterior, e define a nova operacao
   * 
   * @param string opracao
   * @return void
   * 
   */
  definirOperacao(operacao: string): void {
    // apenas define a operacao caso ja nao exista
    if (this.operacao === null) {
      this.operacao = operacao;
      return;
    }

    /* caso operacao definida e numero 2 selecionado
    efetua o calculo da operacao  */
    if (this.num2 !== null) {
      this.resultado = this.calculadoraService.calcular(
        parseFloat(this.num1), parseFloat(this.num2), this.operacao);

      this.operacao = operacao;
      this.num1 = this.resultado.toString();
      this.num2 = null;
      this.resultado = null;

    }
  }
  /**
   * efetua o calculo de uma operacao
   * 
   * @return void
   */
  calcular(): void {
    if (this.num2 === null) {
      return;
    }

    this.resultado = this.calculadoraService.calcular(
      parseFloat(this.num1), parseFloat(this.num2), this.operacao
    );

  }

  get display(): string {
    if (this.resultado !== null) {
      return this.resultado.toString();
    }

    if (this.num2 !== null) {
      return this.num2;
    }
    return this.num1;
  }
  
}