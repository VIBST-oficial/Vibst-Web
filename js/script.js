//-------------------------------------------------------Boton Modo Oscuro---------------------------------------------------------------

// Este script del framework hace funcional el boton de modo oscuro, al hacer clic la pagina se cambiara a un color oscuro y al volver a hacer click volvera al color normal (modo claro). 
// Hemos obtenido el Javascript para el boton de diferentes paginas web para saber como hacerlo y nos hemos ayudado un poco de inteligencia artificial para hacer que funcione correctamente ya que no nos funcionaba bien.
// Obtenido de Dev.To: (https://dev.to/quicksilversel/create-a-darklight-mode-toggle-using-javascript-localstorage-55fd),
// Obtenido de Diegologs.com: (https://diegologs.com/selector-tema-oscuro-javascript)
// Obtenido de codepen.io: (https://codepen.io/LasseStilvang/pen/MWaJEYQ)

document.addEventListener("DOMContentLoaded", () => {
  // Obtiene referencias a los elementos del DOM para el modo oscuro
  const toggleModoOscuro = document.getElementById("switch")
  const body = document.body
  const iconoModoOscuro = document.getElementById("icono-modo-oscuro")

  /**
   * Función que aplica o quita el modo oscuro
   * @param {boolean} activar - Si es true, activa el modo oscuro
   */
  function aplicarModoOscuro(activar) {
    // Añade o quita la clase modo-oscuro al body
    body.classList.toggle("modo-oscuro", activar)
    // Si existe el toggle, actualiza su estado
    if (toggleModoOscuro) {
      toggleModoOscuro.checked = activar
    }
    // Guarda la preferencia en localStorage
    localStorage.setItem("modoOscuro", activar ? "true" : "false")
  }

  // Recupera la preferencia guardada del usuario
  const modoOscuroGuardado = localStorage.getItem("modoOscuro") === "true"
  aplicarModoOscuro(modoOscuroGuardado)

  // Añade evento al switch de modo oscuro si existe
  if (toggleModoOscuro) {
    toggleModoOscuro.addEventListener("change", (e) => {
      aplicarModoOscuro(e.target.checked)
    })
  }

  // Detecta la preferencia del sistema operativo
  const prefiereModoOscuro = window.matchMedia("(prefers-color-scheme: dark)")

  // Si no hay preferencia guardada, usa la del sistema
  if (!localStorage.getItem("modoOscuro")) {
    aplicarModoOscuro(prefiereModoOscuro.matches)
  }

  // Actualiza el modo si cambia la preferencia del sistema
  prefiereModoOscuro.addEventListener("change", (e) => {
    if (!localStorage.getItem("modoOscuro")) {
      aplicarModoOscuro(e.matches)
    }
  })

  // Añade efectos visuales al icono de modo oscuro si existe
  if (iconoModoOscuro) {
    // Efecto de escala al pasar el ratón
    iconoModoOscuro.addEventListener("mouseover", function () {
      this.style.transform = "scale(1.1)"
    })

    // Vuelve al tamaño normal al quitar el ratón
    iconoModoOscuro.addEventListener("mouseout", function () {
      this.style.transform = "scale(1)"
    })

    // Efecto de pulsación al hacer clic
    iconoModoOscuro.addEventListener("click", function () {
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 100)
    })
  }

  // ---------------------------------------------------------Funcionalidad del carrito---------------------------------------------------

  // Este script del framework hace funcional el carrito de compras y el boton de añadir al carrito de las paginas de los productos, una vez haces clic al boton de añadir al carrito, el producto se añadira y se actualizara el precio del encargo.
  // Hemos obtenido el Javascript para la funcionalidad del carrito de diferentes paginas web para saber como hacerlo y nos hemos ayudado de inteligencia artificial para hacer que funcione correctamente ya que no funcionaba.
  // Obtenido de Programadorwebvalencia.com: (https://programadorwebvalencia.com/javascript-ejemplo-carrito-de-compra)
  // Obtenido de Youtube: (https://www.youtube.com/watch?v=ThpUZSA64BA&ab_channel=onthecode)
  // Obtenido de Github: (https://github.com/armandoaepp/Carrito)

  // Obtiene referencias a los elementos del DOM para el carrito
  const botonesCarrito = document.querySelectorAll(".boton-carrito")
  const botonCarrito = document.getElementById("boton-carrito")
  const listaProductos = document.getElementById("lista-productos")
  const subtotalElement = document.getElementById("subtotal")
  const totalElement = document.getElementById("total")

  /**
   * Función para añadir un producto al carrito
   * @param {Object} producto - Objeto con información del producto
   */
  function añadirAlCarrito(producto) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || []
    carrito.push(producto)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    alert("Producto añadido al carrito")
  }

  // Añade eventos a los botones de "Añadir al carrito" en la página de productos
  botonesCarrito.forEach((boton) => {
    boton.addEventListener("click", () => {
      const productoContainer = boton.closest(".producto")
      if (productoContainer) {
        const nombre = productoContainer.querySelector(".nombre-producto").textContent
        const imagen = productoContainer.querySelector(".imagen-producto").src
        const precio = Number.parseFloat(
          productoContainer.querySelector(".precio-producto").textContent.replace("€", ""),
        )

        let talla = "Única"
        const selectorTallas = productoContainer.querySelector(".selector-tallas")
        if (selectorTallas) {
          const tallaSeleccionada = selectorTallas.querySelector('input[name="talla"]:checked')
          if (tallaSeleccionada) {
            talla = tallaSeleccionada.value
          } else {
            alert("Por favor, selecciona una talla")
            return
          }
        }

        const producto = { nombre, imagen, talla, precio }
        añadirAlCarrito(producto)
      }
    })
  })

  // Maneja el botón de carrito en la página de detalle de producto
  if (botonCarrito) {
    botonCarrito.addEventListener("click", () => {
      const nombre = document.querySelector("h1").textContent
      const imagen = document.querySelector("#carrusel img").src
      const precio = Number.parseFloat(document.querySelector("#precio p").textContent.replace("€", ""))
      const tallaSeleccionada = document.querySelector('input[name="talla"]:checked')

      if (tallaSeleccionada) {
        const producto = {
          nombre: nombre,
          imagen: imagen,
          talla: tallaSeleccionada.value,
          precio: precio,
        }
        añadirAlCarrito(producto)
      } else {
        alert("Por favor, selecciona una talla")
      }
    })
  }

  // Muestra productos en el carrito si estamos en la página del carrito
  if (listaProductos) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || []
    let subtotal = 0

    carrito.forEach((producto, index) => {
      const productoElement = document.createElement("div")
      productoElement.id = "producto-carrito"
      productoElement.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div id="detalles-producto">
          <h3>${producto.nombre}</h3>
          <p>Talla: ${producto.talla}</p>
          <p>Cantidad: 1</p>
          <p>Precio: ${producto.precio.toFixed(2)}€</p>
        </div>
        <button class="boton-eliminar" data-index="${index}">Eliminar</button>
      `
      listaProductos.appendChild(productoElement)
      subtotal += producto.precio
    })

    if (subtotalElement && totalElement) {
      subtotalElement.textContent = subtotal.toFixed(2) + "€"
      totalElement.textContent = subtotal.toFixed(2) + "€"
    }

    // Añade eventos a los botones de eliminar
    const botonesEliminar = document.querySelectorAll(".boton-eliminar")
    botonesEliminar.forEach((boton) => {
      boton.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index")
        carrito.splice(index, 1)
        localStorage.setItem("carrito", JSON.stringify(carrito))
        location.reload() // Actualiza la página para reflejar los cambios
      })
    })
  }
})