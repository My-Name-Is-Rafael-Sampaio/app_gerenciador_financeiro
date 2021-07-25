import React, { useCallback, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import moment from 'moment';
import { formatNumber } from 'react-native-currency-input';
import { List } from 'react-native-paper';
import { Alert, Text, FlatList, View } from 'react-native';

import Api from '../../config/configApi';

import { Container, ConteudoTopo, TituloConteudo, ButtonSuccess, TextoButtonSuccess, ButtonPrimary, TextoButtonPrimary, TextoEntreOsBotoes, ItemConteudo, ItemConteudoSuccess, ItemConteudoWarning, ItemConteudoDanger, ConteudoSituacao, ButtonBlockWarning, TextoButtonWarning, ButtonBlockDanger, TextoButtonDanger } from '../../styles/custom_adm';

export default function Home() {

    const navigation = useNavigation();

    moment.locale();

    const [lancamentos, setLancamento] = useState('');
    const [deposito, setDeposito] = useState("");
    const [pago, setPago] = useState("");
    const [pendente, setPendente] = useState("");
    const [saldo, setSaldo] = useState("");

    const [dataView, setDataView] = useState({ mes, ano });
    let dataAtual = new Date();
    let mes = dataAtual.getMonth() + 1;
    let ano = dataAtual.getFullYear();
    const anterior = async () => {
        if (dataView.mes === 1) {
            mes = 12,
                ano = dataView.ano - 1;
        } else {
            mes = dataView.mes - 1,
                ano = dataView.ano
        }
        setDataView({ mes, ano });
        getLancamentos(mes, ano);
    }
    const proximo = async () => {
        if (dataView.mes === 12) {
            mes = 1,
                ano = dataView.ano + 1;
        } else {
            mes = dataView.mes + 1,
                ano = dataView.ano
        }
        setDataView({ mes, ano });
        getLancamentos(mes, ano);
    }

    const getLancamentos = async (mes, ano) => {
        if ((mes === undefined) && (ano === undefined)) {
            let dataAtual = new Date();
            mes = dataAtual.getMonth() + 1;
            ano = dataAtual.getFullYear();
            setDataView({ mes, ano });
        }
        try {
            const response = await Api.get(`/listar/${mes}/${ano}`);
            setLancamento(response.data.lancamentos);
            setDeposito(response.data.valorRecebido);
            setPago(response.data.valorPago);
            setPendente(response.data.valorPendente)
            setSaldo(response.data.saldo);
        } catch (err) {
            Alert.alert("", "Erro: Nenhum lançamento encontrado, tente mais tarde!")
        }
    }

    const apagarLancamento = async (idLancamento) => {
        await Api.delete(`/apagar/${idLancamento}`)
            .then((response) => {
                Alert.alert("", response.data.msg);
                getLancamentos();
            }).catch((err) => {
                if (err.response) {
                    Alert.alert("", err.response.data.msg);
                } else {
                    Alert.alert("", "Erro; Falha de conexão com o servidor!");
                }
            })
    }

    useFocusEffect(
        useCallback(() => {
            getLancamentos();
        }, [])
    );
    
    const resumo = () => {
        return (
            <View>
                <ItemConteudoSuccess>Valor Depositado: {formatNumber(deposito, {
                    separator: ',',
                    prefix: 'R$ ',
                    precision: 2,
                    delimiter: '.',
                    signPosition: 'beforePrefix',
                })}</ItemConteudoSuccess>
                <ItemConteudoDanger>Valor Pago: {formatNumber(pago, {
                    separator: ',',
                    prefix: 'R$ ',
                    precision: 2,
                    delimiter: '.',
                    signPosition: 'beforePrefix',
                })}</ItemConteudoDanger>
                <ItemConteudoWarning>Valor Pendente: {formatNumber(pendente, {
                    separator: ',',
                    prefix: 'R$ ',
                    precision: 2,
                    delimiter: '.',
                    signPosition: 'beforePrefix',
                })}</ItemConteudoWarning>
                <ItemConteudoSuccess>Saldo: {formatNumber(saldo, {
                    separator: ',',
                    prefix: 'R$ ',
                    precision: 2,
                    delimiter: '.',
                    signPosition: 'beforePrefix',
                })}</ItemConteudoSuccess>
            </View>
        )
    }

    return (
        <Container>
            <ConteudoTopo>
                <TituloConteudo>Listar</TituloConteudo>

                <ButtonSuccess onPress={() => { navigation.navigate('Cadastrar') }}>
                    <TextoButtonSuccess>Cadastrar</TextoButtonSuccess>
                </ButtonSuccess>
            </ConteudoTopo>

            <ConteudoTopo>
                <ButtonPrimary
                    onPress={() => anterior()}>
                    <TextoButtonPrimary>Anterior</TextoButtonPrimary>
                </ButtonPrimary>

                <TextoEntreOsBotoes>{dataView.mes + "/" + dataView.ano}</TextoEntreOsBotoes>

                <ButtonPrimary
                    onPress={() => proximo()}>
                    <TextoButtonPrimary>Proximo</TextoButtonPrimary>
                </ButtonPrimary>
            </ConteudoTopo>

            <List.AccordionGroup>
                <FlatList
                    data={lancamentos}
                    renderItem={({ item }) => (
                        <List.Accordion title={item.nome} id={item.id}>
                            <ItemConteudo>{item.id}</ItemConteudo>
                            <ItemConteudo>{item.nome}</ItemConteudo>
                            <ItemConteudo>{formatNumber(item.valor, {
                                separator: ',',
                                prefix: 'R$ ',
                                precision: 2,
                                delimiter: '.',
                                signPosition: 'beforePrefix',
                            })}</ItemConteudo>
                            {item.tipo === 1 ? <ItemConteudoDanger>Pagamento</ItemConteudoDanger> : <ItemConteudoSuccess>Recebido</ItemConteudoSuccess>}
                            <ConteudoSituacao>
                                {item.situacao === 1 ? <ItemConteudoSuccess>Pago</ItemConteudoSuccess> : <Text></Text>}
                                {item.situacao === 2 ? <ItemConteudoDanger>Pendente</ItemConteudoDanger> : <Text></Text>}
                                {item.situacao === 3 ? <ItemConteudoSuccess>Recebido</ItemConteudoSuccess> : <Text></Text>}
                            </ConteudoSituacao>
                            <ItemConteudo>{moment(item.dataPagamento).format("DD/MM/YYYY")}</ItemConteudo>
                            <ButtonBlockWarning
                                onPress={() => {
                                    navigation.navigate('Editar', {
                                        idLancamento: item.id
                                    })
                                }} >
                                <TextoButtonWarning>Editar</TextoButtonWarning>
                            </ButtonBlockWarning>

                            <ButtonBlockDanger
                                onPress={() => apagarLancamento(item.id)}>
                                <TextoButtonDanger>Apagar</TextoButtonDanger>
                            </ButtonBlockDanger>
                        </List.Accordion>
                    )} keyExtractor={lancamento => String(lancamento.id)}
                    ListFooterComponent={resumo}
                />
            </List.AccordionGroup>
        </Container>
    );
}