import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function First({navigation}) {
  const [text, setText] = useState('');

  const handleSend = ()=>{
    navigation.navigate('Second',{message:text});
  }

  return (
    <View style={styles.container}>
      <TextInput onChangeText={(newText)=>setText(newText)} style={styles.input}></TextInput>
      <Button title='Send' onPress={()=>handleSend()}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row'
  },
  input:{
    borderColor: '#000',
    borderWidth:2,
    padding:5,
    width:100
  }
});
