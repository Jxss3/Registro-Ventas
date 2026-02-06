let registros = {};

const guardado = localStorage.getItem("registros");
if (guardado) {
    registros = JSON.parse(guardado);
}

const mostrarVentas = document.getElementById("mostrar-ventas")
const mostrarGastos = document.getElementById("mostrar-gastos")
const mostrarGanancias = document.getElementById("mostrar-ganancias")


const btnVentas = document.getElementById("btnVentas")
const btnGastos = document.getElementById("btnGastos")
const btnBorrar = document.getElementById("btnBorrar")
const controlFecha = document.getElementById("btn-fecha");

function FechaLocal() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

controlFecha.value = FechaLocal();

function obtenerDiaActivo() {
   const fecha = controlFecha.value;

    if (!registros[fecha]) {
        registros[fecha] = { ventas: 0, gastos: 0 };
        localStorage.setItem("registros", JSON.stringify(registros));
    }

    return registros[fecha];
}

function actualizarPantalla() {
    const dia = obtenerDiaActivo();
    const ganancias = dia.ventas - dia.gastos;

    mostrarVentas.textContent = "$" + dia.ventas.toFixed(2);
    mostrarGastos.textContent = "$" + dia.gastos.toFixed(2);
    mostrarGanancias.textContent = "$" + ganancias.toFixed(2);

    if (ganancias === 0) {
        mostrarGanancias.style.color = "grey";
    } else if (ganancias < 0) {
      mostrarGanancias.style.color = "red";
    } else {
      mostrarGanancias.style.color = "green";
    } 
}

function agregarVenta() {
    const valor = parseFloat(prompt("Ingrese el monto"));
    if (isNaN(valor)) return;
    
    const dia = obtenerDiaActivo();
    dia.ventas += valor;

    localStorage.setItem("registros", JSON.stringify(registros));
    actualizarPantalla();
}

function agregarGastos() {
    const valorGasto = parseFloat(prompt("Ingrese el monto del gasto"));
    if (isNaN(valorGasto)) return;

    const dia = obtenerDiaActivo();
    dia.gastos += valorGasto;

    localStorage.setItem("registros", JSON.stringify(registros));
    actualizarPantalla();
}

function borrarDatos() {
    const dia = obtenerDiaActivo();
    dia.ventas = 0;
    dia.gastos = 0;


    localStorage.setItem("registros", JSON.stringify(registros));
    actualizarPantalla();
}

btnVentas.addEventListener("click", agregarVenta);
btnGastos.addEventListener("click", agregarGastos);
btnBorrar.addEventListener("click", borrarDatos);

controlFecha.addEventListener("change", actualizarPantalla);

actualizarPantalla();