let saldo = 100000

const meses=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]
const mesDisponibleCronos=["abril","mayo","junio"]
const mesDisponibleOnix=["mayo","junio","julio"]
const mesDisponibleRaptor=["junio","julio","agosto"]

function buscarMes(arr,mes){
    return arr.some(a=>a===mes )
}

class Autos{
    constructor(marca, modelo, precio) {
        this.marca=marca
        this.modelo=modelo
        this.precio=precio
    }
}
const cronos=new Autos ("fiat", "cronos", 5000)
const onix=new Autos ("chevrolet", "onix", 6000)
const raptor=new Autos("ford", "raptor", 10000)

alert("Bienvenido a Rent a Card")
alert("Lo primero que debe hacer es crear un usuario y contraseña")
    
const usuarioContraseña =[]
let usuarioN = prompt("Cree un usuario")
usuarioContraseña.push(usuarioN)
let contraseñaN = prompt("Cree una contraseña")
usuarioContraseña.push(contraseñaN)


ingresarUsuario()
function ingresarUsuario(){
    let usuario = prompt("Ingrese su usario")
    if (usuario ===usuarioContraseña[0]){
        alert ("Bienbenido "+usuario)
        ingreseClave()
    }else{
        alert("Usuario incorrecto")
        ingresarUsuario()
    }
}

function ingreseClave(){
    let clave = prompt("Ingrese su clave")
    if (clave ===usuarioContraseña[1]){
        alert("Clave correcta")
        seleccionAuto()
    }else{
        alert("Clave incorrecta")
        ingreseClave()
    }
} 
 
function seleccionAuto(){
    let op = prompt("Seleccione una opcion: \n 1. Fiat Cronos 1.8 Drive $5000/dia \n 2. Chevrolet Onix 2022 $6000/dia \n 3. Ford Raptor F-150 $10000/dia")
    switch(op){
        case "1":
            mesCronos()
            break
        case "2":
            mesOnix()
            break
        case "3":
            mesRaptor()
            break
        default:
            break
    }
}

function mesCronos (){
    let mes = prompt("Ingrese el mes en el que desea alquilar el auto")
    if (buscarMes(mesDisponibleCronos,mes)){
        alert("El auto esta disponible ese mes")
        diaEntrega(cronos.marca, cronos.modelo, cronos.precio)
    } else if(buscarMes(meses,mes)){
        alert("El auto no esta disponible en ese mes, por favor elija otro mes")
        mesCronos()
    } else{
        alert("Error, ingrese un mes")
        mesCronos()
    }
}

function mesOnix (){
    let mes = prompt("Ingrese el mes en el que desea alquilar el auto")
    if (buscarMes(mesDisponibleOnix,mes)){
        alert("El auto esta disponible ese mes")
        diaEntrega(onix.marca, onix.modelo, onix.precio)
    } else if(buscarMes(meses,mes)){
        alert("El auto no esta disponible en ese mes, por favor elija otro mes")
        mesOnix()
    } else{
        alert("Error, ingrese un mes")
        mesOnix()
    }
}


function mesRaptor (){
    let mes = prompt("Ingrese el mes en el que desea alquilar el auto")
    if (buscarMes(mesDisponibleRaptor,mes)){
        alert("La camioneta esta disponible ese mes")
        diaEntrega(raptor.marca, raptor.modelo, raptor.precio)
    } else if(buscarMes(meses,mes)){
        alert("La camioneta no esta disponible en ese mes, por favor elija otro mes")
        mesRaptor()
    } else{
        alert("Error, ingrese un mes")
        mesRaptor()
    }
}

function diaEntrega(marca,modelo,precio){
    let diaE = prompt("Ingrese la fecha de entrega del auto")
    if((diaE>=1)&&(diaE<31)){
        diaDevolucion(marca,modelo,precio,diaE)
    }else {
        alert("Error")
        diaEntrega(marca,modelo,precio)
    }
}

function diaDevolucion(marca,modelo,precio,diaE){
    let diaD = prompt("Ingrese la fecha de devolucion del auto")
    if((diaD>=1)&&(diaD<31)&&(diaE<diaD)){
        precioT(marca,modelo,precio,diaE,diaD)
    }else {
        alert("Error")
        diaEntrega(marca,modelo,precio)
    }
}

function precioT(marca,modelo,precio,diaE,diaD){
    
    let diaT = diaD-diaE
    let total = diaT*precio
    alert("El costo por rentar el "+marca+" "+ modelo +  " por "+ diaT + " dias, es de: $" + total)
    tarjeta(marca,modelo,precio,diaE,diaD,total)
}
 
function tarjeta(marca,modelo,precio,diaE,diaD,total){
    confirm("Ingrese su tarjeta")
    if (saldo>total){
alert("El pago se realizo con exito \nLe entregaremos el " + marca + " "+ modelo + " el dia " + diaE+ "\nGracias por confiar en nosotros")
    } else {
        alert("Saldo insuficiente")
        diaEntregaCronos(marca,modelo,precio)
    }
}

