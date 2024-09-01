import express from "express";
import cors from "cors";
import Venta_VehiculoRoutes from "./routes/Venta_Vehiculo.routes.js";
import morgan from "morgan";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' assert { type: "json" };
import config from "./config.js";

const app = express();
//const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json');

// settings
app.set("port", config.port);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Routes
app.use("/api", Venta_VehiculoRoutes);

export default app;
