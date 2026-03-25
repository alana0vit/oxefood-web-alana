import logo from './logo.svg';
import './App.css';
import Home from './views/home/Home.jsx';
import Rotas from './Rotas.jsx';
import { Segment } from 'semantic-ui-react';
import FormCliente from './views/cliente/FormCliente.jsx';
import FormEntregador from './views/entregador/FormEntregador.jsx';
import FormProduto from './views/produto/FormProduto.jsx';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Rotas />

      <div style={{ marginTop: '6%' }}>
        <Segment vertical color='grey' size='tiny' textAlign='center'>
          &copy; 2026 - Projeto WEB IV - IFPE Jaboatão dos Guararapes
        </Segment>
      </div>

    </div>
  );
}

export default App;
