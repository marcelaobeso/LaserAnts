import express from "express";
import bodyParser from "body-parser"

let lastId = 0;
let productos = [
    {
        codigo: 1, 
        nombre: "producto 1", 
        precio: 10, 
        cantidad: 100
    },
    {
        codigo: 2, 
        nombre: "producto 2", 
        precio: 50, 
        cantidad: 200
    }
];

const app = express();

app.use(bodyParser.json({type: 'application.json'}));
app.use(logs);

app.get("/", (req, res)=> res.send("<h1>API de productos</h1>"))
app.get("/productos", (req, res)=> res.json(productos));

app.post("/productos", (req,res)=>{
    lastId++;
    const producto = {...req.body, codigo: lastId}
    productos.push(producto);
    res.status(201)
    res.json(producto)
})

app.put("/productos/:codigo", (req, res) => {
    const codigo = parseInt(req.params.codigo, 10);
    const producto = productos.find(p => p.codigo == codigo);
    if(!producto){
        res.status(404);
        res.json({mensaje: "no hay"});
    } else {
        const index = productos.indexOf(productos);
        const newProduct = productos[index]
    }
})

app.listen(5000, () => {
    console.log("servidor escuchando en puerto 5000");
});

function logs (req, res, next) 
{
    console.log(`${req.method}: ${req.originalUrl}`);
    next();
}

