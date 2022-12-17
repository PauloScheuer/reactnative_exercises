import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [sum, setSum] = useState();

  const handleSum = ()=>{
    setSum(Number(first)+Number(second));
  }

  return (
    <View style={styles.container}>
      <Text>First number</Text>
      <TextInput defaultValue={first} onChangeText={(newText)=>setFirst(newText)} style={styles.input} keyboardType='number-pad'></TextInput>
      <Text>Second number</Text>
      <TextInput defaultValue={second} onChangeText={(newText)=>setSecond(newText)} style={styles.input} keyboardType='number-pad'></TextInput>
      <Button title='Sum' onPress={()=>handleSum()}></Button>
      <Text>{sum}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    borderColor: '#000',
    borderWidth:2,
    padding:5,
    width:100
  }
});
