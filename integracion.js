cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]

movimientos=[
    {numeroCuenta:"02234567",monto:10.24,tipo:"D"},
    {numeroCuenta:"02345211",monto:45.90,tipo:"D"},
    {numeroCuenta:"02234567",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:12.0,tipo:"D"},
]

/*
    En este archivo se deben colocar todas las funciones de cuentas, movimientos y transacciones
    IMPORTANTE: NO DUPLICAR FUNCIONES, si existe una misma función en varios archivos,
    dejar solo una de ellas, ejemplo la función buscarCuenta
*/

//OCULTAR Y MOSTRAR LOS DIVS, para que cada opción muestre solo su parte
cargar=function(){
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    
}

mostrarMovimientos = function () {
    mostrarComponente("divMovimientos");
    ocultarComponente('divCuentas');
    ocultarComponente("divTransacciones");
}

mostrarTransacciones = function () {
    mostrarComponente("divTransacciones");
    ocultarComponente('divCuentas');
    ocultarComponente("divMovimientos");
}

mostrarCuentas = function () {
    mostrarComponente('divCuentas');
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
}

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
mostrarCuenta=function(){
    /*
        Muestra en pantalla una tabla con la información de todas las cuentas del arreglo.
        Columnas: NUMERO CUENTA, NOMBRE, SALDO
        En la columna NOMBRE concatenar el nombre y el apellido
    */
    let cmpTabla=document.getElementById("tablaCuentas");
    let contenidoTabla="<table><tr>"+
    "<th>NUMERO CUENTA</th>"+
    "<th>NOMBRE</th>"+
    "<th>SALDO</th>"+
    "</tr>"
    let elementoCuenta;
    for (let i = 0; i < cuentas.length; i++) {
        elementoCuenta = cuentas[i];
        contenidoTabla+=
        "<tr><td>"+elementoCuenta.numeroCuenta+"</td>"+
            "<td>"+elementoCuenta.nombre+" "+elementoCuenta.apellido+"</td>"+
            "<td>"+elementoCuenta.saldo+"</td></tr>";
    }
    contenidoTabla+="</table>"
    cmpTabla.innerHTML=contenidoTabla;
}

/*
    Agrega una cuenta al arreglo, solamente si no existe otra cuenta con el mismo numero.
    No retorna nada
*/
agregarCuenta=function(cuenta){
    //Si ya existe mostrar un alert CUENTA EXISTENTE
    //Si se agrega, mostrar un alert CUENTA AGREGADA
    let resultado=buscarCuenta(cuenta.numeroCuenta);
    if(resultado==null){
        cuentas.push(cuenta);
        alert("CUENTA AGREGADA");
        return true;
    }else{
        alert("CUENTA EXISTENTE");
        return false;
    }
}

agregar=function(){
    //Toma los valores de las cajas de texto, sin validaciones
    //Crea un objeto cuenta y agrega los atributos con los valores de las cajas respectivas
    //Invoca a agregarCuenta
    //Invoca a mostrarCuentas
    let valorCedula = recuperarTexto("txtCedula");
    let valorNombre = recuperarTexto("txtNombre");
    let valorApellido = recuperarTexto("txtApellido");
    let valorCuenta = recuperarTexto("txtCuenta");

    let datosCuenta={};
    datosCuenta.cedula=valorCedula;
    datosCuenta.nombre=valorNombre;
    datosCuenta.apellido=valorApellido;
    datosCuenta.numeroCuenta=valorCuenta;
    datosCuenta.saldo=0;
    agregarCuenta(datosCuenta);
    mostrarCuenta();
}

buscarCuenta=function(numeroCuenta){
    let encontrado = null;
    let cuenta;
    for (let i = 0; i < cuentas.length; i++) {
        cuenta = cuentas[i];
        if (numeroCuenta == cuenta.numeroCuenta ) {
            encontrado = cuenta;
            break;
        }  
    }
    return encontrado;
}

ejecutarBusqueda=function(){
    //toma el numero de cuenta de la caja de texto
    //invoca a buscarCuenta y guarda el resultado en una variable
    //Si el resultado es diferente de null, muestra en pantalla, caso contrario muestra un alert
    let valorCuentaNumero = recuperarTexto("txtBusquedaCuenta");
    let resultado = buscarCuenta(valorCuentaNumero);
    if (resultado != null) {
        mostrarTexto("infoNumeroCuenta",resultado.numeroCuenta);
        mostrarTexto("infoCedula",resultado.cedula);
        mostrarTexto("infoNombre",resultado.nombre+" "+resultado.apellido);
        mostrarTexto("infoSaldo",resultado.saldo);
    }else{
        alert("CUENTA NO ENCONTRADA");
    }
            
}
//Cuando se realiza un depósito de forma exitosa, se debe crear un objeto movimiento
//con el tipo C, que corresponde a CREDITO, el número de cuenta a la que se hizo el depósito
//y el monto que se depositó. Este objeto movimiento se agrega al arreglo movimientos

//Cuando se realiza un retiro de forma exitosa, se debe crear un objeto movimiento
//con el tipo D, que corresponde a DEBITO, el número de cuenta a la que se hizo el retiro
//y el monto que se retiró. Este objeto movimiento se agrega al arreglo movimientos

depositar=function(numeroCuenta,monto){
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Al saldo actual de la cuenta afectada, le suma el monto que recibe como parámetro
    cuentaAfectada = buscarCuenta(numeroCuenta);
    if (cuentaAfectada != null) {
        cuentaAfectada.saldo += monto;
        let movimiento = {}
        movimiento.numeroCuenta = numeroCuenta;
        movimiento.monto = monto;
        movimiento.tipo = "C";
        movimientos.push(movimiento);
        mostrarTexto("infoSaldo",cuentaAfectada.saldo);
    }
}

ejecutarDeposito=function(){
    //Toma el numero de cuenta ingresado en la caja de texto
    //Toma el monto ingresado en la caja de texto
    //invoca a depositar
    //Muestra un mensaje TRANSACCION EXITOSA
    //Muestra en pantalla el nuevo saldo de la cuenta
    let valorCuentaNumero = recuperarTexto("txtBusquedaCuenta");
    let valorMonto = recuperarInt("txtMonto");
    depositar(valorCuentaNumero,valorMonto);
    mostrarTexto("lblTransaccion","TRANSACCION EXITOSA");
}

retirar=function(numeroCuenta,monto){
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Valida si la cuenta tiene el saldo suficiente para retirar el monto
    //Si el saldo es suficiente,al saldo actual de la cuenta afectada, le resta el monto que recibe como parámetro
    //Si el saldo no es suficiente, muestra un alert SALDO INSUFICIENTE
    //Si logra retirar muestra un mensaje TRANSACCION EXITOSA y muestra en pantalla el nuevo saldo de la cuenta
    cuentaAfectada = buscarCuenta(numeroCuenta);
    if (cuentaAfectada != null) {
        if (cuentaAfectada.saldo >= monto) {
            cuentaAfectada.saldo -= monto;
            mostrarTexto("lblTransaccion","TRANSACCION EXITOSA");
            mostrarTexto("infoSaldo",cuentaAfectada.saldo);
            let movimiento = {}
            movimiento.numeroCuenta = numeroCuenta;
            movimiento.monto = monto;
            movimiento.tipo = "D";
            movimientos.push(movimiento);
        }else{
            alert("SALDO INSUFICIENTE");
        }
    }
}
ejecutarRetiro=function(){
    let valorCuentaNumero = recuperarTexto("txtBusquedaCuenta");
    let valorMonto = recuperarInt("txtMonto");
    retirar(valorCuentaNumero,valorMonto);
}


let cuentaMovimientos = [];
ejecutarMisMovimiento = function(){
    let numeroCuenta = recuperarTexto('txtCuentaM');
    cuentaMovimientos =  buscarCuenta(numeroCuenta);
    filtrarMovimientos(cuentaMovimientos.numeroCuenta);
}

filtrarMovimientos = function (numeroCuenta) {
    let movimientosCuenta = [];

    //Se barre el arreglo de movimientos
    movimientos.forEach((movimiento) => {
        //En cada iteración, verifica si el numero de cuenta del movimiento es igual al que recibe como parametro
        if (movimiento.numeroCuenta == numeroCuenta) {
            //En caso de serlo, agrega la cuenta al arreglo movimientosCuenta
            movimientosCuenta.push(movimiento);
        }
    });
    //Invoca a mostrarMovimientos, pasándole como parámetro movimientosCuenta
    mostrarMovimiento(movimientosCuenta);
}

/*
    Recibe un arreglo con los movimientos que va a mostrar en pantalla
*/
mostrarMovimiento = function (misMovimientos) {
    //Muestra en pantalla una tabla con los movimientos que recibe en misMovimientos
    let cmpTabla = document.getElementById('tablaMovimientos');
    let tabla = "<table> <thead><tr><td>#</td><td>NUMERO DE CUENTA</td><td>MONTO</td><td>TIPO</td></tr></thead><tbody>";
    for (let i = 0; i < misMovimientos.length; i++) {
        let movimiento = misMovimientos[i];
        if (movimiento.tipo == 'D') {
            //Si el tipo es D(DEBITO), mostrar el monto en negativo (multiplicar por -1)
            movimiento.monto = movimiento.monto * -1;
        }
        let fila = "<tr><td>" + (i+1) + "</td><td>" + movimiento.numeroCuenta + "</td><td>" + (movimiento.monto) + "</td><td>" + movimiento.tipo + "</td></tr>";
        tabla += fila; 
    }

    tabla += "</tbody></table>";
    cmpTabla.innerHTML = tabla;

    //Columnas: NUMERO CUENTA, MONTO, TIPO
    //Si ya pinta correctamente la tabla, hacer el siguiente cambio:
    //Si el tipo es C(CREDITO), mostrar el monto en positivo (tal como está guardado)
}



