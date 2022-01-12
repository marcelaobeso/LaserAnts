import express from "express";
import bodyParser from "body-parser"
import cors from "cors";


let lastId = 3;
let productos = [
    {
        nombre: "producto 1", 
        precio: 10, 
        cantidad: 12,
        codigo: 1, 
        total: 120
    },
    {
        nombre: "producto 2", 
        precio: 50, 
        cantidad: 20,
        codigo: 2,
        total: 1000
    }
];

const app = express();
app.use(cors())
app.use(bodyParser.json({type: 'application.json'}));
app.use(logs);

app.get("/", (req, res)=> res.send("<h1>API de productos</h1>"))
app.get("/productos", (req, res)=> res.json(productos));

app.post("/productos", (req,res)=>{
    lastId++;
    const { cantidad, precio} = req.body;
    const producto = {...req.body, codigo: lastId, total: cantidad * precio}
    productos.push(producto);
    res.status(201)
    res.json(producto)
})

app.get("/productos/:codigo", (req, res) => {
    const codigo = parseInt(req.params.codigo, 10);
    const producto = productos.find(p => p.codigo == codigo);
    if(!producto){
        res.status(404);
        res.json({mesaage: "no hay"});
    } else {
        res.status(200);
        res.json(producto);
    }
});

app.get("/productos", (req, res) => {
    const filtro = req.query.filtro;

    if (filtro)
    {
        res.json(productos.filter(p => p.nombre.indexOf(filtro) >= 0))
    } else {
        res.json(productos)
    }
});

app.put("/productos/:codigo", (req, res) => {
    const codigo = parseInt(req.params.codigo, 10);
    const producto = productos.find(p => p.codigo == codigo);
    if(!producto){
        res.status(404);
        res.json({mesaage: "no hay"});
    } else {
        const {cantidad, precio} = req.body;
        const index = productos.indexOf(producto);
        const newProduct = productos[index] = { ...req.body, codigo, total: cantidad * precio };
        res.status(200);
        res.json(newProduct);
    }
});

app.delete("/productos/:codigo", (req, res) => {
    const codigo = parseInt(req.params.codigo);
    const producto = productos.find(p => p.codigo == codigo);
    if(!producto){
        res.status(404);
        res.json({message: "no hay"});
    } else {
        productos = productos.filter(x=> x != producto)
        res.status(200);
        res.json({message: "producto eliminado"});
    }

})

app.listen(5001, () => {
    console.log("servidor escuchando en puerto 5001");
});

function logs (req, res, next) 
{
    console.log(`${req.method}: ${req.originalUrl}`);
    next();
}

