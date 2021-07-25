import styled from "styled-components";

export const Container = styled.SafeAreaView`
    flex: 1;
    padding: 0 10px;
    justify-content: flex-start;
    background-color: #fff;
`;

export const ConteudoTopo = styled.View`
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const TituloConteudo = styled.Text`
    padding-top: 10px;
    padding-left: 2px;
    color: #444443;
    font-weight: bold;
    font-size: 19px;
`;

export const ButtonSuccess = styled.TouchableOpacity`
   margin: 2px;
   background-color: #fff;
   border: 1px solid #198754;
   height: 38px;
   align-items: center;
   justify-content: center;
   border-radius: 4px;
`;

export const TextoButtonSuccess = styled.Text`
   color: #198754;
   font-size: 18px;
   padding: 4px;
`;

export const ButtonPrimary = styled.TouchableOpacity`
   margin: 2px;
   background-color: #fff;
   border: 1px solid #0d6efd;
   height: 38px;
   align-items: center;
   justify-content: center;
   border-radius: 4px;
`;

export const TextoButtonPrimary = styled.Text`
   color: #0d6efd;
   font-size: 18px;
   padding: 4px;
`;

export const TextoEntreOsBotoes = styled.Text`
    color: #000;
    font-size: 18px;
    padding: 10px;
`;

export const ItemConteudo = styled.Text`
    padding-top: 2px;
    padding-left: 5px;
    color: #444443;
    font-size: 16px;
`;

export const ConteudoSituacao = styled.Text`
    display: flex;
    flex-direction: row;
    padding-left: 5px;
`;

export const ItemConteudoSuccess = styled.Text`
    padding-top: 2px;
    padding-left: 5px;
    color: #198754;
    font-size: 16px;
`;

export const ItemConteudoWarning = styled.Text`
    padding-top: 2px;
    padding-left: 5px;
    color: #ffc107;
    font-size: 16px;
`;

export const ItemConteudoDanger = styled.Text`
    padding-top: 2px;
    padding-left: 5px;
    color: #ec2121;
    font-size: 16px;
`;

export const ButtonBlockWarning = styled.TouchableOpacity`
   margin: 2px;
   background-color: #fff;
   border: 1px solid #ffc107;
   height: 38px;
   align-items: center;
   justify-content: center;
   border-radius: 4px;
`;

export const TextoButtonWarning = styled.Text`
   color: #ffc107;
   font-size: 18px;
   padding: 4px;
`;

export const ButtonBlockDanger = styled.TouchableOpacity`
   margin: 2px;
   background-color: #fff;
   border: 1px solid #dc3545;
   height: 38px;
   align-items: center;
   justify-content: center;
   border-radius: 4px;
`;

export const TextoButtonDanger = styled.Text`
   color: #dc3545;
   font-size: 18px;
   padding: 4px;
`;

export const ButtonBlockSuccess = styled.TouchableOpacity`
   margin: 2px;
   background-color: #fff;
   border: 1px solid #198754;
   height: 38px;
   align-items: center;
   justify-content: center;
   border-radius: 4px;
`;

export const TituloCampo = styled.Text`
    padding-top: 1px;
    color: #111;
    font-size: 18px;
`;

export const CampoFormulario = styled.TextInput`
    background-color: #fff;
    margin-bottom: 15px;
    color: #222;
    font-size: 18px;
    padding: 10px;
    border-radius: 4px;
    border-color: #007281;
    border-width: 1px;
`;

export const ButtonDate = styled.View`
    margin-bottom: 15px;
`;

export const ConteudoCampoRadio = styled.View`
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
`;

export const TituloOpcaoRadio = styled.Text`
    padding-top: 7px;
    font-size: 16px;
`;