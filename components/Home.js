import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ImageBackground, ScrollView, TouchableWithoutFeedback } from "react-native";
import { firestore } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default function Home({ navigation }) {
    const [refeicao, setRefeicao] = useState([]);

    async function deleteRefeicao(id) {
        try {
            await deleteDoc(doc(firestore, 'tbRefeicao', id));
            Alert.alert("Refeição deletada.");
        } catch (error) {
            console.error("Erro ao deletar.", error);
        }
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, 'tbRefeicao'), (querySnapshot) => {
            const lista = [];
            querySnapshot.forEach((doc) => {
                lista.push({ ...doc.data(), id: doc.id });
            });
            setRefeicao(lista);
        });
        return () => unsubscribe();
    }, []);

    return (
        <ImageBackground style={estilo.fundo} resizeMode="cover" source={require('../assets/refeicao.jpg')}>
            <TouchableWithoutFeedback>
                <View style={estilo.container}>
                    <Text style={estilo.titulo}>Cardápio da Cafeteria</Text>

                    <ScrollView style={estilo.secao}>
                        {refeicao.map(item => (
                            <View key={item.id} style={estilo.card}>
                                <TouchableOpacity onPress={() => navigation.navigate("Alterar", {
                                    id: item.id,
                                    nomeRefeicao: item.nomeRefeicao,
                                    bebida: item.bebida,
                                    sobremesa: item.sobremesa
                                })}>
                                    <Text style={estilo.nomeRefeicao}>{item.nomeRefeicao}</Text>
                                    <Text style={estilo.info}>Bebida: {item.bebida}</Text>
                                    <Text style={estilo.info}>Sobremesa: {item.sobremesa}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilo.botaodeletar} onPress={() => deleteRefeicao(item.id)}>
                                    <Text style={estilo.deletar}>X</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>

                    <TouchableOpacity style={estilo.BtnCadastrar} onPress={() => navigation.navigate("Cadastrar")}>
                        <Text style={estilo.cadastrar}>Adicionar Refeição</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </ImageBackground>
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 15,
        marginTop: 50,
    },
    fundo: {
        flex: 1,
    },
    titulo: {
        fontSize: 30,
        color: "#8B4513",
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    secao: {
        marginBottom: 20,
        width: '100%',
    },
    card: {
        backgroundColor: '#FFF8DC',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        width: '90%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    nomeRefeicao: {
        fontSize: 22,
        fontWeight: '700',
        color: '#8B4513',
    },
    info: {
        fontSize: 18,
        color: '#6B4226',
    },
    botaodeletar: {
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    deletar: {
        fontSize: 18,
        color: '#FF6347',
    },
    BtnCadastrar: {
        backgroundColor: '#8B4513',
        borderRadius: 20,
        padding: 10,
        marginTop: 20,
    },
    cadastrar: {
        color: 'white',
        fontSize: 18,
    },
});
