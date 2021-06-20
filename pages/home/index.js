import React, { useState, useContext } from "react"
import { View, StyleSheet, Image, Text, TextInput, Button, TouchableOpacity } from "react-native"
import { StatusBar } from 'expo-status-bar'
import TextTitulo from "../../components/TextTitulo"

import * as Google from 'expo-google-app-auth'
import GlobalContext from "../../global/context"



export default function Home() {

  const [nombre, setNombre] = useState('')
  const [mail, setMail] = useState('')

  const { applyAuthentication } = useContext(GlobalContext)
  const { guardarInvitado } = useContext(GlobalContext)


  const loginInvitado = () => {
    guardarInvitado({nombre, mail})
    applyAuthentication()
  }

  async function signInwithGoogleAsync(){
    try {
      const config = {
        iosClientId: '640461910291-npdj3dkb2mrvru7117bo9bskagk90ml5.apps.googleusercontent.com',
        androidClientId :'542638054256-0oc13ertpur8u50ij7er0voou93tqtf6.apps.googleusercontent.com'
      }
      const result = await Google.logInAsync(config);
      //console.log(result);
      if (result.type === 'success' && result.user !== undefined) {
        applyAuthentication(result.user)
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  
  return (
    <View style={styles.container}>
      {/* #TODO: Agregar Nombre */}
      <TextTitulo text={"TUSAM"} />

      <Text style={styles.description}>
        Ingrese, seleccione una dificultad e intente adivinar el numero en la menor cantidad de intentos antes que se acabe el tiempo.
      </Text>
      
      {/* #TODO: Agregar Introduccion, tal vez con instrucciones. */}
      {/* #TODO: Agregar Inicio con Google */}


      <TouchableOpacity
        style={styles.buttonGoogle}
        activeOpacity={0.5}
        onPress={() => {signInwithGoogleAsync()}}
      >
        <Image 
          style={styles.buttonImageIcon}
          source={require('../../assets/btn_google_signin.png')}
        />
      </TouchableOpacity> 
   


      <TextInput
        style={styles.input}
        value={nombre}
        placeholder="Nombre"
        onChangeText={(text) => setNombre(text)}
      />
      <TextInput
        style={styles.input}
        value={mail}
        placeholder="Email"
        onChangeText={(text) => setMail(text)}
      />

      <Button 
        title={'Entrar como invitado'}
        onPress={loginInvitado}
      />

      <StatusBar style='auto'/> 
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: 18,
  },
  input: {
    height: 40,
    width: "80%",
    margin: 12,
    padding: 10,
    
    borderWidth: 0.5,
    borderColor: "#808080",
    shadowColor: "black",
    shadowOffset: {
      height: 2,
      width: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    /* --------------REVISAR------------------------------------------------------------- */
   /*  border: "0.5px gray solid",
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", */
    /* --------------REVISAR------------------------------------------------------------- */

  },
  buttonGoogle:{
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#fff',
    borderRadius: 5,
    margin: 12
  },
  buttonImageIcon: {
    padding: 10,
    margin: 5,
    resizeMode: 'center',
  }
});