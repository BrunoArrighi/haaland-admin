import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import {auth} from '../../firebase';
import {withRouter} from 'react-router-dom';
import {firebase} from '../../firebase';

const AgregarVenta = (props) => {

    const idCliente = props.location.state.detail;

    // const [nombreProducto, setNombreProducto] = React.useState('')
    const [idProducto, setIdProducto] = React.useState('')
    // const [idProductos, setIdProductos] = React.useState([])
    const [productos, setProductos] = React.useState([])
    const [arrayProductos, setArrayProductos] = React.useState([])
    const [productosVenta, setProductosVenta] = React.useState([])
    const [precioVenta, setPrecioVenta] = React.useState('')
    const [cantidad, setCantidad] = React.useState('')
    const [error, setError] = React.useState(null)
    const [show, setShow] = React.useState(true);

    React.useEffect(() => {
    if(auth.currentUser) {
        const obtenerDatos = async () => {
          debugger;
          try {
    
            const db = firebase.firestore()
            const data = await db.collection('productos').get()
            const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            console.log(arrayData)
            const productosFiltrado = arrayData.filter(doc => doc.estado === true)
            setArrayProductos(productosFiltrado);
            
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
      props.history.push('/ventas');
    }

    const handleCloseCliente = () => {
      setShow(false);
      props.history.push('/clientes');
    }
   


    const agregar = async (e) => {
        debugger;
        const db = firebase.firestore()



        var importeTotalVenta = 0;
        for(var i = 0; i < productos.length; i ++) {
          importeTotalVenta = (productos[i].totalVenta + importeTotalVenta)
        }
        debugger;
        const addVenta = {
          fechaAlta: Date.now(),
          importe: importeTotalVenta,
          estado:true,
          idCliente: idCliente
        }
        var keyVenta = '';
        const dataNuevaVenta = await db.collection('ventas').add(addVenta)
        keyVenta = dataNuevaVenta.id;
        const cliente = await db.collection('clientes').doc(idCliente).get();
           const dataCliente = cliente.data();
           const saldoCliente = dataCliente.saldo;
           await db.collection('clientes').doc(idCliente).update({
             saldo: (saldoCliente - importeTotalVenta)
           });
            
          
        

        productosVenta.map(async item => {

          const productoBD = {
            idProducto: item.idProducto,
            nombre: item.nombreProducto,
            importeUnitario: item.precioVenta,
            importeTotal: item.totalVenta,
            cantidad: item.cantidad,
            idVenta: keyVenta,
            idCliente: idCliente,
            estado: true
          }
          debugger;
          db.collection('productosVenta').add(productoBD);
          const producto = await db.collection('productos').doc(item.idProducto).get();
          const dataProducto = producto.data();
          const stockProducto = dataProducto.stock;
          db.collection('productos').doc(item.idProducto).update({
           stock: (stockProducto - item.cantidad)
          });

           
           
           
           })
         
          handleClose()
        // }) 



        }

        const agregarNuevoProducto = async (e) => {
            e.preventDefault()
            debugger;
    
              if(!idProducto.trim()){
                console.log('está vacio')
                setError('Por favor ingrese un producto')
                return
            }if(!precioVenta.trim()){
              console.log('está vacio')
              setError('Por favor ingrese un precio de venta')
              return
            }
            if(!cantidad.trim()){
              console.log('está vacio')
              setError('Por favor ingrese una cantidad')
              return
            }
            debugger;
            const db = firebase.firestore()
            const data = await db.collection('productos').doc(idProducto).get()
            const arrayData = data.data()
            let nombreDelProducto = arrayData.nombre;

                    if(cantidad > arrayData.stock && arrayData.estado === true) {
                    setError('No hay suficiente stock de este producto')
                    return
                    }
                
        

        



            const precioTotal = parseFloat(precioVenta * cantidad);
            const objetoProducto = {
                idProducto: idProducto,
                nombreProducto: nombreDelProducto,
                precioVenta: precioVenta,
                cantidad: cantidad,
                totalVenta: precioTotal
              }
            //   setProductosCompra(objetoProducto);
              productos.push(objetoProducto);
          setProductosVenta(productos);
    
    
    
          console.log(productosVenta);
          nombreDelProducto = '';
          setIdProducto('')
          setPrecioVenta('')
          setCantidad('')
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
                    setProductosVenta(nuevosProductos)
                    
                    console.log(productosVenta);
                    
            
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
                        <div class="input-group mb-3">
                            <select class="custom-select" id="inputGroupSelect01"
                            onChange={e => setIdProducto(e.target.value)}
                            >
                                { arrayProductos.map(item => (
                                <option value={item.id}>{item.nombre}</option>
                                ))
                                }
                            </select>
                        </div>
                        <input 
                        type="number"
                        placeholder="Precio de Venta"
                        className="form-control mb-2"
                        onChange={e => setPrecioVenta(e.target.value)}
                        value={precioVenta}
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
                        <th scope="col">Cantidad</th>
                        <th scope="col">Total</th>
                        <th scope="col">Eliminar</th>
                        </tr>
                    </thead>

                    <tbody>
                      
                    {
                        productosVenta.map(item => (
                            <tr>
                                <td>{item.nombreProducto}</td>
                                <td>{item.cantidad}</td>
                                <td>{item.totalVenta}</td>
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
                        onClick={handleCloseCliente}
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

export default withRouter(AgregarVenta)
