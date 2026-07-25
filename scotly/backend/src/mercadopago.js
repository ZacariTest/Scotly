import { MercadoPagoConfig } from 'mercadopago';
import dotenv from 'dotenv';

dotenv.config();

const mpClient = new MercadoPagoConfig({
  accessToken: (process.env.MERCADOPAGO_ACCESS_TOKEN || '').trim(),
});

export default mpClient;