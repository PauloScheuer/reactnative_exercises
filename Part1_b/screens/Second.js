import { StyleSheet, Text, View } from 'react-native';

export default function Second({navigation,route}) {

  return (
    <View style={styles.container}>
      <Text>{route.params.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
