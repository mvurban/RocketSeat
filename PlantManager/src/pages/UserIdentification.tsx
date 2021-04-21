import React, {useState} from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Button } from '../components/Button';

export function UserIdentification() {

   const [isFocused, setIsFocused] = useState(false);   
   const [userName, setUserName] = useState<string>();

   function handleInputBlur(){
      setIsFocused(false);
   }
   function handleInputFocus(){
      setIsFocused(true);
   }
   function handleInputChange(value : string){
      setUserName(value);
   }

   return (
      <SafeAreaView style={styles.container}>
         <KeyboardAvoidingView style={styles.container}>
            <View style={styles.wrapper}>
               <Text style={styles.emoji}>
                  {
                     !!userName ?  '😀' : '😁' 
                  }
                  
               </Text>
               <Text style={styles.heading}>
                  Como podemos {'\n'}
                  chamar você?
               </Text>

               <TextInput 
                  placeholder="Digite um nome" 
                  placeholderTextColor={colors.gray} 
                  style={[
                     styles.textInput,
                     isFocused && {borderBottomColor:colors.green}
                  ]}
                  onBlur={handleInputBlur}
                  onFocus={handleInputFocus}
                  onChangeText={handleInputChange}
               />
               <View style={styles.buttonContainer}>
                  <Button texto='Confirmar'></Button>
               </View>

            </View>
         </KeyboardAvoidingView>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   wrapper: {
      flex: 1,
      borderWidth: 0,
      marginVertical: '15%',
      marginHorizontal: '15%',
      alignItems: 'center',
      justifyContent: 'center',
   },
   emoji: {
      fontSize: 36,
   },
   heading: {
      fontFamily: fonts.heading,
      color: colors.heading,
      fontSize: 24,
      lineHeight: 32,
      marginVertical: 10,
      marginBottom: 60,
      textAlign: 'center',
   },
   textInput: {
      borderBottomWidth: 1,
      borderBottomColor: colors.gray,
      paddingHorizontal: 30,
      paddingVertical: 10,
      marginVertical: 20,
      color: colors.heading,
      fontFamily: fonts.text,
      fontSize: 18,
      textAlign: 'center',
      width: '100%',
   },
   buttonContainer: {
      width: '100%',
      marginVertical: 20,
   }

})