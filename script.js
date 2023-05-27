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