import React from 'react'
import {firebase} from '../../firebase';
import {auth} from '../../firebase';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';

const Compras = (props) => {

    const [compras, setCompras] = React.useState([])

    React.useEffect(() => {

      if(auth.currentUser) {
        const obtenerDatos = async () => {
          debugger;
          try {
    
            const db = firebase.firestore()
            const data = await db.collection('compras').get()
            const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            console.log(arrayData)
            const comprasFiltrado = arrayData.filter(doc => doc.estado === true)
            console.log(comprasFiltrado)
            setCompras(comprasFiltrado)
            console.log(compras);
            
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
        await db.collection('compras').doc(id).update({
            estado: false
        })
              const data = await db.collection('productosCompra').get()
              const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
              console.log(arrayData)
              const comprasFiltrado = arrayData.filter(doc => doc.estado === true && doc.idCompra === id)
              console.log(comprasFiltrado)
              const idProductos = comprasFiltrado.map(item => ({id: item.idProducto}));
              for(var i = 0; i < idProductos.length; i++ ){
                debugger;
                await db.collection('productos').doc(idProductos[i].id).update({
                  estado: false
              })
            }
  
        const arrayFiltrado = compras.filter(item => item.id !== id && item.estado === true)
        setCompras(arrayFiltrado)
  
      } catch (error) {
        console.log(error)
      }
    }
  
    const verCompra = (id) => {
      props.history.push({
        pathname: '/compras/detalle',
        state: { detail: id }
      })
    }
  
   

    const agregarCompra = () => {
      props.history.push('/compras/agregar')
    }

    

      
      // if(productosCompra.length > 0){
      //   setProductosCompra([
      //     ...productosCompra,
      //     {...objetoProducto}
      //   ])
      // } else {
      //   setProductosCompra(
      //     objetoProducto
      //   )
      // }

      

    

    return (
        <div>
            <div className="row">
              <div>
              <button 
                  className="btn btn-dark btn-sm float-center mr-2 mt-5 ml-5"
                  onClick={() => agregarCompra()}
              >
                 + Agregar Compra
              </button>
              </div>
                <div className="form-group col-md-12 mt-5">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">Fecha</th>
                        <th scope="col">Importe</th>
                        <th scope="col">Ver</th>
                        <th scope="col">Editar</th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                         compras.map(item => (
                            <tr>
                                <td>{moment(item.fecha).format('L')}</td>
                                <td>{item.importe}</td>
                                <td><button 
                                    className="btn btn-primary btn-sm float-center"
                                    onClick={() => verCompra(item.id)}
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

export default withRouter(Compras)