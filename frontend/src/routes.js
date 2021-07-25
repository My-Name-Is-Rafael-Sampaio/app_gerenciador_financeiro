import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home/index';
import Cadastrar from './pages/Cadastrar/index';
import Editar from './pages/Editar/index';

const Stack = createStackNavigator();

export default function Routes() {

    const screenOptionStyle = {
        headerStyle: {
            backgroundColor: '#007280'
        },
        headerTintColor: '#f1f1f1',
        headerBackTitle: 'Voltar'
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptionStyle}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Cadastrar" component={Cadastrar} />
                <Stack.Screen name="Editar" component={Editar} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}