// Elementos del DOM
const input = document.getElementById("input")
const select = document.getElementById("select")
const btnConvert = document.getElementById("btnConvertir")
const result = document.getElementById("result")
const error = document.getElementById("error")


const apiDolar = "https://mindicador.cl/api/dolar"
const apiEuro = "https://mindicador.cl/api/euro"
const apiUTM = "https://mindicador.cl/api/utm"

// funcion para convertir moneda

const convertMonedas = async () => {
    try {

    
    
        // respuestas monedas
        const resDolar = await fetch(apiDolar)
        const resEuro = await fetch(apiEuro)
        const resUTM = await fetch(apiUTM)
    
        // JSON
        const datosDolar = await resDolar.json()
        const datosEuro = await resEuro.json()
        const datosUTM = await resUTM.json()
    
        // Valores de Monedas 
    
        const valorDolar = datosDolar.serie[0].valor
        const valorEuro = datosEuro.serie[0].valor
        const valorUTM = datosUTM.serie[0].valor


        // Evento

        btnConvert.addEventListener("click", ()=> {
            if ( select.value === "dolar"){
                let cambio = input.value / valorDolar
                result.innerHTML = cambio.toFixed(2)

            } else if (select.value === "euro"){
                let cambio = input.value / valorEuro
                result.innerHTML = cambio.toFixed(2)

            }else if (select.value === "utm"){
                let cambio = input.value / valorUTM
                result.innerHTML = cambio.toFixed(3)

            }
            input.value = ""
            
        })


    
    } catch (error) {
        // capturar el error en consola
        console.log("ERROR", error, error.message)
        // mensaje amigable para el usuario :)
        error.innerHTML = "Lo sentimos, ha ocurrido un error"

        
    }

}

const getData = async ()=>{
    let apiUrl
    try {
        if (select.value === "dolar"){
            apiUrl = apiDolar
        }else if (select.value === "euro"){
            apiUrl = apiEuro
        }else if (select.value === "utm"){
            apiUrl = apiUTM
        }

        const res = await fetch(apiUrl)
        const datos = await res.json()
        return datos
    } catch (error) {
        console.log("ERROR:",error)
        return []
    }
}

const preparacionConfiguracion = async () => {
    const datos = await getData();

    if (!datos || (Array.isArray(datos) && datos.length === 0)) {
        console.error('Los datos no son válidos:', datos);
        return null;
    }

    const tipoDeGrafica = "line";
    let fechas, titulo, colorDeLinea, valores;

    if (Array.isArray(datos)) {
        fechas = datos.map(item => item.fecha || '');
        titulo = input.value;
        colorDeLinea = "red";
        valores = datos.map(item => {
            const valor = (item.valor || '').replace(",", ".");
            return Number(valor);
        });
    } else {
        fechas = [datos.fecha];
        titulo = input.value;
        colorDeLinea = "red";
        valores = [Number((datos.valor || '').replace(",", "."))];
    }

    const config = {
        type: tipoDeGrafica,
        data: {
            labels: fechas,
            datasets: [
                {
                    label: titulo,
                    backgroundColor: colorDeLinea,
                    data: valores,
                },
            ],
        },
    };
    return config;
};

const render = async () => {
    const config = await preparacionConfiguracion();
    if (config) {
        const chartDom = document.getElementById("myChart");
        new Chart(chartDom, config);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    convertMonedas();
    render();
});
