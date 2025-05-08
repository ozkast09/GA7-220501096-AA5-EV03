const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const {MongoClient}=require('mongodb');
const bodyParser=require('body-parser');

dotenv.config();

const app=express();
const port=process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const uri=process.env.MONGO_URI;    
let client;
let db;

async function connectToDatabase() {
    try {
        client=new MongoClient(uri);//usa la base de datos
        console.log('Conectado a MOngoDB Atlas');
    } catch (error) {
        console.error('Error al conectar a MongoDB Atlas:',error);
        process.exit(1);
    }
    
}

connectToDatabase().then(()=>{
        //Rutas del Backend
app.get('/api/stock',async(req,res)=>{

    try {
        const stock=await db.collection('productos').find().toArray();
        res.json(stock);
    } catch (error) {
        console.error('Error al obtener el stock',error);
        res.status(500).json({error:'Error al obtener el stock'});
    }
});

app.post('/api/productos',async(req,res)=>{
    const{nombreProducto,cantidad,unidadMedida,ubicacion,marcaProveedor}=req.body;
    if(!nombreProducto||!cantidad||!unidadMedida||!ubicacion||!marcaProveedor){
        return res.status(400).json({error:'Todos los campos son requeridos'});  
    }
    try {
        const result=await db.collection('productos').insertOne({
            nombreProducto,
            cantidad:parseInt(cantidad),
            unidadMedida,
            ubicacion,
            marcaProveedor
        });
        res.status(201).json({message:'Producto creado exitosamente',_id: result.insertId});
    } catch (error) {
        console.error('Error al crear el producto',error);
        res.status(500).json({error:'Error al crear producto'});
        }
});

app.listen(port,()=>{
    console.log('Servidor backend escuchado en http://localhost:${port}');
});

});




