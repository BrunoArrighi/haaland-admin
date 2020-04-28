import React from 'react'
import {firebase} from '../../firebase';
import {auth} from '../../firebase';
import {withRouter} from 'react-router-dom';


const Clientes = (props) => {

    const [clientes, setClientes] = React.useState([])
    const [busqueda, setBusqueda] = React.useState('')

    React.useEffect(() => {

      if(auth.currentUser) {
        const obtenerDatos = async () => {
          debugger;
          try {
    
            const db = firebase.firestore()
            const data = await db.collection('clientes').get()
            const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            console.log(arrayData)
            const clientesFiltrado = arrayData.filter(doc => doc.estado === true)
            console.log(clientesFiltrado)
            setClientes(clientesFiltrado)
            
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
        await db.collection('clientes').doc(id).update({
            estado: false
        })
  
        const arrayFiltrado = clientes.filter(item => item.id !== id && item.estado === true)
        setClientes(arrayFiltrado)
  
      } catch (error) {
        console.log(error)
      }
    }
  
    const activarEdicion = (item) => {
      props.history.push({
        pathname: '/clientes/editar',
        state: { detail: item }
      })
    }

    const activarPago = (item) => {
      props.history.push({
        pathname: '/clientes/pago',
        state: { detail: item }
      })
    }

    const agregarCliente = () => {
      props.history.push('/clientes/agregar');
    }

    const activarCompra = (id) => {
      props.history.push({
        pathname: '/clientes/compra',
        state: { detail: id }
      })
    }

    const buscarCliente = (text) => {
      debugger;
      let filterClientes = [...clientes];
      filterClientes = filterClientes.filter((cliente) => {
        return cliente.apellido.indexOf(text) !== -1
      });
      setClientes(filterClientes);
      setBusqueda('')
  }
  
  const refreshClientes = async () => {
    const db = firebase.firestore()
            const data = await db.collection('clientes').get()
            const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            console.log(arrayData)
            const clientesFiltrado = arrayData.filter(doc => doc.estado === true)
            console.log(clientesFiltrado)
            setClientes(clientesFiltrado)
            setBusqueda('')
  }
  
    

    return (
        <div>
            <div className="row">
            <div className="form-group col-md-4 mt-5">
              <button 
                  className="btn btn-dark btn-sm float-center mr-2 mt-5 ml-5"
                  onClick={() => agregarCliente()}
              >
                 + Agregar Cliente
              </button>
              </div>
              <div className="form-group col-md-4 mt-5">
              <div className="input-group">
              <input type="text" class="form-control" placeholder="Apellido Cliente" value={busqueda} onChange={(event) => setBusqueda(event.target.value)}/>
                <div className="input-group-append" id="button-addon4">
                  <button className="btn btn-outline-secondary" onClick={() => buscarCliente(busqueda)} type="button">Buscar</button>
                  <button className="btn btn-outline-secondary" onClick={() => refreshClientes()} type="button">Refrescar</button>
                </div>
              </div>
              </div>
              
              <div className="form-group col-md-12 mt-5">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Documento</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Saldo</th>
                        <th scope="col" className="text-center">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                         clientes.map(item => (
                            <tr>
                                <td>{item.nombre}</td>
                                <td>{item.apellido}</td>
                                <td>{item.documento}</td>
                                <td>{item.telefono}</td>
                                <td>{item.saldo}</td>
                                <td className="text-center">
                                <button 
                                    className="btn btn-dark btn-sm float-center mr-2"
                                    onClick={() => activarCompra(item.id)}
                                >
                                    Compra
                                </button>
                                  <button 
                                    className="btn btn-primary btn-sm float-center mr-2"
                                    onClick={() => activarPago(item)}
                                >
                                    Pago
                                </button>
                                <button 
                                    className="btn btn-warning btn-sm float-center mr-2"
                                    onClick={() => activarEdicion(item)}
                                >
                                    Editar
                                </button>
                                <button 
                                    className="btn btn-danger btn-sm float-center"
                                    onClick={() => eliminar(item.id)}
                                >
                                    Eliminar
                                </button>
                                </td>
                                
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

export default withRouter(Clientes)