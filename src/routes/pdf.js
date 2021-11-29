const puppeteer = require("puppeteer")


async function crearfacturas(url){
console.log("Entro segunda funcion")
    let navegador=await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"]
  })
console.log("1")
    let pagina = await navegador.newPage()
console.log("2")
    await pagina.goto(url)
console.log("3")
    let pdf=await pagina.pdf()
console.log("4")
    navegador.close()
console.log("5")
    return pdf
}


module.exports={

    factura(req,res){
        console.log("Entro a la pagina de la factura")
        res.render("factura.hbs",{ layout:"mainpdf"})
        console.log("Salio a la pagina de la factura")
    },

    async descargar(req,res){
        console.log("Entro")
        let pdf=await crearfacturas("https://ejemplo-name.herokuapp.com/ver")
        console.log("Salio")
        res.contentType("application/pdf")
        res.send(pdf)

    }

}
