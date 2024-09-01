USE[Venta_vehiculos_CR]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER PROCEDURE [dbo].[sp_clientes_actualizar]
(@nombre nvarchar(25),  @apellido1 nvarchar(40),@apellido2 nvarchar(40),@telefono nvarchar(30), @direccion nvarchar(500),  @fecha_de_nacimiento DATE , @cedula nvarchar(50), @estado BIT, @id int)
as
begin
set nocount on

--Comprobar si existen registros

	BEGIN TRY
       --SON LOS DATOS MÁS IMPORTANTES DE LA BASE DE DATOS
		IF LEN(@nombre) = 0 OR LEN(@apellido1) = 0 OR LEN(@apellido2) = 0 OR LEN(@id) = 0
		BEGIN

			SELECT 'warning' AS msj_tipo, 'Debes ingresar todos los datos solicitados.' AS msj_texto; 

		END
		ELSE IF EXISTS (SELECT * FROM clientes a WHERE a.id_cliente = @id)
		BEGIN
			--Si hay datos, devolver dicha informaci�n
			update clientes set nombre = @nombre, apellido1 = @apellido1, apellido2 = @apellido2,telefono= @telefono, direccion= @direccion , fecha_de_nacimiento= @fecha_de_nacimiento , cedula=@cedula, estado= @estado  where id_cliente = @id
 
			SELECT 'success' AS msj_tipo, 'Exito al realizar la acci�n.' AS msj_texto;  
		END

		ELSE
		BEGIN
			--Si no hay datos, se devuelve un mensaje indicandolo
			SELECT 'warning' AS msj_tipo, 'No hay datos para mostrar con el id proporcionado.' AS msj_texto; 
		END

	END TRY

	BEGIN CATCH

		SELECT 'error' AS msj_tipo, ERROR_MESSAGE() AS msj_texto; 

	END CATCH


end
--ACUTALIZACIÓN DE LINEA PARA VER SI FUNCIONA EL SP
EXEC  sp_clientes_actualizar "alexander","calero","ampie","64789587","Guadalupe, Goicoechea","1997-06-02","504160475","1","1"

--SELECT * FROM clientes