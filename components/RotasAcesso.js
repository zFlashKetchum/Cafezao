import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login';
import Rotas from './Rotas';

const Stack = createStackNavigator();

export default function RotasAcesso() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
            <Stack.Screen name="Rotas" component={Rotas}  options={{headerShown:false}}/>
        </Stack.Navigator>
    );
}
