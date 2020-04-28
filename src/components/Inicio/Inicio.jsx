import React from 'react'
import {auth} from '../../firebase';
import {withRouter} from 'react-router-dom';



const Inicio = (props) => {

    React.useEffect(() => {
        debugger;
        if(!auth.currentUser) {
            props.history.push('/login')
        }
    }, [props.history])

    return (
        <div>
            <h1>Bienvenidos a Haaland Software</h1>
        </div>
    )
}

export default withRouter(Inicio)
