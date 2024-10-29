import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { firestore } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

export default function CadastrarRefeicao({ navigation }) {
    const [nomeRefeicao, setNomeRefeicao] = useState('');
    const [bebida, setBebida] = useState('');
    const [sobremesa, setSobremesa] = useState('');

    async function addRefeicao() {
        try {
            await addDoc(collection(firestore, 'tbRefeicao'), {
                nomeRefeicao,
                bebida,
                sobremesa
            });
            Alert.alert("Cadastro", "Registros cadastrados com sucesso");
            navigation.navigate("Home");
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            Alert.alert("Erro", "Erro ao cadastrar, Por favor, Tente novamente.");
        }
    }

    return (
        <ImageBackground style={estilo.fundo} resizeMode="cover" source={require('../assets/refeicao.jpg')}>
            <View style={estilo.container}>
                <TouchableOpacity style={estilo.botaoVoltar} onPress={() => navigation.goBack()}>
                    <Text style={estilo.textoBotaoVoltar}>Voltar</Text>
                </TouchableOpacity>
                
                <Text style={estilo.titulo}>Cadastrar Refeição</Text>
                <TextInput style={estilo.input} placeholder="Digite a Refeição" onChangeText={setNomeRefeicao} value={nomeRefeicao} />
                <TextInput style={estilo.input} placeholder="Digite a Bebida" onChangeText={setBebida} value={bebida} />
                <TextInput style={estilo.input} placeholder="Digite a Sobremesa" onChangeText={setSobremesa} value={sobremesa} />
                <TouchableOpacity style={estilo.btnenviar} onPress={addRefeicao}>
                    <Text style={estilo.btntxtenviar}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 15,
    },
    fundo: {
        flex: 1,
    },
    titulo: {
        fontSize: 30,
        color: "#8B4513",
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        marginVertical: 10,
        backgroundColor: 'white',
        padding: 10,
        width: '90%',
        borderRadius: 10,
        borderColor: '#8B4513',
        borderWidth: 1,
    },
    btnenviar: {
        backgroundColor: '#8B4513',
        borderRadius: 20,
        padding: 10,
        marginTop: 20,
    },
    btntxtenviar: {
        color: 'white',
        fontSize: 18,
    },
    botaoVoltar: {
        position: 'absolute',
        top: 40,
        left: 20,
        backgroundColor: '#8B4513',
        borderRadius: 10,
        padding: 10,
    },
    textoBotaoVoltar: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
