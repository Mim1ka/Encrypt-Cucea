import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'encrypt-Cucea';
  lista:string[]=
    ["Cesar encrypt","Cesar decrypt","Polybius encrypt","Polybius decrypt","Vigeneres encrypt","Vigeneres decrypt"];
  seleccionado: any;
  textoAEncriptar: any;
  desplazamientos: any;
  mostrar=false;
  textoEncriptado="";

  alfabetoClaves ="abcdefghijklmnopqrstuvwxyz"
  polobyiusEncrypt = [      {clave: "A",  number: 11},    {clave: "B",  number: 12},    {clave: "C",  number: 13},    {clave: "D",  number: 14},    {clave: "E",  number: 15},    {clave: "F",  number: 21},    {clave: "G",  number: 22},    {clave: "H",  number: 23},    {clave: "I",  number: 24},    {clave: "J",  number: 24},    {clave: "K",  number: 25},    {clave: "L",  number: 31},    {clave: "M",  number: 32},    {clave: "N",  number: 33},    {clave: "O",  number: 34},    {clave: "P",  number: 35},    {clave: "Q",  number: 41},    {clave: "R",  number: 42},    {clave: "S",  number: 43},    {clave: "T",  number: 44},    {clave: "U",  number: 45},    {clave: "V",  number: 51},    {clave: "W",  number: 52},    {clave: "X",  number: 53},    {clave: "Y",  number: 54},    {clave: "Z",  number: 55}]
  //variable para atrapar el valor de el input para el encrypt y decrypt del vigeneres
  claveVigeneres: any;




  ngOnInit(): void {
  }

  ButtonAction(){
    this.mostrar=true;
    let diferencia:number;
    let cifrado;
    let contador=0;
    let char: any;
    this.textoEncriptado=""
    let porciones;
    let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T',
      'U', 'V', 'W', 'X', 'Y', 'Z'];
    // @ts-ignore
    //funcion para traer los indices del abecedario segun el mensaje dado
    function getIndexesOf(message) {
      //regresamos una lista dispersa del mensaje donde se van a reemplazar los espacios, luego generamos una lista nueva
      //que va a llevar el indice de cada una de las letras en mayusculas a un arreglo que sera el index, y de esta forma tenemos nuestra lista de indices
      return [...(message.replace(/ /g, ''))].map(letter => {
        const index = alphabet.indexOf(letter.toUpperCase())
        if (index == -1) return 0
        return index
      })
    }
    // @ts-ignore
    function matchLengthWith(key, message) {
      //verificamos que el array no venga vacio
      if (!Array.isArray(key)) return []
      // si la llave y el mensaje vienen igual, regresamos la llave
      if (key.length == message.length) return key
      //generamos un arreglo llamado resultado que sera igual que la llave
      let result = key
      //recorremos el tama;o del resultado, siempre y cuando sea menor al mensaje
      for (let i = 0; result.length < message.length; i++) {
        //agregamos a la lista de resultados un elemento que sera el elemento i, donde se guardara la matriz de nuetro metodo vigeneres
        result.push(result[i])
        // si el valor de i es mayor igual al tamaño del resultado, regresamos el valor de i a 0
        if (i >= result.length) i = 0
        //cuando el tamaño de result sea igual al mensaje, rompemos todo el ciclo
        if (result.length == message.length) break;
      }
      //revolvemos result
      return result
    }

    if (this.seleccionado == "Cesar encrypt"){
      for (char of this.textoAEncriptar) {
        //alfabetoClaves ="abcdefghijklmnopqrstuvwxyz"
        if (this.alfabetoClaves.indexOf(char)+ this.desplazamientos > 26) {
        //
          diferencia = this.alfabetoClaves.indexOf(char.toLowerCase()) + this.desplazamientos - 26
        //diferencia es igual a el numero de la letra asignada mas los desplazamientos menos 26
          cifrado = this.alfabetoClaves[diferencia]
        //cifrado nos da igual a la letra con el numero del resultado de diferencia
        }
        else{ 
          diferencia = this.alfabetoClaves.indexOf(char.toLowerCase()) + this.desplazamientos
        //el numero que tiene asiganda la 
          cifrado = this.alfabetoClaves[diferencia]
        }
        if (contador + 1 == this.textoAEncriptar.length){
          this.textoEncriptado += cifrado}
      else{
          this.textoEncriptado += cifrado + "-"
        contador += 1
        }
      }
    }
    else if (this.seleccionado == "Cesar decrypt") {
      for (char of this.textoAEncriptar) {
        if (this.alfabetoClaves.indexOf(char) - this.desplazamientos < 0) {
          diferencia = this.alfabetoClaves.indexOf(char.toLowerCase()) - this.desplazamientos + 26
          cifrado = this.alfabetoClaves[diferencia]
        } else {
          diferencia = this.alfabetoClaves.indexOf(char.toLowerCase()) - this.desplazamientos
          cifrado = this.alfabetoClaves[diferencia]
        }
        if (contador + 1 == this.textoAEncriptar.length) {
          console.log("entro en el primero")
          this.textoEncriptado += cifrado
        } else {
          console.log("entro en el segundo")
          this.textoEncriptado += cifrado + "-"
          contador += 1
        }
        console.log(this.textoEncriptado)
      }
    }
    else if (this.seleccionado == "Polybius encrypt") {
      for (char of this.textoAEncriptar) {
        cifrado = this.polobyiusEncrypt.find(item => item.clave.toLowerCase() === char.toLowerCase())
        if (contador + 1 == this.textoAEncriptar.length) {
          this.textoEncriptado += cifrado?.number
        } else {
          this.textoEncriptado += cifrado?.number + "-"
          contador += 1
        }
      }

    }
    else if (this.seleccionado == "Polybius decrypt") {
      porciones = this.textoAEncriptar.split("-")
      console.log(porciones)
      for (char of porciones) {
        cifrado = this.polobyiusEncrypt.find(item => item.number == char)
        if (contador + 1 == porciones.length) {
          this.textoEncriptado += cifrado?.clave
        } else {
          this.textoEncriptado += cifrado?.clave + "-"
          contador += 1
        }
      }
    }
    else if (this.seleccionado == "Vigeneres encrypt") {
      //regresamos todos los indices del mensaje que viene del texto a encriptar que viene como propiedad con el NgModal de la vista
      const messageIndexes = getIndexesOf(this.textoAEncriptar)
      //regresamos todos los indices de la clave que viene  texto a encriptar y llave que viene como propiedad con el NgModal de la vista
      const keyIndexes = matchLengthWith(getIndexesOf(this.claveVigeneres), this.textoAEncriptar)
      //devolvemos de cada uno de los indices dos valores, uno que sera apuntador, y contador, con esto recorreremos el apuntador, y el cotador de cada una de las frases,
      //para poder obtener la letra correspondiente, que sera un numero, y se almacena en la variable letter
      messageIndexes.forEach((apuntador, contador) => {
        let letter = apuntador + keyIndexes[contador]
        //si letter es mayor al abecedario, vamos a restarle el valor del abecedario, al valor de la letra
        if (letter >= alphabet.length) letter -= alphabet.length-1
        //vamos concatenando la salida del abecedario a la variable de texto encriptado que se mostrara en la vista mediante un NgModal
        this.textoEncriptado += alphabet[letter]
      })

    }
    else if (this.seleccionado == "Vigeneres decrypt") {
      //regresamos todos los indices del mensaje que viene del texto a encriptar que viene como propiedad con el NgModal de la vista
      const messageIndexes =  getIndexesOf(this.textoAEncriptar)
      //regresamos todos los indices de la clave que viene  texto a encriptar y llave que viene como propiedad con el NgModal de la vista
      const keyIndexes = matchLengthWith(getIndexesOf(this.claveVigeneres), this.textoAEncriptar)
      //devolvemos de cada uno de los indices dos valores, uno que sera apuntador, y contador, con esto recorreremos el apuntador, y el cotador de cada una de las frases,
      //para poder obtener la letra correspondiente, que sera un numero, y se almacena en la variable letter
      messageIndexes.forEach((apuntador, contador) => {
        let letter = apuntador - keyIndexes[contador]
        //si letter es menor al abecedario le sumamos el tamaño del abecedario -1 para que quede en rango
        if (letter < 0) letter += alphabet.length-1
        //vamos concatenando la salida del abecedario a la variable de texto encriptado que se mostrara en la vista mediante un NgModal
        this.textoEncriptado += alphabet[letter]
      })
      }
    }

}


