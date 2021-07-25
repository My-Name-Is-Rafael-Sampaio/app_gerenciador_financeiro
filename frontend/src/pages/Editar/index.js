import React, { useEffect, useState } from 'react';
import { Alert, Text, TextInput, StyleSheet, ScrollView, Button, View, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { formatNumber } from 'react-native-currency-input';
import { RadioButton } from 'react-native-paper';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

import Api from '../../config/configApi';

import { Container, ConteudoTopo, TituloConteudo, TituloCampo, CampoFormulario, ButtonDate, ConteudoCampoRadio, TituloOpcaoRadio } from '../../styles/custom_adm';

export default function Editar({ route }) {

    const navigation = useNavigation();

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState('');
    const [situacao, setSituacao] = useState('');
    const [dataPagamento, setDataPagamento] = useState('');

    const [valorLancTarget, setValorLancTarget] = useState('');
    const converterReal = async (valorLancamentoInput) => {
        let valorLancConvert = await valorLancamentoInput.toString().replace(/\D/g, "");
        valorLancConvert = valorLancConvert.replace(/(\d)(\d{2})$/, "$1, $2");
        valorLancConvert = valorLancConvert.replace(/(?=(\d{3})+(\D))\B/g, ".");

        setValorLancTarget(valorLancConvert);

        let valorSalvar = await valorLancConvert.replace(".", "");
        valorSalvar = await valorSalvar.replace(",", ".");
        setValor(valorSalvar);
    }

    const [date, setDate] = useState();
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setDataPagamento(currentDate);
    }
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
    const showDatePicker = () => {
        showMode('date');
    }

    const listarLancamento = async () => {
        const { idLancamento } = route.params;
        setId(idLancamento);

        try {
            const response = await Api.get(`/visualizar/${idLancamento}`);
            setNome(response.data.lancamento.nome);
            setValor(response.data.lancamento.valor);
            setValorLancTarget(formatNumber(response.data.lancamento.valor, {
                separator: ',',
                precision: 2,
                delimiter: '.'
            }))
            setTipo(response.data.lancamento.tipo);
            setSituacao(response.data.lancamento.situacao);
            setDataPagamento(response.data.lancamento.dataPagamento);
            setDate(new Date(moment(response.data.lancamento.dataPagamento, 'YYYY-MM-DD')));
        } catch (err) {
            if (err.response) {
                Alert.alert("", err.response.data.msg)
            } else {
                Alert.alert("", "Erro: Falha de conexão com o banco de dados!")
            }
        }
    }

    const editarLancamento = async () => {

        const headers = {
            'Content-Type': 'application/json'
        }

        await Api.put('/editar', { id, nome, valor, tipo, situacao, dataPagamento }, { headers })
            .then((response) => {
                Alert.alert("", response.data.msg);
                navigation.navigate('Home');
            }).catch((err) => {
                if (err.response) {
                    Alert.alert("", err.response.data.msg);
                } else {
                    Alert.alert("", "Erro: Lançamento não editado! Tente novamente");
                }
            })
    }

    useEffect(() => {
        listarLancamento();
    }, []);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Container>
                <ConteudoTopo>
                    <TituloConteudo>Editar</TituloConteudo>
                </ConteudoTopo>

                <TituloCampo>Nome:</TituloCampo>
                <TextInput value={nome} onChangeText={text => setNome(text)} placeholder="Nome do Lançamento" />

                <TituloCampo>Valor:</TituloCampo>
                <TextInput value={valorLancTarget} onChangeText={valor => converterReal(valor)} placeholder="Valor do Lançamento" />

                <TituloCampo>Tipo:</TituloCampo>
                <ConteudoCampoRadio>
                    <RadioButton
                        value="1"
                        status={tipo === 1 ? 'checked' : 'unchecked'}
                        onPress={() => setTipo(1)}
                    />
                    <TituloOpcaoRadio>Pagamento</TituloOpcaoRadio>
                </ConteudoCampoRadio>

                <ConteudoCampoRadio>
                    <RadioButton
                        value="2"
                        status={tipo === 2 ? 'checked' : 'unchecked'}
                        onPress={() => setTipo(2)}
                    />
                    <TituloOpcaoRadio>Recebido</TituloOpcaoRadio>
                </ConteudoCampoRadio>

                <TituloCampo>Situação:</TituloCampo>
                <ConteudoCampoRadio>
                    <RadioButton
                        value="1"
                        status={situacao === 1 ? 'checked' : 'unchecked'}
                        onPress={() => setSituacao(1)}
                    />
                    <TituloOpcaoRadio>Pago</TituloOpcaoRadio>
                </ConteudoCampoRadio>

                <ConteudoCampoRadio>
                    <RadioButton
                        value="2"
                        status={situacao === 2 ? 'checked' : 'unchecked'}
                        onPress={() => setSituacao(2)}
                    />
                    <TituloOpcaoRadio>Pendente</TituloOpcaoRadio>
                </ConteudoCampoRadio>

                <ConteudoCampoRadio>
                    <RadioButton
                        value="3"
                        status={situacao === 3 ? 'checked' : 'unchecked'}
                        onPress={() => setSituacao(3)}
                    />
                    <TituloOpcaoRadio>Recebido</TituloOpcaoRadio>
                </ConteudoCampoRadio>

                <TituloCampo>Data do Pagamento:</TituloCampo>
                <ButtonDate>
                    <Button onPress={showDatePicker} title={moment(date).format('DD/MM/YYYY')} />
                </ButtonDate>
                {show && (
                    <DateTimePicker
                        testID=""
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}

                <Button onPress={editarLancamento}
                    title="Salvar"
                    color="#007280"
                    accessibilityLabel="O botão para editar o lançamento"
                />
            </Container>
        </ScrollView>
    );
}