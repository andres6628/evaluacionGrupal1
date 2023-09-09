movimientos = [
    { numeroCuenta: "02234567", monto: 10.24, tipo: "D" },
    { numeroCuenta: "02345211", monto: 45.90, tipo: "D" },
    { numeroCuenta: "02234567", monto: 65.23, tipo: "C" },
    { numeroCuenta: "02345211", monto: 65.23, tipo: "C" },
    { numeroCuenta: "02345211", monto: 12.0, tipo: "D" },
]
let cuentaMovimientos = [];
cargar = function () {
    mostrarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");

}


 
buscarCuenta = function (cuenta) {
    for (let i = 0; i < movimientos.length; i++) {
        if (movimientos[i].numeroCuenta == cuenta) {
            return movimientos[i];
            
        }

    }
    return null;
}
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
    mostrarMovimientos(movimientosCuenta);
}

/*
    Recibe un arreglo con los movimientos que va a mostrar en pantalla
*/
mostrarMovimientos = function (misMovimientos) {
    //Muestra en pantalla una tabla con los movimientos que recibe en misMovimientos
    let cmpTabla = document.getElementById('tablaMovimientos');
    let tabla = "<table> <thead><tr><td>#</td><td>NUMERO DE CUENTA</td><td>MONTO</td><td>TIPO</td><td>SUELDO</td></tr></thead><tbody>";
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




