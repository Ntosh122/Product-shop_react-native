import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { COLORS } from './assets/constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './App/Screens/HomeScreen';
import ProductInfo from './App/Screens/ProductInfo';
import MyCart from './App/Screens/MyCart';
import AllProducts from './App/Screens/AllProducts';
import AllAccessories from './App/Screens/AllAccessories';


const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown:false
      }}>
        <Stack.Screen name='HomeScreen' component={HomeScreen}/>
        <Stack.Screen name='AllProducts' component={AllProducts}/>
        <Stack.Screen name='AllAccessories' component={AllAccessories}/>
        <Stack.Screen name='ProductInfo' component={ProductInfo}/>
        <Stack.Screen name='MyCart' component={MyCart}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
