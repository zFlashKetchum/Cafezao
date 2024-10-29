import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Image } from "react-native";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [user, setUser] = useState(null);

    function logar() {
        signInWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user);
                navigation.navigate('Rotas', { email });
            })
            .catch((error) => {
                Alert.alert(error.message);
            });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                navigation.navigate('Rotas');
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, [navigation]);

    return (
        <View style={estilo.container}>
            <Image 
                source={require('../assets/cafe2.jpg')} // Coloque sua imagem aqui
                style={estilo.imagem}
            />
            <Text style={estilo.titulo}>Entrar no App da Cafeteria</Text>
            <TextInput 
                style={estilo.input} 
                onChangeText={setEmail} 
                placeholder="Digite o email:" 
                value={email}
            />
            <TextInput 
                style={estilo.input} 
                onChangeText={setSenha} 
                secureTextEntry={true} 
                placeholder="Digite a senha:" 
                value={senha}
            />
            <TouchableOpacity style={estilo.botaoLogar} onPress={logar}>
                <Text style={estilo.textoBotaoLogar}>Logar</Text>
            </TouchableOpacity>
        </View>
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF8DC', // Fundo claro como na tela Home
        padding: 20,
    },
    imagem: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    titulo: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20,
        color: '#8B4513', // Cor compatível com o tema da cafeteria
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#F5F5F5',
        marginVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 18,
    },
    botaoLogar: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8B4513', // Cor do botão compatível
        marginTop: 10,
    },
    textoBotaoLogar: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    }
});
