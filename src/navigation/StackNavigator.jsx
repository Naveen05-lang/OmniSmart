import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductListScreen from '../screens/ProductListScreen';
import {Text,View,Image} from 'react-native'
const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
         name="UniMart"
         component={ProductListScreen}
        options={{
            headerTitle: () => (
                <View style={{flex:1,flexDirection:'row',alignItems:'center',marginRight:0}}>
                    <Image
                        source={{
                        uri: 'https://cdn.dribbble.com/userupload/8414292/file/original-c28965eac300a2d01ec984018a58246d.jpg?resize=2048x1536&vertical=center',
                        }}
                        style={{
                            width: 80,
                            height: 75,
                            padding:10                
                        }}
                    />
                    <Text style={{ fontSize: 32, fontWeight: 'bold' }}>
                        <Text style={{ color: 'red' }}>Uni</Text>
                        <Text style={{ color: '#007BFF' }}>Mart</Text>
                    </Text>
                </View>
            )
        }}
       />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
