USE [Venta_vehiculos_CR]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER     PROCEDURE [dbo].[sp_usuario_by_id]
(@id int)
AS
BEGIN  

		--Comprobar si existen registros
		IF EXISTS (SELECT * FROM clientes a WHERE a.id_cliente = @id)
		BEGIN
			--Si hay datos, devolver dicha información
			SELECT * FROM  clientes a WHERE a.id_cliente = @id
 
			SELECT 'success' AS msj_tipo, 'Exito al realizar la acción.' AS msj_texto;  
		END

		ELSE
		BEGIN
			--Si no hay datos, se devuelve un mensaje indicandolo
			SELECT ''
 
			SELECT 'warning' AS msj_tipo, 'No hay datos para mostrar con el id proporcionado.' AS msj_texto; 
		END
END

--EXEC sp_usuario_by_id 9

