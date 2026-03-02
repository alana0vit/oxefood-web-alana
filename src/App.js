import logo from './logo.svg';
import './App.css';
import Home from './views/home/Home.jsx';
import { Segment } from 'semantic-ui-react';
import FormCliente from './views/cliente/FormCliente.jsx';
import FormEntregador from './views/entregador/FormEntregador.jsx';
import FormProduto from './views/produto/FormProduto.jsx';

function App() {
  return (
    <div className="App">
      <FormEntregador />

      <div style={{ marginTop: '6%' }}>
        <Segment vertical color='grey' size='tiny' textAlign='center'>
          &copy; 2026 - Projeto WEB IV - IFPE Jaboatão dos Guararapes
        </Segment>
      </div>

    </div>
  );
}

export default App;
