# IRONWINE
## DESCRIPTION

Ironwine es una web de venta online de vinos, donde podrán acceder a una gran diversidad de vinos de España y del resto del mundo.
Desde el inicio de la página podrás ver el catalogo de vinos de nuestra web y los detalles de cada producto, para poder realizar las compras deberás estar logueado, una vez dentro de la web, además de seguir viendo el catálogo y sus detalles, podrás buscar por nombre de vino y por categoría.  También tendrás acceso a tu perfil de usuario donde podrás añadir productos a tu lista de deseos y ver tu historial de compras, además de carrito desde donde hacer el pago, añadir o quitar cantidad de un producto o vaciar tu carrito de compra.
Por su parte, el administrador será quien controle los productos de la pagina, tendrá acceso a visualizar todo el catálogo, crear productos nuevos o editarlos incluso borrarlos.

## FLUJO DE NAVEGACION
* Home: Página de inicio en la que se ofrece el listado de los pruductos.
* Registro: El usuario accede una vez se encuentra en la web cliclando sobre el icono ubicado en el navbar. Es necesario registrarse para hacer compras
* Logado: Tras el registro el usuario debe logarse introducciendo los campos solicitados.
* Salir/Deslogado: El usuario finaliza sesión y vuelve a la página de inicio.
*	Busqueda: el usuario desde Home podrá hacer busquedas de los productos por su nombre o categoría y nombre.
* Carrito de la compra: el usuario podrá ver los productos añadidos al carrito, cantidad, precio además de vaciar el carro, o hacer el pago del mismo.
* Perfil: en esta pagina el usuario podrá ver su histotial de compras y su lista de deseos.
* Home Admin: el administrador podrá ver todo el listado de productos, desde esta pagina podrá crear y editar productos.
* Formulario creación admin: el administrador tendrá acceso al formulario desde el cual creará nuevos productos para la web.
* Formulario edición admin: el administrador podrá editar los productos además de borrar los que ya no quiera que estén en la base de datos.
* 404: pagina de error para el usuario donde se redirecciona a home.
* 500: Como usuario, quiero ver una bonita página de error cuando el error sea del servidor  para saber que no es mi culpa.

## RUTAS:

/home- home – publica y privada
 /signup – Signup - anónima
 /login – Login - anónima
 /products/id/details –  ProductDetails – publica y privada
/profile –  Profile - privada
/cart – Cart – privada
/admin/home – home – privada solo admin
/admin/créate – Create - privada solo admin
/admin/edit – Edit - privada solo admin
/error – Error 500 – publica y privada
/notFound – error 400 – publica y privada


## OTROS COMPONENTES

* Navbar
* Footer
* CardProduct
* CartProduct
* Comentarios
* Carrusel
* Offcanvas
* Search
* ToastMessage

## CONTEXT
* Auth context
* Cart context

## SERVICES

* Admin services
* Auth services
* Cart services
* Comentarios services
* Historial services
* Payment services
* Producto services
* Upload services
* wishlist services

## COLABORADORES

* Fatima Garcia: https://github.com/redkouya
* Cristina Tabares: https://github.com/Cris15118


## PROYECTO
* Cliente: https://github.com/Cris15118/ironwine
* Servidor: https://github.com/Cris15118/ironwine-server
* Deploy: https://ironwine.netlify.app/

## TRELLO

https://trello.com/b/JPvO93eJ/planificaci%C3%B3n-proyecto

## PRESENTACION
https://docs.google.com/presentation/d/1sjjdLGzxf9MBm6L-iMRtgoQvbvp_kwkho7mMlkJjC_E/edit#slide=id.g250c9e9889f_0_4