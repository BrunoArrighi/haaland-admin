import React from 'react';
import {firebase} from '../../firebase';
import {auth} from '../../firebase';
import {withRouter} from 'react-router-dom';
import {Button, Modal} from 'react-bootstrap';

const DetalleCompra = (props) => {

    const idVenta = props.location.state.detail;

    const [detalleVenta, setDetalleVenta] = React.useState([]);
    // const [cantidadVenta, setCantidadVenta] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [show, setShow] = React.useState(true);

    React.useEffect(() => {

        if(auth.currentUser) {
          const obtenerDatos = async () => {
            try {
              debugger;
              const db = firebase.firestore()
              const data = await db.collection('productosVenta').get()
              const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
              console.log(arrayData)
              const comprasFiltrado = arrayData.filter(doc => doc.estado === true && doc.idVenta === idVenta)
              console.log(comprasFiltrado)
              // const cantVendido = comprasFiltrado.map(item => ({cant: item.cantidad}));
              // setCantidadVenta(cantVendido);
            //   idProductos.map(async item => {
            //       debugger;
            //     db.collection('productos').doc(item.id).get().then(function(dataDetalleProducto){
            //         debugger;
            //         const detalleProducto = dataDetalleProducto.data()
            //         productos.push(detalleProducto);
            //         setDetalleCompra(productos);
            //     })
                
            //   })
              
            // for(var i = 0; i < idProductos.length; i++ ){
            //     debugger;
            //     const dataDetalleProducto = await db.collection('productos').doc(idProductos[i].id).get()
            //     const detalleProducto = dataDetalleProducto.data()
            //     productos.push(detalleProducto);
            // }
            debugger;
            setDetalleVenta(comprasFiltrado);
            console.log(detalleVenta)

              
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


    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            
              Detalle Venta
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                    <div className="form-group col-md-12 mt-5">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">Nombre Producto</th>
                        <th scope="col">Importe Unitario</th>
                        <th scope="col">Importe Total</th>
                        <th scope="col">Cantidad</th>
                        </tr>
                    </thead>

                    <tbody>
                      
                    {
                        detalleVenta.map(item => (
                            <tr>
                                <td>{item.nombre}</td>
                                <td>{item.importeUnitario}</td>
                                <td>{item.importeTotal}</td>
                                <td>{item.cantidad}</td>
                              </tr>
                          ))
                        } 
                         
                    

                    </tbody>
                    </table>
                    </div>
                    
                     </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
             
        </div>
        </div>
        </div>
    )
}

export default withRouter(DetalleCompra)