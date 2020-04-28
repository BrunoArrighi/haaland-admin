import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {firebase} from '../../firebase';
import {auth} from '../../firebase';

const AgregarProveedor = (props) => {

    const [nombre, setNombre] = React.useState('')
    const [direccion, setDireccion] = React.useState('')
    const [telefono, setTelefono] = React.useState('')
    const [error, setError] = React.useState(null)
    const [show, setShow] = React.useState(true);

    React.useEffect(() => {

      if(!auth.currentUser) {
        props.history.push('/login')
      }
    }, [props.history])

    const handleClose = () => {
      setShow(false);
      props.history.push('/proveedores');
    }


    const agregar = async (e) => {
        e.preventDefault()
    
        if(!nombre.trim()){
          console.log('está vacio')
          setError('Por favor ingrese un nombre')
          return
        }
        if(!direccion.trim()){
          console.log('vacio')
          setError('Por favor ingrese una dirección')
          return
        }
        if(!telefono.trim()){
          console.log('vacio')
          setError('Por favor ingrese un teléfono')
          return
        }
    
        try {
    
          const db = firebase.firestore()
          const nuevoProveedor = {
            fechaAlta: Date.now(),
            nombre: nombre,
            direccion: direccion,
            telefono: telefono,
            estado: true
          }
          await db.collection('proveedores').add(nuevoProveedor)
    
          setNombre('')
          setDireccion('')
          setTelefono('')
          
        } catch (error) {
          console.log(error)
        }
        
        handleClose()
        
      }

    return (
        <div>
            <div className="row">
                <div className="col-md-12">

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Agregar Proveedor
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
                        placeholder="Nombre"
                        className="form-control mb-2"
                        onChange={e => setNombre(e.target.value)}
                        value={nombre}
                        />
                        <input 
                        type="text"
                        placeholder="Dirección"
                        className="form-control mb-2"
                        onChange={e => setDireccion(e.target.value)}
                        value={direccion}
                        />
                        <input 
                        type="number"
                        placeholder="Teléfono"
                        className="form-control mb-2"
                        onChange={e => setTelefono(e.target.value)}
                        value={telefono}
                        />
                        <button 
                        className='btn btn-dark btn-block'
                        type="submit"
                        onClick={agregar}
                        >
                        Agregar
                        </button>
                    </form> </Modal.Body>
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

export default withRouter(AgregarProveedor)
