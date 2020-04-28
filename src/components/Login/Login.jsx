import React from 'react';
import {auth, db} from '../../firebase';
import { withRouter } from 'react-router-dom';

const Login = (props) => {

    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [error, setError] = React.useState(null)
    const accederWeb = true;

    React.useEffect(() => {

        if(!auth.currentUser) {
          props.history.push('/login')
        }
      }, [props.history])

    const procesarDatos = e => {
        e.preventDefault()
        if(!email.trim()){
            console.log('Datos vacíos email!')
            setError('Por favor ingrese un email')
            setEmail('');
            setPass('');
            return
        }
        if(!pass.trim()){
            console.log('Datos vacíos pass!')
            setError('Por favor ingrese una contraseña')
            setEmail('');
            setPass('');
            return
        }
        if(pass.length < 6){
            console.log('6 o más carácteres')
            setError('la contraseña tiene que ser mayor a 6 carácteres')
            setEmail('');
            setPass('');
            return
        }
        console.log('correcto...');
        setError(null);
        setEmail('');
        setPass('');

        if(accederWeb) {
            login()
        }

    }

    const login = React.useCallback(async() => {
        try {
            await auth.signInWithEmailAndPassword(email, pass)  
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/') 
        } catch (error) {
            if(error.code === 'auth/user-not-found'){
                setError('Usuario o contraseña incorrecta')
                setEmail('');
                setPass('');
            }
            if(error.code === 'auth/wrong-password'){
                setError('Usuario o contraseña incorrecta')
                setEmail('');
                setPass('');
            }
            console.log(error.code)
            console.log(error.message)
        }
    }, [email, pass, props.history])

    return (
        <div className="mt-5">
            <h3 className="text-center">Ingreso a Haaland-Admin</h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                <form onSubmit={procesarDatos}>
                        {
                            error ? (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            ) : null
                        }
                        <input 
                            type="email" 
                            className="form-control mb-2"
                            placeholder="Ingrese Email"
                            onChange={ e => setEmail(e.target.value) }
                            value={email}
                        />
                        <input 
                            type="password" 
                            className="form-control mb-2"
                            placeholder="Ingrese Contraseña"
                            onChange={ e => setPass(e.target.value) }
                            value={pass}
                        />
                        <button 
                            className="btn btn-lg btn-dark btn-block"
                            type="submit"
                        >
                            Ingresar
                        </button>
        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)