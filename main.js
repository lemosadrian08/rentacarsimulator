
const autos=[]
const autoSeleccionado=[]
const dias=[]
const diaSeleccionadoEntrega=[]
const diaSeleccionadoDevolucion=[]

let autosRentados=[]
autosRentados=JSON.parse(localStorage.getItem("usuario"))

let usuarioNuevo = {
    usuario: "",
    saldo: ""
}
//DESESTRUCTURACIÓN
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
autos.push(new Auto ("Fiat", "Cronos", 5000, "../Simulador/img/cronos.jpg"))
autos.push(new Auto ("Chevrolet", "Onix", 6000, "../Simulador/img/onix.jpg"))
autos.push(new Auto("Ford", "Raptor", 10000, "../Simulador/img/raptor.jpg")) 

class Dia{
    constructor(dia) {
        this.id=dias.length
        this.dia=dia
    }
}


dias.push(new Dia ("Lunes"))
dias.push(new Dia ("Martes"))
dias.push(new Dia ("Miercoles"))
dias.push(new Dia ("Jueves"))
dias.push(new Dia ("Viernes"))
dias.push(new Dia ("Sabado"))
dias.push(new Dia ("Domingo"))


class Autorentado{
    constructor( diaSeleccionadoEntrega,diaSeleccionadoDevolucion,usuario,saldo, modelo){
        this.diaSeleccionadoEntrega=diaSeleccionadoEntrega
        this.diaSeleccionadoDevolucion=diaSeleccionadoDevolucion
        this.usuario=usuario
        this.saldo=saldo
        this.modelo=modelo

    }
    
}

const contenedorUsuario =document.querySelector('.contenedorUsuario')
const preguntaUsuario=document.createElement('h3')
const formUsuario=document.querySelector('.formUsuario')
const usuarioInput=document.createElement("input")
const saldoRange=document.querySelector('#saldo')
const btnUsuario=document.createElement("button")

const cardContainer = document.querySelector('.cardContainer');
const contenedorEntrega = document.querySelector('.contenedorEntrega')
const contenedorDiasEntrega = document.querySelector('.contenedorDiasEntrega')
const preguntaEntrega=document.createElement("h3")
const respuestaEntrega = document.createElement("h3")

const contenedorDevolucion=document.querySelector('.contenedorDevolucion')
const contenedorDiasDevolucion = document.querySelector('.contenedorDiasDevolucion')
const preguntaDevolucion=document.createElement("h3")
const respuestaDevolucion = document.createElement("h3")

const contenedorPago = document.querySelector('.contenedorPago')
const contenedorBotonPagar =document.querySelector('.contenedorBotonPagar')
const preguntaPago = document.createElement("h3")
const btnPagar =document.createElement("button")


const contenedorResumen=document.querySelector('.contenedorResumen')
const resumen =document.createElement("h3")


verificacionLS()

function verificacionLS(){
//OPERADOR TERNARIO
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
formUsuario.append(btnUsuario)

formUsuario.onsubmit = (e)=>{
    e.preventDefault()

    usuario= e.target.children[0].value
    saldo=e.target.children[1].value
    crearUsuario(usuario)
    contenedorUsuario.innerHTML=""
}

}

function crearUsuario(usuario){
    if(usuario!=""){
        limiarUsuario()
        mostrarAutos()  
    }else{
        alert("por favor ingrese un usuario")
        verificacionLS()
    }

}

function limiarUsuario(){
    cardContainer.innerHTML=""
    contenedorDiasEntrega.innerHTML=""
    contenedorEntrega.innerHTML=""
    contenedorDiasDevolucion.innerHTML=""
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
        contenedorDiasEntrega.innerHTML=""
        contenedorEntrega.innerHTML=""
        contenedorDiasDevolucion.innerHTML=""
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
    contenedorEntrega.append(contenedorDiasEntrega)
    preguntaEntrega.innerHTML=`Seleccione el dia de entrega del auto`
    contenedorEntrega.prepend(preguntaEntrega)

    for (const dia of dias){
        const btnSeleccionDiaEntrega = document.createElement("button")
        btnSeleccionDiaEntrega.innerHTML=`${dia.dia}`
        contenedorDiasEntrega.appendChild(btnSeleccionDiaEntrega)
        btnSeleccionDiaEntrega.onclick= ()=>{
            diaEntrega(dia.id)
    }
    }
}
 function limpiarEntrega(){
    contenedorDiasEntrega.innerHTML=""
    contenedorEntrega.innerHTML=""
    contenedorDiasDevolucion.innerHTML=""
    contenedorDevolucion.innerHTML=""
    contenedorResumen.innerHTML=""
    contenedorPago.innerHTML=""
} 

function diaEntrega(id){
    diaSeleccionadoEntrega.pop()
    const seleccion = dias.find(dia=> dia.id ==id)
    diaSeleccionadoEntrega.push(seleccion)
    respuestaEntregaFuncion(autoSeleccionado,diaSeleccionadoEntrega)
}

function respuestaEntregaFuncion(autoSeleccionado,diaSeleccionadoEntrega){

    respuestaEntrega.innerHTML= `Le entregaremos el ${autoSeleccionado[0].marca} ${autoSeleccionado[0].modelo} el dia ${diaSeleccionadoEntrega[0].dia}`
    contenedorEntrega.append(respuestaEntrega)
    preguntaDevolucionFuncion()
}

function preguntaDevolucionFuncion (){

    lipiarDevolucion()
    contenedorDevolucion.append(contenedorDiasDevolucion)

    preguntaDevolucion.innerHTML=`Seleccione el dia que usted devolvera el auto`
    contenedorDevolucion.prepend(preguntaDevolucion)

    for (const dia of dias){
        const btnSeleccionDiaDevolucion = document.createElement("button")
        btnSeleccionDiaDevolucion.innerHTML=`${dia.dia}`
        contenedorDiasDevolucion.append(btnSeleccionDiaDevolucion)
        btnSeleccionDiaDevolucion.onclick= ()=>{
        diaDevolucion(dia.id)
        }
    }

}

function lipiarDevolucion(){
    contenedorDiasDevolucion.innerHTML=""
    contenedorDevolucion.innerHTML=""
    contenedorResumen.innerHTML=""
    contenedorPago.innerHTML=""

} 
function diaDevolucion(id){
    diaSeleccionadoDevolucion.pop()
    const seleccion = dias.find(dia=> dia.id ==id)
    diaSeleccionadoDevolucion.push(seleccion)

    const autoAlmacenado = JSON.parse(localStorage.getItem("usuario"));
  

if(autoAlmacenado==null){
    respuestaDevolucionFuncion(autoSeleccionado,diaSeleccionadoDevolucion)
}else{
    if(diaSeleccionadoDevolucion[0].id<(diaSeleccionadoEntrega[0].id)){
      alert("El dia de entrega no puede ser menor que el dia de devolucion, seleccione nuevamente el dia de entrega")
      preguntaEntregaFuncion()
    }else{ 
        let filtroAuto= autoAlmacenado.filter((usuario)=>usuario.modelo==autoSeleccionado[0].modelo)
        let filtroDia = filtroAuto.filter((usuario)=>
        (usuario.diaSeleccionadoEntrega<=diaSeleccionadoEntrega[0].id)&&(diaSeleccionadoEntrega[0].id<=usuario.diaSeleccionadoDevolucion)||
        (usuario.diaSeleccionadoEntrega<=diaSeleccionadoDevolucion[0].id)&&(diaSeleccionadoDevolucion[0].id<=usuario.diaSeleccionadoDevolucion)
         )
        if(filtroDia.length==0){
            
            respuestaDevolucionFuncion(autoSeleccionado,diaSeleccionadoDevolucion)  
        }else{

            alert("El vehiculo que desea alquilar ya esta alquilado en la fecha que usted selecciono.Puede elegir otro vehiculo o camiar la fecha")
            mostrarAutos()         
        } 
    }
}
}
function respuestaDevolucionFuncion (autoSeleccionado,diaSeleccionadoDevolucion){
    respuestaDevolucion.innerHTML= `Usted debera devolver el ${autoSeleccionado[0].marca} ${autoSeleccionado[0].modelo} el dia ${diaSeleccionadoDevolucion[0].dia}`
    contenedorDevolucion.append(respuestaDevolucion)
    preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion)
}

function preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion){
    limpiarPagar() 
    const totalDias = (diaSeleccionadoDevolucion[0].id-diaSeleccionadoEntrega[0].id+1)
    const totalPrecio= totalDias*autoSeleccionado[0].precio

    preguntaPago.innerHTML=`El costo por alquilar el ${autoSeleccionado[0].marca} ${autoSeleccionado[0].modelo} por ${totalDias} dias es de $${totalPrecio} <br>Usted dispone de un saldo de $${saldo}<br>¿Desea abonarlo?`
    contenedorPago.prepend(preguntaPago)
    botonPagar(totalPrecio)
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
     limpiarResumen()
     console.log(usuario)
     console.log(saldo)
    if (totalPrecio<=saldo){
        saldo -=totalPrecio
        resumen.innerHTML=`El pago se realizo con exito, gracias por confiar en nosotros!<br>Le entregaremos el vehiculo el dia ${diaSeleccionadoEntrega[0].dia}<br>Su saldo ahora es de $${saldo}`
        contenedorResumen.appendChild(resumen)
        autosRentados.push(new Autorentado(diaSeleccionadoEntrega[0].id,diaSeleccionadoDevolucion[0].id,usuario,saldo,autoSeleccionado[0].modelo))
        localStorage.setItem('usuario', JSON.stringify(autosRentados))
        saldo=""
        console.log(autosRentados)
    }else if(totalPrecio>saldo){
        alert("saldo insuficiente")
    }else{
        alert("error")
    }
 
}

 function limpiarResumen(){
    contenedorPago.innerHTML=""
} 
 


































/* 

const autos=[]
const autoSeleccionado=[]
const dias=[]
const diaSeleccionadoEntrega=[]
const diaSeleccionadoDevolucion=[]
let autosRentados=[]
let usuarioNuevo= ""
let saldo =""
autosRentados=JSON.parse(localStorage.getItem("usuario"))
class Auto{
    constructor(marca, modelo, precio, img) {
        this.id=autos.length
        this.marca=marca
        this.modelo=modelo
        this.precio=precio
        this.img=img
    }
}
autos.push(new Auto ("Fiat", "Cronos", 5000, "../Simulador/img/cronos.jpg"))
autos.push(new Auto ("Chevrolet", "Onix", 6000, "../Simulador/img/onix.jpg"))
autos.push(new Auto("Ford", "Raptor", 10000, "../Simulador/img/raptor.jpg")) 

class Dia{
    constructor(dia) {
        this.id=dias.length
        this.dia=dia
    }
}

dias.push(new Dia ("Lunes"))
dias.push(new Dia ("Martes"))
dias.push(new Dia ("Miercoles"))
dias.push(new Dia ("Jueves"))
dias.push(new Dia ("Viernes"))
dias.push(new Dia ("Sabado"))
dias.push(new Dia ("Domingo"))


class Autorentado{
    constructor(usuario, modelo, diaSeleccionadoEntrega, diaSeleccionadoDevolucion){
        this.usuario=usuario
        this.modelo=modelo
        this.diaSeleccionadoEntrega=diaSeleccionadoEntrega
        this.diaSeleccionadoDevolucion=diaSeleccionadoDevolucion
    }
    
}

const contenedorUsuario =document.querySelector('.contenedorUsuario')
const preguntaUsuario=document.createElement('h3')
const formUsuario=document.querySelector('.formUsuario')
const usuario=document.createElement("input")
const saldoRange=document.querySelector('#saldo')
const btnUsuario=document.createElement("button")

const cardContainer = document.querySelector('.cardContainer');
const contenedorEntrega = document.querySelector('.contenedorEntrega')
const contenedorDiasEntrega = document.querySelector('.contenedorDiasEntrega')
const preguntaEntrega=document.createElement("h3")
const respuestaEntrega = document.createElement("h3")

const contenedorDevolucion=document.querySelector('.contenedorDevolucion')
const contenedorDiasDevolucion = document.querySelector('.contenedorDiasDevolucion')
const preguntaDevolucion=document.createElement("h3")
const respuestaDevolucion = document.createElement("h3")

const contenedorPago = document.querySelector('.contenedorPago')
const contenedorBotonPagar =document.querySelector('.contenedorBotonPagar')
const preguntaPago = document.createElement("h3")
const btnPagar =document.createElement("button")


const contenedorResumen=document.querySelector('.contenedorResumen')
const resumen =document.createElement("h3")


verificacionLS()

function verificacionLS(){
    if (autosRentados==null){
        autosRentados=[]
        ingresarUsuario()

    }else{

        ingresarUsuario()
    }
}

function ingresarUsuario(){
preguntaUsuario.innerHTML="Ingrese su nombre de usuario y defina su saldo"
btnUsuario.innerHTML="Crear"
contenedorUsuario.prepend(preguntaUsuario)
formUsuario.append(usuario)
formUsuario.append(saldoRange)
formUsuario.append(btnUsuario)

formUsuario.onsubmit = (e)=>{
    e.preventDefault()
    limiarUsuario()
    usuarioNuevo= e.target.children[0].value
    saldo=e.target.children[1].value
    crearUsuario(usuarioNuevo)
    contenedorUsuario.innerHTML=""
}

}

function crearUsuario(e){
    if(usuarioNuevo!=""){
        mostrarAutos()  
    }else{
        alert("por favor ingrese un usuario")
        ingresarUsuario()
    }

}

function limiarUsuario(){
    cardContainer.innerHTML=""
    contenedorDiasEntrega.innerHTML=""
    contenedorEntrega.innerHTML=""
    contenedorDiasDevolucion.innerHTML=""
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
        contenedorDiasEntrega.innerHTML=""
        contenedorEntrega.innerHTML=""
        contenedorDiasDevolucion.innerHTML=""
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
    contenedorEntrega.append(contenedorDiasEntrega)
    preguntaEntrega.innerHTML=`Seleccione el dia de entrega del auto`
    contenedorEntrega.prepend(preguntaEntrega)

    for (const dia of dias){
        const btnSeleccionDiaEntrega = document.createElement("button")
        btnSeleccionDiaEntrega.innerHTML=`${dia.dia}`
        contenedorDiasEntrega.appendChild(btnSeleccionDiaEntrega)
        btnSeleccionDiaEntrega.onclick= ()=>{
            diaEntrega(dia.id)
    }
    }
}
 function limpiarEntrega(){
    contenedorDiasEntrega.innerHTML=""
    contenedorEntrega.innerHTML=""
    contenedorDiasDevolucion.innerHTML=""
    contenedorDevolucion.innerHTML=""
    contenedorResumen.innerHTML=""
    contenedorPago.innerHTML=""
} 

function diaEntrega(id){
    diaSeleccionadoEntrega.pop()
    const seleccion = dias.find(dia=> dia.id ==id)
    diaSeleccionadoEntrega.push(seleccion)
    respuestaEntregaFuncion(autoSeleccionado,diaSeleccionadoEntrega)
}

function respuestaEntregaFuncion(autoSeleccionado,diaSeleccionadoEntrega){
    respuestaEntrega.innerHTML= `Le entregaremos el ${autoSeleccionado[0].marca} ${autoSeleccionado[0].modelo} el dia ${diaSeleccionadoEntrega[0].dia}`
    contenedorEntrega.append(respuestaEntrega)
    preguntaDevolucionFuncion()
}

function preguntaDevolucionFuncion (){

    lipiarDevolucion()
    contenedorDevolucion.append(contenedorDiasDevolucion)

    preguntaDevolucion.innerHTML=`Seleccione el dia que usted devolvera el auto`
    contenedorDevolucion.prepend(preguntaDevolucion)

    for (const dia of dias){
        const btnSeleccionDiaDevolucion = document.createElement("button")
        btnSeleccionDiaDevolucion.innerHTML=`${dia.dia}`
        contenedorDiasDevolucion.append(btnSeleccionDiaDevolucion)
        btnSeleccionDiaDevolucion.onclick= ()=>{
        diaDevolucion(dia.id)
        }
    }

}

function lipiarDevolucion(){
    contenedorDiasDevolucion.innerHTML=""
    contenedorDevolucion.innerHTML=""
    contenedorResumen.innerHTML=""
    contenedorPago.innerHTML=""

} 
function diaDevolucion(id){
    diaSeleccionadoDevolucion.pop()
    const seleccion = dias.find(dia=> dia.id ==id)
    diaSeleccionadoDevolucion.push(seleccion)

    const autoAlmacenado = JSON.parse(localStorage.getItem("usuario"));
  

if(autoAlmacenado==null){
    respuestaDevolucionFuncion(autoSeleccionado,diaSeleccionadoDevolucion)
}else{
    if(diaSeleccionadoDevolucion[0].id<(diaSeleccionadoEntrega[0].id)){
      alert("El dia de entrega no puede ser menor que el dia de devolucion, seleccione nuevamente el dia de entrega")
      preguntaEntregaFuncion()
    }else{ 
        console.log("almacenado "+autoAlmacenado.length)
        console.log( autoAlmacenado)
        let filtroAuto= autoAlmacenado.filter((usuario)=>usuario.modelo==autoSeleccionado[0].modelo)

        console.log("filtrado auto "+filtroAuto.length)
        console.log( filtroAuto)
         let filtroDia = filtroAuto.filter((usuario)=>

        (usuario.diaSeleccionadoEntrega<=diaSeleccionadoEntrega[0].id)&&(diaSeleccionadoEntrega[0].id<=usuario.diaSeleccionadoDevolucion)||
        (usuario.diaSeleccionadoEntrega<=diaSeleccionadoDevolucion[0].id)&&(diaSeleccionadoDevolucion[0].id<=usuario.diaSeleccionadoDevolucion)

         )

          console.log("filtrado dia "+ filtroDia.length)
          console.log(filtroDia.inRange)

        if(filtroDia.length==0){
            
            respuestaDevolucionFuncion(autoSeleccionado,diaSeleccionadoDevolucion)  
        }else{

            alert("El vehiculo que desea alquilar ya esta alquilado en la fecha que usted selecciono.Puede elegir otro vehiculo o camiar la fecha")
            mostrarAutos()         
        } 
    }
}
}
function respuestaDevolucionFuncion (autoSeleccionado,diaSeleccionadoDevolucion){
    respuestaDevolucion.innerHTML= `Usted debera devolver el ${autoSeleccionado[0].marca} ${autoSeleccionado[0].modelo} el dia ${diaSeleccionadoDevolucion[0].dia}`
    contenedorDevolucion.append(respuestaDevolucion)
    preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion)
}

function preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion){
    limpiarPagar() 
    const totalDias = (diaSeleccionadoDevolucion[0].id-diaSeleccionadoEntrega[0].id+1)
    const totalPrecio= totalDias*autoSeleccionado[0].precio

    preguntaPago.innerHTML=`El costo por alquilar el ${autoSeleccionado[0].marca} ${autoSeleccionado[0].modelo} por ${totalDias} dias es de $${totalPrecio} <br>Usted dispone de un saldo de $${saldo}<br>¿Desea abonarlo?`
    contenedorPago.prepend(preguntaPago)
    botonPagar(totalPrecio)
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
     limpiarResumen()
    if (totalPrecio<=saldo){
        saldo -=totalPrecio
        resumen.innerHTML=`El pago se realizo con exito, gracias por confiar en nosotros!<br>Le entregaremos el vehiculo el dia ${diaSeleccionadoEntrega[0].dia}<br>Su saldo ahora es de $${saldo}`
        contenedorResumen.appendChild(resumen)
        saldo=""
        autosRentados.push(new Autorentado(usuarioNuevo,autoSeleccionado[0].modelo,diaSeleccionadoEntrega[0].id,diaSeleccionadoDevolucion[0].id))
        localStorage.setItem('usuario', JSON.stringify(autosRentados))

    }else if(totalPrecio>saldo){
        alert("saldo insuficiente")
    }else{
        alert("error")
    }
 
}

 function limpiarResumen(){
    contenedorPago.innerHTML=""
}
 





































const autos=[]
const autoSeleccionado=[]
const dias=[]
const diaSeleccionadoEntrega=[]
const diaSeleccionadoDevolucion=[]
let autosRentados=[]
let usuarioNuevo= ""
let saldo =""
autosRentados=JSON.parse(localStorage.getItem("usuario"))
class Auto{
    constructor(marca, modelo, precio, img) {
        this.id=autos.length
        this.marca=marca
        this.modelo=modelo
        this.precio=precio
        this.img=img
    }
}
autos.push(new Auto ("Fiat", "Cronos", 5000, "../Simulador/img/cronos.jpg"))
autos.push(new Auto ("Chevrolet", "Onix", 6000, "../Simulador/img/onix.jpg"))
autos.push(new Auto("Ford", "Raptor", 10000, "../Simulador/img/raptor.jpg")) 

class Dia{
    constructor(dia) {
        this.id=dias.length
        this.dia=dia
    }
}

dias.push(new Dia ("Lunes"))
dias.push(new Dia ("Martes"))
dias.push(new Dia ("Miercoles"))
dias.push(new Dia ("Jueves"))
dias.push(new Dia ("Viernes"))
dias.push(new Dia ("Sabado"))
dias.push(new Dia ("Domingo"))


class Autorentado{
    constructor(usuario, modelo, diaSeleccionadoEntrega, diaSeleccionadoDevolucion){
        this.usuario=usuario
        this.modelo=modelo
        this.diaSeleccionadoEntrega=diaSeleccionadoEntrega
        this.diaSeleccionadoDevolucion=diaSeleccionadoDevolucion
    }
    
}

const contenedorUsuario =document.querySelector('.contenedorUsuario')
const preguntaUsuario=document.createElement('h3')
const formUsuario=document.querySelector('.formUsuario')
const usuario=document.createElement("input")
const saldoRange=document.querySelector('#saldo')
const btnUsuario=document.createElement("button")

const cardContainer = document.querySelector('.cardContainer');
const contenedorEntrega = document.querySelector('.contenedorEntrega')
const contenedorDiasEntrega = document.querySelector('.contenedorDiasEntrega')
const preguntaEntrega=document.createElement("h3")
const respuestaEntrega = document.createElement("h3")

const contenedorDevolucion=document.querySelector('.contenedorDevolucion')
const contenedorDiasDevolucion = document.querySelector('.contenedorDiasDevolucion')
const preguntaDevolucion=document.createElement("h3")
const respuestaDevolucion = document.createElement("h3")

const contenedorPago = document.querySelector('.contenedorPago')
const contenedorBotonPagar =document.querySelector('.contenedorBotonPagar')
const preguntaPago = document.createElement("h3")
const btnPagar =document.createElement("button")


const contenedorResumen=document.querySelector('.contenedorResumen')
const resumen =document.createElement("h3")


verificacionLS()

function verificacionLS(){
    if (autosRentados==null){
        autosRentados=[]
        ingresarUsuario()

    }else{

        ingresarUsuario()
    }
}

function ingresarUsuario(){
preguntaUsuario.innerHTML="Ingrese su nombre de usuario y defina su saldo"
btnUsuario.innerHTML="Crear"
contenedorUsuario.prepend(preguntaUsuario)
formUsuario.append(usuario)
formUsuario.append(saldoRange)
formUsuario.append(btnUsuario)

formUsuario.onsubmit = (e)=>{
    e.preventDefault()
    limiarUsuario()
    usuarioNuevo= e.target.children[0].value
    saldo=e.target.children[1].value
    crearUsuario(usuarioNuevo)
    contenedorUsuario.innerHTML=""
}

}

function crearUsuario(e){
    if(usuarioNuevo!=""){
        mostrarAutos()  
    }else{
        alert("por favor ingrese un usuario")
        ingresarUsuario()
    }

}

function limiarUsuario(){
    cardContainer.innerHTML=""
    contenedorDiasEntrega.innerHTML=""
    contenedorEntrega.innerHTML=""
    contenedorDiasDevolucion.innerHTML=""
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
        contenedorDiasEntrega.innerHTML=""
        contenedorEntrega.innerHTML=""
        contenedorDiasDevolucion.innerHTML=""
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
    contenedorEntrega.append(contenedorDiasEntrega)
    preguntaEntrega.innerHTML=`Seleccione el dia de entrega del auto`
    contenedorEntrega.prepend(preguntaEntrega)

    for (const dia of dias){
        const btnSeleccionDiaEntrega = document.createElement("button")
        btnSeleccionDiaEntrega.innerHTML=`${dia.dia}`
        contenedorDiasEntrega.appendChild(btnSeleccionDiaEntrega)
        btnSeleccionDiaEntrega.onclick= ()=>{
            diaEntrega(dia.id)
    }
    }
}
 function limpiarEntrega(){
    contenedorDiasEntrega.innerHTML=""
    contenedorEntrega.innerHTML=""
    contenedorDiasDevolucion.innerHTML=""
    contenedorDevolucion.innerHTML=""
    contenedorResumen.innerHTML=""
    contenedorPago.innerHTML=""
} 

function diaEntrega(id){
    diaSeleccionadoEntrega.pop()
    const seleccion = dias.find(dia=> dia.id ==id)
    diaSeleccionadoEntrega.push(seleccion)
    respuestaEntregaFuncion(autoSeleccionado,diaSeleccionadoEntrega)
}

function respuestaEntregaFuncion(autoSeleccionado,diaSeleccionadoEntrega){
    respuestaEntrega.innerHTML= `Le entregaremos el ${autoSeleccionado[0].marca} ${autoSeleccionado[0].modelo} el dia ${diaSeleccionadoEntrega[0].dia}`
    contenedorEntrega.append(respuestaEntrega)
    preguntaDevolucionFuncion()
}

function preguntaDevolucionFuncion (){

    lipiarDevolucion()
    contenedorDevolucion.append(contenedorDiasDevolucion)

    preguntaDevolucion.innerHTML=`Seleccione el dia que usted devolvera el auto`
    contenedorDevolucion.prepend(preguntaDevolucion)

    for (const dia of dias){
        const btnSeleccionDiaDevolucion = document.createElement("button")
        btnSeleccionDiaDevolucion.innerHTML=`${dia.dia}`
        contenedorDiasDevolucion.append(btnSeleccionDiaDevolucion)
        btnSeleccionDiaDevolucion.onclick= ()=>{
        diaDevolucion(dia.id)
        }
    }

}

function lipiarDevolucion(){
    contenedorDiasDevolucion.innerHTML=""
    contenedorDevolucion.innerHTML=""
    contenedorResumen.innerHTML=""
    contenedorPago.innerHTML=""

} 
function diaDevolucion(id){
    diaSeleccionadoDevolucion.pop()
    const seleccion = dias.find(dia=> dia.id ==id)
    diaSeleccionadoDevolucion.push(seleccion)

    const autoAlmacenado = JSON.parse(localStorage.getItem("usuario"));
  

if(autoAlmacenado==null){
    respuestaDevolucionFuncion(autoSeleccionado,diaSeleccionadoDevolucion)
}else{
    if(diaSeleccionadoDevolucion[0].id<(diaSeleccionadoEntrega[0].id)){
      alert("El dia de entrega no puede ser menor que el dia de devolucion, seleccione nuevamente el dia de entrega")
      preguntaEntregaFuncion()
    }else{ 
        console.log("almacenado "+autoAlmacenado.length)
        console.log( autoAlmacenado)
        let filtroAuto= autoAlmacenado.filter((usuario)=>usuario.modelo==autoSeleccionado[0].modelo)

        console.log("filtrado auto "+filtroAuto.length)
        console.log( filtroAuto)
         let filtroDia = filtroAuto.filter((usuario)=>

        (usuario.diaSeleccionadoEntrega<=diaSeleccionadoEntrega[0].id)&&(diaSeleccionadoEntrega[0].id<=usuario.diaSeleccionadoDevolucion)||
        (usuario.diaSeleccionadoEntrega<=diaSeleccionadoDevolucion[0].id)&&(diaSeleccionadoDevolucion[0].id<=usuario.diaSeleccionadoDevolucion)

         )

          console.log("filtrado dia "+ filtroDia.length)
          console.log(filtroDia.inRange)

        if(filtroDia.length==0){
            
            respuestaDevolucionFuncion(autoSeleccionado,diaSeleccionadoDevolucion)  
        }else{

            alert("El vehiculo que desea alquilar ya esta alquilado en la fecha que usted selecciono.Puede elegir otro vehiculo o camiar la fecha")
            mostrarAutos()         
        } 
    }
}
}
function respuestaDevolucionFuncion (autoSeleccionado,diaSeleccionadoDevolucion){
    respuestaDevolucion.innerHTML= `Usted debera devolver el ${autoSeleccionado[0].marca} ${autoSeleccionado[0].modelo} el dia ${diaSeleccionadoDevolucion[0].dia}`
    contenedorDevolucion.append(respuestaDevolucion)
    preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion)
}

function preguntaPagoFuncion(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion){
    limpiarPagar() 
    const totalDias = (diaSeleccionadoDevolucion[0].id-diaSeleccionadoEntrega[0].id+1)
    const totalPrecio= totalDias*autoSeleccionado[0].precio

    preguntaPago.innerHTML=`El costo por alquilar el ${autoSeleccionado[0].marca} ${autoSeleccionado[0].modelo} por ${totalDias} dias es de $${totalPrecio} <br>Usted dispone de un saldo de $${saldo}<br>¿Desea abonarlo?`
    contenedorPago.prepend(preguntaPago)
    botonPagar(totalPrecio)
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
     limpiarResumen()
    if (totalPrecio<=saldo){
        saldo -=totalPrecio
        resumen.innerHTML=`El pago se realizo con exito, gracias por confiar en nosotros!<br>Le entregaremos el vehiculo el dia ${diaSeleccionadoEntrega[0].dia}<br>Su saldo ahora es de $${saldo}`
        contenedorResumen.appendChild(resumen)
        saldo=""
        autosRentados.push(new Autorentado(usuarioNuevo,autoSeleccionado[0].modelo,diaSeleccionadoEntrega[0].id,diaSeleccionadoDevolucion[0].id))
        localStorage.setItem('usuario', JSON.stringify(autosRentados))

    }else if(totalPrecio>saldo){
        alert("saldo insuficiente")
    }else{
        alert("error")
    }
 
}

 function limpiarResumen(){
    contenedorPago.innerHTML=""
}


*/