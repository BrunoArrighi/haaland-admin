import React from 'react'
import {firebase} from '../../firebase';
import {auth} from '../../firebase';
import {withRouter} from 'react-router-dom';

const Compras = (props) => {

    const [productos, setProductos] = React.useState([])
    // const [modoEdicion, setModoEdicion] = React.useState(false)
    // const [id, setId] = React.useState('')
    // const [nombre, setNombre] = React.useState('')
    // const [precioCompra, setPrecioCompra] = React.useState('')
    // const [cantidad, setCantidad] = React.useState('')
    // const [error, setError] = React.useState(null)


  
  
    React.useEffect(() => {

      if(auth.currentUser) {
        const obtenerDatos = async () => {
          debugger;
          try {
    
            const db = firebase.firestore()
            const data = await db.collection('productos').get()
            const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            console.log(arrayData)
            const productosFiltrado = arrayData.filter(doc => doc.estado === true && doc.stock > 0)
            console.log(productosFiltrado)
            setProductos(productosFiltrado)
            
          } catch (error) {
            console.log(error)
          }
    
        }
    
        obtenerDatos()
      } else {
        props.history.push('/login')
      }
  
  
    }, [props.history])
  

    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <h1>Productos</h1>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-md-12">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio Unitario</th>
                        <th scope="col">Stock</th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                         productos.map(item => (
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
        </div>
        </div>
    )
}

export default withRouter(Compras)