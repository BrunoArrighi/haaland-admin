import React from 'react'
import {firebase} from '../../firebase';
import {Button, Modal} from 'react-bootstrap';
import {auth} from '../../firebase';
import {withRouter} from 'react-router-dom';

const EditarProveedor = (props) => {
    const item = props.location.state.detail;

    const [id, setId] = React.useState(item.id)
    const [nombre, setNombre] = React.useState(item.nombre)
    const [direccion, setDireccion] = React.useState(item.direccion)
    const [telefono, setTelefono] = React.useState(item.telefono)
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

    const editar = async (e) => {
        e.preventDefault()
        if(!nombre.trim()){
          console.log('está vacio')
          setError('Por favor ingrese un nombre')
          return
        }
        if(!direccion.trim()){
          console.log('vacio')
          setError('Por favor ingrese un documento')
          return
        }
        if(!telefono.trim()){
          console.log('vacio')
          setError('Por favor ingrese un telefono')
          return
        }
  
        try {
          
          const db = firebase.firestore()
          await db.collection('proveedores').doc(id).update({
            nombre: nombre,
            direccion: direccion,
            telefono: telefono
          })
  
          setNombre('')
          setId('')
          setDireccion('')
          setTelefono('')
        } catch (error) {
          console.log(error)
        }

        handleClose();
      }

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <h3> Editar Proveedor</h3>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Editar Proveedor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={editar}>
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
                        className='btn btn-warning btn-block'
                        type="submit"
                        onClick={editar}
                        >
                        Editar
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

export default withRouter(EditarProveedor)
