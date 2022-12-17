import {StyleSheet, Text, TextInput, View } from 'react-native';
import { Accelerometer, LightSensor, Gyroscope} from 'expo-sensors';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export default function First({navigation}) {
  //accelerometer
  const [acc,setAccData] = useState({x:0,y:0,z:0});
  const [lastAcc,setLastAccData] = useState({x:0,y:0,z:0});
  const [readyAcc, setReadyAcc] = useState(false);
  const [subscriptionAcc, setSubscriptionAcc] = useState(null);
  
  //light sensor
  const [{illuminance},setIllumData] = useState({illuminance:0});
  const [subscriptionIllum, setSubscriptionIllum] = useState(null);

  //gyroscope
  const [gyro,setGyroData] = useState({x:0,y:0,z:0});
  const [subscriptionGyro,setSubscriptionGyro] = useState(null);

  //location
  const [location, setLocation] = useState(null);

  //accelerometer
  const subscribeAcc = ()=>{
    setSubscriptionAcc(Accelerometer.addListener(setAccData));
    Accelerometer.setUpdateInterval(500);
  }

  const unsubscribeAcc = ()=>{
    if(subscriptionAcc){
      subscriptionAcc.remove();
      setSubscriptionAcc(null);
    }
  }

  //light sensor
  const subscribeIllum = ()=>{
    setSubscriptionIllum(LightSensor.addListener(setIllumData));
  }

  const unsubscribeIllum = ()=>{
    if(subscriptionIllum){
      subscriptionIllum.remove();
      setSubscriptionIllum(null);
    }
  }

  //gyroscope
  const subscribeGyro = ()=>{
    setSubscriptionGyro(Gyroscope.addListener(setGyroData));
    Gyroscope.setUpdateInterval(500);
  }

  const unsubscribeGyro = ()=>{
    if(subscriptionGyro){
      subscriptionGyro.remove();
      setSubscriptionGyro(null);
    }
  }

  //location
  const handleLocation = async()=>{
    const status = await Location.requestForegroundPermissionsAsync();
    if(status.status === 'granted'){
      const newLocation = await Location.getCurrentPositionAsync({});
      setLocation(newLocation);
    }
  }

  useEffect(()=>{
    if ((Math.abs(acc.x-lastAcc.x) > 0.5) || (Math.abs(acc.y-lastAcc.y) > 0.5) || (Math.abs(acc.z-lastAcc.z) > 0.5)){
      if(readyAcc){
        navigation.navigate('Second',{message:'It moved too fast'});
      }else{
        setReadyAcc(true);
      }
    }
    setLastAccData({x:acc.x,y:acc.y,z:acc.z});

  },[acc]);

  useEffect(()=>{
    subscribeAcc();
    subscribeIllum();
    subscribeGyro();
    handleLocation();
    return ()=>{
      unsubscribeAcc();
      unsubscribeIllum();
      unsubscribeGyro();
    };
  },[]);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text>Accelerometer:</Text>
        <View style={styles.inputsGroup}>
          <Text>X:</Text>
          <TextInput style={styles.input} editable={false}>{Math.round(acc.x*1000)/1000}</TextInput>
          <Text>Y:</Text>
          <TextInput style={styles.input} editable={false}>{Math.round(acc.y*1000)/1000}</TextInput>
          <Text>Z:</Text>
          <TextInput style={styles.input} editable={false}>{Math.round(acc.z*1000)/1000}</TextInput>
        </View>
      </View>
      <View style={styles.section}>
        <Text>Light Sensor:</Text>
        <View style={styles.inputsGroup}>
          <TextInput style={styles.input} editable={false}>{illuminance}</TextInput>
        </View>
      </View>
      <View style={styles.section}>
        <Text>Gyroscope:</Text>
        <View style={styles.inputsGroup}>
          <Text>X:</Text>
          <TextInput style={styles.input} editable={false}>{Math.round(gyro.x*1000)/1000}</TextInput>
          <Text>Y:</Text>
          <TextInput style={styles.input} editable={false}>{Math.round(gyro.y*1000)/1000}</TextInput>
          <Text>Z:</Text>
          <TextInput style={styles.input} editable={false}>{Math.round(gyro.z*1000)/1000}</TextInput>
        </View>
      </View>
      <View style={styles.section}>
        <Text>Location:</Text>
        <View style={styles.inputsGroup}>
          <Text>Latitude:</Text>
          <TextInput style={styles.input} editable={false}>{location && location.coords.latitude}</TextInput>
          <Text>Longitude:</Text>
          <TextInput style={styles.input} editable={false}>{location && location.coords.longitude}</TextInput>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input:{
    borderColor: '#000',
    borderWidth:2,
    padding:5,
    width:200,
    height:30
  },
  inputsGroup:{
    flex:1,
  },
  section:{
    marginTop:10,
    flex:1,
    borderRadius:8,
    borderWidth:1,
    borderColor:'#000'
  }
});
