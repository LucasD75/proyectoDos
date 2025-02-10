const zapatillas = [
  {
    marca: 'Nike',
    modelo: 'Air Max 1',
    precio: 120,
    imagen: './assets/foto.png'
  },
  {
    marca: 'New Balace',
    modelo: 'NB 9060',
    precio: 90,
    imagen: './assets/zapa1.png'
  },
  {
    marca: 'Nike',
    modelo: 'Nike Revolution',
    precio: 75,
    imagen: './assets/foto2.png'
  },
  {
    marca: 'Adidas Original',
    modelo: 'Campus',
    precio: 85,
    imagen: './assets/foto3.png'
  },
  {
    marca: 'Adidas Original',
    modelo: 'Campus',
    precio: 70,
    imagen: './assets/foto4.png'
  },
  {
    marca: 'New Balance',
    modelo: 'NB 9060',
    precio: 95,
    imagen: './assets/foto5.png'
  },
  {
    marca: 'Nike Original',
    modelo: 'Air Max 1',
    precio: 65,
    imagen: './assets/foto6.png'
  },
  {
    marca: 'Adidas Original',
    modelo: 'Gazelle',
    precio: 150,
    imagen: './assets/foto7.png'
  },
  {
    marca: 'Nike Original',
    modelo: 'Air Max SC',
    precio: 150,
    imagen: './assets/foto8.png'
  }
]
const printZapas = (zapas) => {
  const divZapas = document.querySelector('#zapatillas')
  divZapas.innerHTML = ''

  for (const zapa of zapas) {
    const divZapa = document.createElement('div')
    const divImg = document.createElement('div')
    const img = document.createElement('img')
    const marca = document.createElement('h3')
    const modelo = document.createElement('p')
    const precio = document.createElement('p')

    divZapa.className = 'flex-container'
    divImg.className = 'img-container'
    img.src = zapa.imagen
    marca.textContent = zapa.marca
    modelo.textContent = zapa.modelo
    precio.textContent = zapa.precio + '€'

    divZapa.appendChild(divImg)
    divImg.appendChild(img)
    divZapa.appendChild(marca)
    divZapa.appendChild(modelo)
    divZapa.appendChild(precio)
    divZapas.appendChild(divZapa)
  }
}

const MODELOS = []
let MODELO = ''
let PRECIO_MIN = ''
let PRECIO_MAX = ''

const filtrar = () => {
  const zapatillasFiltradas = zapatillas.filter((zapa) => {
    const cumpleModelo = MODELO === '' || zapa.modelo === MODELO
    const cumplePrecio =
      (PRECIO_MIN === '' || zapa.precio >= parseInt(PRECIO_MIN)) &&
      (PRECIO_MAX === '' || zapa.precio <= parseInt(PRECIO_MAX))
    return cumpleModelo && cumplePrecio
  })

  const divSugerencias = document.querySelector('#sugerencias') // <-- Obtener el div de sugerencias

  if (zapatillasFiltradas.length === 0) {
    const divZapas = document.querySelector('#zapatillas')
    divZapas.innerHTML = ''
    divSugerencias.innerHTML = '' // <-- Limpiar el div de sugerencias antes de mostrar el mensaje
    mostrarSugerencias()
  } else {
    divSugerencias.innerHTML = '' // <-- Limpiar el div de sugerencias antes de mostrar los resultados
    printZapas(zapatillasFiltradas)
  }
}

const mostrarSugerencias = () => {
  const divZapas = document.querySelector('#sugerencias')
  divZapas.innerHTML = '' // Limpiar contenido previo

  let sugerencias = []
  while (sugerencias.length < 3) {
    let sugerenciaIndice = Math.floor(Math.random() * zapatillas.length)
    if (!sugerencias.includes(sugerenciaIndice)) {
      sugerencias.push(sugerenciaIndice)
    }
  }

  let zapatillasSugeridas = sugerencias.map(
    (sugerenciaIndice) => zapatillas[sugerenciaIndice]
  )
  const contenedorSugerencias = document.createElement('div')
  contenedorSugerencias.classList.add('sugerencias-container')
  const mensajeSugerencias = document.createElement('h2')
  mensajeSugerencias.classList.add('sugerencias-mensaje')
  mensajeSugerencias.textContent =
    'No se encontraron productos con esos filtros. Aquí tienes algunas sugerencias:'
  contenedorSugerencias.appendChild(mensajeSugerencias)

  if (zapatillasSugeridas.length > 0) {
    // <-- La clave: condicion añadida
    printZapas(zapatillasSugeridas) // Primero se imprimen las zapatillas
    divZapas.appendChild(contenedorSugerencias) // Luego se añade el mensaje
  }

  // printZapas(zapatillasSugeridas)
  // divZapas.appendChild(contenedorSugerencias)
}

const fillModelos = (zapas) => {
  MODELOS.splice(0)
  for (const zapa of zapatillas) {
    if (!MODELOS.includes(zapa.modelo)) {
      MODELOS.push(zapa.modelo)
    }
  }
}
fillModelos(zapatillas)

const CreateSelectModel = () => {
  const divFiltros = document.querySelector('#filtros')
  const selectModel = document.createElement('select')
  for (const modelo of MODELOS) {
    const option = document.createElement('option')
    option.value = modelo
    option.textContent = modelo
    selectModel.appendChild(option)
  }
  divFiltros.appendChild(selectModel)
  selectModel.addEventListener('change', (event) => {
    MODELO = event.target.value
    filtrar()
    // limpiarFiltros()
  })
}

const createPrecioFilters = () => {
  const divFiltros = document.querySelector('#filtros')

  const minPriceInput = document.createElement('input')
  minPriceInput.type = 'number'
  minPriceInput.placeholder = 'Precio mínimo'
  minPriceInput.id = 'precio-min'
  minPriceInput.addEventListener('input', (event) => {
    PRECIO_MIN = event.target.value
    filtrar()
    // limpiarFiltros()
  })

  const maxPriceInput = document.createElement('input')
  maxPriceInput.type = 'number'
  maxPriceInput.placeholder = 'Precio máximo'
  maxPriceInput.id = 'precio-max'
  maxPriceInput.addEventListener('input', (event) => {
    PRECIO_MAX = event.target.value
    filtrar()
    // limpiarFiltros()
  })

  divFiltros.appendChild(minPriceInput)
  divFiltros.appendChild(maxPriceInput)
}
createPrecioFilters()

const createClearButton = () => {
  const divFiltros = document.querySelector('#filtros')
  const clearButton = document.createElement('button')
  clearButton.textContent = 'Limpiar Filtros'

  clearButton.addEventListener('click', () => {
    MODELO = ''
    PRECIO_MIN = ''
    PRECIO_MAX = ''
    filtrar()
    limpiarFiltros()
  })

  divFiltros.appendChild(clearButton)
}
// Funcion para limpiar filtros
const limpiarFiltros = () => {
  const minPriceInput = document.getElementById('precio-min')
  const maxPriceInput = document.getElementById('precio-max')

  if (minPriceInput && maxPriceInput) {
    minPriceInput.value = ''
    maxPriceInput.value = ''
  }
}

printZapas(zapatillas)
CreateSelectModel()
createClearButton()
fillModelos(zapatillas)
