/* eslint-disable */
import React from "react";
import {ImageFilePickerScreen, ImageFilePickerFaceReconScreen} from "./src/screens/screenIndex"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function App(){

  const Stack = createStackNavigator();
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
                name="TextDetection"
                component={ImageFilePickerScreen}
                options={{ title: 'Text Detection' }}
            />
            <Stack.Screen name="FaceDetection" component={ImageFilePickerFaceReconScreen} options={{ title: 'Face Detection' }} />
          </Stack.Navigator>
        </NavigationContainer>
    );

}
