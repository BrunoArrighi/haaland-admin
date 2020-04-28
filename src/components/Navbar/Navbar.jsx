import React from 'react'
import {Link, NavLink, withRouter} from 'react-router-dom'
import {auth} from '../../firebase'
import {Navbar, NavDropdown, Nav} from 'react-bootstrap'


const NavbarApp = (props) => {

    const cerrarSesion = () => {
        auth.signOut()
            .then(() => {
                props.history.push('/login')
            })
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Haaland Software</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          
          <Nav text-align="rigth">
            {
                         props.firebaseUser !== null ? (<NavLink className="btn btn-dark mr-2" to="/" exact>
                            Inicio
                        </NavLink>) : (
                         null
                     )
                    }
                    {
                         props.firebaseUser !== null ? <NavLink className="btn btn-dark mr-2" to="/clientes">
                            Clientes
                        </NavLink> : (
                         null
                     )
                    }
                    {
                         props.firebaseUser !== null ? <NavLink className="btn btn-dark mr-2" to="/pagos">
                            Pagos
                        </NavLink> : (
                         null
                     )
                    }
                    {
                         props.firebaseUser !== null ? <NavLink className="btn btn-dark mr-2" to="/compras">
                            Compras
                        </NavLink> : (
                         null
                     )
                    }
                    {
                         props.firebaseUser !== null ? <NavLink className="btn btn-dark mr-2" to="/ventas">
                            Ventas
                        </NavLink> : (
                         null
                     )
                    }
                    {
                         props.firebaseUser !== null ? <NavLink className="btn btn-dark mr-2" to="/productos">
                            Productos
                        </NavLink> : (
                         null
                     )
                    }
                    {
                         props.firebaseUser !== null ? <NavLink className="btn btn-dark" to="/proveedores">
                            Proveedores
                        </NavLink> : (
                         null
                     )
                    }
                    {
                        props.firebaseUser !== null ? (
                        <button 
                            className="btn btn-dark" 
                            onClick={() => cerrarSesion()}
                        >
                            Cerrar Sesión
                        </button>
                        ): (
                        <NavLink 
                            className="btn btn-dark" 
                            to="/login"
                        >
                            Login
                        </NavLink>
                        )
                    }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}

export default withRouter(NavbarApp)