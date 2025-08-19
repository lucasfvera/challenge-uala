# Web Developer Challenge - Ualá

En este challenge, se debe desarrollar una aplicación web de cobros online que
permita a los usuarios visualizar, filtrar y exportar sus transacciones utilizando
ReactJs.


### Objetivo

El objetivo de esta tarea es evaluar las habilidades de resolución de problemas,
el criterio de experiencia de usuario (UX) y la calidad del código.


### Requerimientos

Se tiene una API donde se encuentra una lista de transacciones realizadas por un
comercio:

```
https://uala-dev-challenge.s3.us-east-1.amazonaws.com/transactions.json
```

La aplicación deberá permitir que el usuario:
- Visualice el historial de transacciones
- Visualice el total de cobros con posibilidad de ver cobros del día, semana o
mes actual
- Pueda filtrar las operaciones por fecha, monto, tarjeta, cuotas y métodos
de cobro
  - La fecha va estar siempre dentro del año 2025
  - El rango del monto puede ir desde $0 hasta $2000
  - La lista de posibles tarjetas, cuotas y métodos de cobro se
encuentra en la respuesta de la API provista
  - Se pueden usar dos o más filtros en simultáneo
- Opcional #1: Pueda exportar transacciones mediante su fecha
- Opcional #2: Generar sección de Métricas
  - Puede ser una sección con gráficos que se consideren relevantes
para cobros
  - Se tiene total libertad en el diseño del módulo

Se debe implementar la interfaz de usuario provista en el siguiente Figma: https://www.figma.com/design/0CNKEZZDwDdrfMQG9CE9WQ/Web-developer-Challenge?node-id=2107-10421&m=dev&t=BitNiaDj4YEvPZL7-1


### Criterios de evaluación

- Fidelidad al diseño proporcionado en Figma
- Calidad del código: estructura, modularidad, reutilización y mantenibilidad
- Manejo de estado: uso adecuado de hooks y patrones de gestión de estado
- Experiencia de usuario: navegación intuitiva sin fricciones y diseño
responsivo
- Implementación de tests unitarios de calidad utilizando Jest o Vitest con
React Testing Library
- Manejo de TypeScript para la definición adecuada de tipos e interfaces
- Implementación adecuada de ESLint y Prettier para mantener código
limpio
- Correcta implementación con Vite o Nextjs
Aclaraciones
- No es necesario crear un flujo de login para la aplicación
- Se debe evitar el uso de componentes de clase


### Contacto

No dudes en comunicarte con nosotros a webchallenge@uala.com.ar si tienes
alguna pregunta o necesitas una aclaración sobre cualquier parte de este
desafío.


### Consideraciones de entrega

- Código fuente completo en un repositorio Git (GitHub/GitLab/Bitbucket)
- README con:
    - Instrucciones de instalación y ejecución
    - Explicación de la arquitectura utilizada
    - Decisiones técnicas tomadas
    - Posibles mejoras a futuro
- Tests unitarios con cobertura mínima del 70% en componentes clave
- Aplicación desplegada en algún servicio gratuito de preferencia (Vercel,
Netlify, etc.)


El tiempo de entrega para el challenge es de 1 semana y debe ser enviado por email a `webchallenge@uala.com.ar`.

