import express from 'express';
import fs from 'fs';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT = 8000;

app.get('/', (req, res) => {
    fs.readFile('./views/index.html', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error en el servidor');
        } else {
            res.send(data.toString());
        }
    })
});

app.get("/:ruta", (req, res) => {
    fs.readFile(`./views/${req.params.ruta}.html`, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error en el servidor');
        } else {
            res.send(data.toString());
        }
    })
});

app.post("/enviar-form", (req, res) => {
    try {
        const { nombre, email, mensaje } = req.body;
        if (!nombre || !email || !mensaje) {
            res.status(404).json({
                status: 'error',
                message: 'Faltan datos causa'
            });
        } else {
            res.status(200).json({
                status: 'ok',
                message: 'Ta bien'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Ocurrio un problema mi king'
        });
    }
})

app.listen(PORT, () => {
    console.log(`Mi lab esta corriendo en el puerto ${PORT}`);
});