

export const querys = {

    //CRUD aca se guardas las ejecuciones de los SP, probar en SQL solo cambiar la variables por la información que queiro

    //Create
        create: "EXEC sp_Usuario_insertar @nombre, @apellido1 , @apellido2,@telefono ,@direccion ,@fecha_de_nacimiento ,@cedula,@estado",

    //Read simple
        getAll : "EXEC SP_LIST_CLIENTES",

    //Read con parametro
        getById : "EXEC sp_usuario_by_id @id",

    //Update
       update : "EXEC sp_clientes_actualizar @nombre, @apellido1 , @apellido2,@telefono ,@direccion ,@fecha_de_nacimiento ,@cedula,@estado, @id",

    //Delete fisico
        delete : "EXEC sp_acliente_borrar @idValor",

    //Delete logico
    deletelogico : "EXEC sp_clientes_borradologico @idValor",

}