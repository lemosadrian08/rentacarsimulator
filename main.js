
const autos=[]
const autoSeleccionado=[]
const dias=[]
const diaSeleccionadoEntrega=[]
const diaSeleccionadoDevolucion=[]
let saldo = 40000

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

mostrarAutos(autos)

function mostrarAutos(autos){
    const preguntaAuto=document.createElement("h3")
    preguntaAuto.innerHTML=`Seleccione el vehiculo que desea rentar`
    document.body.appendChild(preguntaAuto)
    for (const auto of autos){
        let card = document.createElement("div")
        card.innerHTML+= `<div class="card" style="width: 18rem;">
      <img src="${auto.img}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${auto.marca} ${auto.modelo}</h5>
        <p class="card-text">$${auto.precio}/dia</p>
      </div>
    </div>`;
    for (const auto of autos){
        document.body.appendChild(card)}
        
        let btnRent = document.createElement('button');
        btnRent.textContent=`Rentar`
        document.body.appendChild(btnRent)
        btnRent.onclick= ()=>{
            rentarAuto(auto.id)
            mostrarDias() 
        }
    }
}

function rentarAuto(id){
    autoSeleccionado.pop()
    const seleccion = autos.find(auto => auto.id == id)
    autoSeleccionado.push(seleccion)

}

function mostrarDias(){
    const preguntaEntrega=document.createElement("h3")
    preguntaEntrega.innerHTML=`Seleccione el dia de entrega del auto`
    document.body.appendChild(preguntaEntrega)

    for (const dia of dias){
        const btnseleccionDia = document.createElement("div")
        btnseleccionDia.innerHTML=`<button>${dia.dia}</button>`
        document.body.appendChild(btnseleccionDia)
        btnseleccionDia.onclick= ()=>{
            rentarDia(dia.id)
    }


    }

}

function rentarDia(id){
    diaSeleccionadoEntrega.pop()
    const seleccion = dias.find(dia=> dia.id ==id)
    diaSeleccionadoEntrega.push(seleccion)
    notificacion(autoSeleccionado,diaSeleccionadoEntrega)
}

function notificacion (autoSeleccionado,diaSeleccionadoEntrega){
    const mensajeNotificacion = document.createElement("h2")
    mensajeNotificacion.innerHTML= `Le entregaremos el ${autoSeleccionado[0].marca} ${autoSeleccionado[0].modelo} el dia ${diaSeleccionadoEntrega[0].dia}`
    document.body.appendChild(mensajeNotificacion)
    mostrarDiaDevolucion()
}

function mostrarDiaDevolucion (){
    const preguntaDevolucion=document.createElement("h3")
    preguntaDevolucion.innerHTML=`Seleccione el dia que usted devolvera el auto`
    document.body.appendChild(preguntaDevolucion)
    for (const dia of dias){
        const btnseleccionDia = document.createElement("div")
        btnseleccionDia.innerHTML=`<button>${dia.dia}</button>`
        document.body.appendChild(btnseleccionDia)
        btnseleccionDia.onclick= ()=>{
        diaDevolucion(dia.id)
        }
    }

}
function diaDevolucion(id){
    diaSeleccionadoDevolucion.pop()
    const seleccion = dias.find(dia=> dia.id ==id)
    diaSeleccionadoDevolucion.push(seleccion)
    notificacionDevolucion(autoSeleccionado,diaSeleccionadoDevolucion)
}

function notificacionDevolucion (autoSeleccionado,diaSeleccionadoDevolucion){
    const mensajeNotificacion = document.createElement("h2")
    mensajeNotificacion.innerHTML= `Usted debera devolver el ${autoSeleccionado[0].marca} ${autoSeleccionado[0].modelo} el dia ${diaSeleccionadoDevolucion[0].dia}`
    document.body.appendChild(mensajeNotificacion)
    total(autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion)
}

function total (autoSeleccionado,diaSeleccionadoEntrega,diaSeleccionadoDevolucion){
    const totalDias = (diaSeleccionadoDevolucion[0].id-diaSeleccionadoEntrega[0].id+1)
    const totalPrecio= totalDias*autoSeleccionado[0].precio
    const resumen=document.createElement("h3")
    resumen.innerHTML=`El costo por alqular el ${autoSeleccionado[0].marca} ${autoSeleccionado[0].modelo} por ${totalDias} dias es de $${totalPrecio} <br>Usted dispone de un saldo de $${saldo}<br>¿Desea abonarlo?`
    document.body.appendChild(resumen)
    preguntaPago(totalPrecio)
}

function preguntaPago(totalPrecio){

    const btnPagar =document.createElement("button")
    btnPagar.innerHTML=`Pagar`
    document.body.appendChild(btnPagar)
    btnPagar.onclick=()=>{
        pagar(totalPrecio)
    }
}

function pagar(totalPrecio){
    console.log(totalPrecio)
    if (totalPrecio<=saldo){
        saldo -=totalPrecio
        const saludo =document.createElement("h3")
        saludo.innerHTML=`El pago se realizo con exito, gracias por confiar en nosotros!<br>Le entregaremos el vehiculo el dia ${diaSeleccionadoEntrega[0].dia}<br>Su saldo ahora es de $${saldo}`
        document.body.appendChild(saludo)

    }else if(totalPrecio>saldo){
        alert("saldo insuficiente")
    }else{
        alert("error")
    }

}
