import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import NavbarApp from './components/Navbar/Navbar'
import Login from './components/Login/Login'
import Clientes from './components/Clientes/Clientes'
import {auth} from './firebase'
import Inicio from './components/Inicio/Inicio'
import Compras from './components/Compras/Compras'
import Productos from './components/Productos/Productos'
import Proveedores from './components/Proveedores/Proveedores'
import 'bootstrap/dist/css/bootstrap.min.css';
import EditarProveedor from './components/Proveedores/EditarProveedor'
import AgregarProveedor from './components/Proveedores/AgregarProveedor'
import EditarCliente from './components/Clientes/EditarCliente'
import AgregarCliente from './components/Clientes/AgregarCliente'
import RegistrarPago from './components/Clientes/RegistrarPago'
import Pagos from './components/Pagos/Pagos'
import RegistrarCompra from './components/Compras/RegistrarCompra'
import DetalleCompra from './components/Compras/DetalleCompra'
import Ventas from './components/Ventas/Ventas'
import AgregarVenta from './components/Ventas/AgregarVenta'
import DetalleVenta from './components/Ventas/DetalleVenta'

const App = () => {

  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
        console.log(user)
        if(user){
            setFirebaseUser(user)
        }else{
            setFirebaseUser(null)
        }
    })
}, [])

    return (
        <Router>
            <div className="container">
                <NavbarApp firebaseUser={firebaseUser}/>
                <Switch>
                  
                    <Route path="/clientes" exact>
                      <Clientes />
                    </Route>
                    <Route path="/clientes/editar" exact>
                      <EditarCliente />
                    </Route>
                    <Route path="/clientes/agregar" exact>
                      <AgregarCliente />
                    </Route>
                    <Route path="/clientes/pago" exact>
                      <RegistrarPago />
                    </Route>
                    <Route path="/clientes/compra" exact>
                      <AgregarVenta />
                    </Route>
                    <Route path="/pagos" exact>
                      <Pagos />
                    </Route>
                    <Route path="/proveedores" exact>
                        <Proveedores />
                    </Route>
                    <Route path="/proveedores/editar" exact>
                        <EditarProveedor />
                    </Route>
                    <Route path="/proveedores/agregar" exact>
                        <AgregarProveedor />
                    </Route>
                    <Route path="/compras" exact>
                      <Compras />
                    </Route>
                    <Route path="/compras/agregar" exact>
                      <RegistrarCompra />
                    </Route>
                    <Route path="/compras/detalle" exact>
                      <DetalleCompra />
                    </Route> 
                    <Route path="/ventas" exact>
                      <Ventas />
                    </Route>
                    <Route path="/ventas/detalle" exact>
                      <DetalleVenta />
                    </Route>
                    {/* <Route path="/ventas/agregar" exact>
                      <AgregarVenta />
                    </Route> */}
                  <Route path="/productos">
                      <Productos />
                    </Route>
                  <Route path="/" exact>
                        <Inicio />
                  </Route>
                  
                  <Route path="/login">
                      <Login />
                    </Route>
                    
                    
                </Switch>
            </div>
        </Router>
    )
}

export default App
