let fecha=formatoFecha1(new Date())

let costoReduccion=0
let costoIntegral=0
let costoAeropuerto=0
let costoBebe=0
let costoGPS=0
let costoJoven=0
let costoConductorAdicional=0
let costoBooster=0
let costosAdicionales=0
let fecha1=0
let fecha2=0
let seleccion=""


const autoSeleccionado=[]
const dias=[]
const diaSeleccionadoEntrega=[]
const diaSeleccionadoDevolucion=[]
let diaSeleccionadoEntregaFormato2=""
let diaSeleccionadoDevolucionFormato2=""
let autosRentados=[]
let autosf=[]
autosRentados=JSON.parse(localStorage.getItem("usuario"))

let usuarioNuevo = {
    usuario: "",
    saldo: ""
}

let{usuario,saldo}=usuarioNuevo


class Autorentado{
    constructor( diaSeleccionadoEntrega,diaSeleccionadoDevolucion,diaSeleccionadoEntregaFormato2,diaSeleccionadoDevolucionFormato2, usuario,saldo,marca,modelo){
        this.diaSeleccionadoEntrega=diaSeleccionadoEntrega
        this.diaSeleccionadoDevolucion=diaSeleccionadoDevolucion
        this.diaSeleccionadoEntregaFormato2=diaSeleccionadoEntregaFormato2
        this.diaSeleccionadoDevolucionFormato2= diaSeleccionadoDevolucionFormato2
        this.usuario=usuario
        this.saldo=saldo
        this.marca=marca
        this.modelo=modelo
    }
    
}

const contenedorUsuario =document.querySelector('.contenedorUsuario')
const preguntaUsuario=document.createElement('h3')
const formUsuario=document.querySelector('.formUsuario')
const usuarioInput=document.createElement("input")
const saldoRange=document.querySelector('#saldo')
const textRange=document.querySelector('#textRange')
const btnUsuario=document.createElement("button")

const cardContainer = document.querySelector('.cardContainer');
const contenedorEntrega = document.querySelector('.contenedorEntrega')
const date1=document.createElement("input")
const preguntaEntrega=document.createElement("h3")

const contenedorDevolucion=document.querySelector('.contenedorDevolucion')
const date2=document.createElement("input")
const preguntaDevolucion=document.createElement("h3")

const contenedorPago = document.querySelector('.contenedorPago')
const contenedorBotonPagar =document.querySelector('.contenedorBotonPagar')
const preguntaPago = document.createElement("h3")
const btnPagar =document.createElement("button")

const contenedorSegurosYAdicionales=document.querySelector('.contenedorSegurosYAdicionales')

const contenedorResumen=document.querySelector('.contenedorResumen')
const resumen =document.createElement("h3")

const contenedorRentados=document.querySelector('.contenedorRentados')
const tituloRentados =document.createElement("h3")
const cotenedorBotones=document.querySelector('.contenedorBotones')



saldoRange.onchange=()=>{
    let valor= saldoRange.value
    textRange.value=valor
}


function formatoFecha1(date) {
    let d = new Date(date),
        mes = '' + (d.getMonth() + 1),
        dia = '' + d.getDate(),
        ano = d.getFullYear();

    if (mes.length < 2) 
        mes = '0' + mes;
    if (dia.length < 2) 
        dia = '0' + dia;

    return [ano, mes, dia].join('-');
}


function formatoFecha2(date){
    let d2 = date
    
    ano2 = parseInt(String(d2).substring(0, 4));
    mes2 = parseInt(String(d2).substring(5, 7));
    dia2 = parseInt(String(d2).substring(8, 10));

    return [dia2, mes2, ano2].join('/')
}


verificacionLS()

function verificacionLS(){
autosRentados==null? operadorTernario():ingresarUsuario()
}


function operadorTernario(){
    autosRentados=[]
    ingresarUsuario()
}

function ingresarUsuario(){
preguntaUsuario.innerHTML="Ingrese su nombre de usuario y defina su saldo"
btnUsuario.innerHTML="Crear"
contenedorUsuario.prepend(preguntaUsuario)
formUsuario.append(usuarioInput)
formUsuario.append(saldoRange)
formUsuario.append(textRange)
formUsuario.append(btnUsuario)

formUsuario.onsubmit = (e)=>{
    e.preventDefault()

    usuario= e.target.children[0].value
    saldo=e.target.children[1].value
    crearUsuario(usuario)

}

}

function crearUsuario(usuario){
    if(usuario!=""){
        contenedorUsuario.innerHTML=""
        limiarUsuario()
        mostrarAutos()  

    }else{
        Swal.fire('Debe ingresar un usuario.')
    }

}

function limiarUsuario(){

    cardContainer.innerHTML=""
    contenedorEntrega.innerHTML=""
    contenedorDevolucion.innerHTML=""
    contenedorResumen.innerHTML=""
    contenedorPago.innerHTML=""
} 


    function mostrarAutos() {
        limpiarAutos()
        fetchAutos()  
}


const fetchAutos =()=>{ 
    fetch("data/cars.json")
    .then((respuesta)=>{

        return respuesta.json()
    })
    .then((autos)=>{
        verAutos(autos)
        autosf=autos
        console.log(typeof autos)

    })
    .catch((error)=>{
        console.log(error)
    })

}


verAutos =(autos)=>{
    autos.forEach((auto) => {
        const{id,marca,modelo,precio,img}=auto
        
        const card = document.createElement('div');
        card.classList.add('card');

        const cardImage = document.createElement('img');
        cardImage.src = img;
        cardImage.classList.add('cardImage');

        const cardtitle = document.createElement('h3');
        cardtitle.textContent = `${marca} ${modelo}`;

        const cardText = document.createElement('p')
        cardText.textContent = `$${precio}/dia`

        const btnRentar = document.createElement('button');
        btnRentar.className = "cardButton";
        btnRentar.textContent = "Rentar";
        btnRentar.onclick = () => {
                                    rentarAuto(id)
                                    contenedorSegurosYAdicionales.innerHTML=""
                                    preguntaEntregaFuncion()
        }
        
        card.appendChild(cardImage);
        card.appendChild(cardtitle);
        card.appendChild(cardText)
        card.appendChild(btnRentar);
        cardContainer.appendChild(card);
    
    })
       
    }

    function limpiarAutos(){
        
        cardContainer.innerHTML=""
        contenedorEntrega.innerHTML=""
        contenedorDevolucion.innerHTML=""
        contenedorResumen.innerHTML=""
        contenedorPago.innerHTML=""
    } 
    
function rentarAuto(id1){
    autoSeleccionado.pop()
    seleccion = autosf.find(auto => auto.id == id1)
    autoSeleccionado.push(seleccion)
}

function preguntaEntregaFuncion(){
    limpiarEntrega()
    date1.value=""
    date1.setAttribute("type", "date")
    date1.setAttribute("min", `${fecha}`)
    contenedorEntrega.append(date1)

    preguntaEntrega.innerHTML=`Día de entrega del vehículo`
    contenedorEntrega.prepend(preguntaEntrega)
    
    date1.onchange =()=>{
        diaSeleccionadoEntrega.pop()//puede ser una variable simple
        let fecha1 =new Date(date1.value)
        diaSeleccionadoEntregaFormato2=formatoFecha2(date1.value)
        seleccion = fecha1.getTime()
        diaSeleccionadoEntrega.push(seleccion)
        preguntaDevolucionFuncion()
    }
}

function limpiarEntrega(){
    contenedorEntrega.innerHTML=""
    contenedorDevolucion.innerHTML=""
    contenedorSegurosYAdicionales.innerHTML=""
    contenedorResumen.innerHTML=""
    contenedorPago.innerHTML=""
} 

function preguntaDevolucionFuncion (){

    lipiarDevolucion()
    date2.value=""
    date2.setAttribute("type", "date")
    date2.setAttribute("min", `${fecha}`)
    contenedorDevolucion.append(date2)

    preguntaDevolucion.innerHTML=`Día de devolución del vehículo`
    contenedorDevolucion.prepend(preguntaDevolucion)

    date2.onchange =()=>{
        contenedorSegurosYAdicionales.innerHTML=""
        diaSeleccionadoDevolucion.pop()
        let fecha2O =new Date(date2.value)
        diaSeleccionadoDevolucionFormato2=formatoFecha2(date2.value)
        seleccion = fecha2O.getTime()
        diaSeleccionadoDevolucion.push(seleccion)


        diaDevolucion()
    }
}
function lipiarDevolucion(){

    contenedorDevolucion.innerHTML=""
    contenedorSegurosYAdicionales.innerHTML=""
    contenedorResumen.innerHTML=""
    contenedorPago.innerHTML=""

} 
function diaDevolucion(){

    const autoAlmacenado = JSON.parse(localStorage.getItem("usuario"));


if(diaSeleccionadoDevolucion[0]<(diaSeleccionadoEntrega[0])){
    Swal.fire('El día de entrega no puede ser menor que el día de devolución.<br>Seleccione nuevamente el dia de entrega.')
    preguntaEntregaFuncion()
}else{
    if(autoAlmacenado==null){
        segurosYAdicionales()
        preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion)
    }else{ 
        let filtroAuto= autoAlmacenado.filter((usuario)=>usuario.modelo==autoSeleccionado[0].modelo)
        let filtroDia = filtroAuto.filter((usuario)=>
        (usuario.diaSeleccionadoEntrega<=diaSeleccionadoEntrega[0])&&(diaSeleccionadoEntrega[0]<=usuario.diaSeleccionadoDevolucion)||
        (usuario.diaSeleccionadoEntrega<=diaSeleccionadoDevolucion[0])&&(diaSeleccionadoDevolucion[0]<=usuario.diaSeleccionadoDevolucion)
         )
        if(filtroDia.length==0){
            segurosYAdicionales()
            preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion) 
        }else{
            Swal.fire('El vehículo que desea alquilar ya esta alquilado en la fecha que usted selecciono. Puede elegir otro vehiculo o camiar la fecha.')
            mostrarAutos()         
        } 
    }
}
}

function segurosYAdicionales(){
    const seguros= document.createElement("div")
    const segurosTitulo = document.createElement('h3');
    segurosTitulo.textContent = `Seguros`;

    const contenedorReduccion = document.createElement("div")
    contenedorReduccion.className="contenedorSeguros"
    const coverturaReduccion = document.createElement("h4")
    coverturaReduccion.textContent=`Cobertura Reducción - Cobertura que reduce 100% la franquicia por daños de colisión - $2000/dia`
    const checkboxReduccion = document.createElement("input")
    checkboxReduccion.setAttribute("type", "checkbox")
    checkboxReduccion.className="checkbox"
 
    const contenedorIntegral = document.createElement("div")
    contenedorIntegral.className="contenedorSeguros"
    const coverturaIntegral = document.createElement("h4")
    coverturaIntegral.textContent=`Cobertura Integral - Reduce 100% la franquicia por daños de colisión y vuelco - $3000/dia`
    const checkboxIntegral = document.createElement("input")
    checkboxIntegral.setAttribute("type", "checkbox")
    checkboxIntegral.className="checkbox"

    const adicionales=document.createElement("div")
    const adicionalesTitulo = document.createElement('h3');
    adicionalesTitulo.textContent = `Adicionales`;

    const contenedorAeropuerto = document.createElement("div")
    contenedorAeropuerto.className="contenedorAdicionales"
    const aeropuerto = document.createElement("h4")
    aeropuerto.textContent=`Cargo de Aeropuerto - Cargo por retiro o devolución en Aeropuerto - $2500/reserva`
    const checkboxAeropuerto = document.createElement("input")
    checkboxAeropuerto.setAttribute("type", "checkbox")
    checkboxAeropuerto.className="checkbox"

    const contenedorBebe = document.createElement("div")
    contenedorBebe.className="contenedorAdicionales"
    const bebe = document.createElement("h4")
    bebe.textContent=`Silla para bebés - Silla especial para bebés entre 1 y 3 años - $500/dia`
    const numberBebe = document.createElement("input")
    numberBebe.setAttribute("type", "number")
    numberBebe.setAttribute("min", "0")
    numberBebe.setAttribute("max", "3")
    numberBebe.setAttribute("placeholder", "0")
    numberBebe.className="number"

    const contenedorGPS = document.createElement("div")
    contenedorGPS.className="contenedorAdicionales"
    const GPS = document.createElement("h4")
    GPS.textContent=`GPS - Sistema de navegación para vehículos - $600/dia`
    const checkboxGPS = document.createElement("input")
    checkboxGPS.setAttribute("type", "checkbox")
    checkboxGPS.className="checkbox"

    const contenedorJoven = document.createElement("div")
    contenedorJoven.className="contenedorAdicionales"
    const joven = document.createElement("h4")
    joven.textContent=`Conductor Joven - Conductor de entre 18 y 20 años, apto para conducir - $1100/dia`
    const numberJoven = document.createElement("input")
    numberJoven.setAttribute("type", "number")
    numberJoven.setAttribute("type", "number")
    numberJoven.setAttribute("min", "0")
    numberJoven.setAttribute("max", "5")
    numberJoven.setAttribute("placeholder", "0")
    numberJoven.className="number"

    const contenedorConductorAdicional = document.createElement("div")
    contenedorConductorAdicional.className="contenedorAdicionales"
    const conductorAdicional = document.createElement("h4")
    conductorAdicional.textContent=`Conductor adicional - Persona autorizada para conducir el vehículo aparte del conductor principal - $330/dia`
    const numberConductorAdicional = document.createElement("input")
    numberConductorAdicional.setAttribute("type", "number")
    numberConductorAdicional.setAttribute("min", "0")
    numberConductorAdicional.setAttribute("max", "4")
    numberConductorAdicional.setAttribute("placeholder", "0")
    numberConductorAdicional.className="number"

    const contenedorBooster = document.createElement("div")
    contenedorBooster.className="contenedorAdicionales"
    const booster = document.createElement("h4")
    booster.textContent=`Booster(4-10 años) - Silla especial para niños de 4 a 10 años - $600/dia`
    const numberBooster = document.createElement("input")
    numberBooster.setAttribute("type", "number")
    numberBooster.setAttribute("min", "0")
    numberBooster.setAttribute("max", "4")
    numberBooster.setAttribute("placeholder", "0")
    numberBooster.className="number"

    contenedorSegurosYAdicionales.append(seguros)
    seguros.append(segurosTitulo)
    seguros.append(contenedorReduccion)
    contenedorReduccion.append(coverturaReduccion)
    contenedorReduccion.prepend(checkboxReduccion)
    seguros.append(contenedorIntegral)
    contenedorIntegral.append(coverturaIntegral)
    contenedorIntegral.prepend(checkboxIntegral)
    contenedorSegurosYAdicionales.append(adicionales)
    adicionales.append(adicionalesTitulo)
    adicionales.append(contenedorAeropuerto)
    contenedorAeropuerto.append(aeropuerto)
    contenedorAeropuerto.prepend(checkboxAeropuerto)
    adicionales.append(contenedorBebe)
    contenedorBebe.append(bebe)
    contenedorBebe.prepend(numberBebe)
    adicionales.append(contenedorGPS)
    contenedorGPS.append(GPS)
    contenedorGPS.prepend(checkboxGPS)
    adicionales.append(contenedorJoven)
    contenedorJoven.append(joven)
    contenedorJoven.prepend(numberJoven)
    adicionales.append(contenedorConductorAdicional)
    contenedorConductorAdicional.append(conductorAdicional)
    contenedorConductorAdicional.prepend(numberConductorAdicional)
    adicionales.append(contenedorBooster)
    contenedorBooster.append(booster)
    contenedorBooster.prepend(numberBooster)
    

    checkboxReduccion.onchange=()=>{
        valorReduccion = checkboxReduccion.checked
        valorReduccion==true?costoReduccion=2000:costoReduccion=0
        preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion, costoReduccion)
    }
    checkboxIntegral.onchange=()=>{
        valorIntegral=checkboxIntegral.checked
        valorIntegral==true?costoIntegral=3000:costoIntegral=0
        preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion, costoReduccion)
    }
    checkboxAeropuerto.onchange=()=>{
        valorAeropuerto=checkboxAeropuerto.checked
        valorAeropuerto==true?costoAeropuerto=2500:costoAeropuerto=0
        preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion, costoReduccion)
    }
    numberBebe.onchange=()=>{
        costoBebe =numberBebe.value*500
        preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion, costoReduccion)
    }
    checkboxGPS.onchange=()=>{
        valorGPS=checkboxGPS.checked
        valorGPS==true?costoGPS=600:costoGPS=0
        preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion, costoReduccion)
    }
    numberJoven.onchange=()=>{
        costoJoven =numberJoven.value*1100
        preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion, costoReduccion)
    }
    numberConductorAdicional.onchange=()=>{
        costoConductorAdicional =numberConductorAdicional.value*330
        preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion, costoReduccion)
    }
    numberBooster.onchange=()=>{
        costoBooster =numberBooster.value*600
        preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion, costoReduccion)
    }
}



function preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion){
    limpiarPagar()
 
    if((diaSeleccionadoDevolucion[0]-diaSeleccionadoEntrega[0])==0){
        

        let totalDias = 1
        costosAdicionales = totalDias*(costoReduccion + costoIntegral + costoBebe  + costoGPS  + costoJoven + costoConductorAdicional + costoBooster) + costoAeropuerto
        let totalPrecio= totalDias*autoSeleccionado[0].precio +costosAdicionales

    preguntaPago.innerHTML=`El costo por alquilar el ${autoSeleccionado[0].marca} ${autoSeleccionado[0].modelo} por 1 día es de $${totalPrecio} <br>Usted dispone de un saldo de $${saldo}<br>¿Desea abonarlo?`
    contenedorPago.prepend(preguntaPago)
    botonPagar(totalPrecio)
    }else{

        let totalDias = (diaSeleccionadoDevolucion[0]-diaSeleccionadoEntrega[0])/(1000*60*60*24)
        costosAdicionales = totalDias*(costoReduccion + costoIntegral + costoBebe  + costoGPS  + costoJoven + costoConductorAdicional + costoBooster) + costoAeropuerto
        let totalPrecio= totalDias*autoSeleccionado[0].precio+costosAdicionales

    
        preguntaPago.innerHTML=`El costo por alquilar el ${autoSeleccionado[0].marca} ${autoSeleccionado[0].modelo} por ${totalDias} días es de $${totalPrecio} <br>Usted dispone de un saldo de $${saldo}<br>¿Desea abonarlo?`
        contenedorPago.prepend(preguntaPago)
        botonPagar(totalPrecio)
    }
    
}

 function limpiarPagar(){
    contenedorResumen.innerHTML=""
    contenedorPago.innerHTML=""
}  


function botonPagar(totalPrecio){

    contenedorPago.append(contenedorBotonPagar)
    btnPagar.innerHTML=`Pagar`
    contenedorBotonPagar.append(btnPagar)
    btnPagar.onclick=()=>{
        resumenFuncion(totalPrecio)
    }
}

function resumenFuncion(totalPrecio){
    if (totalPrecio<=saldo){
        limpiarResumen()
        saldo -=totalPrecio
        Swal.fire({
            icon: 'success',
            title: 'El pago se realizó con éxito, gracias por confiar en nosotros!',
          })
        contenedorResumen.appendChild(resumen)
        autosRentados.push(new Autorentado(diaSeleccionadoEntrega[0],diaSeleccionadoDevolucion[0],diaSeleccionadoEntregaFormato2,diaSeleccionadoDevolucionFormato2,usuario,saldo,autoSeleccionado[0].marca, autoSeleccionado[0].modelo))
        localStorage.setItem('usuario', JSON.stringify(autosRentados))
        saldo=""
        mostrarRentados()
        mostrarBotones()
    }else if(totalPrecio>saldo){
        Swal.fire('Saldo insuficiente')
    }else{
        Swal.fire('Error')
    }
}
 function limpiarResumen(){
    contenedorSegurosYAdicionales.innerHTML=""
    cardContainer.innerHTML=""
    contenedorEntrega.innerHTML=""
    contenedorDevolucion.innerHTML=""
    contenedorPago.innerHTML=""
} 
 

function mostrarRentados(){

    for(const auto of autosRentados){
        const mostrarRentado= document.createElement("h3")
        mostrarRentado.innerText=`El usuario ${auto.usuario} rentó el ${auto.marca} ${auto.modelo} desde el ${auto.diaSeleccionadoEntregaFormato2} hasta el ${auto.diaSeleccionadoDevolucionFormato2}`
        contenedorRentados.prepend(mostrarRentado)
    }
}

function mostrarBotones(){
    const reiniciar= document.createElement("button")
    reiniciar.innerHTML="Reiniciar"
    cotenedorBotones.append(reiniciar)

    reiniciar.onclick=()=>{
        location.reload()
    }

    const borrarRegistro= document.createElement("button")
    borrarRegistro.innerHTML=`Borrar registro`
    cotenedorBotones.append(borrarRegistro)

    borrarRegistro.onclick=()=>{
        localStorage.clear()
        contenedorRentados.innerHTML=""

    }
}

































/* 
let fecha=formatoFecha1(new Date())


let costoReduccion=0
let costoIntegral=0
let costoAeropuerto=0
let costoBebe=0
let costoGPS=0
let costoJoven=0
let costoConductorAdicional=0
let costoBooster=0
let costosAdicionales=0
let fecha1=0
let fecha2=0

const autos=[]
const autoSeleccionado=[]
const dias=[]
const diaSeleccionadoEntrega=[]
const diaSeleccionadoDevolucion=[]
let diaSeleccionadoEntregaFormato2=""
let diaSeleccionadoDevolucionFormato2=""
let autosRentados=[]
autosRentados=JSON.parse(localStorage.getItem("usuario"))

let usuarioNuevo = {
    usuario: "",
    saldo: ""
}

let{usuario,saldo}=usuarioNuevo

class Auto{
    constructor(marca, modelo, precio, img) {
        this.id=autos.length
        this.marca=marca
        this.modelo=modelo
        this.precio=precio
        this.img=img
    }
}
autos.push(new Auto ("Fiat", "Cronos", 5000, "https://www.autoweb.com.ar/wp-content/uploads/2021/08/cronos-1.8.jpg"))
autos.push(new Auto ("Chevrolet", "Onix", 6000, "https://www.megautos.com/wp-content/uploads/2019/11/Nuevo-Onix-Hatch-dinamica.jpg"))
autos.push(new Auto("Ford", "Raptor", 10000, "https://www.autoaubaine.com/special/images/dossier/Ford_F_150_Raptor.jpg")) 


class Autorentado{
    constructor( diaSeleccionadoEntrega,diaSeleccionadoDevolucion,diaSeleccionadoEntregaFormato2,diaSeleccionadoDevolucionFormato2, usuario,saldo,marca,modelo){
        this.diaSeleccionadoEntrega=diaSeleccionadoEntrega
        this.diaSeleccionadoDevolucion=diaSeleccionadoDevolucion
        this.diaSeleccionadoEntregaFormato2=diaSeleccionadoEntregaFormato2
        this.diaSeleccionadoDevolucionFormato2= diaSeleccionadoDevolucionFormato2
        this.usuario=usuario
        this.saldo=saldo
        this.marca=marca
        this.modelo=modelo
    }
    
}

const contenedorUsuario =document.querySelector('.contenedorUsuario')
const preguntaUsuario=document.createElement('h3')
const formUsuario=document.querySelector('.formUsuario')
const usuarioInput=document.createElement("input")
const saldoRange=document.querySelector('#saldo')
const textRange=document.querySelector('#textRange')
const btnUsuario=document.createElement("button")

const cardContainer = document.querySelector('.cardContainer');
const contenedorEntrega = document.querySelector('.contenedorEntrega')
const date1=document.createElement("input")
const preguntaEntrega=document.createElement("h3")

const contenedorDevolucion=document.querySelector('.contenedorDevolucion')
const date2=document.createElement("input")
const preguntaDevolucion=document.createElement("h3")

const contenedorPago = document.querySelector('.contenedorPago')
const contenedorBotonPagar =document.querySelector('.contenedorBotonPagar')
const preguntaPago = document.createElement("h3")
const btnPagar =document.createElement("button")

const contenedorSegurosYAdicionales=document.querySelector('.contenedorSegurosYAdicionales')

const contenedorResumen=document.querySelector('.contenedorResumen')
const resumen =document.createElement("h3")

const contenedorRentados=document.querySelector('.contenedorRentados')
const tituloRentados =document.createElement("h3")
const cotenedorBotones=document.querySelector('.contenedorBotones')

saldoRange.onchange=()=>{
    let valor= saldoRange.value
    textRange.value=valor
}


function formatoFecha1(date) {
    let d = new Date(date),
        mes = '' + (d.getMonth() + 1),
        dia = '' + d.getDate(),
        ano = d.getFullYear();

    if (mes.length < 2) 
        mes = '0' + mes;
    if (dia.length < 2) 
        dia = '0' + dia;

    return [ano, mes, dia].join('-');
}


function formatoFecha2(date){
    let d2 = date
    
    ano2 = parseInt(String(d2).substring(0, 4));
    mes2 = parseInt(String(d2).substring(5, 7));
    dia2 = parseInt(String(d2).substring(8, 10));

    return [dia2, mes2, ano2].join('/')
}


verificacionLS()

function verificacionLS(){
autosRentados==null? operadorTernario():ingresarUsuario()
}


function operadorTernario(){
    autosRentados=[]
    ingresarUsuario()
}

function ingresarUsuario(){
preguntaUsuario.innerHTML="Ingrese su nombre de usuario y defina su saldo"
btnUsuario.innerHTML="Crear"
contenedorUsuario.prepend(preguntaUsuario)
formUsuario.append(usuarioInput)
formUsuario.append(saldoRange)
formUsuario.append(textRange)
formUsuario.append(btnUsuario)

formUsuario.onsubmit = (e)=>{
    e.preventDefault()

    usuario= e.target.children[0].value
    saldo=e.target.children[1].value
    crearUsuario(usuario)

}

}

function crearUsuario(usuario){
    if(usuario!=""){
        contenedorUsuario.innerHTML=""
        limiarUsuario()
        mostrarAutos()  

    }else{
        Swal.fire('Debe ingresar un usuario.')
    }

}

function limiarUsuario(){

    cardContainer.innerHTML=""
    contenedorEntrega.innerHTML=""
    contenedorDevolucion.innerHTML=""
    contenedorResumen.innerHTML=""
    contenedorPago.innerHTML=""
} 


    function mostrarAutos() {
        limpiarAutos()
        autos.forEach(auto => {

            const card = document.createElement('div');
            card.classList.add('card');
    
            const cardImage = document.createElement('img');
            cardImage.src = auto.img;
            cardImage.classList.add('cardImage');
    
            const cardtitle = document.createElement('h3');
            cardtitle.textContent = `${auto.marca} ${auto.modelo}`;

            const cardText = document.createElement('p')
            cardText.textContent = `$${auto.precio}/dia`
    
            const btnRentar = document.createElement('button');
            btnRentar.className = "cardButton";
            btnRentar.textContent = "Rentar";
            btnRentar.onclick = () => {
                                        rentarAuto(auto.id)
                                        contenedorSegurosYAdicionales.innerHTML=""
                                        preguntaEntregaFuncion()  

                                        
            };
    
            card.appendChild(cardImage);
            card.appendChild(cardtitle);
            card.appendChild(cardText)
            card.appendChild(btnRentar);
            
            cardContainer.appendChild(card);
        })
    }

    function limpiarAutos(){
        
        cardContainer.innerHTML=""
        contenedorEntrega.innerHTML=""
        contenedorDevolucion.innerHTML=""
        contenedorResumen.innerHTML=""
        contenedorPago.innerHTML=""
    } 
    
function rentarAuto(id){
    autoSeleccionado.pop()
    const seleccion = autos.find(auto => auto.id == id)
    autoSeleccionado.push(seleccion)

}

function preguntaEntregaFuncion(){
    limpiarEntrega()
    date1.value=""
    date1.setAttribute("type", "date")
    date1.setAttribute("min", `${fecha}`)
    contenedorEntrega.append(date1)

    preguntaEntrega.innerHTML=`Día de entrega del vehículo`
    contenedorEntrega.prepend(preguntaEntrega)
    
    date1.onchange =()=>{
        diaSeleccionadoEntrega.pop()//puede ser una variable simple
        let fecha1 =new Date(date1.value)
        diaSeleccionadoEntregaFormato2=formatoFecha2(date1.value)
        seleccion = fecha1.getTime()
        diaSeleccionadoEntrega.push(seleccion)
        preguntaDevolucionFuncion()
    }
}

function limpiarEntrega(){
    contenedorEntrega.innerHTML=""
    contenedorDevolucion.innerHTML=""
    contenedorSegurosYAdicionales.innerHTML=""
    contenedorResumen.innerHTML=""
    contenedorPago.innerHTML=""
} 

function preguntaDevolucionFuncion (){

    lipiarDevolucion()
    date2.value=""
    date2.setAttribute("type", "date")
    date2.setAttribute("min", `${fecha}`)
    contenedorDevolucion.append(date2)

    preguntaDevolucion.innerHTML=`Día de devolución del vehículo`
    contenedorDevolucion.prepend(preguntaDevolucion)

    date2.onchange =()=>{
        contenedorSegurosYAdicionales.innerHTML=""
        diaSeleccionadoDevolucion.pop()
        let fecha2O =new Date(date2.value)
        diaSeleccionadoDevolucionFormato2=formatoFecha2(date2.value)
        seleccion = fecha2O.getTime()
        diaSeleccionadoDevolucion.push(seleccion)


        diaDevolucion()
    }
}
function lipiarDevolucion(){

    contenedorDevolucion.innerHTML=""
    contenedorSegurosYAdicionales.innerHTML=""
    contenedorResumen.innerHTML=""
    contenedorPago.innerHTML=""

} 
function diaDevolucion(){

    const autoAlmacenado = JSON.parse(localStorage.getItem("usuario"));


if(diaSeleccionadoDevolucion[0]<(diaSeleccionadoEntrega[0])){
    Swal.fire('El día de entrega no puede ser menor que el día de devolución.<br>Seleccione nuevamente el dia de entrega.')
    preguntaEntregaFuncion()
}else{
    if(autoAlmacenado==null){
        segurosYAdicionales()
        preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion)
    }else{ 
        let filtroAuto= autoAlmacenado.filter((usuario)=>usuario.modelo==autoSeleccionado[0].modelo)
        let filtroDia = filtroAuto.filter((usuario)=>
        (usuario.diaSeleccionadoEntrega<=diaSeleccionadoEntrega[0])&&(diaSeleccionadoEntrega[0]<=usuario.diaSeleccionadoDevolucion)||
        (usuario.diaSeleccionadoEntrega<=diaSeleccionadoDevolucion[0])&&(diaSeleccionadoDevolucion[0]<=usuario.diaSeleccionadoDevolucion)
         )
        if(filtroDia.length==0){
            segurosYAdicionales()
            preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion) 
        }else{
            Swal.fire('El vehículo que desea alquilar ya esta alquilado en la fecha que usted selecciono. Puede elegir otro vehiculo o camiar la fecha.')
            mostrarAutos()         
        } 
    }
}
}

function segurosYAdicionales(){
    const seguros= document.createElement("div")
    const segurosTitulo = document.createElement('h3');
    segurosTitulo.textContent = `Seguros`;

    const contenedorReduccion = document.createElement("div")
    contenedorReduccion.className="contenedorSeguros"
    const coverturaReduccion = document.createElement("h4")
    coverturaReduccion.textContent=`Cobertura Reducción - Cobertura que reduce 100% la franquicia por daños de colisión - $2000/dia`
    const checkboxReduccion = document.createElement("input")
    checkboxReduccion.setAttribute("type", "checkbox")
    checkboxReduccion.className="checkbox"
 
    const contenedorIntegral = document.createElement("div")
    contenedorIntegral.className="contenedorSeguros"
    const coverturaIntegral = document.createElement("h4")
    coverturaIntegral.textContent=`Cobertura Integral - Reduce 100% la franquicia por daños de colisión y vuelco - $3000/dia`
    const checkboxIntegral = document.createElement("input")
    checkboxIntegral.setAttribute("type", "checkbox")
    checkboxIntegral.className="checkbox"

    const adicionales=document.createElement("div")
    const adicionalesTitulo = document.createElement('h3');
    adicionalesTitulo.textContent = `Adicionales`;

    const contenedorAeropuerto = document.createElement("div")
    contenedorAeropuerto.className="contenedorAdicionales"
    const aeropuerto = document.createElement("h4")
    aeropuerto.textContent=`Cargo de Aeropuerto - Cargo por retiro o devolución en Aeropuerto - $2500/reserva`
    const checkboxAeropuerto = document.createElement("input")
    checkboxAeropuerto.setAttribute("type", "checkbox")
    checkboxAeropuerto.className="checkbox"

    const contenedorBebe = document.createElement("div")
    contenedorBebe.className="contenedorAdicionales"
    const bebe = document.createElement("h4")
    bebe.textContent=`Silla para bebés - Silla especial para bebés entre 1 y 3 años - $500/dia`
    const numberBebe = document.createElement("input")
    numberBebe.setAttribute("type", "number")
    numberBebe.setAttribute("min", "0")
    numberBebe.setAttribute("max", "3")
    numberBebe.setAttribute("placeholder", "0")
    numberBebe.className="number"

    const contenedorGPS = document.createElement("div")
    contenedorGPS.className="contenedorAdicionales"
    const GPS = document.createElement("h4")
    GPS.textContent=`GPS - Sistema de navegación para vehículos - $600/dia`
    const checkboxGPS = document.createElement("input")
    checkboxGPS.setAttribute("type", "checkbox")
    checkboxGPS.className="checkbox"

    const contenedorJoven = document.createElement("div")
    contenedorJoven.className="contenedorAdicionales"
    const joven = document.createElement("h4")
    joven.textContent=`Conductor Joven - Conductor de entre 18 y 20 años, apto para conducir - $1100/dia`
    const numberJoven = document.createElement("input")
    numberJoven.setAttribute("type", "number")
    numberJoven.setAttribute("type", "number")
    numberJoven.setAttribute("min", "0")
    numberJoven.setAttribute("max", "5")
    numberJoven.setAttribute("placeholder", "0")
    numberJoven.className="number"

    const contenedorConductorAdicional = document.createElement("div")
    contenedorConductorAdicional.className="contenedorAdicionales"
    const conductorAdicional = document.createElement("h4")
    conductorAdicional.textContent=`Conductor adicional - Persona autorizada para conducir el vehículo aparte del conductor principal - $330/dia`
    const numberConductorAdicional = document.createElement("input")
    numberConductorAdicional.setAttribute("type", "number")
    numberConductorAdicional.setAttribute("min", "0")
    numberConductorAdicional.setAttribute("max", "4")
    numberConductorAdicional.setAttribute("placeholder", "0")
    numberConductorAdicional.className="number"

    const contenedorBooster = document.createElement("div")
    contenedorBooster.className="contenedorAdicionales"
    const booster = document.createElement("h4")
    booster.textContent=`Booster(4-10 años) - Silla especial para niños de 4 a 10 años - $600/dia`
    const numberBooster = document.createElement("input")
    numberBooster.setAttribute("type", "number")
    numberBooster.setAttribute("min", "0")
    numberBooster.setAttribute("max", "4")
    numberBooster.setAttribute("placeholder", "0")
    numberBooster.className="number"

    contenedorSegurosYAdicionales.append(seguros)
    seguros.append(segurosTitulo)
    seguros.append(contenedorReduccion)
    contenedorReduccion.append(coverturaReduccion)
    contenedorReduccion.prepend(checkboxReduccion)
    seguros.append(contenedorIntegral)
    contenedorIntegral.append(coverturaIntegral)
    contenedorIntegral.prepend(checkboxIntegral)
    contenedorSegurosYAdicionales.append(adicionales)
    adicionales.append(adicionalesTitulo)
    adicionales.append(contenedorAeropuerto)
    contenedorAeropuerto.append(aeropuerto)
    contenedorAeropuerto.prepend(checkboxAeropuerto)
    adicionales.append(contenedorBebe)
    contenedorBebe.append(bebe)
    contenedorBebe.prepend(numberBebe)
    adicionales.append(contenedorGPS)
    contenedorGPS.append(GPS)
    contenedorGPS.prepend(checkboxGPS)
    adicionales.append(contenedorJoven)
    contenedorJoven.append(joven)
    contenedorJoven.prepend(numberJoven)
    adicionales.append(contenedorConductorAdicional)
    contenedorConductorAdicional.append(conductorAdicional)
    contenedorConductorAdicional.prepend(numberConductorAdicional)
    adicionales.append(contenedorBooster)
    contenedorBooster.append(booster)
    contenedorBooster.prepend(numberBooster)
    

    checkboxReduccion.onchange=()=>{
        valorReduccion = checkboxReduccion.checked
        valorReduccion==true?costoReduccion=2000:costoReduccion=0
        preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion, costoReduccion)
    }
    checkboxIntegral.onchange=()=>{
        valorIntegral=checkboxIntegral.checked
        valorIntegral==true?costoIntegral=3000:costoIntegral=0
        preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion, costoReduccion)
    }
    checkboxAeropuerto.onchange=()=>{
        valorAeropuerto=checkboxAeropuerto.checked
        valorAeropuerto==true?costoAeropuerto=2500:costoAeropuerto=0
        preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion, costoReduccion)
    }
    numberBebe.onchange=()=>{
        costoBebe =numberBebe.value*500
        preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion, costoReduccion)
    }
    checkboxGPS.onchange=()=>{
        valorGPS=checkboxGPS.checked
        valorGPS==true?costoGPS=600:costoGPS=0
        preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion, costoReduccion)
    }
    numberJoven.onchange=()=>{
        costoJoven =numberJoven.value*1100
        preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion, costoReduccion)
    }
    numberConductorAdicional.onchange=()=>{
        costoConductorAdicional =numberConductorAdicional.value*330
        preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion, costoReduccion)
    }
    numberBooster.onchange=()=>{
        costoBooster =numberBooster.value*600
        preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion, costoReduccion)
    }
}



function preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion){
    limpiarPagar()
 
    if((diaSeleccionadoDevolucion[0]-diaSeleccionadoEntrega[0])==0){
        

        let totalDias = 1
        costosAdicionales = totalDias*(costoReduccion + costoIntegral + costoBebe  + costoGPS  + costoJoven + costoConductorAdicional + costoBooster) + costoAeropuerto
        let totalPrecio= totalDias*autoSeleccionado[0].precio +costosAdicionales

    preguntaPago.innerHTML=`El costo por alquilar el ${autoSeleccionado[0].marca} ${autoSeleccionado[0].modelo} por 1 día es de $${totalPrecio} <br>Usted dispone de un saldo de $${saldo}<br>¿Desea abonarlo?`
    contenedorPago.prepend(preguntaPago)
    botonPagar(totalPrecio)
    }else{

        let totalDias = (diaSeleccionadoDevolucion[0]-diaSeleccionadoEntrega[0])/(1000*60*60*24)
        costosAdicionales = totalDias*(costoReduccion + costoIntegral + costoBebe  + costoGPS  + costoJoven + costoConductorAdicional + costoBooster) + costoAeropuerto
        let totalPrecio= totalDias*autoSeleccionado[0].precio+costosAdicionales

    
        preguntaPago.innerHTML=`El costo por alquilar el ${autoSeleccionado[0].marca} ${autoSeleccionado[0].modelo} por ${totalDias} días es de $${totalPrecio} <br>Usted dispone de un saldo de $${saldo}<br>¿Desea abonarlo?`
        contenedorPago.prepend(preguntaPago)
        botonPagar(totalPrecio)
    }
    
}

 function limpiarPagar(){
    contenedorResumen.innerHTML=""
    contenedorPago.innerHTML=""
}  


function botonPagar(totalPrecio){

    contenedorPago.append(contenedorBotonPagar)
    btnPagar.innerHTML=`Pagar`
    contenedorBotonPagar.append(btnPagar)
    btnPagar.onclick=()=>{
        resumenFuncion(totalPrecio)
    }
}

function resumenFuncion(totalPrecio){
    if (totalPrecio<=saldo){
        limpiarResumen()
        saldo -=totalPrecio
        Swal.fire({
            icon: 'success',
            title: 'El pago se realizó con éxito, gracias por confiar en nosotros!',
          })
        contenedorResumen.appendChild(resumen)
        autosRentados.push(new Autorentado(diaSeleccionadoEntrega[0],diaSeleccionadoDevolucion[0],diaSeleccionadoEntregaFormato2,diaSeleccionadoDevolucionFormato2,usuario,saldo,autoSeleccionado[0].marca, autoSeleccionado[0].modelo))
        localStorage.setItem('usuario', JSON.stringify(autosRentados))
        saldo=""
        mostrarRentados()
        mostrarBotones()
    }else if(totalPrecio>saldo){
        Swal.fire('Saldo insuficiente')
    }else{
        Swal.fire('Error')
    }
}
 function limpiarResumen(){
    contenedorSegurosYAdicionales.innerHTML=""
    cardContainer.innerHTML=""
    contenedorEntrega.innerHTML=""
    contenedorDevolucion.innerHTML=""
    contenedorPago.innerHTML=""
} 
 

function mostrarRentados(){

    for(const auto of autosRentados){
        const mostrarRentado= document.createElement("h3")
        mostrarRentado.innerText=`El usuario ${auto.usuario} rentó el ${auto.marca} ${auto.modelo} desde el ${auto.diaSeleccionadoEntregaFormato2} hasta el ${auto.diaSeleccionadoDevolucionFormato2}`
        contenedorRentados.prepend(mostrarRentado)
    }
}

function mostrarBotones(){
    const reiniciar= document.createElement("button")
    reiniciar.innerHTML="Reiniciar"
    cotenedorBotones.append(reiniciar)

    reiniciar.onclick=()=>{
        location.reload()
    }

    const borrarRegistro= document.createElement("button")
    borrarRegistro.innerHTML=`Borrar registro`
    cotenedorBotones.append(borrarRegistro)

    borrarRegistro.onclick=()=>{
        localStorage.clear()
        contenedorRentados.innerHTML=""

    }
}



*/