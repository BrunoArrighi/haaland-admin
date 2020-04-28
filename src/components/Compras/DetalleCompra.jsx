import React from 'react';
import {firebase} from '../../firebase';
import {auth} from '../../firebase';
import {withRouter} from 'react-router-dom';
import {Button, Modal} from 'react-bootstrap';

const DetalleCompra = (props) => {

    const idCompra = props.location.state.detail;

    const [detalleCompra, setDetalleCompra] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [show, setShow] = React.useState(true);

    React.useEffect(() => {

        if(auth.currentUser) {
          const obtenerDatos = async () => {
              const productos = [];
            try {
      
              const db = firebase.firestore()
              const data = await db.collection('productosCompra').get()
              const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
              console.log(arrayData)
              const comprasFiltrado = arrayData.filter(doc => doc.estado === true && doc.idCompra === idCompra)
              console.log(comprasFiltrado)
              const idProductos = comprasFiltrado.map(item => ({id: item.idProducto}));
            //   idProductos.map(async item => {
            //       debugger;
            //     db.collection('productos').doc(item.id).get().then(function(dataDetalleProducto){
            //         debugger;
            //         const detalleProducto = dataDetalleProducto.data()
            //         productos.push(detalleProducto);
            //         setDetalleCompra(productos);
            //     })
                
            //   })
              
            for(var i = 0; i < idProductos.length; i++ ){
                debugger;
                const dataDetalleProducto = await db.collection('productos').doc(idProductos[i].id).get()
                const detalleProducto = dataDetalleProducto.data()
                productos.push(detalleProducto);
            }
            debugger;
            setDetalleCompra(productos);
            console.log(detalleCompra)

              
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


    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            
              Detalle Compra
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                    <div className="form-group col-md-12 mt-5">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">Nombre Producto</th>
                        <th scope="col">Tipo Producto</th>
                        <th scope="col">Precio Unitario</th>
                        <th scope="col">Cantidad</th>
                        </tr>
                    </thead>

                    <tbody>
                      
                    {
                        detalleCompra.map(item => (
                            <tr>
                                <td>{item.nombre}</td>
                                <td>{item.tipoProducto}</td>
                                <td>{item.precioUnitario}</td>
                                <td>{item.stock}</td>
                                
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
