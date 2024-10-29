import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import Cadastrar from './CadastrarRefeicao';
import Alterar from './AlterarRefeicao';

const Stack = createStackNavigator();

export default function Rotas() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
            <Stack.Screen name="Cadastrar" component={Cadastrar} options={{headerShown:false}}/>
            <Stack.Screen name="Alterar" component={Alterar} options={{headerShown:false}} />
        </Stack.Navigator>
    );
}
