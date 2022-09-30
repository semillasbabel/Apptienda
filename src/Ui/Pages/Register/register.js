import { View, Text, StyleSheet, ImageBackground, ActivityIndicator, ScrollView, TextInput, Alert } from 'react-native'
import React from 'react'
import { Button} from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { domainRegistry} from '../../../Domain/Repositories/Firebase/Auth/userRegister';
import { imagesUrl, activityState } from "../../Utils/constants"
import { defaultStateNote } from './Constants/registerKeys';

const registry = new domainRegistry();
const image = { uri: imagesUrl.fondo };

const Register = () => {
  const navigation = useNavigation();
  const [estado, setEstado] = React.useState(defaultStateNote.inicial);
  const [isLoading, setLoading] = React.useState(activityState.off);
  const [userRegister, setUserSend] = React.useState({
    email: "",
    Password: "",
    name: "",
    address: "",
  });

  async function registro(){
    setLoading(activityState.on)
    await registry.setEmail(userRegister.email).setPassword(userRegister.Password).setName(userRegister.name).setAddress(userRegister.address).userRegistry();

    if (registry.getRegistryState) {
      Alert.alert("", 'Registro Exitoso')
      setUserSend({email: "", Password: "", name: "", address: ""})
      setEstado(defaultStateNote.inicial)
      setLoading(activityState.off)
      navigation.goBack()
    }
    else{
      setLoading(activityState.off)
      setEstado(defaultStateNote.error)
    }
  }

  return (
   
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
     
      <ScrollView>
        <Text style={styles.TEXTO}>Registro de Usuarios</Text>
        <View style={{flexDirection:'row', alignItems: 'baseline', marginRight:20}}>
          <Icon   name="at" size={30} color="#1eb6fa" style={{marginLeft:10}}/>
         <TextInput
          placeholder='Correo Electronico'
          placeholderTextColor={"#1899c5"}
          value={userRegister.email}
          textContentType="emailAddress"
          onChangeText={(e) => setUserSend({...userRegister, email: e})}
          style={{  height: 40,borderBottomWidth: 3, marginLeft:40,marginBottom:15,width:300,fontSize: 20,color:"", borderRadius: 10,backgroundColor:'white',borderBottomColor: "#f8f8f8"}}/>
        </View>
        <View style={{flexDirection:'row', alignItems: 'baseline', marginRight:20}}>
          <Icon   name="lock" size={35} color="#1eb6fa"  style={{marginLeft:10}}/>
         <TextInput
          placeholder='contraseña'
          placeholderTextColor={"#1899c5"}
          value={userRegister.Password}
          secureTextEntry
          textContentType="password"
          onChangeText={(e) => setUserSend({...userRegister, Password: e})}
          style={{  height: 40,borderBottomWidth: 3, marginLeft:40,marginBottom:15,width:300,fontSize: 20,color:"", borderRadius: 10,backgroundColor:'white',borderBottomColor: "#f8f8f8"}}/>
        </View>
        <View style={{flexDirection:'row', alignItems: 'baseline', marginRight:20}}>
          <Icon   name="user" size={35} color="#1eb6fa"  style={{marginLeft:10}}/>
        <TextInput
          placeholder='Nombre Completo'
          placeholderTextColor={"#1899c5"}
          value={userRegister.name}
          textContentType="name"
          onChangeText={(e) => setUserSend({...userRegister, name: e})}
          style={{  height: 40,borderBottomWidth: 3, marginLeft:40,marginBottom:15,width:300,fontSize: 20,color:"", borderRadius: 10,backgroundColor:'white',borderBottomColor: "#f8f8f8"}}/>
        </View>
        <View style={{flexDirection:'row', alignItems: 'baseline', marginRight:20}}>
           <Icon   name="home" size={30} color="#1eb6fa" style={{marginLeft:10}}/>
          <TextInput
            placeholder='Domicilio' 
            placeholderTextColor={"#1899c5"}
            value={userRegister.address}
            textContentType="addressCityAndState"
            onChangeText={(e) => setUserSend({...userRegister, address: e})}
            style={{  height: 40,borderBottomWidth: 3, marginLeft:37,marginBottom:15,width:300,fontSize: 20,color:"", borderRadius: 10,backgroundColor:'white',borderBottomColor: "#f8f8f8"}}/>
        
        </View>
        <Text style={{color:"red", alignContent:'center', alignSelf:'center', fontWeight:'bold'}}>{estado}</Text>
        <View>{isLoading === activityState.on ? <ActivityIndicator size="large" color="#1899c5"/> : <Text/>}</View>
        <Button style={{height:120, width:150, alignItems:'center', marginLeft:125, paddingVertical:25}}
          title={'Registrar'}
          onPress={()=>registro()}
        />
        

      </ScrollView>
    </ImageBackground>
      
      
    
  )
}


const styles = StyleSheet.create({
  text: {
   fontSize:25,
   justifyContent:'center',
  
  },
  botton :{
    height:55,
    width:350,
    justifyContent:'center',
    marginLeft:'auto',
    marginRight:'auto',
    
  },
  TEXTO:{
    fontSize: 20,
    color:'#ffff00',
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:15,
    textAlign:'center',
    paddingVertical:60
  },
  container: {
    flex: 1,
    backgroundColor:'#f8f8f8',
    
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  Input:{
    fontSize: 35,
    borderColor:'red',
  },
  Image2:{
    height:250,
    width:250,
    alignContent:'center'
  }
  });
export default Register