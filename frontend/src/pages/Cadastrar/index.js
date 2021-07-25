import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, Button, Alert, TextInput, View, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

import Api from '../../config/configApi';

import { Container, ConteudoTopo, TituloConteudo, TextoButtonSuccess, ButtonBlockSuccess, TituloCampo, CampoFormulario, ButtonDate, ConteudoCampoRadio, TituloOpcaoRadio } from '../../styles/custom_adm';

export default function Cadastrar() {

    const navigation = useNavigation();

    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState('');
    const [situacao, setSituacao] = useState('');
    const [dataPagamento, setDataPagamento] = useState(new Date(moment()));

    const [valorLancTarget, setValorLancTarget] = useState('');
    const converterReal = async (valorLancamentoInput) => {
        var valorLanConvert = await valorLancamentoInput.toString().replace(/\D/g, "");
        valorLanConvert = valorLanConvert.replace(/(\d)(\d{2})$/, "$1,$2");
        valorLanConvert = valorLanConvert.replace(/(?=(\d{3})+(\D))\B/g, ".");
        setValorLancTarget(valorLanConvert);

        var valorSalvar = await valorLanConvert.replace(".", "");
        valorSalvar = await valorSalvar.replace(",", ".");
        setValor(valorSalvar);
    }

    moment.locale();
    const [date, setDate] = useState(new Date(moment()));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setDataPagamento(currentDate);
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatePicker = () => {
        showMode('date');
    };

    const cadLancamento = async () => {
        await Api.post('/cadastrar', { nome, valor, tipo, situacao, dataPagamento })
            .then((response) => {
                Alert.alert("", response.data.msg);
                navigation.navigate('Home');
            }).catch((err) => {
                if (err.response) {
                    Alert.alert("", err.response.data.msg);
                } else {
                    Alert.alert("", "Erro: Lançamento não cadastrado com sucesso, tente mais tarde!");
                }
            });
    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Container>
                <ConteudoTopo>
                    <TituloConteudo>
                        Cadastrar
                    </TituloConteudo>
                </ConteudoTopo>

                <TituloCampo>Nome:</TituloCampo>
                <CampoFormulario value={nome} onChangeText={text => setNome(text)} placeholder="Nome do Lançamento" />

                <TituloCampo>Valor:</TituloCampo>
                <CampoFormulario value={valorLancTarget} onChangeText={valor => converterReal(valor)} placeholder="Valor do Lançamento" />

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
                <View>
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
                </View>

                <ButtonBlockSuccess onPress={cadLancamento}>
                    <TextoButtonSuccess>Cadastrar</TextoButtonSuccess>
                </ButtonBlockSuccess>
            </Container>
        </ScrollView>
    );
}