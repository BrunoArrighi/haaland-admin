import React from 'react';
import {firebase} from '../../firebase';
import {auth, db} from '../../firebase';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';

const Pagos = (props) => {

    const [pagos, setPagos] = React.useState([]);
    const [busqueda, setBusqueda] = React.useState([]);



    React.useEffect(() => {

      if(auth.currentUser) {
        const obtenerDatos = async () => {
          debugger;
          try {
    
            const db = firebase.firestore()
            const dataPagos = await db.collection('pagos').get()
            const arrayDataPagos = dataPagos.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            mapLoop(arrayDataPagos);
          
            
            
          } catch (error) {
            console.log(error)
          }
    
        }
        obtenerDatos()
      } else {
        props.history.push('/login')
      }
    }, [props.history])

    const getCliente = async pago => {
      debugger;
      const docCliente = db.collection('clientes').doc(pago.idCliente);
      const cliente = await docCliente.get();
    return cliente;
    }

    const mapLoop = async (arrayDataPagos)=> {
     
      const promises = arrayDataPagos.map(async pago => {
        const cliente = await getCliente(pago);
        const newPago = {
          id: pago.id,
          pago: pago.pago,
          fechaAlta: pago.fechaAlta,
          nombre: cliente.data().nombre,
          apellido: cliente.data().apellido,
          dni: cliente.data().documento,
          estado: true
        };
        return newPago;
       
      })
    
      const pags = await Promise.all(promises)
     setPagos(pags);
    }
  
  

    const eliminar = async (id) => {
      debugger;
        try {
          
          const db = firebase.firestore()
          await db.collection('pagos').doc(id).update({
              estado: false
          })
    
          const arrayFiltrado = pagos.filter(item => item.id !== id && item.estado === true)
          setPagos(arrayFiltrado)
    
        } catch (error) {
          console.log(error)
        }
      }

      const buscarPago = (text) => {
        debugger;
        let filterPagos = [...pagos];
        filterPagos = filterPagos.filter((pago) => {
          return pago.apellido.indexOf(text) !== -1
        });
        setPagos(filterPagos);
        setBusqueda('')
    }

    return (
        <div>
            <div className="row">
            <div className="form-group col-md-4 mt-5">
              <div className="input-group">
              <input type="text" class="form-control" placeholder="Apellido Cliente" value={busqueda} onChange={(event) => setBusqueda(event.target.value)}/>
                <div className="input-group-append" id="button-addon4">
                  <button className="btn btn-outline-secondary" onClick={() => buscarPago(busqueda)} type="button">Buscar</button>
                  {/* <button className="btn btn-outline-secondary" onClick={() => refreshClientes()} type="button">Refrescar</button> */}
                </div>
              </div>
              </div>
              <div className="form-group col-md-12 mt-5">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">Fecha</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Pago</th>
                        <th scope="col">Eliminar</th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                      pagos.map(item => (
                            <tr>
                                <td>{moment(item.fechaAlta).format('L')}</td>
                                <td>{item.apellido}</td>
                                <td>{item.pago}</td>
                                
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


export default withRouter(Pagos)
