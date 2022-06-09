let fecha = formatoFecha1(new Date())
let valorReduccion = false
let valorIntegral = false
let valorGPS = false
let valorAeropuerto = false
let precioReduccionFijo = 2000
let precioIntegralFijo = 3000
let precioAeropuertoFijo = 2500
let precioBebeFijo = 500
let precioGPSFijo = 600
let precioJovenFijo = 1100
let precioConductorAdicionalFijo = 330
let precioBoosterFijo = 600
let precioReduccion = 0
let precioIntegral = 0
let precioAeropuerto = 0
let precioBebe = 0
let precioGPS = 0
let precioJoven = 0
let precioConductorAdicional = 0
let precioBooster = 0
let costoReduccion = 0
let costoIntegral = 0
let costoAeropuerto = 0
let costoBebe = 0
let costoGPS = 0
let costoJoven = 0
let costoConductorAdicional = 0
let costoBooster = 0
let costosAdicionales = 0
let fecha1 = 0
let fecha2 = 0
let seleccion = ""
let tasaImpuestos = 0.21
let impuestos = 0
let totalPrecioAntesdeImpuestos = 0
let totalPrecio = 0
let precioDias = 0
let totalDias = 0
let autoSeleccionado = []
let dias = []
let diaSeleccionadoEntrega = []
let diaSeleccionadoDevolucion = []
let diaSeleccionadoEntregaFormato2 = ""
let diaSeleccionadoDevolucionFormato2 = ""
let autosRentados = []
let autosf = []
autosRentados = JSON.parse(localStorage.getItem("usuario"))

let usuarioNuevo = {
    usuario: "",
    saldo: ""
}

let {
    usuario,
    saldo
} = usuarioNuevo


class Autorentado {
    constructor(diaSeleccionadoEntrega, diaSeleccionadoDevolucion, diaSeleccionadoEntregaFormato2, diaSeleccionadoDevolucionFormato2, usuario, saldo, marca, modelo) {
        this.diaSeleccionadoEntrega = diaSeleccionadoEntrega
        this.diaSeleccionadoDevolucion = diaSeleccionadoDevolucion
        this.diaSeleccionadoEntregaFormato2 = diaSeleccionadoEntregaFormato2
        this.diaSeleccionadoDevolucionFormato2 = diaSeleccionadoDevolucionFormato2
        this.usuario = usuario
        this.saldo = saldo
        this.marca = marca
        this.modelo = modelo
    }

}
//-----------------------------------------------------------------------------DOM-----------------------------------------------------------------------------
const tituloPrincipal = document.querySelector(".tituloPrincipal")
tituloPrincipal.innerHTML = "Simulador: Renta un vehículo"
//Contenedor Usuario
const contenedorUsuario = document.querySelector('.contenedorUsuario')
const preguntaUsuario = document.createElement('h3')
preguntaUsuario.innerHTML = "Ingrese su nombre de usuario y defina su saldo"
preguntaUsuario.className = "preguntaUsuario"
const formUsuario = document.querySelector('.formUsuario')
const usuarioInput = document.createElement("input")
usuarioInput.className = "inputUsuario"
usuarioInput.setAttribute("placeholder", "Usuario")

const saldoRange = document.querySelector('.saldoRangeUsuario')
const textRange = document.querySelector('.textRangeUsuario')
const btnUsuario = document.createElement("button")
btnUsuario.className = "btnUsuario"
btnUsuario.innerHTML = "Crear"

//Contenedor Entrega
const cardContainer = document.querySelector('.cardContainer')
const contenedorEntregayDevolucion = document
const contenedorEntrega = document.querySelector('.contenedorEntrega')
const date1 = document.createElement("input")
date1.value = ""
date1.className = "date1"
date1.setAttribute("type", "date")
date1.setAttribute("min", `${fecha}`)
date1.setAttribute("placeholder", "dd-mm-yyyy")
const preguntaEntrega = document.createElement("h3")
preguntaEntrega.className = "preguntaEntrega"
preguntaEntrega.innerHTML = `Día de entrega del vehículo`

//Contenedor Devolucion
const contenedorDevolucion = document.querySelector('.contenedorDevolucion')
const date2 = document.createElement("input")
date2.value = ""
date2.className = "date2"
date2.setAttribute("type", "date")
date2.setAttribute("min", `${fecha}`)
const preguntaDevolucion = document.createElement("h3")
preguntaDevolucion.className = "preguntaDevolucion"
preguntaDevolucion.innerHTML = `Día de devolución del vehículo`

//Contenedor Seguros y Adicionales
const contenedorSegurosYAdicionales = document.querySelector('.contenedorSegurosYAdicionales')
const segurosTitulo = document.createElement('h3');
segurosTitulo.textContent = `Seguros`;
segurosTitulo.className = "segurosTitulo"
const contenedorReduccion = document.createElement("div")
contenedorReduccion.className = "contenedorSeguros"
const coverturaReduccion = document.createElement("p")
coverturaReduccion.className = "checkboxText"
coverturaReduccion.textContent = `Cobertura Reducción - Cobertura que reduce 100% la franquicia por daños de colisión - $2000/dia`
const checkboxReduccion = document.createElement("input")
checkboxReduccion.setAttribute("type", "checkbox")
checkboxReduccion.className = "checkbox"
const contenedorIntegral = document.createElement("div")
contenedorIntegral.className = "contenedorSeguros"
const coverturaIntegral = document.createElement("p")
coverturaIntegral.className = "checkboxText"
coverturaIntegral.textContent = `Cobertura Integral - Reduce 100% la franquicia por daños de colisión y vuelco - $3000/dia`
const checkboxIntegral = document.createElement("input")
checkboxIntegral.setAttribute("type", "checkbox")
checkboxIntegral.className = "checkbox"
const adicionalesTitulo = document.createElement('h3');
adicionalesTitulo.textContent = `Adicionales`;
adicionalesTitulo.className = "adicionalesTitulo"
const contenedorAeropuerto = document.createElement("div")
contenedorAeropuerto.className = "contenedorAdicionales"
const aeropuerto = document.createElement("p")
aeropuerto.className = "checkboxText"
aeropuerto.textContent = `Cargo de Aeropuerto - Cargo por retiro o devolución en Aeropuerto - $2500/reserva`
const checkboxAeropuerto = document.createElement("input")
checkboxAeropuerto.setAttribute("type", "checkbox")
checkboxAeropuerto.className = "checkbox"
const contenedorBebe = document.createElement("div")
contenedorBebe.className = "contenedorAdicionales"
const bebe = document.createElement("p")
bebe.className = "numberText"
bebe.textContent = `Silla para bebés - Silla especial para bebés entre 1 y 3 años - $500/dia`
const numberBebe = document.createElement("input")
numberBebe.setAttribute("type", "number")
numberBebe.setAttribute("min", "0")
numberBebe.setAttribute("max", "3")
numberBebe.setAttribute("placeholder", "0")
numberBebe.className = "number"
const contenedorGPS = document.createElement("div")
contenedorGPS.className = "contenedorAdicionales"
const GPS = document.createElement("p")
GPS.className = "checkboxText"
GPS.textContent = `GPS - Sistema de navegación para vehículos - $600/dia`
const checkboxGPS = document.createElement("input")
checkboxGPS.setAttribute("type", "checkbox")
checkboxGPS.className = "checkbox"
const contenedorJoven = document.createElement("div")
contenedorJoven.className = "contenedorAdicionales"
const joven = document.createElement("p")
joven.className = "numberText"
joven.textContent = `Conductor Joven - Conductor de entre 18 y 20 años, apto para conducir - $1100/dia`
const numberJoven = document.createElement("input")
numberJoven.setAttribute("type", "number")
numberJoven.setAttribute("type", "number")
numberJoven.setAttribute("min", "0")
numberJoven.setAttribute("max", "5")
numberJoven.setAttribute("placeholder", "0")
numberJoven.className = "number"
const contenedorConductorAdicional = document.createElement("div")
contenedorConductorAdicional.className = "contenedorAdicionales"
const conductorAdicional = document.createElement("p")
conductorAdicional.className = "numberText"
conductorAdicional.textContent = `Conductor adicional - Persona autorizada para conducir el vehículo aparte del conductor principal - $330/dia`
const numberConductorAdicional = document.createElement("input")
numberConductorAdicional.setAttribute("type", "number")
numberConductorAdicional.setAttribute("min", "0")
numberConductorAdicional.setAttribute("max", "4")
numberConductorAdicional.setAttribute("placeholder", "0")
numberConductorAdicional.className = "number"
const contenedorBooster = document.createElement("div")
contenedorBooster.className = "contenedorAdicionales"
const booster = document.createElement("p")
booster.className = "numberText booster"
booster.textContent = `Booster(4-10 años) - Silla especial para niños de 4 a 10 años - $600/dia`
const numberBooster = document.createElement("input")
numberBooster.setAttribute("type", "number")
numberBooster.setAttribute("min", "0")
numberBooster.setAttribute("max", "4")
numberBooster.setAttribute("placeholder", "0")
numberBooster.className = "number"


//Contenedor Pago
const contenedorPago = document.querySelector('.contenedorPago')
const contenedorPorRentar = document.createElement("div")
contenedorPorRentar.className = "contenedorPorRentar"
const tituloRentado = document.createElement('h3')
tituloRentado.className = "tituloRentado"
const imagenRentado = document.createElement("img")
imagenRentado.className = "imagenRentado"
const botonVolver = document.createElement("button")
botonVolver.className = "botonVolver"
botonVolver.innerHTML = "Volver a seleccionar el vehículo"
const contenedorFechas = document.createElement("div")
contenedorFechas.className = "contenedorFechas"
const entregaPago = document.createElement('h3')
entregaPago.className = "pPago"
const devolucionPago = document.createElement('h3')
devolucionPago.className = "pPago"
const entregaFechaPago = document.createElement("p")
entregaFechaPago.className = "pPago"
const devolucionFechaPago = document.createElement("p")
devolucionFechaPago.className = "pPago"
const contenedorDetalle = document.createElement('div')
contenedorDetalle.className = "contenedorDetalle"
const detalleDePago = document.createElement('h3')
detalleDePago.className = "pPago"
const detalleReserva = document.createElement('p')
detalleReserva.className = "pPago"
const detalleReduccion = document.createElement('p')
detalleReduccion.className = "pPago"
const detalleIntegral = document.createElement('p')
detalleIntegral.className = "pPago"
const detalleAeropuerto = document.createElement('p')
detalleAeropuerto.className = "pPago"
const detalleBebe = document.createElement('p')
detalleBebe.className = "pPago"
const detalleGPS = document.createElement('p')
detalleGPS.className = "pPago"
const detalleJoven = document.createElement('p')
detalleJoven.className = "pPago"
const detalleConductorAdicional = document.createElement('p')
detalleConductorAdicional.className = "pPago"
const detalleBooster = document.createElement('p')
detalleBooster.className = "pPago"
const detalleImpuestos = document.createElement('p')
detalleImpuestos.className = "pPago"
const contenedorTotal = document.createElement("div")
contenedorTotal.className = "contenedorTotal"
const tituloTotal = document.createElement("h3")
tituloTotal.className = "pPago"
const tituloSaldo = document.createElement("p")
tituloSaldo.className = "pPago"
const contenedorbtnPagar = document.createElement("div")
contenedorbtnPagar.className = "contenedorbtnPagar"
const btnPagar = document.createElement("button")
btnPagar.className = "btnPagar"
btnPagar.innerHTML = `Pagar`


//Contenedor Resumen
const contenedorResumen = document.querySelector('.contenedorResumen')
const resumen = document.createElement("h3")
//Contenedor Botones
const reiniciar = document.createElement("button")
reiniciar.className = "reiniciar"
reiniciar.innerHTML = "Reiniciar"
const borrarRegistro = document.createElement("button")
borrarRegistro.className = "borrarRegistro"
borrarRegistro.innerHTML = `Borrar registro`
//Contenedor Rentados
const contenedorRentados = document.querySelector('.contenedorRentados')
const tituloRentados = document.createElement("h3")
tituloRentados.className = "tituloRentados"
tituloRentados.innerHTML = "Registro de vehículos rentados"
const contenedorMostrarRentados = document.querySelector(".contenedorMostrarRentados")
const contenedorBotones = document.querySelector('.contenedorBotones')

//--------------------------------------------------------Botones-----------------------------------------------------------------
//Contenedor Ususario
saldoRange.onchange = () => {
    let valor = saldoRange.value
    textRange.value = valor
}

formUsuario.onsubmit = (e) => {
    e.preventDefault()
    usuario = e.target.children[0].value
    saldo = e.target.children[1].value
    crearUsuario(usuario)
}

//Contenedor Entrega
date1.onchange = () => {
    diaSeleccionadoEntrega.pop()
    let fecha1 = new Date(date1.value)
    diaSeleccionadoEntregaFormato2 = formatoFecha2(date1.value)
    seleccion = fecha1.getTime()
    diaSeleccionadoEntrega.push(seleccion)
    preguntaPagoFuncion()
}

//Contenedor Devolucion
date2.onchange = () => {
    diaSeleccionadoDevolucion.pop()
    let fecha2O = new Date(date2.value)
    diaSeleccionadoDevolucionFormato2 = formatoFecha2(date2.value)
    seleccion = fecha2O.getTime()
    diaSeleccionadoDevolucion.push(seleccion)
    diaDevolucion()
}

//Contenedor Servicios y adicionales
checkboxReduccion.onchange = () => {
    valorReduccion = checkboxReduccion.checked
    valorReduccion == true ? precioReduccion = precioReduccionFijo : precioReduccion = 0
    preguntaPagoFuncion()
}
checkboxIntegral.onchange = () => {
    valorIntegral = checkboxIntegral.checked
    valorIntegral == true ? precioIntegral = precioIntegralFijo : precioIntegral = 0
    preguntaPagoFuncion()
}
checkboxAeropuerto.onchange = () => {
    valorAeropuerto = checkboxAeropuerto.checked
    valorAeropuerto == true ? precioAeropuerto = precioAeropuertoFijo : precioAeropuerto = 0
    preguntaPagoFuncion()
}
numberBebe.onchange = () => {
    precioBebe = numberBebe.value * precioBebeFijo
    preguntaPagoFuncion()
}
checkboxGPS.onchange = () => {
    valorGPS = checkboxGPS.checked
    valorGPS == true ? precioGPS = precioGPSFijo : precioGPS = 0
    preguntaPagoFuncion()
}
numberJoven.onchange = () => {
    precioJoven = numberJoven.value * precioJovenFijo
    preguntaPagoFuncion()
}
numberConductorAdicional.onchange = () => {
    precioConductorAdicional = numberConductorAdicional.value * precioConductorAdicionalFijo
    preguntaPagoFuncion()
}
numberBooster.onchange = () => {
    precioBooster = numberBooster.value * precioBoosterFijo
    preguntaPagoFuncion()
}
//Contenedor Pago
botonVolver.onclick = () => {
    contenedorEntrega.innerHTML = ""
    contenedorDevolucion.innerHTML = ""
    contenedorSegurosYAdicionales.innerHTML = ""
    contenedorPago.innerHTML = ""
    contenedorDetalle.innerHTML = ""
    contenedorResumen.innerHTML = ""
    diaSeleccionadoEntregaFormato2 = ""
    diaSeleccionadoDevolucionFormato2 = ""
    diaSeleccionadoEntrega.pop()
    diaSeleccionadoDevolucion.pop()
    totalDias = 0
    date1.value = ""
    date2.value = ""
    fetchAutos()
}
btnPagar.onclick = () => {
    resumenFuncion()
}
//Contenedor botones
reiniciar.onclick = () => {
    location.reload()
}
borrarRegistro.onclick = () => {
    localStorage.clear()
    contenedorMostrarRentados.innerHTML = ""
}



//Empieza aca
verificacionLS()

//verifica el localstorage para comprobar si es la primera vez que se ingresa
function verificacionLS() {
    if (autosRentados == null) {
        autosRentados = []
        ingresarUsuario()
    } else {
        ingresarUsuario()
    }
}
//Crea la interface de ingreso de usuario y saldo
function ingresarUsuario() {
    contenedorUsuario.prepend(preguntaUsuario)
    formUsuario.append(usuarioInput)
    formUsuario.append(saldoRange)
    formUsuario.append(textRange)
    formUsuario.append(btnUsuario)
}

//botón crear--verificación que no este vacío el ingreso de usuario
function crearUsuario(usuario) {
    if (usuario != "") {
        contenedorUsuario.innerHTML = ""
        fetchAutos()
    } else {
        Swal.fire('Debe ingresar un usuario.')
    }
}

//fetch de archivo json con datos de autos
const fetchAutos = () => {
    fetch("data/cars.json")
        .then((respuesta) => {
            return respuesta.json()
        })
        .then((autos) => {
            verAutos(autos)
            autosf = autos
        })
        .catch((error) => {
            Swal.fire('Error')
        })
}

//muestra la interface de las tarjetas de los autos con los datos que se obtiene del fetch
verAutos = (autos) => {
    autos.forEach((auto) => {
        const {
            id,
            marca,
            modelo,
            precio,
            img
        } = auto

        const card = document.createElement('div');
        card.classList.add('card');

        const cardImage = document.createElement('img');
        cardImage.src = img;
        cardImage.className = "cardImage"

        const cardtitle = document.createElement('h3');
        cardtitle.className = "cardtitle"
        cardtitle.textContent = `${marca} ${modelo}`;

        const cardText = document.createElement('p')
        cardText.className = "cardText"
        cardText.textContent = `$${precio}/día`

        const btnRentar = document.createElement('button');
        btnRentar.className = "btnRentar";
        btnRentar.textContent = "Rentar";
        btnRentar.onclick = () => {
            cardContainer.innerHTML = ""
            window.scrollTo(0, 0)
            rentarAuto(id)
            tituloRentado.innerHTML = `${marca} ${modelo}`
            imagenRentado.src = img
            mostrarInterface()

        }
        card.append(cardImage);
        card.append(cardtitle);
        card.append(cardText)
        card.append(btnRentar);
        cardContainer.append(card);

    })
}
//al presionar rentar guarda, el id del auto seleccionado
function rentarAuto(id1) {
    autoSeleccionado.pop()
    seleccion = autosf.find(auto => auto.id == id1)
    autoSeleccionado.push(seleccion)
}

// muestra la interface de Entrega Devolución Seguros y adicionales(EDSA)  y una parte de la interface de detalle de pago 
function mostrarInterface() {
    //Entrega
    contenedorEntrega.append(date1)
    contenedorEntrega.prepend(preguntaEntrega)

    //Devolucion
    contenedorDevolucion.append(date2)
    contenedorDevolucion.prepend(preguntaDevolucion)

    //Pago

    contenedorPago.append(contenedorPorRentar)
    contenedorPorRentar.append(tituloRentado)
    contenedorPorRentar.append(imagenRentado)
    contenedorPorRentar.append(botonVolver)

    //Seguros y adicionales

    contenedorSegurosYAdicionales.append(segurosTitulo)
    contenedorSegurosYAdicionales.append(contenedorReduccion)
    contenedorReduccion.append(coverturaReduccion)
    contenedorReduccion.prepend(checkboxReduccion)
    contenedorSegurosYAdicionales.append(contenedorIntegral)
    contenedorIntegral.append(coverturaIntegral)
    contenedorIntegral.prepend(checkboxIntegral)
    contenedorSegurosYAdicionales.append(adicionalesTitulo)
    contenedorSegurosYAdicionales.append(contenedorAeropuerto)
    contenedorAeropuerto.append(aeropuerto)
    contenedorAeropuerto.prepend(checkboxAeropuerto)
    contenedorSegurosYAdicionales.append(contenedorBebe)
    contenedorBebe.append(bebe)
    contenedorBebe.prepend(numberBebe)
    contenedorSegurosYAdicionales.append(contenedorGPS)
    contenedorGPS.append(GPS)
    contenedorGPS.prepend(checkboxGPS)
    contenedorSegurosYAdicionales.append(contenedorJoven)
    contenedorJoven.append(joven)
    contenedorJoven.prepend(numberJoven)
    contenedorSegurosYAdicionales.append(contenedorConductorAdicional)
    contenedorConductorAdicional.append(conductorAdicional)
    contenedorConductorAdicional.prepend(numberConductorAdicional)
    contenedorSegurosYAdicionales.append(contenedorBooster)
    contenedorBooster.append(booster)
    contenedorBooster.prepend(numberBooster)
}

// realiza un filtrado en caso de que el auto ya haya sido reservado en la fecha elegida 
function diaDevolucion() {

    const autoAlmacenado = JSON.parse(localStorage.getItem("usuario"));

    if (diaSeleccionadoEntrega[0] == null) {
        //error por seleccionar el dia de devolucion antes que el de entrega
        Swal.fire('Seleccione el dia de entrega antes que el dia de devolucion.')
        diaSeleccionadoDevolucion.pop()
        date2.value = ""

    } else {
        if (autoAlmacenado == null) {
            //en caso de que el localStorage este vacío pasa directamente a la funcion siguiente
            preguntaPagoFuncion()
        } else {
            //filtro que depende de los días seleccionados en el input date y de los autos reservados en el localStorage
            let filtroAuto = autoAlmacenado.filter((usuario) => usuario.modelo == autoSeleccionado[0].modelo)
            let filtroDia = filtroAuto.filter((usuario) =>
                (usuario.diaSeleccionadoEntrega <= diaSeleccionadoEntrega[0]) && (diaSeleccionadoEntrega[0] <= usuario.diaSeleccionadoDevolucion) ||
                (usuario.diaSeleccionadoEntrega <= diaSeleccionadoDevolucion[0]) && (diaSeleccionadoDevolucion[0] <= usuario.diaSeleccionadoDevolucion)
            )
            if (filtroDia.length == 0) {
                //si el array esta vacío indica que el auto esta disponible y puede ser reservado en las fechas escogidas
                preguntaPagoFuncion()
            } else {
                //el array no esta vacio por lo tanto el auto ya fue seleccionado en las fechas escogidas
                date1.value = ""
                date2.value = ""
                diaSeleccionadoEntrega.pop()
                diaSeleccionadoDevolucion.pop()
                Swal.fire('El vehículo que desea alquilar ya esta alquilado en la fecha que usted selecciono. Puede elegir otro vehiculo o camiar la fecha.')

            }
        }
    }
}

//funcion que muestra la interface de los detalles de pago
function preguntaPagoFuncion() {


    //este if evita algunos errores 
    if (diaSeleccionadoDevolucion.length != 0) {
        if ((diaSeleccionadoDevolucion[0] - diaSeleccionadoEntrega[0]) == 0) {
            totalDias = 1
            //en el caso de que el dia de entrega sea igual que el de devolucion el total de dias que la persona alquilaria el auto seria 1
        } else if (diaSeleccionadoDevolucion[0] < diaSeleccionadoEntrega[0]) {
            //en el caso de que el dia de entrega sea mayor que el de devolucion envia un error
            contenedorTotal.innerHTML = ""
            totalDias = 0
            date1.value = ""
            date2.value = ""
            diaSeleccionadoEntrega.pop()
            diaSeleccionadoDevolucion.pop()
            Swal.fire('El día de entrega no puede ser mayor que el día de devolución.<br>Seleccione nuevamente el dia de entrega.')
        } else {
            //no hay errores y se calcula el total de dias
            totalDias = (diaSeleccionadoDevolucion[0] - diaSeleccionadoEntrega[0]) / (1000 * 60 * 60 * 24)
        }
    } else {
        //esto evita que se muestre la interface de detalle de pago, en el caso de que solo se seleccione el dia de entrga o en el caso de que se interactue con los checkbox o numbers de los servicios adicionales antes de elegir los dias
        totalDias = 0
    }


    //interface de detalle de pago
    contenedorPago.append(contenedorFechas)
    contenedorFechas.append(entregaPago)
    contenedorFechas.append(entregaFechaPago)
    contenedorFechas.append(devolucionPago)
    contenedorFechas.append(devolucionFechaPago)
    contenedorPago.append(contenedorDetalle)
    contenedorDetalle.append(detalleDePago)
    contenedorDetalle.append(detalleReserva)
    contenedorDetalle.append(detalleReduccion)
    contenedorDetalle.append(detalleIntegral)
    contenedorDetalle.append(detalleAeropuerto)
    contenedorDetalle.append(detalleBebe)
    contenedorDetalle.append(detalleGPS)
    contenedorDetalle.append(detalleJoven)
    contenedorDetalle.append(detalleConductorAdicional)
    contenedorDetalle.append(detalleBooster)
    contenedorDetalle.append(detalleImpuestos)
    contenedorPago.append(contenedorTotal)
    contenedorTotal.append(tituloTotal)
    contenedorTotal.append(tituloSaldo)


    //calculos
    costoReduccion = precioReduccion * totalDias
    costoIntegral = precioIntegral * totalDias
    costoAeropuerto = precioAeropuerto
    costoBebe = precioBebe * totalDias
    costoGPS = precioGPS * totalDias
    costoJoven = precioJoven * totalDias
    costoConductorAdicional = precioConductorAdicional * totalDias
    costoBooster = precioBooster * totalDias
    costosAdicionales = costoReduccion + costoIntegral + costoBebe + costoGPS + costoJoven + costoConductorAdicional + costoBooster + costoAeropuerto
    precioDias = totalDias * autoSeleccionado[0].precio
    totalPrecioAntesdeImpuestos = totalDias * autoSeleccionado[0].precio + costosAdicionales
    impuestos = Math.round(totalPrecioAntesdeImpuestos * tasaImpuestos)
    totalPrecio = totalPrecioAntesdeImpuestos + impuestos

    //si los dias totale son igual a 0 no se muestra la interface de detalle de pago
    if (totalDias != 0) {
        entregaPago.innerHTML = "Entrega"
        devolucionPago.innerHTML = "Devolución"
        detalleDePago.innerHTML = "Detalle de Pago"
        entregaFechaPago.innerHTML = diaSeleccionadoEntregaFormato2
        devolucionFechaPago.innerHTML = diaSeleccionadoDevolucionFormato2
        detalleReserva.innerHTML = `<b>Reserva por ${totalDias} días ($ ${autoSeleccionado[0].precio} x día) =</b> $ ${precioDias}`
        detalleImpuestos.innerHTML = `<b>+ Impuestos (21%) =</b> $ ${impuestos}`
        tituloTotal.innerHTML = `<hr> Total a pagar por ${totalDias} días de alquiler $ ${totalPrecio}`
        tituloSaldo.innerHTML = `Su saldo es $ ${saldo}`
        contenedorTotal.append(btnPagar)
    } else {
        tituloSaldo.innerHTML = ""
        tituloTotal.innerHTML = ""
        detalleImpuestos.innerHTML = ""
        detalleReserva.innerHTML = ""
        entregaPago.innerHTML = ""
        devolucionPago.innerHTML = ""
        detalleDePago.innerHTML = ""
        entregaFechaPago.innerHTML = ""
        devolucionFechaPago.innerHTML = ""
    }

    //checkbox y numbers de los servicios adicionales
    valorReduccion == true && totalDias != 0 ?
        detalleReduccion.innerHTML = `<b>+ (1) Cobertura Reducción ($ ${precioReduccionFijo} por Día) x ${totalDias} Días =</b> $ ${costoReduccion}` :
        detalleReduccion.innerHTML = ""

    valorIntegral == true && totalDias != 0 ?
        detalleIntegral.innerHTML = `<b>+ (1) Cobertura Integral ($ ${precioIntegralFijo} por Día) x ${totalDias} Días =</b> $ ${costoIntegral}` :
        detalleIntegral.innerHTML = ""

    valorAeropuerto == true && totalDias != 0 ?
        detalleAeropuerto.innerHTML = `<b>+ (1) Cargo de Aeropuerto ($ ${precioAeropuertoFijo} por reserva) =</b> $ ${costoAeropuerto}` :
        detalleAeropuerto.innerHTML = ""

    numberBebe.value != 0 && totalDias != 0 ?
        detalleBebe.innerHTML = `<b>+ (${numberBebe.value}) Silla de bebé ($ ${precioBebeFijo} por Día) x ${totalDias} Días =</b> $ ${costoBebe}` :
        detalleBebe.innerHTML = ""

    valorGPS == true && totalDias != 0 ?
        detalleGPS.innerHTML = `<b>+ (1) GPS ($ ${precioBebeFijo} por Día) x ${totalDias} Días =</b> $ ${costoGPS}` : detalleGPS.innerHTML = ""

    numberJoven.value != 0 && totalDias != 0 ?
        detalleJoven.innerHTML = `<b>+ (${numberJoven.value}) Silla de bebé ($ ${precioJovenFijo} por Día) x ${totalDias} Días =</b> $ ${costoJoven}` :
        detalleJoven.innerHTML = ""

    numberConductorAdicional.value != 0 && totalDias != 0 ?
        detalleConductorAdicional.innerHTML = `<b>+ (${numberConductorAdicional.value}) Silla de bebé ($ ${precioConductorAdicionalFijo} por Día) x ${totalDias} Días =</b> $ ${costoConductorAdicional}` :
        detalleConductorAdicional.innerHTML = ""

    numberBooster.value != 0 && totalDias != 0 ?
        detalleBooster.innerHTML = `<b>+ (${numberBooster.value}) Silla de bebé ($ ${precioBoosterFijo} por Día) x ${totalDias} Días =</b> $ ${costoBooster}` :
        detalleBooster.innerHTML = ""
}


//funcion del boton pagar resta el precio al saldo seleccionado 
function resumenFuncion() {
    if (totalPrecio <= saldo) {
        contenedorEntrega.innerHTML = ""
        contenedorDevolucion.innerHTML = ""
        contenedorSegurosYAdicionales.innerHTML = ""
        contenedorPago.innerHTML = ""
        contenedorResumen.innerHTML = ""
        saldo -= totalPrecio
        Swal.fire({
            icon: 'success',
            title: 'El pago se realizó con éxito, gracias por confiar en nosotros!',
        })
        contenedorResumen.appendChild(resumen)
        autosRentados.push(new Autorentado(diaSeleccionadoEntrega[0], diaSeleccionadoDevolucion[0], diaSeleccionadoEntregaFormato2, diaSeleccionadoDevolucionFormato2, usuario, saldo, autoSeleccionado[0].marca, autoSeleccionado[0].modelo))
        localStorage.setItem('usuario', JSON.stringify(autosRentados))
        saldo = ""
        mostrarRentados()
        mostrarBotones()
    } else if (totalPrecio > saldo) {
        Swal.fire('Saldo insuficiente')
    } else {
        Swal.fire('Error')
    }
}


//funcion que muestra un resumen de los autos rentados ademas permite borrar el localStorage Y reiniciar el programa 
function mostrarRentados() {
    contenedorSegurosYAdicionales.remove()
    contenedorPago.remove()

    for (const auto of autosRentados) {
        const mostrarRentado = document.createElement("p")
        mostrarRentado.innerText = `El usuario ${auto.usuario} rentó el ${auto.marca} ${auto.modelo} desde el ${auto.diaSeleccionadoEntregaFormato2} hasta el ${auto.diaSeleccionadoDevolucionFormato2}`
        mostrarRentado.className = "mostrarRentado"
        contenedorMostrarRentados.prepend(mostrarRentado)
        contenedorMostrarRentados.prepend(tituloRentados)
    }
}

function mostrarBotones() {
    contenedorBotones.append(reiniciar)
    contenedorBotones.append(borrarRegistro)
}


//funcion que transforma el formato de fecha del input paraa poder ser usado por el programa y realizar los calculos
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

// funcion que transforma el formato de la fecha usada por el programa en un formato para poder ser presentado en la interface
function formatoFecha2(date) {
    let d2 = date

    ano2 = parseInt(String(d2).substring(0, 4));
    mes2 = parseInt(String(d2).substring(5, 7));
    dia2 = parseInt(String(d2).substring(8, 10));

    return [dia2, mes2, ano2].join('/')
}