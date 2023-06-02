const botonEliminarItem = document.getElementById('EliminarItemBtn');
botonEliminarItem.disabled = true;
const botonActualizarItem = document.getElementById('ActualizarItemBtn');
botonActualizarItem.disabled = true;
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
                        let precioDiv = createDivWithText('Precio', '$' + datosItem.Precio);
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
                        consultarButton.onclick = function () {
                            ConsultarConjuntosItem(datosItem.ID_Item, datosItem.Nombre_Comun);
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
                        cardItemDiv.id = datosItem.ID_Item;
                        cardItemDiv.onclick = function () {
                            seleccionarItem(datosItem);
                        }
                        divCardsItems.appendChild(cardItemDiv);
                    });
            }
        })
        .catch(error => {
            // Manejar errores
        });
}
function seleccionarItem(item) {
    const cardItems = document.getElementsByClassName('cardItem');
    botonActualizarItem.disabled = false;
    botonEliminarItem.disabled = false;
    botonActualizarItem.onclick = function () {
        UpdateItem(item);
    }
    botonEliminarItem.disabled = false;
    botonEliminarItem.onclick = function () {
        DeleteItem(item.ID_Item);
    }
    for (var i = 0; i < cardItems.length; i++) {
        if (cardItems[i].id == item.ID_Item) {
            let tarjeta = cardItems[i]; //Se que esto parece redondante, pero it just works
            cardItems[i].classList.add('seleccionado');
            cardItems[i].onclick = function () {
                desSeleccionarItem(tarjeta, item);
            }
        } else {
            cardItems[i].classList.remove('seleccionado');
        }
    }
}
function desSeleccionarItem(cardItem, datosItem) {
    botonActualizarItem.disabled = true;
    botonEliminarItem.disabled = true;
    cardItem.classList.remove('seleccionado');
    cardItem.onclick = function () {
        seleccionarItem(datosItem);
    }
}
//Función para crear un div con texto directamente
function createDivWithText(className, text) {
    let div = document.createElement('div');
    div.className = className;
    div.textContent = text;
    return div;
}
//Función para decodificar la imagen
function crearImagen(imagenTexto) {
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
            cardItems[i].style.display = 'grid';
        } else {
            cardItems[i].style.display = 'none';
        }
    }
}
function ConsultarConjuntosItem(id_item, nombre_item) {
    const modalConjuntosItems = document.getElementById('modalConjuntosItems');
    modalConjuntosItems.style.display = 'block';
    const botonCerrarModal = modalConjuntosItems.getElementsByClassName('botonRojo')[0];
    const tablaModal = document.getElementById('tablaModalConjuntosItems');
    const parrafoTitulo = document.getElementById('tituloConjuntosItems');
    const parrafoTotal = document.getElementById('totalConjuntosItems');
    parrafoTitulo.innerText = 'Conjuntos que contienen ' + nombre_item;
    parrafoTotal.innerText = 'Total: $0'
    while (tablaModal.firstChild) {
        tablaModal.removeChild(tablaModal.firstChild);
    }
    botonCerrarModal.onclick = function () {
        modalConjuntosItems.style.display = 'none';
    }
    fetch('http://127.0.0.1:5000/conjuntosItem/' + id_item)
        .then(response => response.json())
        .then(data => {
            let totalLocal = 0;
            let flag=false;
            for (let i = 0; i < data.length; i++) {
                let nuevoTr = document.createElement('tr');
                let idTd = document.createElement('td');
                let nombreTd = document.createElement('td');
                nombreTd.innerText = data[i][1];
                idTd.innerText = data[i][0];
                nuevoTr.appendChild(idTd);
                nuevoTr.appendChild(nombreTd);
                nuevoTr.onclick=function(){
                    parrafoTotal.innerText="Total: $"+nuevoTr.id;
                }
                tablaModal.appendChild(nuevoTr);
                fetch('http://localhost:5000/itemsConjunto/' + data[i][0])
                    .then(response => response.json())
                    .then(dataC => {
                        for (let j = 0; j < dataC.length; j++) {
                            if (dataC[j].ID_Item == id_item) {
                                totalLocal = totalLocal + (dataC[j].Precio * dataC[j].Cantidad);
                                nuevoTr.id=(dataC[j].Precio * dataC[j].Cantidad);
                                if (flag==false){
                                    parrafoTotal.innerText="Total: $"+nuevoTr.id;
                                    flag=true;
                                }
                            }
                        }
                    });
            }
        });
}
function CrearItem() {
    const modalCreateItem = document.getElementById('modalCreateItem');
    modalCreateItem.style.display = 'block';
    let inputs = modalCreateItem.querySelectorAll('input');
    let desc = document.getElementById('descCreateItem');
    inputs.forEach(function (input) {
        input.value = '';
        desc.value = '';
    });
    const botonCerrarModal = modalCreateItem.getElementsByClassName('botonRojo')[0];
    botonCerrarModal.onclick = function () {
        modalCreateItem.style.display = 'none';
    }
    const botonCrearItem = document.getElementById('botonCrearItem');
    botonCrearItem.innerText = 'Crear';
    botonCrearItem.onclick = function () {
        modalCreateItem.style.display = 'none';
        let archivo = document.getElementById('file-input').files[0];
        convertirImagen(archivo)
            .then(function (base64Data) {
                const nombre = document.getElementById('nombreCreateItem').value;
                const descripcion = document.getElementById('descCreateItem').value;
                const proveedor = document.getElementById('provCreateItem').value;
                const referencia = document.getElementById('refCreateItem').value;
                const precio = document.getElementById('precioCreateItem').value;
                const almacen = document.getElementById('almacenCreateItem').value;
                const contabilidad = document.getElementById('contaCreateItem').value;
                const nombreComun = document.getElementById('nombreComunCreateItem').value;
                let json_item = {};
                json_item.Nombre = nombre;
                json_item.Descripcion = descripcion;
                json_item.Proveedor = proveedor;
                json_item.Referencia = referencia;
                json_item.Precio = precio;
                json_item.Codigo_Almacen = almacen;
                json_item.Codigo_Contabilidad = contabilidad;
                json_item.Nombre_Comun = nombreComun;
                json_item.Foto = base64Data;
                solicitudPost('http://127.0.0.1:5000/item/', json_item);
            })
            .catch(function (error) {
                alert(error);
            });
    }
}
function UpdateItem(item) {
    const modalCreateItem = document.getElementById('modalCreateItem');
    modalCreateItem.style.display = 'block';
    const nombreInput = document.getElementById('nombreCreateItem');
    const descripcionInput = document.getElementById('descCreateItem')
    const proveedorInput = document.getElementById('provCreateItem')
    const referenciaInput = document.getElementById('refCreateItem')
    const precioInput = document.getElementById('precioCreateItem')
    const almacenInput = document.getElementById('almacenCreateItem')
    const contabilidadInput = document.getElementById('contaCreateItem')
    const nombreComunInput = document.getElementById('nombreComunCreateItem');
    const botonCerrarModal = modalCreateItem.getElementsByClassName('botonRojo')[0];
    botonCerrarModal.onclick = function () {
        modalCreateItem.style.display = 'none';
    }
    nombreInput.value = item.Nombre;
    descripcionInput.value = item.Descripcion;
    proveedorInput.value = item.Proveedor;
    referenciaInput.value = item.Referencia;
    precioInput.value = item.Precio;
    almacenInput.value = item.Codigo_Almacen;
    contabilidadInput.value = item.Codigo_Contabilidad;
    nombreComunInput.value = item.Nombre_Comun;
    const botonCrearItem = document.getElementById('botonCrearItem');
    var foto = item.Foto;
    botonCrearItem.innerText = 'Actualizar';
    const seleccionarArchivo = document.getElementById('file-input');
    seleccionarArchivo.addEventListener('change', function (event) {
        const files = event.target.files;
        convertirImagen(files[0])
        .then(function (base64Data) {foto=base64Data});
    });
    botonCrearItem.addEventListener('click',function(){
        let json_item={}
        json_item.ID_Item=item.ID_Item;
        json_item.Nombre = nombreInput.value;
        json_item.Descripcion = descripcionInput.value;
        json_item.Proveedor = proveedorInput.value;
        json_item.Referencia = referenciaInput.value;
        json_item.Precio = precioInput.value;
        json_item.Codigo_Almacen = almacenInput.value;
        json_item.Codigo_Contabilidad = contabilidadInput.value;
        json_item.Nombre_Comun = nombreComunInput.value;
        json_item.Foto = foto;
        solicitudPut('http://127.0.0.1:5000/item/', json_item);
    });
}
function DeleteItem(id){
    const modal= document.getElementById('modalConfirmarItem');
    modal.style.display = 'block';
    const botonCerrar=document.getElementById('cerrarModalConfirmarItem');
    botonCerrar.addEventListener('click',function(){modal.style.display = 'none';});
    const botonConfirmar=document.getElementById('ConfirmarEliminarItem');
    let url='http://127.0.0.1:5000/item/'+id;
    botonConfirmar.addEventListener('click',function(){solicitudDelete(url)});
}
//Esta devuelve la imagen en base64
function convertirImagen(archivo) {
    return new Promise(function (resolve, reject) {
        if (!archivo) {
            reject(new Error('No se ha seleccionado ningún archivo.'));
        }

        let reader = new FileReader();
        reader.onload = function (event) {
            let base64Data = reader.result;
            resolve(base64Data);
        };
        reader.onerror = function (error) {
            reject(error);
        };
        reader.readAsDataURL(archivo);
    });
}
//Esto realiza una solicitud post, para el create, recibe un json
function solicitudPost(url, data) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData);
            location.reload(); 
        })
        .catch(error => {
            console.error('Error:', error);
        });   
}
//Lo mismo de arriba pero con put
function solicitudPut(url, data) {
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData);
            location.reload(); 
        })
        .catch(error => {
            console.error('Error:', error);
        });   
}
//¿Que será? ¿Que será? ¡Otra solicitud igual que las anteriores!
function solicitudDelete(url){
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData);
            location.reload(); 
        })
        .catch(error => {
            console.error('Error:', error);
        });   
}
