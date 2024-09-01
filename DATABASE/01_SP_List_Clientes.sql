USE [Venta_vehiculos_CR]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER   procedure [dbo].[sp_Usuario_insertar]
(@nombre nvarchar(100), @apellido1 nvarchar(100), @apellido2 nvarchar(100),@telefono nvarchar(15),@direccion nvarchar(25),@fecha_de_nacimiento DATE,@cedula nvarchar(15), @estado BIT )
as
begin
set nocount on

BEGIN TRY
--solo se deje estos 2 parametros como obligatiros para que mandara el msj de warning
	IF LEN(@nombre) = 0 OR LEN(@apellido1) = 0
	BEGIN

		SELECT 'warning' AS msj_tipo, 'Debes ingresar todos los datos solicitados.' AS msj_texto; 

	END
	ELSE
	BEGIN
		
		insert into clientes values
		(@nombre, @apellido1 , @apellido2,@telefono ,@direccion ,@fecha_de_nacimiento ,@cedula,@estado)

		SELECT 'success' AS msj_tipo, 'Exito al realizar la acción.' AS msj_texto;  

	END

	

END TRY

BEGIN CATCH

	SELECT 'error' AS msj_tipo, ERROR_MESSAGE() AS msj_texto; 

END CATCH


end


--EXEC sp_Usuario_insertar 'Manuel', 'null', 'brenes', '64789587','null','','504780658', 1


--SELECT * FROM clientes

