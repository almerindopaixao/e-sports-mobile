
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home, Game } from '../screens';

export function AppRoutes() {
    const { Navigator, Screen } = createNativeStackNavigator();

    return (
        <Navigator
            screenOptions={{ headerShown: false }}
        >
            <Screen 
                name='home'
                component={Home}
            />

            <Screen 
                name='game'
                component={Game}
            />
        </Navigator>
    )
}