# Info adicional #

## Desiciones tomadas ##

- A la hora de asignar las revisiones se observo que dependiendo de los bids realizados, es posible que un articulo quede para ser revisado mas de una vez por el mismo reviewer. Para evitar esto se busca otro reviewer aleatorio de otro articulo y se intercambian entre si. De esta manera se asegura que un mismo reviewer nunca hara mas de una review sobre el mismo articulo


## Patrones aplicados ##
- **Patron Strategy:**
La clase Session utiliza el patrón Estrategia al delegar la selección de artículos a la interfaz ArticleSelector. Esto permite seleccionar diferentes algoritmos para la selección de artículos (como BetterArticlesSelector y FixedCutSelector), de forma intercambiable, sin modificar la clase Session.


- **Patrón Composición:**
La clase Session está compuesta por varias clases como ArticleValidator, ArticleReviewerAllocator, y ArticleSelector. Esta composición refleja cómo Session utiliza estas clases para realizar tareas específicas como validar, asignar revisores y seleccionar artículos.