# SIGA Aduanas - Prototipo v0.2.0

Versión intermedia con módulos operativos principales implementados.

# SIGA Aduanas Chile – Prototipo funcional sin registros personales

Versión del prototipo sin datos personales del usuario.

## Cambios realizados

- Se eliminaron los registros asociados a nombres personales del usuario.
- Los datos de ejemplo usan nombres genéricos como **Pasajero Demo**.
- Se cambió la clave interna de `localStorage` para evitar que el navegador cargue datos antiguos guardados.
- Se mantiene el logo PNG de Aduanas Chile.
- Se mantiene el login ajustado con **Los Libertadores** bajo **Servicio Nacional de Aduanas**.

## Funcionalidades operativas incluidas

- Login por rol.
- Menú dinámico según perfil.
- Consulta de trámite con búsqueda y filtros.
- Checklist documental para validar antecedentes de pasajero, menor, vehículo, SAG y mascota.
- Creación de pre-trámite.
- Control de duplicidad documental activa.
- Módulo visible de **Menores de edad** con registro, autorización, aprobación/observación y actualización del trámite.
- Registro documental de menores como apoyo funcionario.
- Regla de excepción para autorización pendiente de menor.
- Registro de vehículos.
- Declaración SAG.
- Productos SAG para alimentos, productos animales, vegetales y alertas de productos prohibidos/no declarados.
- Módulo visible de **Mascotas** con registro sanitario, validación SAG, aprobación/observación y actualización del trámite.
- Control PDI.
- Integración simulada con SAG, PDI y Aduana Argentina.
- Conciliación Argentina para contrastar estados entre ambos lados del paso fronterizo.
- Flujo y ventanillas para segregar personas, vehículos particulares y camiones.
- Reportes con exportación CSV, Excel e impresión/PDF.
- Gestión de usuarios.
- Bitácora de trazabilidad.


## Usuarios demo

| Rol | Usuario | Contraseña |
|---|---|---|
| Administrador | admin@siga.cl | 1234 |
| Funcionario Aduanas | funcionario@siga.cl | 1234 |
| Pasajero | pasajero@siga.cl | 1234 |
| Inspector SAG | sag@siga.cl | 1234 |
| Control PDI | pdi@siga.cl | 1234 |

## Ejecutar

Abre `index.html` en el navegador.

## Subir a GitHub

```bash
git init
git add .
git commit -m "Eliminar registros personales del prototipo SIGA"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/siga-prototipo-aduana.git
git push -u origin main
```


## Ajuste módulo menores

Se agregó un módulo operativo visible llamado **Menores de edad**.

El módulo permite:

- asociar un menor a un trámite;
- registrar nombre y documento del menor;
- seleccionar tipo de autorización;
- dejar observado automáticamente si la autorización está pendiente o ausente;
- aprobar u observar la autorización desde perfil funcionario;
- actualizar el estado documental del trámite;
- registrar la acción en la bitácora.


## Ajuste módulo mascotas

Se agregó un módulo operativo visible llamado **Mascotas**, asociado a la revisión SAG.

El módulo permite:

- asociar una mascota a un trámite;
- registrar nombre, especie, microchip, certificado sanitario y vacuna antirrábica;
- dejar observado automáticamente si el certificado o vacuna están pendientes, vencidos o no se presentan;
- aprobar u observar la declaración desde perfil funcionario o SAG;
- actualizar el estado SAG del trámite;
- registrar la acción en la bitácora.


## Ajuste detalles completos

Se agregaron componentes que estaban respaldados por la documentación del proyecto y no estaban suficientemente visibles en el prototipo:

- **Checklist documental:** validación previa de documentos obligatorios y vencidos.
- **Productos SAG:** productos animales, vegetales, alimentos, prohibidos o no declarados.
- **Conciliación Argentina:** contraste de estado de trámite entre Chile y Argentina.
- **Flujo y ventanillas:** segregación de personas, vehículos particulares y camiones.
- **Exportación Excel:** reporte descargable en formato compatible con Excel.

## Ajuste reciente

- Se retiraron del prototipo las pantallas y textos internos que no corresponden al usuario final del sistema.
