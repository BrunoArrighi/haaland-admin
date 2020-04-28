import React from 'react'
import {firebase} from '../../firebase';
import {auth} from '../../firebase';
import {withRouter} from 'react-router-dom';



const Proveedores = (props) => {

    const [proveedores, setProveedores] = React.useState([])
  
    React.useEffect(() => {

      if(auth.currentUser) {
        const obtenerDatos = async () => {
          debugger;
          try {
    
            const db = firebase.firestore()
            const data = await db.collection('proveedores').get()
            const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            console.log(arrayData)
            const proveedoresFiltrado = arrayData.filter(doc => doc.estado === true)
            console.log(proveedoresFiltrado)
            setProveedores(proveedoresFiltrado)
            
          } catch (error) {
            console.log(error)
          }
    
        }
    
        obtenerDatos()
      } else {
        props.history.push('/login')
      }
  
  
    }, [props.history])
  
   
  
    const eliminar = async (id) => {
      try {
        
        const db = firebase.firestore()
        await db.collection('proveedores').doc(id).update({
            estado: false
        })
  
        const arrayFiltrado = proveedores.filter(item => item.id !== id && item.estado === true)
        setProveedores(arrayFiltrado)
  
      } catch (error) {
        console.log(error)
      }
    }
  
    const activarEdicion = (item) => {
      props.history.push({
        pathname: '/proveedores/editar',
        state: { detail: item }
      })
    }

    const agregarProveedor = () => {
      props.history.push('/proveedores/agregar')
    }
  
   

    return (
        <div>
            <div className="row">
            <div>
              <button 
                  className="btn btn-dark btn-sm float-center mr-2 mt-5 ml-5"
                  onClick={() => agregarProveedor()}
              >
                 + Agregar Proveedor
              </button>
              </div>
              <div className="form-group col-md-12 mt-5">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Eliminar</th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                         proveedores.map(item => (
                            <tr>
                                <td>{item.nombre}</td>
                                <td>{item.direccion}</td>
                                <td>{item.telefono}</td>
                                <td><button 
                                    className="btn btn-warning btn-sm float-center mr-2"
                                    onClick={() => activarEdicion(item)}
                                >
                                    Editar
                                </button>
                                </td>
                                <td><button 
                                    className="btn btn-danger btn-sm float-center"
                                    onClick={() => eliminar(item.id)}
                                >
                                    Eliminar
                                </button></td>
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

export default withRouter(Proveedores)