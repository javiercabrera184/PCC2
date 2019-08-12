# Sistema de posicionamiento de deportistas durante encuentros


Hoy en día los deportes de elite generan mucho dinero. La competición entre equipos llega a ser muy exigente. Perder o ganar un partido supone una ganancia o perdida de muchos miles de euros.

Es por eso por lo que muchas empresas tecnológicas invierten mucho dinero en hacer que el rendimiento de los deportistas sea cada vez mejor.

Sistema de monitorización de datos sobre los jugadores tanto en encuentros como en entrenamientos son cada vez mas importantes y normales.

Nuestro proyecto consiste en un sistema que es capaz de recolectar datos de jugadores através de sensores y almacenarlos para su posterior análisis o visualización.


Nuestro sistema va a tener una arquitectura basada en microservicios y estará consituido por una API REST que servira para crear, insertar, actualizar o eliminar datos respecto a los jugadores. También contará con una base de datos NoSQL para el manejo de estos datos, en nuestro caso MongoDB. Por lo que tendremos dos microservicios principales.

También se incorporarán otros microservicios como uno para logs y según las necesidades del cliente se incorporará otro microservicio para el analisis de estos datos. No se descarta la incorporación de otros microservicios en un futuro.

![Aquitectura](/doc/img/arq.png)

El sistema estará programado con NodeJS. Tanto la API REST como la interacion con la base de datos como el servicio de logs.
