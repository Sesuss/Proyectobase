const express = require("express")
const router = express.Router()
const pool = require("../database")
const pdfc =require("../routes/pdf")




//Principal
router.get("/",  (req, res) => {   
    
    res.render("layouts/inicio")
})



//Agregar get
router.get("/agregar/articulo", (req, res) => {
    res.render("layouts/articulos")
})
router.get("/agregar/movimiento", (req, res) => {
    res.render("layouts/movimiento")
})



//Agregar post
router.post("/agregar/movimiento", async (req, res) => {
    let { numero, fecha, tipo, precio, cantidad } = req.body
    const id_articulo = numero
    const newmovimiento = { id_articulo, fecha, tipo, precio, cantidad }
    await pool.query("INSERT INTO movimientos SET ?", [newmovimiento])
    res.redirect("/movimientos")

})

router.post("/agregar/articulo", async (req, res) => {
    let { nombre, cantidad, disponible, precio, descripcion } = req.body
    if (disponible == "Si") {
        disponible = 1
    } else {
        disponible = 0
    }

    const newarticulo = { nombre, cantidad, disponible, precio, descripcion }
    await pool.query("INSERT INTO articulos SET ?", [newarticulo])
    res.redirect("/articulos")
})



//Ver contenido
router.get("/articulos", async (req, res) => {
    const fabricantes = await pool.query("SELECT * FROM fabricante")
    res.render("layouts/verarticulos", { fabricantes })
})





/*router.get("/articulos", async (req, res) => {
    const articulos = await pool.query("SELECT * FROM articulos")
    for (let index = 0; index < articulos.length; index++) {
        if (articulos[index].disponible == 1) {
            articulos[index].disponible = "Si"
        } else { articulos[index].disponible = "No" }
    }
    res.render("layouts/verarticulos", { articulos })
})*/

router.get("/movimientos", async (req, res) => {
    const movimientos = await pool.query("SELECT * FROM movimientos")
    for (let index = 0; index < movimientos.length; index++) {
        if (movimientos[index].tipo == "alta") {
            movimientos[index].tipo = "Alta"
        } else if (movimientos[index].tipo == "baja") {
            movimientos[index].tipo = "Baja"
        } else { movimientos[index].tipo = "Perdida" }
    }
    res.render("layouts/vermovimientos", { movimientos })
})



//Editar
router.get("/editar/movimiento/:id", async (req, res) => {
    const { id } = req.params
    const edicion = await pool.query("SELECT * FROM movimientos WHERE id_movimiento = ?", [id])
    res.render("layouts/editmovimientos", { edicion: edicion[0] })
})
router.post("/editar/movimiento/:id", async (req, res) => {
    const { id } = req.params
    let { numero, fecha, tipo, precio, cantidad } = req.body
    const id_articulo = numero
    const newmovimiento = { id_articulo, fecha, tipo, precio, cantidad }
    await pool.query("UPDATE movimientos SET ? WHERE id_movimiento=?", [newmovimiento, id])
    res.redirect("/movimientos")
})


router.get("/editar/articulo/:id", async (req, res) => {
    const { id } = req.params
    const edicion = await pool.query("SELECT * FROM articulos WHERE id_articulo = ?", [id])
    res.render("layouts/editarticulos", { edicion: edicion[0] })
})
router.post("/editar/articulo/:id", async (req, res) => {
    const { id } = req.params
    let { nombre, cantidad, disponible, precio, descripcion } = req.body
    if (disponible == "Si") {
        disponible = 1
    } else {
        disponible = 0
    }
    const newarticulo = { nombre, cantidad, disponible, precio, descripcion }
    await pool.query("UPDATE articulos SET ? WHERE id_articulo=?", [newarticulo, id])
    res.redirect("/articulos")
})


//Eliminar
router.get("/eliminar/movimiento/:id", async (req, res) => {
    const { id } = req.params
    await pool.query("DELETE FROM movimientos WHERE id_movimiento = ?", [id])
    res.redirect("/movimientos")
})

router.get("/eliminar/articulo/:id", async (req, res) => {
    const { id } = req.params
    await pool.query("DELETE FROM articulos WHERE id_articulo = ?", [id])
    res.redirect("/articulos")
})



//Buscar
router.get("/buscar/articulos", async (req, res) => {
    const articulos = await pool.query("SELECT * FROM articulos")
    for (let index = 0; index < articulos.length; index++) {
        if (articulos[index].disponible == 1) {
            articulos[index].disponible = "Si"
        } else {
            articulos[index].disponible = "No"
        }
    }
    res.render("layouts/buscaarticulos", { articulos })
})
router.get("/buscar/articulosb", async (req, res) => {
    const articulos = await pool.query("SELECT * FROM articulos")
    for (let index = 0; index < articulos.length; index++) {
        if (articulos[index].disponible == 1) {
            articulos[index].disponible = "Si"
        } else {
            articulos[index].disponible = "No"
        }
    }
    res.render("layouts/buscararticulos", { articulos })
})

router.get("/buscar/movimientos", async (req, res) => {
    const movimientos = await pool.query("SELECT * FROM movimientos")
    for (let index = 0; index < movimientos.length; index++) {
        if (movimientos[index].tipo == "alta") {
            movimientos[index].tipo = "Alta"
        } else if (movimientos[index].tipo == "baja") {
            movimientos[index].tipo = "Baja"
        } else { movimientos[index].tipo = "Perdida" }
    }
    res.render("layouts/buscamovimientos", { movimientos })
})


//PDF
router.get("/descargar", pdfc.descargar)
router.get("/ver", pdfc.factura)

//Exportar
module.exports = router