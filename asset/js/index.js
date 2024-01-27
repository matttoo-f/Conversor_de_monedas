// Elementos del DOM
const input = document.getElementById("input")
const select = document.getElementById("select")
const btnConvert = document.getElementById("btnConvertir")
const result = document.getElementById("result")
const graph = document.getElementById("myChart")
const error = document.getElementById("error")

// funcion para convertir moneda

const convertMonedas = async () => {
    try {
        const apiDolar = "https://mindicador.cl/api/dolar"
        const apiEuro = "https://mindicador.cl/api/euro"
        const apiUTM = "https://mindicador.cl/api/utm"
    
    
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
convertMonedas()

