import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  /* Define as constantes utilizadas para
  identificar as operações de calculo. 
   Sendo static da pra acessar eles mesmo sem
   criar um objeto da classe. */

  static readonly SOMA: string = '+';
  static readonly SUBTRACAO: string = '-';
  static readonly MULTIPLICACAO: string = '*';
  static readonly DIVISAO: string = '/';

  constructor() { }
  /** 
   * Método que calcula uma operação matematica
   * dado dois números. 
   * Suporta todas as operações
   * 
   * @param num1 number
   * @param num2 number
   * @param operacao string Operacao a ser executada
   * @return number Resultado da operacao
  */
  calcular(num1: number, num2: number, operacao: string): number {
    let resultado: number;

    switch (operacao) {
      case CalculadoraService.SOMA:
        resultado = num1 + num2;
        break;
      case CalculadoraService.SUBTRACAO:
        resultado = num1 - num2;
        break;
      case CalculadoraService.MULTIPLICACAO:
        resultado = num1 * num2;
        break;
      case CalculadoraService.DIVISAO:
        resultado = num1 / num2;
        break;
      default:
        resultado = 0;
    }
    return resultado;
  }

}