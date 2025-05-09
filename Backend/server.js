const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const { parse } = require('dotenv');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function connect() {
    try {
        await client.connect();
        console.log('Conectado a MongoDB Atlas');
        const db = client.db('minimercado');
        return db;
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        throw error;
    }
}

connect().then(db => {
    // Rutas para Unidades de Medida
    app.get('/api/unidades-medida', async (req, res) => {
        try {
            const unidades = await db.collection('unidades_medida').find().toArray();
            res.json(unidades);
        } catch (error) {
            console.error('Error al obtener unidades de medida:', error);
            res.status(500).json({ error: 'Error al obtener unidades de medida' });
        }
    });

    app.post('/api/unidades-medida', async (req, res) => {
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(400).json({ error: 'El nombre es requerido' });
        }
        try {
            const result = await db.collection('unidades_medida').insertOne({ nombre });
            const nuevaUnidad = await db.collection('unidades_medida').findOne({ _id: result.insertedId });
            res.status(201).json(nuevaUnidad);
        } catch (error) {
            console.error('Error al crear unidad de medida:', error);
            res.status(500).json({ error: 'Error al crear unidad de medida' });
        }
    });

    // Rutas para Marcas
    app.get('/api/marcas', async (req, res) => {
        try {
            const marcas = await db.collection('marcas').find().toArray();
            res.json(marcas);
        } catch (error) {
            console.error('Error al obtener marcas:', error);
            res.status(500).json({ error: 'Error al obtener marcas' });
        }
    });

    app.post('/api/marcas', async (req, res) => {
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(400).json({ error: 'El nombre es requerido' });
        }
        try {
            const result = await db.collection('marcas').insertOne({ nombre });
            const nuevaMarca = await db.collection('marcas').findOne({ _id: result.insertedId });
            res.status(201).json(nuevaMarca);
        } catch (error) {
            console.error('Error al crear marca:', error);
            res.status(500).json({ error: 'Error al crear marca' });
        }
    });

    // Rutas para Ubicaciones
    app.get('/api/ubicaciones', async (req, res) => {
        try {
            const ubicaciones = await db.collection('ubicaciones').find().toArray();
            res.json(ubicaciones);
        } catch (error) {
            console.error('Error al obtener ubicaciones:', error);
            res.status(500).json({ error: 'Error al obtener ubicaciones' });
        }
    });

    app.post('/api/ubicaciones', async (req, res) => {
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(400).json({ error: 'El nombre es requerido' });
        }
        try {
            const result = await db.collection('ubicaciones').insertOne({ nombre });
            const nuevaUbicacion = await db.collection('ubicaciones').findOne({ _id: result.insertedId });
            res.status(201).json(nuevaUbicacion);
        } catch (error) {
            console.error('Error al crear ubicación:', error);
            res.status(500).json({ error: 'Error al crear ubicación' });
        }
    });

    // Rutas para Proveedores
    app.get('/api/proveedores', async (req, res) => {
        try {
            const proveedores = await db.collection('proveedores').find().toArray();
            res.json(proveedores);
        } catch (error) {
            console.error('Error al obtener proveedores:', error);
            res.status(500).json({ error: 'Error al obtener proveedores' });
        }
    });

    app.post('/api/proveedores', async (req, res) => {
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(400).json({ error: 'El nombre es requerido' });
        }
        try {
            const result = await db.collection('proveedores').insertOne({ nombre });
            const nuevoProveedor = await db.collection('proveedores').findOne({ _id: result.insertedId });
            res.status(201).json(nuevoProveedor);
        } catch (error) {
            console.error('Error al crear proveedor:', error);
            res.status(500).json({ error: 'Error al crear proveedor' });
        }
    });

    // Ruta para obtener el stock de productos
    app.get('/api/stock', async (req, res) => {
        try {
            const stock = await db.collection('productos').find().toArray();
            res.json(stock);
        } catch (error) {
            console.error('Error al obtener el stock:', error);
            res.status(500).json({ error: 'Error al obtener el stock' });
        }
    });

    // Ruta para actualizar un producto existente
    app.put('/api/productos/:id', async (req, res) => {
        const { cantidad } = req.body;
        const { id } = req.params;

        if (!cantidad) {
            return res.status(400).json({ error: 'Cantidad es requerida para actualizar.' });
        }

        try {
            const product = await db.collection('productos').findOne({ _id: new ObjectId(id) });

            if (!product) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            const nuevaCantidad = parseInt(product.cantidad) + parseInt(cantidad);

            const result = await db.collection('productos').updateOne(
                { _id: new ObjectId(id) },
                { $set: { cantidad: nuevaCantidad } }
            );

            if (result.modifiedCount > 0) {
                res.json({ message: 'Stock actualizado exitosamente' });
            } else {
                res.status(404).json({ error: 'Producto no encontrado al actualizar' });
            }
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            res.status(500).json({ error: 'Error al actualizar el producto' });
        }
    });

    // Ruta para crear un nuevo producto
    app.post('/api/productos', async (req, res) => {
        const { nombreProducto, cantidad, unidadMedida, ubicacion, marca, proveedor } = req.body;
        if (!nombreProducto || !cantidad || !unidadMedida || !ubicacion || !marca || !proveedor) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }
        try {
            const result = await db.collection('productos').insertOne({
                nombreProducto,
                cantidad: parseInt(cantidad),
                unidadMedida,
                ubicacion,
                marca: marca, // Guardamos la marca por separado
                proveedor: proveedor // Guardamos el proveedor por separado
            });
            res.status(201).json({ message: 'Producto creado exitosamente', _id: result.insertedId });
        } catch (error) {
            console.error('Error al crear el producto:', error);
            res.status(500).json({ error: 'Error al crear el producto' });
        }
    });

    // Ruta para registrar la salida de un producto (restar del stock)
    app.put('/api/productos/salida/:id', async (req, res) => {
        const { cantidad } = req.body;
        const { id } = req.params;

        if (!cantidad || parseInt(cantidad) <= 0) {
            return res.status(400).json({ error: 'La cantidad a retirar debe ser un número positivo.' });
        }

        try {
            const product = await db.collection('productos').findOne({ _id: new ObjectId(id) });
            if (!product) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            const nuevaCantidad = parseInt(product.cantidad) - parseInt(cantidad);

            if (nuevaCantidad < 0) {
                return res.status(400).json({ error: 'No hay suficiente stock para retirar esa cantidad.' });
            }

            const result = await db.collection('productos').updateOne(
                { _id: new ObjectId(id) },
                { $set: { cantidad: nuevaCantidad } }
            );

            if (result.modifiedCount > 0) {
                res.json({ message: 'Salida de stock registrada exitosamente' });
            } else {
                res.status(404).json({ error: 'Producto no encontrado (al actualizar el stock)' });
            }
        } catch (error) {
            console.error('Error al registrar la salida de stock:', error);
            res.status(500).json({ error: 'Error al registrar la salida de stock' });
        }
    });

    app.listen(port, () => {
        console.log(`Servidor backend escuchando en http://localhost:${port}`);
    });
}).catch(() => {
    // No necesitamos client.close() aquí ya que la conexión falló inicialmente
});
