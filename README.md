# SIGA Aduanas Los Libertadores - Prototipo v1.0.0

Versión estable del prototipo SIGA Aduanas Los Libertadores, desarrollada para simular el proceso digital de control fronterizo en el Paso Los Libertadores.

Este repositorio corresponde a una entrega académica de la asignatura Ingeniería de Software. El prototipo fue versionado con Git, publicado en GitHub y preparado para su visualización mediante GitHub Pages.

---

## SIGA Aduanas Chile - Prototipo funcional académico

Prototipo web orientado a la modernización del proceso de Aduana en el Paso Los Libertadores.

El sistema busca representar una solución digital para apoyar la gestión de trámites aduaneros, validación documental, control de menores de edad, vehículos, mascotas, declaraciones SAG, control PDI, conciliación con Aduana Argentina y generación de reportes operativos.

El prototipo no corresponde a un sistema productivo real, sino a una simulación funcional desarrollada con fines académicos.

---

## Contexto del caso

El caso aborda la necesidad de modernizar el proceso de control aduanero en el Paso Los Libertadores, considerando problemas como:

* congestión operativa en periodos de alta demanda;
* revisión manual de antecedentes;
* errores en documentación de pasajeros, menores, vehículos y mascotas;
* falta de trazabilidad en el proceso;
* necesidad de integración entre Aduanas, SAG, PDI y Aduana Argentina;
* necesidad de mejorar la experiencia del usuario durante el trámite.

A partir de este contexto, el prototipo implementa funcionalidades asociadas a los requisitos de alto nivel del caso, incorporando además un enfoque de calidad orientado a seguridad, usabilidad, confiabilidad, trazabilidad y satisfacción del usuario.

---

## Funcionalidades operativas incluidas

* Login por rol de usuario.
* Validación de usuario inexistente.
* Validación de contraseña incorrecta.
* Bloqueo de cuenta inactiva.
* Manejo de sesión con token simulado.
* Cierre de sesión funcional.
* Menú dinámico según perfil.
* Panel principal con indicadores del proceso.
* Consulta de trámite con búsqueda y filtros.
* Creación de pre-trámite.
* Control de duplicidad documental activa.
* Checklist documental para funcionario y administrador.
* Vista “Mis documentos requeridos” para pasajero.
* Registro y validación de menores de edad.
* Validación de autorizaciones notariales o judiciales para menores.
* Registro documental de menores como apoyo funcionario.
* Registro de vehículos.
* Validación de documentos vehiculares.
* Generación de permiso vehicular descargable en PDF.
* Declaración SAG.
* Registro de productos SAG.
* Alerta por productos prohibidos, restringidos o no declarados.
* Registro de mascotas.
* Validación sanitaria de mascotas.
* Validación de tutor legal cuando corresponde.
* Control PDI.
* Validación de identidad.
* Rechazo por documento vencido.
* Bloqueo por alerta migratoria.
* Integración simulada con SAG, PDI y Aduana Argentina.
* Conciliación Argentina para contrastar estados entre ambos lados del paso fronterizo.
* Flujo y ventanillas para segregar personas, vehículos particulares y camiones.
* Reportes con exportación CSV, Excel e impresión/PDF.
* Gestión de usuarios.
* Bitácora de trazabilidad.

---

## Enfoque de calidad

El prototipo considera un enfoque de calidad basado en criterios asociados a modelos como ISO25000 e ISO9126, priorizando funcionalidad, seguridad, usabilidad, confiabilidad, mantenibilidad, eficiencia y satisfacción del usuario.

### Requisitos funcionales considerados

* Registrar y consultar trámites aduaneros.
* Permitir pre-trámite antes de la atención presencial.
* Gestionar documentación requerida para pasajeros.
* Validar antecedentes de menores de edad.
* Validar autorizaciones de viaje para menores.
* Registrar vehículos asociados al trámite.
* Generar permisos vehiculares.
* Registrar declaraciones SAG.
* Controlar productos permitidos, restringidos o prohibidos.
* Registrar mascotas y validar documentación sanitaria.
* Validar identidad mediante control PDI.
* Bloquear trámites con alerta migratoria.
* Simular integración entre Aduanas, SAG, PDI y Aduana Argentina.
* Conciliar estados entre Chile y Argentina.
* Generar reportes operativos.
* Administrar usuarios y roles.
* Registrar acciones relevantes en bitácora.

### Requisitos no funcionales considerados

* **Seguridad:** acceso por roles, validación de credenciales, bloqueo de cuentas inactivas y restricción de funcionalidades según perfil.
* **Usabilidad:** interfaz modular, navegación clara, formularios simples, alertas visuales y nombres comprensibles para el usuario final.
* **Confiabilidad:** validaciones obligatorias, bloqueo de flujos críticos y observación automática cuando existe documentación incompleta o inconsistente.
* **Trazabilidad:** registro de acciones relevantes mediante bitácora, incluyendo inicios de sesión, validaciones, observaciones y cambios de estado.
* **Mantenibilidad:** separación de archivos HTML, CSS y JavaScript para facilitar futuras modificaciones.
* **Eficiencia operativa:** uso de pre-trámite, checklist, reportes y segregación de flujos para reducir tiempos de atención y errores en ventanilla.
* **Disponibilidad:** prototipo web ejecutable desde navegador y publicable mediante GitHub Pages.
* **Satisfacción del usuario:** el pasajero visualiza solo la información necesaria para su trámite, mientras que los funcionarios cuentan con herramientas operativas de revisión y validación.

---

## Mejoras principales aplicadas

* Se eliminaron registros asociados a nombres personales del usuario.
* Los datos de ejemplo usan nombres genéricos como “Pasajero Demo”.
* Se cambió la clave interna de `localStorage` para evitar carga de datos antiguos del navegador.
* Se mantiene el logo PNG de Aduanas Chile.
* Se mantiene el login con referencia a “Los Libertadores” bajo “Servicio Nacional de Aduanas”.
* Se retiraron del prototipo pantallas y textos internos que no corresponden al usuario final.
* Se eliminaron los casos de prueba desde la interfaz del prototipo, manteniéndolos solo en documentación externa.

---

## Checklist según rol

* Para el pasajero, el módulo se muestra como **Mis documentos requeridos**.
* El pasajero solo puede ver sus documentos, estados y observaciones.
* El pasajero no visualiza identificadores internos de control.
* El pasajero no visualiza botones de aprobación u observación.
* Para funcionario y administrador, el módulo se mantiene como **Checklist documental** con acciones operativas.

---

## Módulo de menores de edad

Se agregó un módulo operativo visible llamado **Menores de edad**.

El módulo permite:

* asociar un menor a un trámite;
* registrar nombre y documento del menor;
* seleccionar escenario de viaje;
* validar autorización notarial o judicial;
* bloquear el trámite si falta documento o autorización requerida;
* aprobar u observar la autorización desde perfil funcionario;
* actualizar el estado documental del trámite;
* registrar la acción en la bitácora.

---

## Módulo de mascotas

Se agregó un módulo operativo visible llamado **Mascotas**, asociado a la revisión SAG.

El módulo permite:

* asociar una mascota a un trámite;
* registrar nombre, especie, microchip, certificado sanitario y vacuna antirrábica;
* validar si el responsable es mayor de edad;
* exigir tutor legal cuando corresponde;
* dejar observado el trámite si el certificado o vacuna están pendientes, vencidos o no se presentan;
* aprobar u observar la declaración desde perfil funcionario o SAG;
* actualizar el estado SAG del trámite;
* registrar la acción en la bitácora.

---

## Módulo SAG

Se incorporaron validaciones para la declaración SAG.

El módulo permite:

* registrar declaración sin productos;
* declarar productos permitidos;
* identificar productos prohibidos;
* marcar formularios incompletos;
* generar alertas visuales y sonoras ante productos retenidos;
* actualizar el estado SAG del trámite;
* registrar observaciones en bitácora.

---

## Módulo de vehículos

Se agregó validación funcional para documentos vehiculares.

El módulo permite:

* registrar patente, chasis, conductor y titular;
* validar vehículo particular;
* validar vehículo diplomático;
* validar documento argentino;
* rechazar documento inválido;
* observar documento vencido;
* generar permiso vehicular;
* descargar permiso en PDF.

---

## Módulo PDI

Se agregó validación funcional para control migratorio.

El módulo permite:

* validar identidad mediante RUN, DNI o pasaporte;
* aprobar documentos coincidentes;
* observar documentos no coincidentes;
* rechazar documentos vencidos;
* bloquear salida ante alerta migratoria;
* registrar el resultado del control en la bitácora.

---

## Tecnologías utilizadas

* HTML5.
* CSS3.
* JavaScript.
* Git.
* GitHub.
* GitHub Pages.
* Navegador web moderno.

---

## Estructura del proyecto

```text
siga-aduanas-los-libertadores/
|-- assets/
|   `-- logo-aduana-chile.png
|-- index.html
|-- styles.css
|-- script.js
|-- README.md
`-- .gitignore
```

### Descripción de archivos y carpetas

* `assets/`: contiene recursos gráficos utilizados por el prototipo, como el logo de Aduanas Chile.
* `index.html`: contiene la estructura principal de la interfaz del prototipo.
* `styles.css`: contiene los estilos visuales, diseño responsivo, colores, formularios, tarjetas, menús y alertas.
* `script.js`: contiene la lógica funcional del prototipo, validaciones, roles, simulaciones operativas, flujos de trámites, módulos y bitácora.
* `README.md`: contiene la documentación general del proyecto, contexto del caso, funcionalidades, enfoque de calidad, instrucciones de ejecución y control de versiones.
* `.gitignore`: define archivos que no deben ser considerados por Git dentro del repositorio.

---

## Requisitos para ejecutar el prototipo

Para ejecutar el prototipo se requiere:

* Sistema operativo Windows, Linux o macOS.
* Navegador web actualizado, como Google Chrome, Microsoft Edge, Firefox, Opera u otro equivalente.
* Git instalado, solo si se desea clonar el repositorio.
* Visual Studio Code u otro editor de código, solo si se desea revisar o modificar los archivos.

El prototipo no requiere servidor local, base de datos, XAMPP, Node.js ni instalación de dependencias externas, ya que corresponde a una aplicación web estática desarrollada con HTML, CSS y JavaScript.

---

## Usuarios demo

| Rol                 | Usuario                                               | Contraseña |
| ------------------- | ----------------------------------------------------- | ---------- |
| Administrador       | [admin@siga.cl](mailto:admin@siga.cl)                 | 1234       |
| Funcionario Aduanas | [funcionario@siga.cl](mailto:funcionario@siga.cl)     | 1234       |
| Pasajero            | [pasajero@siga.cl](mailto:pasajero@siga.cl)           | 1234       |
| Inspector SAG       | [sag@siga.cl](mailto:sag@siga.cl)                     | 1234       |
| Control PDI         | [pdi@siga.cl](mailto:pdi@siga.cl)                     | 1234       |
| Usuario inactivo    | [deshabilitado@siga.cl](mailto:deshabilitado@siga.cl) | 1234       |

---

## Instrucciones de ejecución

### Opción 1: Ejecutar desde GitHub Pages

El prototipo puede visualizarse directamente desde el navegador mediante GitHub Pages:

```text
https://felipe-andaur.github.io/siga-aduanas-los-libertadores/
```

Pasos:

1. Abrir el enlace en un navegador web actualizado.
2. Iniciar sesión con alguno de los usuarios demo.
3. Navegar por los módulos disponibles según el rol seleccionado.
4. Probar los flujos funcionales del prototipo.

---

### Opción 2: Ejecutar localmente clonando el repositorio

1. Abrir una terminal, PowerShell, Git Bash o la terminal integrada de Visual Studio Code.

2. Clonar el repositorio:

```bash
git clone https://github.com/FeLipe-Andaur/siga-aduanas-los-libertadores.git
```

3. Ingresar a la carpeta del proyecto:

```bash
cd siga-aduanas-los-libertadores
```

4. Abrir el archivo principal:

```text
index.html
```

5. Ejecutar `index.html` con doble clic o abrirlo directamente desde el navegador.

---

### Opción 3: Ejecutar localmente desde Visual Studio Code

1. Abrir Visual Studio Code.
2. Seleccionar **File > Open Folder**.
3. Abrir la carpeta `siga-aduanas-los-libertadores`.
4. Abrir el archivo `index.html`.
5. Ejecutarlo directamente en el navegador.

Opcionalmente, se puede usar la extensión **Live Server** de Visual Studio Code:

1. Instalar la extensión Live Server.
2. Hacer clic derecho sobre `index.html`.
3. Seleccionar **Open with Live Server**.
4. El prototipo se abrirá en el navegador.

---

## Consideraciones de ejecución

* El sistema utiliza datos simulados para representar usuarios, trámites, documentos, validaciones y estados operativos.
* No existe conexión a una base de datos real.
* No se utilizan credenciales reales ni datos personales del usuario.
* Las integraciones con SAG, PDI y Aduana Argentina son simuladas para fines académicos.
* La generación de reportes y documentos descargables se realiza desde el navegador.
* Si el navegador conserva datos antiguos del prototipo, se recomienda limpiar el almacenamiento local del sitio o abrirlo en una ventana de incógnito.

---

## Limpieza de datos locales del navegador

El prototipo puede utilizar almacenamiento local del navegador para simular datos y estados.

Si se requiere reiniciar la información del prototipo:

1. Abrir el prototipo en el navegador.
2. Presionar `F12` para abrir las herramientas de desarrollador.
3. Ir a la pestaña **Application** o **Aplicación**.
4. Buscar **Local Storage**.
5. Eliminar los datos asociados al sitio.
6. Recargar la página.

Como alternativa rápida, se puede abrir el prototipo en una ventana de incógnito.

---

## Flujo general de uso

1. Ingresar al prototipo desde GitHub Pages o desde `index.html`.
2. Iniciar sesión con un usuario demo.
3. Revisar el panel principal según el rol autenticado.
4. Consultar o crear un pre-trámite.
5. Revisar documentación requerida.
6. Validar módulos según corresponda:

   * menores de edad;
   * vehículos;
   * declaración SAG;
   * productos SAG;
   * mascotas;
   * control PDI;
   * conciliación Argentina.
7. Revisar reportes y bitácora.
8. Cerrar sesión.

---

## Publicación en GitHub Pages

El prototipo fue configurado para ser publicado mediante GitHub Pages desde:

* Rama: `main`.
* Carpeta: `/root`.

Una vez publicado, el sistema puede ser abierto directamente desde el navegador mediante el enlace de GitHub Pages del repositorio.

---

## Control de versiones

Este proyecto utiliza Git como sistema de control de versiones. Se definieron tres versiones principales para evidenciar la evolución del prototipo:

| Versión  | Descripción                                                                                                                                                        |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `v0.1.0` | Estructura inicial del prototipo SIGA. Incluye login, panel principal, consulta, pre-trámite y reportes básicos.                                                   |
| `v0.2.0` | Incorporación de módulos operativos principales: menores, mascotas, SAG, PDI, vehículos, checklist, integración, conciliación y flujo.                             |
| `v1.0.0` | Versión estable del prototipo con validaciones finales, restricciones por rol, alertas, generación de PDF, control PDI avanzado y limpieza de información interna. |

Comandos utilizados durante el versionamiento:

```bash
git init
git add .
git commit -m "v0.1.0 estructura inicial del prototipo SIGA"
git tag v0.1.0

git add .
git commit -m "v0.2.0 incorporacion de modulos operativos principales"
git tag v0.2.0

git add .
git commit -m "v1.0.0 version estable del prototipo SIGA"
git tag v1.0.0

git branch -M main
git remote add origin https://github.com/FeLipe-Andaur/siga-aduanas-los-libertadores.git
git push -u origin main
git push origin --tags
```

Los releases del repositorio incluyen la descripción de cambios principales y la estructura de carpetas correspondiente a cada versión.

---

## Documentación complementaria

Los casos de prueba, datos de prueba, resultados, defectos y control de cambios no se muestran dentro de la interfaz del prototipo. Estos elementos se mantienen como documentación externa del proyecto.

Documentos complementarios asociados:

* Planilla de casos de prueba.
* Datos de prueba.
* Resultados de prueba.
* Reporte de defectos.
* Registro de control de cambios.
* Tags y releases en GitHub.

---

## Autoría y contexto académico

* Proyecto: SIGA Aduanas Los Libertadores.
* Asignatura: Ingeniería de Software.
* Docente: Mauricio Figueroa.
* Institución: Duoc UC.
* Contexto: Evaluación Parcial N° 3.
* Tipo de entrega: prototipo funcional, control de versiones y documentación de pruebas.
* Uso: académico.

---

## Estado del proyecto

Versión estable de entrega publicada en GitHub.

El prototipo queda disponible para revisión académica, presentación, validación mediante planillas externas y futuras mejoras.
