import React from 'react';
import StackNavigator from './navigation/StackNavigator';
import { ThemeProvider } from './theme/ThemeContext';
export default function App() {
return <ThemeProvider>
    <StackNavigator />
</ThemeProvider>
}
