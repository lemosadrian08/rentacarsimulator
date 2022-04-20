let saldo = 100000

entrarARentACard()
function entrarARentACard(){
    alert("Bienvenido a Rent a Card")
    ingresarUsuario()
}

function ingresarUsuario(){
    let usuario = prompt("Ingrese su usario")
    if (usuario ==="adrian123"){
        alert ("Bienbenido Adrian!")
        ingreseClave()
    }else{
        alert("Usuario incorrecto")
        ingresarUsuario()
    }
}

function ingreseClave(){
    let clave = prompt("Ingrese su clave")
    if (clave ==="1234"){
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
            cronos()
            break
        case "2":
            onix()
            break
        case "3":
            raptor()
            break
        default:
            break
    }
}

function cronos(){
    let fechaCronos = prompt("Ingresar el mes en el que quier alquilar el auto")
    if (fechaCronos == "mayo" || fechaCronos == "junio" || fechaCronos == "julio" || fechaCronos == "agosto" || fechaCronos == "septiembre" || fechaCronos == "octubre"){
        diaEntregaCronos()
        
    }else if (fechaCronos == "enero" || fechaCronos == "marzo" || fechaCronos == "abril" || fechaCronos == "noviembre" || fechaCronos == "diciembre" ){
        alert("El auto no esta disponible en ese mes")
        cronos()
    }else{
        alert("Error")
        cronos()
    }
}

function diaEntregaCronos(){
    let diaEC = prompt("Ingrese la fecha de entrega del auto")
    if((diaEC>=1)&&(diaEC<31)){
        diaDevolucionCronos(diaEC)
    }else {
        alert("Error")
        diaEntregaCronos()
    }
}

function diaDevolucionCronos(diaEC){
    let diaDC = prompt("Ingrese la fecha de devolucion del auto")
    if((diaDC>=1)&&(diaDC<31)&&(diaEC<diaDC)){
        precioCronos(diaEC, diaDC)
    }else {
        alert("Error")
        diaEntregaCronos()
    }
}

function precioCronos(diaEC, diaDC){
    let diaTC = diaDC-diaEC
    let precioC = diaTC*5000
    alert("El costo por rentar el Fiat Cronos por "+ diaTC + " dias, es de: $" + precioC)
    tarjetaC(precioC, diaEC)
}

function tarjetaC(precioC, diaEC){
    confirm("Ingrese su tarjeta")
    if (saldo>precioC){
alert("El pago se realizo con exito \nLe entregaremos el auto el dia " + diaEC+ "\nGracias por confiar en nosotros")
    } else {
        alert("Saldo insuficiente")
        diaEntregaCronos()
    }
}
 
function onix(){
    let fechaOnix = prompt("Ingresar el mes en el que quier alquilar el auto")
    if (fechaOnix == "junio" || fechaOnix == "julio" || fechaOnix == "agosto" || fechaOnix == "septiembre" || fechaOnix == "octubre"){
        diaEntregaOnix()
        
    }else if (fechaOnix == "enero" || fechaOnix == "marzo" || fechaOnix == "abril" ||fechaOnix == "mayo" ||  fechaOnix == "noviembre" || fechaOnix == "diciembre" ){
        alert("El auto no esta disponible en ese mes")
        onix()
    }else{
        alert("Error")
        onix()
    }
}

function diaEntregaOnix(){
    let diaEO = prompt("Ingrese la fecha de entrega del auto")
    if((diaEO>=1)&&(diaEO<31)){
        diaDevolucionOnix(diaEO)
    }else {
        alert("Error")
        diaEntregaOnix()
    }

}

function diaDevolucionOnix(diaEO){
    let diaDO = prompt("Ingrese la fecha de devolucion del auto")
    if((diaDO>=1)&&(diaDO<31)&&(diaEO<diaDO)){
        precioOnix(diaEO, diaDO)
    }else {
        alert("Error")
        diaEntregaOnix()
    }
}

function precioOnix (diaEO, diaDO){
    let diaTO = diaDO-diaEO
    let precioO = diaTO*6000
    alert("El costo por rentar el Chevrolet Onix por "+ diaTO + " dias, es de: $" + precioO)
    tarjetaO(precioO, diaEO)
}

function tarjetaO(precioO, diaEO){
    confirm("Ingrese su tarjeta")
    if (saldo>precioO){
alert("El pago se realizo con exito \nLe entregaremos el auto el dia " + diaEO+ "\nGracias por confiar en nosotros")
    } else {
        alert("Saldo insuficiente")
        diaEntregaOnix()
    }
}




function raptor(){
    let fechaRaptor = prompt("Ingresar el mes en el que quier alquilar la camioneta")
    if (fechaRaptor == "julio" || fechaRaptor == "agosto" || fechaRaptor == "septiembre" || fechaRaptor == "octubre"){
        diaEntregaRaptor()
        
    }else if (fechaRaptor == "enero" || fechaRaptor == "marzo" || fechaRaptor == "abril" ||fechaRaptor == "mayo" || fechaRaptor == "junio" ||  fechaRaptor == "noviembre" || fechaRaptor == "diciembre" ){
        alert("La camioneta no esta disponible en ese mes")
        raptor()
    }else{
        alert("Error")
        raptor()
    }
}

function diaEntregaRaptor(){
    let diaER = prompt("Ingrese la fecha de entrega de la camioneta")
    if((diaER>=1)&&(diaER<31)){
        diaDevolucionRaptor(diaER)
    }else {
        alert("Error")
        diaEntregaRaptor()
    }

}

function diaDevolucionRaptor(diaER){
    let diaDR = prompt("Ingrese la fecha de devolucion de la camioneta")
    if((diaDR>=1)&&(diaDR<31)&&(diaER<diaDR)){
        precioRaptor(diaER, diaDR)
    }else {
        alert("Error")
        diaEntregaRaptor()
    }
}

function precioRaptor (diaER, diaDR){
    let diaTR = diaDR-diaER
    let precioR = diaTR*10000
    alert("El costo por rentar la Ford Raptor por "+ diaTR + " dias, es de: $" + precioR)
    tarjetaR(precioR, diaER)
}


function tarjetaR(precioR,diaER){
    confirm("Ingrese su tarjeta")
    if (saldo>precioR){
alert("El pago se realizo con exito \nLe entregaremos la camioneta el dia " + diaER+ "\nGracias por confiar en nosotros")
    } else {
        alert("Saldo insuficiente")
        diaEntregaRaptor()
    }
}

