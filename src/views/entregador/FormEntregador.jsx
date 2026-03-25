import InputMask from 'comigo-tech-react-input-mask';
import { useState, useEffect } from 'react';
import { Button, Container, Divider, Form, Icon, Radio } from 'semantic-ui-react';
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import { notifyError, notifySuccess } from '../../views/util/Util';

const options = [
    { key: 'AC', text: 'Acre', value: 'AC' },
    { key: 'AL', text: 'Alagoas', value: 'AL' },
    { key: 'AP', text: 'Amapá', value: 'AP' },
    { key: 'AM', text: 'Amazonas', value: 'AM' },
    { key: 'BA', text: 'Bahia', value: 'BA' },
    { key: 'CE', text: 'Ceará', value: 'CE' },
    { key: 'DF', text: 'Distrito Federal', value: 'DF' },
    { key: 'ES', text: 'Espírito Santo', value: 'ES' },
    { key: 'GO', text: 'Goiás', value: 'GO' },
    { key: 'MA', text: 'Maranhão', value: 'MA' },
    { key: 'MT', text: 'Mato Grosso', value: 'MT' },
    { key: 'MS', text: 'Mato Grosso do Sul', value: 'MS' },
    { key: 'MG', text: 'Minas Gerais', value: 'MG' },
    { key: 'PA', text: 'Pará', value: 'PA' },
    { key: 'PB', text: 'Paraíba', value: 'PB' },
    { key: 'PR', text: 'Paraná', value: 'PR' },
    { key: 'PE', text: 'Pernambuco', value: 'PE' },
    { key: 'PI', text: 'Piauí', value: 'PI' },
    { key: 'RJ', text: 'Rio de Janeiro', value: 'RJ' },
    { key: 'RN', text: 'Rio Grande do Norte', value: 'RN' },
    { key: 'RS', text: 'Rio Grande do Sul', value: 'RS' },
    { key: 'RO', text: 'Rondônia', value: 'RO' },
    { key: 'RR', text: 'Roraima', value: 'RR' },
    { key: 'SC', text: 'Santa Catarina', value: 'SC' },
    { key: 'SP', text: 'São Paulo', value: 'SP' },
    { key: 'SE', text: 'Sergipe', value: 'SE' },
    { key: 'TO', text: 'Tocantins', value: 'TO' },
]

export default function FormEntregador() {

    const { state } = useLocation();
    const [idEntregador, setIdEntregador] = useState();

    const [nome, setNome] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [cpf, setCpf] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [rg, setRg] = useState();
    const [qtdEntregaRealizadas, setQtdEntregaRealizadas] = useState();
    const [valorFrete, setValorFrete] = useState();
    const [enderecoRua, setEnderecoRua] = useState();
    const [enderecoComplemento, setEnderecoComplemento] = useState();
    const [enderecoNumero, setEnderecoNumero] = useState();
    const [enderecoBairro, setEnderecoBairro] = useState();
    const [enderecoCidade, setEnderecoCidade] = useState();
    const [enderecoUf, setEnderecoUf] = useState('');
    const [enderecoCep, setEnderecoCep] = useState();
    const [ativo, setAtivo] = useState(true);

    function salvar() {

        let entregadorRequest = {
            nome: nome,
            cpf: cpf,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo,
            rg: rg,
            ativo: ativo,
            enderecoBairro: enderecoBairro,
            enderecoCep: enderecoCep,
            enderecoCidade: enderecoCidade,
            enderecoComplemento: enderecoComplemento,
            enderecoNumero: enderecoNumero,
            enderecoRua: enderecoRua,
            enderecoUf: enderecoUf,
            valorFrete: valorFrete,
            qtdEntregaRealizadas: qtdEntregaRealizadas
        }

        if (idEntregador != null) { //Alteração:
            axios.put("http://localhost:8080/api/entregador/" + idEntregador, entregadorRequest)
                .then((response) => { notifySuccess('Entregador cadastrado com sucesso.') })
                .catch((error) => {
                    if (error.response.data.errors != undefined) {
                        for (let i = 0; i < error.response.data.errors.length; i++) {
                            notifyError(error.response.data.errors[i].defaultMessage)
                        }
                    } else {
                        notifyError(error.response.data.message)
                    }
                })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/entregador", entregadorRequest)
                .then((response) => { notifySuccess('Entregador cadastrado com sucesso.') })
                .catch((error) => {
                    if (error.response.data.errors != undefined) {
                        for (let i = 0; i < error.response.data.errors.length; i++) {
                            notifyError(error.response.data.errors[i].defaultMessage)
                        }
                    } else {
                        notifyError(error.response.data.message)
                    }

                })
        }
    }

    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/entregador/" + state.id)
                .then((response) => {
                    setIdEntregador(response.data.id)
                    setNome(response.data.nome)
                    setCpf(response.data.cpf)
                    setDataNascimento(formatarData(response.data.dataNascimento))
                    setFoneCelular(response.data.foneCelular)
                    setFoneFixo(response.data.foneFixo)
                    setRg(response.data.rg)
                    setQtdEntregaRealizadas(response.data.qtdEntregaRealizadas)
                    setValorFrete(response.data.valorFrete)
                    setEnderecoRua(response.data.enderecoRua)
                    setEnderecoComplemento(response.data.enderecoComplemento)
                    setEnderecoNumero(response.data.enderecoNumero)
                    setEnderecoBairro(response.data.enderecoBairro)
                    setEnderecoUf(response.data.enderecoUf)
                    setEnderecoCep(response.data.enderecoCep)
                    setAtivo(response.data.ativo)
                })
        }
    }, [state])

    return (
        <div>

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    {idEntregador === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idEntregador != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group>

                                <Form.Input
                                    required
                                    width={9}
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    width={5}
                                    fluid
                                    label='CPF'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    width={4}
                                    fluid
                                    label='RG'
                                    value={rg}
                                    onChange={e => setRg(e.target.value)}>
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='DT Nascimento'
                                    width={4}
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataNascimento}
                                        onChange={e => setDataNascimento(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    required
                                    label='Fone Celular'
                                    width={5}
                                >
                                    <InputMask
                                        mask="(99) 99999-9999"
                                        value={foneCelular}
                                        onChange={e => setFoneCelular(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    width={5}
                                >
                                    <InputMask
                                        mask="(99) 9999-9999"
                                        value={foneFixo}
                                        onChange={e => setFoneFixo(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='QTD Entregas Realizadas'
                                    width={4}
                                    value={qtdEntregaRealizadas}
                                    onChange={e => setQtdEntregaRealizadas(e.target.value)}
                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Valor Por Frete'
                                    width={4}
                                    value={valorFrete}
                                    onChange={e => setValorFrete(e.target.value)}
                                >
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Rua'
                                    width={16}
                                    value={enderecoRua}
                                    onChange={e => setEnderecoRua(e.target.value)}
                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Número'
                                    width={4}
                                    value={enderecoNumero}
                                    onChange={e => setEnderecoNumero(e.target.value)}
                                >
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Bairro'
                                    width={9}
                                    maxLength="30"
                                    value={enderecoBairro}
                                    onChange={e => setEnderecoBairro(e.target.value)}
                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    width={9}
                                    maxLength="30"
                                    value={enderecoCidade}
                                    onChange={e => setEnderecoCidade(e.target.value)}
                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='CEP'
                                    width={3}
                                >
                                    <InputMask
                                        mask="99999-999"
                                        value={enderecoCep}
                                        onChange={e => setEnderecoCep(e.target.value)}
                                    />
                                </Form.Input>

                            </Form.Group>

                            <Form.Select
                                label="UF"
                                placeholder="Selecione"
                                options={options}
                                fluid
                                selection
                                value={enderecoUf}
                                onChange={(e, { value }) => setEnderecoUf(value)}
                            />

                            <Form.Input
                                fluid
                                label='Complemento'
                                maxLength="150"
                                value={enderecoComplemento}
                                onChange={e => setEnderecoComplemento(e.target.value)}
                            >
                            </Form.Input>

                            <Form.Field>
                                <label>Ativo:</label>

                                <Form.Group inline>
                                    <Form.Field>
                                        <Radio
                                            label="Sim"
                                            name="ativo"
                                            value="sim"
                                            checked={ativo === true}
                                            onChange={() => setAtivo(true)}
                                        />
                                    </Form.Field>

                                    <Form.Field>
                                        <Radio
                                            label="Não"
                                            name="ativo"
                                            value="nao"
                                            checked={ativo === false}
                                            onChange={() => setAtivo(false)}
                                        />
                                    </Form.Field>
                                </Form.Group>
                            </Form.Field>

                        </Form>

                        <div style={{ marginTop: '4%' }}>

                            <Link to={'/list-entregador'}>
                                <Button
                                    type="button"
                                    inverted
                                    circular
                                    icon
                                    labelPosition='left'
                                    color='orange'
                                >
                                    <Icon name='reply' />
                                    Voltar
                                </Button>
                            </Link>


                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>

                </Container>
            </div>
        </div>

    );
}