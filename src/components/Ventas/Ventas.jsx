import React from 'react'
import {firebase} from '../../firebase';
import {auth} from '../../firebase';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';

const Ventas = (props) => {


    const [ventas, setVentas] = React.useState([])

    React.useEffect(() => {

      if(auth.currentUser) {
        const obtenerDatos = async () => {
          debugger;
          try {
    
            const db = firebase.firestore()
            const data = await db.collection('ventas').get()
            const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            console.log(arrayData)
            const ventasFiltrado = arrayData.filter(doc => doc.estado === true)
            setVentas(ventasFiltrado)
            
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
      debugger;
      try {
        
        const db = firebase.firestore()
        await db.collection('ventas').doc(id).update({
            estado: false
        })
        const arrayFiltrado = ventas.filter(item => item.id !== id && item.estado === true)
        setVentas(arrayFiltrado)
            }
  
       catch (error) {
        console.log(error)
      }
    }
  
    const verVenta = (id) => {
      props.history.push({
        pathname: '/ventas/detalle',
        state: { detail: id }
      })
    }
  
   

    const agregarVenta = () => {
      props.history.push('/ventas/agregar')
    }
      

    

    return (
        <div>
            <div className="row">
              <div>
              <button 
                  className="btn btn-dark btn-sm float-center mr-2 mt-5 ml-5"
                  onClick={() => agregarVenta()}
              >
                 + Agregar Venta
              </button>
              </div>
                <div className="form-group col-md-12 mt-5">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">Fecha</th>
                        <th scope="col">Importe</th>
                        <th scope="col">Ver</th>
                        <th scope="col">Editar</th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                         ventas.map(item => (
                            <tr>
                                <td>{moment(item.fecha).format('L')}</td>
                                <td>{item.importe}</td>
                                <td><button 
                                    className="btn btn-primary btn-sm float-center"
                                    onClick={() => verVenta(item.id)}
                                >
                                    Ver
                                </button></td>
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

export default withRouter(Ventas)
