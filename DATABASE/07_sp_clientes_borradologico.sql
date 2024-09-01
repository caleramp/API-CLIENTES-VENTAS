USE[Venta_vehiculos_CR]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER PROCEDURE [dbo].[sp_clientes_borradologico]
( @id int)
as
begin
set nocount on

--Comprobar si existen registros

	BEGIN TRY
       --SON LOS DATOS MÁS IMPORTANTES DE LA BASE DE DATOS
		IF LEN(@id) = 0 OR @id <=0
		BEGIN

			SELECT 'warning' AS msj_tipo, 'Debes ingresar todos los datos solicitados.' AS msj_texto; 

		END
		ELSE IF EXISTS (SELECT 1 FROM clientes a WHERE a.id_cliente = @id)
		BEGIN
			--Si hay datos, actualiza el estado del usuario
			update clientes set  estado=0 where id_cliente = @id
 
			SELECT 'success' AS msj_tipo, 'Exito al realizar la acción.' AS msj_texto;  
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


--SELECT * FROM clientes

--SE HACE EL DELETE LOGICO DEL ID 9
--EXEC sp_clientes_borradologico 9