import React from 'react';
import {firebase} from '../../firebase';
import {auth} from '../../firebase';
import {withRouter} from 'react-router-dom';
import {Button, Modal} from 'react-bootstrap';

const RegistrarPago = (props) => {

    const saldo = props.location.state.detail.saldo;
    const id = props.location.state.detail.id;

    const [pago, setPago] = React.useState('')
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


    const agregarPago = async (e) => {
      debugger;
        e.preventDefault()
        if(!pago.trim()){
          setError('Por favor ingrese un pago')
          return
        }
  
        try {
          const saldoNuevo = parseFloat(saldo) + parseFloat(pago)
          const db = firebase.firestore()
          await db.collection('clientes').doc(id).update({
            saldo: saldoNuevo
          })
          const nuevoPago = {
            fechaAlta: Date.now(),
            idCliente: id,
            pago: pago, 
            estado: true
          }
          await db.collection('pagos').add(nuevoPago);

          setPago('')
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
            Agregar Pago
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={agregarPago}>
                    {
                            error ? (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            ) : null
                        }
                        <input 
                        type="number"
                        placeholder="Ingrese Monto de Pago"
                        className="form-control mb-2"
                        onChange={e => setPago(e.target.value)}
                        value={pago}
                        />
                        
                        <button 
                        className='btn btn-dark btn-block'
                        type="submit"
                        onClick={agregarPago}
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

export default withRouter(RegistrarPago)
