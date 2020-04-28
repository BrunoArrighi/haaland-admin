import React from 'react';
import {firebase} from '../../firebase';
import {auth} from '../../firebase';
import {Button, Modal} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

const EditarCliente = (props) => {

    const item = props.location.state.detail;

    const [id, setId] = React.useState(item.id)
    const [nombre, setNombre] = React.useState(item.nombre)
    const [apellido, setApellido] = React.useState(item.apellido)
    const [documento, setDocumento] = React.useState(item.documento)
    const [telefono, setTelefono] = React.useState(item.telefono)
    const [saldo, setSaldo] = React.useState(item.saldo)
    const [error, setError] = React.useState(null)
    const [show, setShow] = React.useState(true);
  
    React.useEffect(() => {

      if(!auth.currentUser) {
        props.history.push('/login')
      }
    }, [props.history])


    const handleClose = () => {
        setShow(false);
        props.history.push('/clientes');
      };

    const editar = async (e) => {
        e.preventDefault()
        if(!nombre.trim()){
          setError('Por favor ingrese un nombre')
          return
        }
        if(!apellido.trim()){
          setError('Por favor ingrese un apellido')
          return
        }
        if(!documento.trim()){
          setError('Por favor ingrese un documento')
          return
        }
        if(!telefono.trim()){
          setError('Por favor ingrese un telefono')
          return
        }
        if(!saldo.trim()){
          setError('Por favor ingrese un saldo')
          return
        }
  
        try {
          
          const db = firebase.firestore()
          await db.collection('clientes').doc(id).update({
            nombre: nombre,
            apellido: apellido,
            documento: documento,
            telefono: telefono,
            saldo: saldo
          })
        //   const arrayEditado = clientes.map(item => (
        //     item.id === id ? {id: item.id, fecha: item.fecha, nombre: nombre, apellido: apellido, documento: documento, telefono: telefono, saldo: saldo} : item
        //   ))
        //   setClientes(arrayEditado)
        //   setModoEdicion(false)
  
          setNombre('')
          setApellido('')
          setId('')
          setDocumento('')
          setTelefono('')
          setSaldo('')
        } catch (error) {
          console.log(error)
        }
        handleClose();
      }

    return (
        <div>
            <div className="row">
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Editar Cliente
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
                        placeholder="Apellido"
                        className="form-control mb-2"
                        onChange={e => setApellido(e.target.value)}
                        value={apellido}
                        />
                        <input 
                        type="number"
                        placeholder="Documento"
                        className="form-control mb-2"
                        onChange={e => setDocumento(e.target.value)}
                        value={documento}
                        />
                        <input 
                        type="number"
                        placeholder="Teléfono"
                        className="form-control mb-2"
                        onChange={e => setTelefono(e.target.value)}
                        value={telefono}
                        />
                        <input 
                        type="number"
                        placeholder="Saldo del Cliente"
                        className="form-control mb-2"
                        onChange={e => setSaldo(e.target.value)}
                        value={saldo}
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
    )
}

export default withRouter(EditarCliente)
