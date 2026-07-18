import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import regalosRoutes from './routes/regalos.js';
import usuariosRoutes from './routes/usuarios.js';
import tiendaRoutes from './routes/tienda.js';
import invasionRoutes from './routes/invasion.js';
import inventarioRoutes from './routes/inventario.js';
import gachaRoutes from './routes/gacha.js';
import cursosPagosRoutes from './routes/cursosPagos.js';
import progresoRoutes from './routes/progreso.js';
import adminRoutes from './routes/admin.js';
import historiaRoutes from './routes/historia.js';
import exploracionRoutes from './routes/exploracion.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.get('/', (req, res) => {
  res.json({ message: 'Scotly API funcionando 🎮' });
});

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/regalos', regalosRoutes);
app.use('/api/inventario', inventarioRoutes);
app.use('/api/tienda', tiendaRoutes);
app.use('/api/invasion', invasionRoutes);
app.use('/api/gacha', gachaRoutes);
app.use('/api/cursos-pagos', cursosPagosRoutes);
app.use('/api/progreso', progresoRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/historia', historiaRoutes);
app.use('/api/exploracion', exploracionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});