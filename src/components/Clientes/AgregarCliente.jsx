import React from 'react';
import {firebase} from '../../firebase';
import {auth} from '../../firebase';
import {withRouter} from 'react-router-dom';
import {Button, Modal} from 'react-bootstrap';

const AgregarCliente = (props) => {

    const [nombre, setNombre] = React.useState('')
    const [apellido, setApellido] = React.useState('')
    const [documento, setDocumento] = React.useState('')
    const [telefono, setTelefono] = React.useState('')
    const [saldo, setSaldo] = React.useState('')
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
    }

    const agregar = async (e) => {
        e.preventDefault()
    
        if(!nombre.trim()){
          console.log('está vacio')
          setError('Por favor ingrese un nombre')
          return
        }
        if(!apellido.trim()){
          console.log('está vacio')
          setError('Por favor ingrese un apellido')
          return
        }
        if(!documento.trim()){
          console.log('vacio')
          setError('Por favor ingrese un documento')
          return
        }
        if(!telefono.trim()){
          console.log('vacio')
          setError('Por favor ingrese un telefono')
          return
        }
        if(!saldo.trim()){
          console.log('vacio')
          setError('Por favor ingrese un saldo')
          return
        }
    
        try {
    
          const db = firebase.firestore()
          const nuevoCliente = {
            fechaAlta: Date.now(),
            nombre: nombre,
            apellido: apellido,
            documento: documento,
            telefono: telefono,
            saldo: saldo, 
            estado: true
          }
          await db.collection('clientes').add(nuevoCliente)
    
          
    
          setNombre('')
          setApellido('')
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
            <div className="col-md-12">
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Agregar Cliente
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
                        placeholder="Ingrese Nombre"
                        className="form-control mb-2"
                        onChange={e => setNombre(e.target.value)}
                        value={nombre}
                        />
                        <input 
                        type="text"
                        placeholder="Ingrese Apellido"
                        className="form-control mb-2"
                        onChange={e => setApellido(e.target.value)}
                        value={apellido}
                        />
                        <input 
                        type="number"
                        placeholder="Ingrese Número de Documento"
                        className="form-control mb-2"
                        onChange={e => setDocumento(e.target.value)}
                        value={documento}
                        />
                        <input 
                        type="number"
                        placeholder="Ingrese Número de Teléfono"
                        className="form-control mb-2"
                        onChange={e => setTelefono(e.target.value)}
                        value={telefono}
                        />
                        <input 
                        type="number"
                        placeholder="Ingrese Saldo del Cliente"
                        className="form-control mb-2"
                        onChange={e => setSaldo(e.target.value)}
                        value={saldo}
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

export default withRouter(AgregarCliente)
