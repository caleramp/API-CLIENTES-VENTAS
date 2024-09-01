import { Router } from "express";
 
import { 
    getAll,
    create,
    getById,
    update,
    deletecliente,
    deletelogico 
   
} from "../controllers/Venta_Vehiculos.controller.js";

const router = Router();

//CRUD estas son las rutas que voy a necesitar en postman

//Create
router.post("/Venta_Vehiculo/create", create);
//Read simple
router.post("/Venta_Vehiculo/getAll", getAll);
//Read con parametro
router.post("/Venta_Vehiculo/GetById", getById); //usar id_cliente para que nos salga la info en postman

//Update
router.post("/Venta_Vehiculo/update", update);

//Delete fisico
router.post("/Venta_Vehiculo/delete", deletecliente);

//Delete logico
router.post("/Venta_Vehiculo/deletelogico", deletelogico);

export default router;
