const puppeteer = require("puppeteer")


async function crearfacturas(url){
    let navegador=await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"]})
    let pagina = await navegador.newPage()
    await pagina.goto(url)
    let pdf=await pagina.pdf()
    navegador.close()
    return pdf
}


module.exports={

    factura(req,res){
        res.render("factura.hbs",{ layout:"mainpdf"})
    },

    async descargar(req,res){
        let pdf=await crearfacturas("https://ejemplo-name.herokuapp.com/ver")
        res.contentType("application/pdf")
        res.send(pdf)

    }

}
