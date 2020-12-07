import React from 'react'
import {firebase} from '../../firebase';
import {auth} from '../../firebase';
import {withRouter} from 'react-router-dom';
import {Button, Modal} from 'react-bootstrap';



const RegistrarCompra = (props) => {

    const [compras, setCompras] = React.useState([])
    const [tiposProducto, setTiposProducto] = React.useState([])
    const [proveedores, setProveedores] = React.useState([])
    const [productosCompra, setProductosCompra] = React.useState([])
    const [id, setId] = React.useState('')
    const [nombre, setNombre] = React.useState('')
    const [tipoProducto, setTipoProducto] = React.useState('')
    // const [tipoProductoString, setTipoProductoString] = React.useState('')
    const [precioCompra, setPrecioCompra] = React.useState('')
    const [descuento, setDescuento] = React.useState('')
    const [cantidad, setCantidad] = React.useState('')
    const [error, setError] = React.useState(null)
    const [show, setShow] = React.useState(true);
    const [productos, setProductos] = React.useState([]);


    React.useEffect(() => {

        if(auth.currentUser) {
          const obtenerDatos = async () => {
            debugger;
            try {
      
              const db = firebase.firestore()
              const data = await db.collection('tipoDeProducto').get()
              const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
              console.log(arrayData)
              setTiposProducto(arrayData);
              const dataProveedores = await db.collection('proveedores').get()
              const arrayDataProveedores = dataProveedores.docs.map(doc => ({ id: doc.id, ...doc.data() }))
              console.log(arrayData)
              setProveedores(arrayDataProveedores);
              
            } catch (error) {
              console.log(error)
            }
      
          }
      
          obtenerDatos()
        } else {
          props.history.push('/login')
        }
    
    
      }, [props.history])

    const handleClose = () => {
        setShow(false);
        props.history.push('/compras');
    }

    const eliminar = (name) => {
        debugger;

            
            const nuevosProductos = [];
            for(let i = 0; i < (productos.length); i ++) {
                if(productos[i].nombre === name) {
                    
                    
                } else {
                    nuevosProductos.push(productos[i])
                }
            }
            setProductosCompra(nuevosProductos)
            
            console.log(productosCompra);
            
    
      }


    

    const agregar = async () => {

          const db = firebase.firestore()
          var importeTotalCompra = 0;
          for(var i = 0; i < productosCompra.length; i ++) {
            importeTotalCompra = (productosCompra[i].totalCompra + importeTotalCompra)
          }
          debugger;
          const addCompra = {
            fecha: Date.now(),
            importe: importeTotalCompra,
            estado:true
          }
          var keyCompra = '';
          const dataNuevaCompra = await db.collection('compras').add(addCompra)
        

        keyCompra = dataNuevaCompra.id;
          

          productosCompra.map(async item => {
            const productoBD = {
              fechaAlta: Date.now(),
              nombre: item.nombre,
              tipoProducto: item.tipoProducto,
              // precioLista: item.precioCompra,
              // descuento: item.descuento,
              precioUnitario: item.precioUnitario,
              stock: item.cantidad,
              estado: true
            }

            db.collection('productos').add(productoBD).then(function(dataProducto){
              debugger;
              const keyProducto = dataProducto.id;
              console.log(keyProducto)
              const productoCompra = {
                idCompra: keyCompra,
                idProducto: keyProducto,
                cantidad: item.cantidad,
                importe: item.totalCompra,
                estado: true
              }
              db.collection('productosCompra').add(productoCompra);

            })
           
            handleClose()
          }) 



          }

    const agregarNuevoProducto = (e) => {
        e.preventDefault()
        debugger;

        if(!nombre.trim()){
          console.log('está vacio')
          setError('Por favor ingrese un producto')
          return
        }
        if(!tipoProducto.trim()){
          console.log('está vacio')
          setError('Por favor ingrese un tipo de producto')
          return
        }if(!precioCompra.trim()){
          console.log('está vacio')
          setError('Por favor ingrese un precio')
          return
        }if(!descuento.trim()){
          console.log('está vacio')
          setError('Por favor ingrese un descuento')
          return
        }if(!cantidad.trim()){
          console.log('está vacio')
          setError('Por favor ingrese una cantidad')
          return
        }
        const precioUnitario = parseFloat(precioCompra - ((precioCompra * descuento) / 100));
        const precioTotal = parseFloat(precioUnitario * cantidad);
        const objetoProducto = {
            nombre: nombre,
            tipoProducto: tipoProducto,
            precioLista: precioCompra,
            descuento: descuento,
            cantidad: cantidad,
            precioUnitario: precioUnitario,
            totalCompra: precioTotal
          }
        //   setProductosCompra(objetoProducto);
          productos.push(objetoProducto);
      setProductosCompra(productos);



      console.log(productosCompra);
      setNombre('')
      setPrecioCompra('')
      setDescuento('')
      setCantidad('')
      setTipoProducto('')
        }

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            
              Agregar Compra
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={agregar}>
                    {
                            error ? (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            ) : null
                        }
                        <input 
                        type="text"
                        placeholder="Nombre de Producto"
                        className="form-control mb-2"
                        onChange={e => setNombre(e.target.value)}
                        value={nombre}
                        />
                        <div class="input-group mb-3">
                            <select class="custom-select" id="inputGroupSelect01"
                            onChange={e => setTipoProducto(e.target.value)}
                            >
                              <option value=''>Seleccione un tipo de Producto</option>
                                { tiposProducto.map(item => (
                                <option value={item.nombre}>{item.nombre}</option>
                                ))
                                }
                            </select>
                        </div>
                        <div class="input-group mb-3">
                            <select class="custom-select" id="inputGroupSelect01"
                            onChange={e => setProveedores(e.target.value)}
                            >
                                { proveedores.map(item => (
                                <option value={item.nombre}>{item.nombre}</option>
                                ))
                                }
                            </select>
                        </div>
                        <input 
                        type="number"
                        placeholder="Precio de Lista"
                        className="form-control mb-2"
                        onChange={e => setPrecioCompra(e.target.value)}
                        value={precioCompra}
                        />
                        <input 
                        type="number"
                        placeholder="% de Descuento"
                        className="form-control mb-2"
                        onChange={e => setDescuento(e.target.value)}
                        value={descuento}
                        />
                        <input 
                        type="number"
                        placeholder="Cantidad"
                        className="form-control mb-2"
                        onChange={e => setCantidad(e.target.value)}
                        value={cantidad}
                        />
                        <button 
                        className="btn btn-dark btn-block"
                        type="button"
                        onClick={agregarNuevoProducto}
                        >
                         Agregar Producto
                        </button>
                        
                    </form>
                    <div className="form-group col-md-4 mt-5">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">Nombre Producto</th>
                        <th scope="col">Tipo Producto</th>
                        <th scope="col">Precio Lista</th>
                        <th scope="col">Descuento</th>
                        <th scope="col">Precio Unitario</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Total</th>
                        <th scope="col">Eliminar</th>
                        </tr>
                    </thead>

                    <tbody>
                      
                    {
                        productosCompra.map(item => (
                            <tr>
                                <td>{item.nombre}</td>
                                <td>{item.tipoProducto}</td>
                                <td>{item.precioLista}</td>
                                <td>{item.descuento}</td>
                                <td>{item.precioUnitario}</td>
                                <td>{item.cantidad}</td>
                                <td>{item.totalCompra}</td>
                                <td><button 
                                    className="btn btn-danger btn-sm float-center"
                                    onClick={() => eliminar(item.nombre)}
                                >
                                    Eliminar
                                </button></td>
                              </tr>
                         ))
                    }

                    </tbody>
                    </table>
                    </div>
                    
                     </Modal.Body>
        <Modal.Footer className="col-md-12">
        <button 
                        className="btn btn-primary btn-block"
                        type="submit"
                        onClick={agregar}
                        >
                        
                        Agregar Compra
                        
                        </button>
                        <button 
                        className="btn btn-secondary btn-block"
                        type="button"
                        onClick={handleClose}
                        >
                        
                        Cancelar
                        
                        </button>
        </Modal.Footer>
      </Modal>
             
        </div>
        </div>
        </div>
    )
}

export default withRouter(RegistrarCompra)
