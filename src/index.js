import express from 'express';
import morgan from 'morgan';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/api.routes.js';
import cors from'cors';



// Initialization
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Setting
app.set('port', process.env.PORT || 8000);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// routes
// app.get('/', (req, res) => {
//     res.json('index')
// });

app.use(apiRoutes);

// Public files
app.use(express.static(join(__dirname, 'public')));

// Run server
app.listen(app.get('port'), () =>
    console.log('El servidor esta escuchando en el port:' + app.get('port')));