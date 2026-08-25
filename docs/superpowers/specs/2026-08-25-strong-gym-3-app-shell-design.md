# STRONG GYM 3.0 — App Shell y navegación por pantallas

## OBJETIVO

Transformar STRONG GYM desde una página vertical larga en una interfaz de aplicación real, manteniendo las funcionalidades existentes.

El cambio se concentra en la estructura visual:

- una sola pantalla activa por vez;
- área de contenido con scroll interno;
- navegación inferior fija;
- diseño responsive;
- sin fotografías de fondo;
- sin modificar innecesariamente app.js.

---

## ESTADO ACTUAL

El proyecto ya dispone de las secciones principales:

- homeSection
- profileSection
- routinesSection
- exercisesSection
- historySection
- progressSection
- cardioSection
- coachSection

También existen controles críticos que deben conservarse:

- startWorkoutButton
- viewWorkoutButton
- createRoutineButton
- routineList
- exerciseSearch
- exerciseList
- profileButton
- saveProfileButton
- timerModal
- closeTimer
- startTimer

app.js actualmente controla la navegación mediante showSection() y conserva la última sección mediante localStorage.

---

# DISEÑO STRONG GYM 3.0

## 1. APP SHELL

La aplicación tendrá tres zonas principales:

1. HEADER SUPERIOR
2. ÁREA PRINCIPAL DE CONTENIDO
3. NAVEGACIÓN INFERIOR FIJA

El body no será una página vertical infinita.

El viewport principal será el encargado del desplazamiento.

---

## 2. PANTALLAS INDEPENDIENTES

Cada .app-section será tratada como una pantalla independiente.

Solamente la sección que tenga:

    class="app-section active"

será visible.

Cuando se cambie de sección:

- desaparece la pantalla anterior;
- aparece únicamente la nueva;
- la nueva pantalla comienza desde arriba;
- no queda contenido de otras secciones debajo;
- la navegación inferior permanece visible.

NO se cambiarán los IDs existentes.

NO se cambiarán los data-section utilizados por app.js.

---

## 3. HOME

El Home será diseñado como una pantalla de aplicación de fitness.

Orden visual:

### CABECERA

STRONG GYM
Tu entrenamiento. Tu progreso.

Perfil a la derecha.

### ENTRENAMIENTO ACTUAL

ENTRENAMIENTO DE HOY

Tren superior

Fuerza · Hipertrofia · Progresión

Métricas:

6 ejercicios
18 series
60 minutos

Objetivo:

Pecho · Espalda · Hombros · Brazos

Botón principal:

COMENZAR ENTRENAMIENTO

Botón secundario:

Ver entrenamiento

### RESUMEN

Resumen semanal compacto.

### ACCESOS

Solamente los accesos realmente útiles.

No convertir el Home en una página larga.

---

## 4. RUTINAS

Pantalla independiente.

Encabezado:

RUTINAS
Mis rutinas

Botón:

+ Crear nueva rutina

Debajo:

Tarjetas compactas de rutinas.

Cada tarjeta mostrará:

- nombre;
- cantidad de ejercicios;
- series;
- duración;
- acceso.

---

## 5. EJERCICIOS

Pantalla independiente.

Debe priorizar:

- buscador;
- filtros;
- biblioteca;
- tarjetas de ejercicios;
- demostraciones existentes.

No mostrar contenido de otras secciones.

---

## 6. PROGRESO

Pantalla independiente.

Prioridad:

- estadísticas;
- evolución;
- marcas;
- volumen;
- entrenamientos completados.

Las métricas deben aparecer como tarjetas compactas.

---

## 7. CARDIO

Pantalla independiente.

Mantener las funciones actuales:

- selección de actividad;
- intensidad;
- temporizador;
- iniciar;
- pausar;
- finalizar;
- historial.

---

## 8. COACH

Pantalla independiente.

Debe sentirse como una sección propia de la aplicación.

---

## 9. PERFIL

Pantalla independiente.

Mantener todos los campos y la persistencia actual.

No modificar:

- localStorage;
- lógica de guardado;
- funciones de perfil.

---

# NAVEGACIÓN

La navegación inferior permanecerá fija.

Destinos actuales:

Inicio
Rutinas
Ejercicios
Progreso
Cardio
Coach
Mi progreso / Perfil según la estructura existente.

El botón activo tendrá una señal visual clara.

La navegación NO debe desplazarse con el contenido.

---

# ESTÉTICA

Mantener la identidad STRONG GYM:

- fondo oscuro;
- tipografía clara;
- acento amarillo/lima;
- tarjetas oscuras;
- bordes sutiles;
- sombras suaves;
- botones grandes y táctiles.

NO utilizar:

- fotografías de fondo;
- capturas de otras aplicaciones;
- imágenes JPG decorativas;
- fondos artificiales que simulen otra app.

La interfaz debe parecer una aplicación de entrenamiento profesional.

---

# RESPONSIVE

Debe funcionar correctamente en:

- PC;
- notebook;
- tablet;
- Android;
- iPhone.

En teléfono:

- una columna;
- controles táctiles;
- navegación inferior;
- contenido ajustado al viewport.

En escritorio:

- contenido centrado;
- ancho máximo controlado;
- aspecto de aplicación;
- no convertirlo nuevamente en una página web gigante.

---

# ARCHIVOS

## SE PUEDEN MODIFICAR

index.html

css/styles.css

## NO MODIFICAR INNECESARIAMENTE

js/app.js

No cambiar:

- funciones;
- localStorage;
- temporizador;
- rutinas;
- ejercicios;
- cardio;
- progreso;
- IDs.

---

# VALIDACIONES

Antes de considerar terminado:

1. Solo una sección visible.
2. Home no aparece debajo de Rutinas.
3. Rutinas no aparece debajo de Ejercicios.
4. Ejercicios no aparece debajo de Progreso.
5. Navegación inferior permanece fija.
6. Scroll pertenece al contenido.
7. showSection() continúa funcionando.
8. Perfil continúa guardándose.
9. Temporizador continúa funcionando.
10. node --check js/app.js pasa.
11. Todos los IDs críticos continúan presentes.
12. No quedan referencias a las fotografías JPG.
13. La aplicación no vuelve a comportarse como una página vertical infinita.
14. Se prueba en escritorio y móvil.

---

# ESTRATEGIA

La implementación se hará por etapas.

ETAPA 1:
Estabilizar el App Shell.

ETAPA 2:
Convertir las secciones en pantallas independientes.

ETAPA 3:
Rediseñar Home.

ETAPA 4:
Aplicar el sistema a Rutinas, Ejercicios, Progreso, Cardio, Coach y Perfil.

ETAPA 5:
Pruebas funcionales.

ETAPA 6:
Pruebas responsive.

No se harán modificaciones masivas e indiscriminadas sobre app.js.

No se volverán a agregar fondos fotográficos.

