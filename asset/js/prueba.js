// Objetos del DOM
const inputMonedaHtml=document.getElementById("moneda")
const selectMonedaHtml=document.getElementById("btnSeleccion")
const btnBuscarHtml=document.getElementById("btnBuscar")
const spanResultadoHtml=document.getElementById("resultado")
console.log(inputMonedaHtml)

const apiURLUf="https://mindicador.cl/api/uf";
const apiURLDolar="https://mindicador.cl/api/dolar";

async function getMonedaUf() {
    try{
    const res = await fetch(apiURLUf);
    const monedaUf = await res.json();
    return monedaUf;
    }
    catch(error){
        alert("El error es:",error.message)
    }
}
//console.log(getMonedaUf())
async function getMonedaDolar() {
    try{
    const res = await fetch(apiURLDolar);
    const monedaDolar = await res.json();
    return monedaDolar;

    }
    catch(error){
        alert("El error es:",error.message)
    }
}
btnBuscarHtml.addEventListener("click",()=>{
    if (selectMonedaHtml.value==="dolar"){
            async function valorDolar() {
                const dolarDia = await getMonedaDolar()    
                const varDolarDia= dolarDia.serie[0].valor;
                console.log(varDolarDia)
            
            const valorInput= inputMonedaHtml.value
            
            const conversionDolar=(valorInput/varDolarDia).toFixed(4)
            console.log(valorInput)
            console.log(conversionDolar)
        
            spanResultadoHtml.innerHTML=`Total: ${conversionDolar}`   
            
            }
            valorDolar()
        
    }else if (selectMonedaHtml.value==="uf"){
          async function valorUf() {
                    const ufDia = await getMonedaUf()    
                    const varUfDia= ufDia.serie[0].valor;
                    console.log(varUfDia)
                    const valorInput= inputMonedaHtml.value
                    const conversionUf=(valorInput/varUfDia).toFixed(4)
                    console.log(valorInput)
                    console.log(conversionUf)
                    spanResultadoHtml.innerHTML=`Total: ${conversionUf}`   
                    }
                    valorUf()
                }
                
            

        })