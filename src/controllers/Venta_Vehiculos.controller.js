
import { getConnection, querys, sql } from "../models/index.js";

//aca esta toda la lógica que queiro para mi api, poner mucha antención y analizar cada linea.

// Create, aca puedo crear otros usuario en mi base de datos

export const create = async ( request, result ) => {

    const { nombre, apellido1, apellido2, telefono, direccion, fecha_de_nacimiento, cedula, estado } = request.body;
    // console.log("nombre:" + nombre)
    
    try {
        const pool = await getConnection();
    
        const resultCreate = await pool
            .request()
            .input("nombre", sql.NVarChar, nombre)
            .input("apellido1", sql.NVarChar, apellido1)
            .input("apellido2", sql.NVarChar, apellido2)
            .input("telefono", sql.NVarChar, telefono)
            .input("direccion", sql.NVarChar, direccion)
            .input("fecha_de_nacimiento", sql.Date, fecha_de_nacimiento)
            .input("cedula", sql.NVarChar, cedula)
            .input("estado", sql.Bit, estado)
            .query(querys.create);

        //console.log("resultCreate : " + JSON.stringify(resultCreate) );
        //console.log(resultCreate.recordset[0].msj_tipo);

        if(resultCreate.recordsets[0].msj_tipo === "success"){

            const completeResult = 
            {
                "respuesta_tipo" : resultCreate.recordsets[0].msj_tipo,
                "respuesta_detalle" :resultCreate.recordsets[0].msj_texto,
            }

            return result.json(completeResult);

        }
        else if(resultCreate.recordset[0].msj_tipo === "warning"){
            
            const completeResult = 
            {
                "respuesta_tipo" : resultCreate.recordset[0].msj_tipo,
                "respuesta_detalle" :resultCreate.recordset[0].msj_texto,
            }

            return result.json(completeResult);
        }
        else if(resultCreate.recordsets[0].msj_tipo === "error"){
            
            const completeResult = 
            {
                "respuesta_tipo" : resultCreate.recordsets[0].msj_tipo,
                "respuesta_detalle" :resultCreate.recordsets[0].msj_texto,
            }

            return result.json(completeResult);
        }

    } catch (error) {
        result.status(500);
        result.send(error.message);
    }

}

// Read simple puedo ver todos los usuario que tengo en BD
export const getAll = async (request, result)=> {


    try {
        const pool = await getConnection();
        const resultClientes = await pool
        .request()
        .query(querys.getAll);

       // console.log(resultClientes.recordset);

        if (resultClientes.recordsets[1][0].msj_tipo === "success") {
            
            const completeResult = {
                "respuesta_tipo": resultClientes.recordsets[1][0].msj_tipo,
                "repuesta_detalle": resultClientes.recordsets[1][0].msj_text,
                "datos": resultClientes.recordset,
            }

            return result.json(completeResult);
        } 
        else if (resultClientes.recordsets[1][0].msj_tipo === "warning") {
            const completeResult = {
                "respuesta_tipo": resultClientes.recordsets[1][0].msj_tipo,
                "repuesta_detalle": resultClientes.recordsets[1][0].msj_text,
                "datos": '',
            }

            return result.json(completeResult);
        }

    } 
    catch (error) {
        result.status(500);
        result.send(error.message);
    }
};

//Read con parametro puedo ver los cliente uno a uno solo escogiendo el ID
export const getById = async (request, result) => {

    const { id_cliente } = request.body;


    try {

        const pool = await getConnection();

        const resultCliente = await pool
        .request()
        .input( "id", sql.Int, id_cliente )
        .query(querys.getById);

        console.log("resultCliente : "  + resultCliente);

        if(resultCliente.recordsets[1][0].msj_tipo === "success" ){

            const completeResult = 
            {
                    "respuesta_tipo" : resultCliente.recordsets[1][0].msj_tipo,
                    "respuesta_detalle" : resultCliente.recordsets[1][0].msj_texto,
                    "datos" : resultCliente.recordsets[0]
            }

            return result.json(completeResult)

        }
        else if(resultCliente.recordsets[1][0].msj_tipo === "warning" ){

            const completeResult = 
            {
                    "respuesta_tipo" : resultCliente.recordsets[1][0].msj_tipo,
                    "respuesta_detalle" : resultCliente.recordsets[1][0].msj_texto,
                    "datos" : '',
            }

            return result.json(completeResult)

        }


        
    } catch (error) {

        result.status(500);
        result.send(error.message);
        
    }



}


//Update puedo actualizar un registro  
export const update = async( request, result ) => {

    try {
        
            const { nombre, apellido1, apellido2, telefono, direccion, fecha_de_nacimiento, cedula, estado, id } = request.body;
    
            const pool = await getConnection();
    
            const resultUpdate = await pool
                .request()
                .input("nombre", sql.NVarChar, nombre)
                .input("apellido1", sql.NVarChar, apellido1)
                .input("apellido2", sql.NVarChar, apellido2)
                .input("telefono", sql.NVarChar, telefono)
                .input("direccion", sql.NVarChar, direccion)
                .input("fecha_de_nacimiento", sql.Date, fecha_de_nacimiento)
                .input("cedula", sql.NVarChar, cedula)
                .input("estado", sql.Bit, estado)
                .input("id", sql.Int, id)
                .query(querys.update);

        // console.log(resultUpdate);

        if(resultUpdate.recordset[0].msj_tipo === "success"){

            const resultComplete = 
            {
                "respuesta_tipo" : resultUpdate.recordset[0].msj_tipo,
                "respuesta_detalle" :resultUpdate.recordset[0].msj_texto,
            }

            return result.json(resultComplete);

        }
        else if(resultUpdate.recordset[0].msj_tipo === "warning"){

            const resultComplete = 
            {
                "respuesta_tipo" : resultUpdate.recordset[0].msj_tipo,
                "respuesta_detalle" :resultUpdate.recordset[0].msj_texto,
            }

            return result.json(resultComplete);

        }
        else if(resultUpdate.recordset[0].msj_tipo === "error"){

            const resultComplete = 
            {
                "respuesta_tipo" : resultUpdate.recordset[0].msj_tipo,
                "respuesta_detalle" :resultUpdate.recordset[0].msj_texto,
            }

            return result.json(resultComplete);

        }
        
        
        
    } catch (error) {

        result.status(500);
        result.send(error.message);
    }

}
//Borrado fisico, borra toda la información de la base de datos, no es la mejor opción. Es mejor poner el estado en 0 o en false y hacer un filtros con los usuario activos
export const deletecliente = async ( request, result ) => {

    try {

        const { id } = request.body;
        
        const pool = await getConnection();

        const resultDelete = await pool
        .request()
        .input("idValor", sql.Int, id )
        .query(querys.delete);

        //console.log(resultDelete);


        if(resultDelete.recordset[0].msj_tipo === "success"){

            const resultComplete = 
            {
                "respuesta_tipo" : resultDelete.recordset[0].msj_tipo,
                "respuesta_detalle" :resultDelete.recordset[0].msj_texto,
            }

            return result.json(resultComplete);

        }
        else if(resultDelete.recordset[0].msj_tipo === "warning"){

            const resultComplete = 
            {
                "respuesta_tipo" : resultDelete.recordset[0].msj_tipo,
                "respuesta_detalle" :resultDelete.recordset[0].msj_texto,
            }

            return result.json(resultComplete);

        }
        else if(resultDelete.recordset[0].msj_tipo === "error"){

            const resultComplete = 
            {
                "respuesta_tipo" : resultDelete.recordset[0].msj_tipo,
                "respuesta_detalle" :resultDelete.recordset[0].msj_texto,
            }

            return result.json(resultComplete);
            

        }


    } catch (error) {
        result.status(500);
        result.send(error.message);
    }

}

//Borrado logico son todos lo que estan estado 0
export const deletelogico= async ( request, result ) => {

    try {

        const { id } = request.body;
        
        const pool = await getConnection();

        const resultDelete = await pool
        .request()
        .input("idValor", sql.Int, id )
        .query(querys.deletelogico);

        //console.log(resultDelete);


        if(resultDelete.recordset[0].msj_tipo === "success"){

            const resultComplete = 
            {
                "respuesta_tipo" : resultDelete.recordset[0].msj_tipo,
                "respuesta_detalle" :resultDelete.recordset[0].msj_texto,
            }

            return result.json(resultComplete);

        }
        else if(resultDelete.recordset[0].msj_tipo === "warning"){

            const resultComplete = 
            {
                "respuesta_tipo" : resultDelete.recordset[0].msj_tipo,
                "respuesta_detalle" :resultDelete.recordset[0].msj_texto,
            }

            return result.json(resultComplete);

        }
        else if(resultDelete.recordset[0].msj_tipo === "error"){

            const resultComplete = 
            {
                "respuesta_tipo" : resultDelete.recordset[0].msj_tipo,
                "respuesta_detalle" :resultDelete.recordset[0].msj_texto,
            }

            return result.json(resultComplete);
            

        }


    } catch (error) {
        result.status(500);
        result.send(error.message);
    }

}



