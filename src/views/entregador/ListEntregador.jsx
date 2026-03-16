import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListEntregador() {

    const [lista, setLista] = useState([]);

    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();

    const [openModalTable, setOpenModalTable] = useState(false);

    const [entregadorSelecionado, setEntregadorSelecionado] = useState(null);

    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/entregador")
            .then((response) => {
                setLista(response.data)
            })
    }

    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

    function visualizarDados(entregador) {
        setEntregadorSelecionado(entregador)
        setOpenModalTable(true)
    }

    async function remover() {

        await axios.delete('http://localhost:8080/api/entregador/' + idRemover)
            .then((response) => {

                console.log('Entregador removido com sucesso.')

                axios.get("http://localhost:8080/api/entregador")
                    .then((response) => {
                        setLista(response.data)
                    })
            })
            .catch((error) => {
                console.log('Erro ao remover um entregador.')
            })
        setOpenModal(false)
    }

    return (
        <div>
            <MenuSistema tela={'entregador'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Entregador </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-entregador'
                        />
                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    <Table.HeaderCell>DataNasc</Table.HeaderCell>
                                    <Table.HeaderCell>CPF</Table.HeaderCell>
                                    <Table.HeaderCell>F. Celular</Table.HeaderCell>
                                    <Table.HeaderCell>F. Fixo</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(entregador => (

                                    <Table.Row key={entregador.id}>
                                        <Table.Cell>{entregador.nome}</Table.Cell>
                                        <Table.Cell>{formatarData(entregador.dataNascimento)}</Table.Cell>
                                        <Table.Cell>{entregador.cpf}</Table.Cell>
                                        <Table.Cell>{entregador.foneCelular}</Table.Cell>
                                        <Table.Cell>{entregador.foneFixo}</Table.Cell>
                                        <Table.Cell textAlign='center'>
                                            <Button
                                                inverted
                                                circular
                                                color='blue'
                                                title='Visualizar detalhes'
                                                icon
                                                onClick={() => visualizarDados(entregador)}>
                                                <Icon name='eye' />
                                            </Button> &nbsp;

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste entregador'
                                                icon>
                                                <Link to="/form-entregador" state={{ id: entregador.id }} style={{ color: 'green' }}>
                                                    <Icon name='edit' />
                                                </Link>
                                            </Button> &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este entregador'
                                                icon
                                                onClick={e => confirmaRemover(entregador.id)}>
                                                <Icon name='trash' />
                                            </Button>

                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>

            <Modal
                basic
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
            >
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={() => remover()}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>

            <Modal
                basic
                onClose={() => setOpenModalTable(false)}
                onOpen={() => setOpenModalTable(true)}
                open={openModalTable}>

                <Header icon>
                    <Icon name='eye' />
                    Detalhes do Entregador
                </Header>

                <Modal.Content>

                    {entregadorSelecionado && (

                        <Table celled>

                            <Table.Body>

                                <Table.Row>
                                    <Table.Cell><b>RG</b></Table.Cell>
                                    <Table.Cell>{entregadorSelecionado.rg}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell><b>Quantidade de Entregas</b></Table.Cell>
                                    <Table.Cell>{entregadorSelecionado.qtdEntregaRealizadas}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell><b>Valor do Frete</b></Table.Cell>
                                    <Table.Cell>{entregadorSelecionado.valorFrete}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell><b>Rua</b></Table.Cell>
                                    <Table.Cell>{entregadorSelecionado.enderecoRua}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell><b>Complemento</b></Table.Cell>
                                    <Table.Cell>{entregadorSelecionado.enderecoComplemento}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell><b>Número</b></Table.Cell>
                                    <Table.Cell>{entregadorSelecionado.enderecoNumero}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell><b>Bairro</b></Table.Cell>
                                    <Table.Cell>{entregadorSelecionado.enderecoBairro}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell><b>Cidade</b></Table.Cell>
                                    <Table.Cell>{entregadorSelecionado.enderecoCidade}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell><b>UF</b></Table.Cell>
                                    <Table.Cell>{entregadorSelecionado.enderecoUf}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell><b>CEP</b></Table.Cell>
                                    <Table.Cell>{entregadorSelecionado.enderecoCep}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell><b>Ativo</b></Table.Cell>
                                    <Table.Cell>{entregadorSelecionado.ativo}</Table.Cell>
                                </Table.Row>

                            </Table.Body>

                        </Table>

                    )}

                </Modal.Content>

                <Modal.Actions>
                    <Button color='green' inverted onClick={() => setOpenModalTable(false)}>
                        <Icon name='checkmark' /> Fechar
                    </Button>
                </Modal.Actions>

            </Modal>

        </div>
    )
}