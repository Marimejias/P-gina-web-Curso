//Cadena de texto
const nombre = 'Carlos';
const parrafo = "Este es un 'parrafo'";
const parrafo2 = 'Este es un "parrafo"';

//Números
const numero = 4;
const numero2 = 1234.3;

//Booleano
const usuarioConectado = true;
const mayorQue = 10 > 2;
//console.log(mayorQue);

//Arrays 
const arreglo = ['Texto', 456, true, { propiedad: 'valor' }, [0, 1, 2, 3]];
//console.log(arreglo);

//Objeto
const persona = {
    nombre: 'Carlos',
    edad: 27,
    carro: {
        marca: 'Toyota',
        color: 'negro',
    }
}
console.log(persona);

//Function 
function hola() {
    console.log('hola');
}
hola();

//Null normalmente lo usamos cuando queremos especificar que un valor sea nulo. 
const miVariable = null;

//Undefined se usa cuando un valor no está definido.
const miVariable2 = undefined;