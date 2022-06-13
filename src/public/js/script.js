const tablaR = {
  "R0": "000",
  "R1": "001",
  "R2": "010",
  "R3": "011",
  "R4": "100",
  "R5": "101",
  "R6": "110",
  "R7": "111"
}

const tablaInstrucciones = {
  "MOVE": {
    "tr": "00001", //Transferencia entre registros
    "ccpm": "00010", //Copiar el contenido de la posicion de memoria Ri en el registro Rs
    "ccrm": "00011" //Copiar el contenido del registro Rs en Ri
  },
  "ADD": "01000",
  "SUB": "01001",
  "OR": "01010",
  "AND": "01011",
  "XOR": "01100"
}

const tablaHexadecimal = {
  "0000": "0",
  "0001": "1",
  "0010": "2",
  "0011": "3",
  "0100": "4",
  "0101": "5",
  "0110": "6",
  "0111": "7",
  "1000": "8",
  "1001": "9",
  "1010": "A",
  "1011": "B",
  "1100": "C",
  "1101": "D",
  "1110": "E",
  "1111": "F"
}

// El texto que se pondra adentro de las cartas de conversion a binario y hexadecimal.
const textoBinario = document.getElementById('conversion');
const textoHexadecimal = document.getElementById('hexadecimal');

const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', validar);

function validar(e) {
  e.preventDefault();
  const instruccion = document.getElementById('ins').value;

  if (instruccion.length == '') {
    return alert('Escribe la instrucción.');
  }

  convertir(instruccion.toUpperCase());
}

const convertir = (instruccion) => {
  const split = instruccion.split(' ');

  const accion = split[0];

  let RD = split[1];
  let RS = split[2];
  let RS2 = split[3];

  switch (accion) {
    case 'MOV':
      if (!RD || !RS) {
        return alert('Faltan argumentos.\nEjemplo de uso: MOV Rd, Rs');
      } else {
        RD = RD.replace(/,/g, '');

        MOV(RD, RS);
      }
      break;

    case 'ADD':
      if (!RD || !RS || !RS2) {
        return alert('Faltan argumentos.\nEjemplo de uso: ADD Rd, Rs1, Rs2');
      } else {
        RD = RD.replace(/,/g, '');
        RS = RS.replace(/,/g, '');

        ADD(RD, RS, RS2);
      }
      break;

    case 'SUB':
      if (!RD || !RS || !RS2) {
        return alert('Faltan argumentos.\nEjemplo de uso: SUB Rd, Rs1, Rs2');
      } else {
        RD = RD.replace(/,/g, '');
        RS = RS.replace(/,/g, '');

        SUB(RD, RS, RS2);
      }
      break;

    case 'OR':
      if (!RD || !RS || !RS2) {
        return alert('Faltan argumentos.\nEjemplo de uso: OR Rd, Rs1, Rs2');
      } else {
        RD = RD.replace(/,/g, '');
        RS = RS.replace(/,/g, '');

        OR(RD, RS, RS2);
      }
      break;

    case 'AND':
      if (!RD || !RS || !RS2) {
        return alert('Faltan argumentos.\nEjemplo de uso: AND Rd, Rs1, Rs2');
      } else {
        RD = RD.replace(/,/g, '');
        RS = RS.replace(/,/g, '');

        AND(RD, RS, RS2);
      }
      break;

    case 'XOR':
      if (!RD || !RS || !RS2) {
        return alert('Faltan argumentos.\nEjemplo de uso: XOR Rd, Rs1, Rs2');
      } else {
        RD = RD.replace(/,/g, '');
        RS = RS.replace(/,/g, '');

        XOR(RD, RS, RS2);
      }
      break;
    default:
      alert(`${accion} no esta disponible o no existe.`);
      break;
  }
}

// Convertidores
let resultado = null;

const MOV = (RD, RS) => {
  const regex = /\[R[0-7]]/ig;

  if (regex.test(RD) == true && regex.test(RS) == false) {
    resultado = tablaInstrucciones.MOVE.ccrm + tablaR[RD.replace(/[\[\]]/g, '')] + tablaR[RS] + '00000';
    if (resultado.includes('undefined')) return alert('Syntaxis invalida.');

    textoBinario.innerHTML = resultado;
    textoHexadecimal.innerHTML = convertirHexadecimal(resultado);

    agregarHistorial(`MOV ${RD}, ${RS}`, resultado, convertirHexadecimal(resultado));
    mostrarCarta();
  }

  else if (regex.test(RD) == false && regex.test(RS) == true) {
    resultado = tablaInstrucciones.MOVE.ccpm + tablaR[RD] + tablaR[RS.replace(/[\[\]]/g, '')] + '00000';
    if (resultado.includes('undefined')) return alert('Syntaxis invalida.');

    textoBinario.innerHTML = resultado;
    textoHexadecimal.innerHTML = convertirHexadecimal(resultado);

    agregarHistorial(`MOV ${RD}, ${RS}`, resultado, convertirHexadecimal(resultado));
    mostrarCarta();
  }

  else if (regex.test(RD) == false && regex.test(RS) == false) {
    resultado = tablaInstrucciones.MOVE.tr + tablaR[RD] + tablaR[RS] + '00000';
    if (resultado.includes('undefined')) return alert('Syntaxis invalida.');

    textoBinario.innerHTML = resultado;
    textoHexadecimal.innerHTML = convertirHexadecimal(resultado);

    agregarHistorial(`MOV ${RD}, ${RS}`, resultado, convertirHexadecimal(resultado));
    mostrarCarta();
  }
}

const ADD = (RD, RS, RS2) => {
  resultado = tablaInstrucciones.ADD + tablaR[RD] + tablaR[RS] + tablaR[RS2] + '00';
  if (resultado.includes('undefined')) return alert('Syntaxis invalida.');

  textoBinario.innerHTML = resultado;
  textoHexadecimal.innerHTML = convertirHexadecimal(resultado);

  agregarHistorial(`ADD ${RD}, ${RS}, ${RS2}`, resultado, convertirHexadecimal(resultado));
  mostrarCarta();
}

const SUB = (RD, RS, RS2) => {
  resultado = tablaInstrucciones.SUB + tablaR[RD] + tablaR[RS] + tablaR[RS2] + '00';
  if (resultado.includes('undefined')) return alert('Syntaxis invalida.');

  textoBinario.innerHTML = resultado;
  textoHexadecimal.innerHTML = convertirHexadecimal(resultado);

  agregarHistorial(`SUB ${RD}, ${RS}, ${RS2}`, resultado, convertirHexadecimal(resultado));
  mostrarCarta();
}

const OR = (RD, RS, RS2) => {
  resultado = tablaInstrucciones.OR + tablaR[RD] + tablaR[RS] + tablaR[RS2] + '00';
  if (resultado.includes('undefined')) return alert('Syntaxis invalida.');

  textoBinario.innerHTML = resultado;
  textoHexadecimal.innerHTML = convertirHexadecimal(resultado);

  agregarHistorial(`OR ${RD}, ${RS}, ${RS2}`, resultado, convertirHexadecimal(resultado));
  mostrarCarta();
}

const AND = (RD, RS, RS2) => {
  resultado = tablaInstrucciones.AND + tablaR[RD] + tablaR[RS] + tablaR[RS2] + '00';
  if (resultado.includes('undefined')) return alert('Syntaxis invalida.');

  textoBinario.innerHTML = resultado;
  textoHexadecimal.innerHTML = convertirHexadecimal(resultado);

  agregarHistorial(`AND ${RD}, ${RS}, ${RS2}`, resultado, convertirHexadecimal(resultado));
  mostrarCarta();
}

const XOR = (RD, RS, RS2) => {
  resultado = tablaInstrucciones.XOR + tablaR[RD] + tablaR[RS] + tablaR[RS2] + '00';
  if (resultado.includes('undefined')) return alert('Syntaxis invalida.');

  textoBinario.innerHTML = resultado;
  textoHexadecimal.innerHTML = convertirHexadecimal(resultado);

  agregarHistorial(`XOR ${RD}, ${RS}, ${RS2}`, resultado, convertirHexadecimal(resultado));
  mostrarCarta();
}

// Helpers
function convertirHexadecimal(binario) {
  binario = separarBinario(binario);

  let hexa = '';
  for (var i = 0; i < binario.length; i++) {
    hexa += tablaHexadecimal[binario[i]]
  }

  return hexa;
}

function mostrarCarta() {
  document.getElementById('ocu').style.display = '';
  document.getElementById('historial').style.display = '';
}

function separarBinario(binario) {
  const binarioSeparado = [];

  binarioSeparado.push(binario.slice(0, 4))
  binarioSeparado.push(binario.slice(4, 8))
  binarioSeparado.push(binario.slice(8, 12))
  binarioSeparado.push(binario.slice(12, 16))

  return binarioSeparado;
}

function agregarHistorial(instruccion, binario, hexadecimal) {
  const divHistorial = document.querySelector('#contenedor-historial');
  const divContenedor = document.createElement('div');

  divContenedor.innerHTML = `<h5>${instruccion}</h5>\n<p>${binario}</p>\n<p>${hexadecimal}</p>\n<hr>`;

  divHistorial.appendChild(divContenedor)
}
