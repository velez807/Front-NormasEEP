function getItems() {
    const divCardsItems = document.getElementById('cardsItems');
    fetch('http://127.0.0.1:5000/items')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                fetch('http://127.0.0.1:5000/item/' + data[i].ID_Item).then(response => response.json())
                    .then(datosItem => {
                        let cardItemDiv = document.createElement('div');
                        cardItemDiv.className = 'cardItem';
                        cardItemDiv.id = 'cardItem';
                        let imagenDiv = document.createElement('div');
                        imagenDiv.className = 'Imagen';
                        let imagen = crearImagen(datosItem.Foto);
                        imagenDiv.appendChild(imagen);
                        let nombreDiv = createDivWithText('Nombre', datosItem.Nombre);
                        let nombreComunDiv = createDivWithText('NombreComun', datosItem.Nombre_Comun);
                        let precioDiv = createDivWithText('Precio', '$'+datosItem.Precio);
                        let descripcionDiv = createDivWithText('Descripcion', datosItem.Descripcion);
                        let proveedorLabelDiv = createDivWithText('ProveedorLabel', 'PROVEEDOR:');
                        let proveedorDiv = createDivWithText('Proveedor', datosItem.Proveedor);
                        let almacenLabelDiv = createDivWithText('AlmacenLabel', 'COD ALMACÉN:');
                        let almacenDiv = createDivWithText('Almacen', datosItem.Codigo_Almacen);
                        let contabilidadLabelDiv = createDivWithText('ContabilidadLabel', 'COD CONTABILIDAD');
                        let contabilidadDiv = createDivWithText('Contabilidad', datosItem.Codigo_Contabilidad);
                        let referenciaLabelDiv = createDivWithText('ReferenciaLabel', 'REFERENCIA');
                        let referenciaDiv = createDivWithText('Referencia', datosItem.Referencia);
                        let botonConsultarDiv = document.createElement('div');
                        botonConsultarDiv.className = 'BotonConsultar';
                        let consultarButton = document.createElement('button');
                        consultarButton.className = 'botonAmarillo';
                        consultarButton.textContent = 'Consultar conjuntos';
                        consultarButton.onclick=function(){
                            ConsultarConjuntosItem(datosItem.ID_Item,datosItem.Nombre_Comun);
                        }
                        botonConsultarDiv.appendChild(consultarButton);
                        cardItemDiv.appendChild(imagenDiv);
                        cardItemDiv.appendChild(nombreDiv);
                        cardItemDiv.appendChild(nombreComunDiv);
                        cardItemDiv.appendChild(precioDiv);
                        cardItemDiv.appendChild(descripcionDiv);
                        cardItemDiv.appendChild(proveedorLabelDiv);
                        cardItemDiv.appendChild(proveedorDiv);
                        cardItemDiv.appendChild(almacenLabelDiv);
                        cardItemDiv.appendChild(almacenDiv);
                        cardItemDiv.appendChild(contabilidadLabelDiv);
                        cardItemDiv.appendChild(contabilidadDiv);
                        cardItemDiv.appendChild(referenciaLabelDiv);
                        cardItemDiv.appendChild(referenciaDiv);
                        cardItemDiv.appendChild(botonConsultarDiv);
                        divCardsItems.appendChild(cardItemDiv);
                    });
            }
        })
        .catch(error => {
            // Manejar errores
        });
}
//Función para crear un div con texto directamente
function createDivWithText(className, text) {
    let div = document.createElement('div');
    div.className = className;
    div.textContent = text;
    return div;
}
//Función para decodificar la imagen
function crearImagen(imagenTexto){
    let imagen = new Image();
    imagen.src = 'data:image/jpeg;base64,' + imagenTexto;
    return imagen;
}
function buscarItems() {
    const searchInput = document.getElementById('nombreItemBuscado').value.toLowerCase();
    const cardItems = document.getElementsByClassName('cardItem');
  
    for (var i = 0; i < cardItems.length; i++) {
      let nombreDiv = cardItems[i].getElementsByClassName('Nombre')[0];
      let nombre = nombreDiv.textContent.toLowerCase();
  
      if (nombre.includes(searchInput)) {
        cardItems[i].style.display = 'grid'; // Mostrar el cardItem si el nombre coincide
      } else {
        cardItems[i].style.display = 'none'; // Ocultar el cardItem si el nombre no coincide
      }
    }
}
function  ConsultarConjuntosItem(id_item,nombre_item){
    const modalConjuntosItems=document.getElementById('modalConjuntosItems');
    modalConjuntosItems.style.display='block';
    const botonCerrarModal=modalConjuntosItems.getElementsByClassName('botonRojo')[0];
    const tablaModal=document.getElementById('tablaModalConjuntosItems');
    const parrafoTitulo=document.getElementById('tituloConjuntosItems');
    const parrafoTotal=document.getElementById('totalConjuntosItems');
    parrafoTitulo.innerText='Conjuntos que contienen '+nombre_item;
    parrafoTotal.innerText='Total: $0'
    while (tablaModal.firstChild) {
        tablaModal.removeChild(tablaModal.firstChild);
    }
    botonCerrarModal.onclick=function(){
        modalConjuntosItems.style.display='none';
    }
    fetch('http://127.0.0.1:5000/conjuntosItem/'+id_item)
        .then(response => response.json())
        .then(data => {
            let totalLocal=0;
            for (let i = 0; i < data.length; i++) {
                let nuevoTr=document.createElement('tr');
                let idTd=document.createElement('td');
                let nombreTd=document.createElement('td');
                nombreTd.innerText=data[i][1];
                idTd.innerText=data[i][0];
                nuevoTr.appendChild(idTd);
                nuevoTr.appendChild(nombreTd);
                tablaModal.appendChild(nuevoTr);
                fetch('http://localhost:5000/itemsConjunto/'+data[i][0])
                .then(response => response.json())
                .then(dataC => {
                    for(let j = 0; j < dataC.length; j++){
                        if (dataC[j].ID_Item==id_item){
                            totalLocal=totalLocal+(dataC[j].Precio*dataC[j].Cantidad);
                        }
                    }
                parrafoTotal.innerText='Total: $'+totalLocal;    
                });
            }
        });
}