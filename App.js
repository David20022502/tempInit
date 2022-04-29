/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect } from 'react';
 import type {Node} from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   Button
 } from 'react-native';
 
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 import * as RNIap from 'react-native-iap';
 
 const Section = ({children, title}): Node => {
   const isDarkMode = useColorScheme() === 'dark';
    return (
     <View style={styles.sectionContainer}>
       <Text
         style={[
           styles.sectionTitle,
           {
             color: isDarkMode ? Colors.white : Colors.black,
           },
         ]}>
         {title}
       </Text>
       <Text
         style={[
           styles.sectionDescription,
           {
             color: isDarkMode ? Colors.light : Colors.dark,
           },
         ]}>
         {children}
       </Text>
     </View>
   );
 };
 
 const App: () => Node = () => {
   const[conection,setConection]=React.useState("")
   const[platform,setPlatform]=React.useState("")
 
   const[items,setItems]=React.useState([])
   const[counter,setCounter]=React.useState(0)
  useEffect(() => {
    initilizeIAPConnection();
 
  }, []);

  const itemSubs = Platform.select({

    ios: ['com.example.coins100',
    'com.example.coins10',
    'com.example.coins1',
  ],
 
    android: ['com.example.coins100',
    'com.example.coins10',
    'com.example.coins1',],
 
  });
 
  const initilizeIAPConnection = async () => {
 
    await RNIap.initConnection()
 
      .then(async (connection) => {
 
        console.log('estado conection:', connection);
        let tempD=connection.toString()
        setConection('estado Conexion: '+tempD);
        setPlatform("plataforma: "+Platform.OS)
        console.log("plataforma:",Platform.OS)
       getItems();
      })
 
      .catch((err) => {
 
        console.warn(`IAP ERROR ${err.code}`, err.message);
      });
 
      /*await RNIap.flushFailedPurchasesCachedAsPendingAndroid()
 
        .then(async(consumed) => {
 
        console.log('consumed all items?', consumed);
 
      }).catch((err) => {
 
        console.warn(`flushFailedPurchasesCachedAsPendingAndroid ERROR ${err.code}`, err.message);
 
      });*/
 
  };
  const getItems = async () => {
    setCounter(counter+1)
    try {
 
      console.log("itemSubs ",itemSubs);
 
      const Products = await RNIap.getProducts(itemSubs);
      setItems(Products)
 
      console.log(' IAP Su', Products);
 
      if (Products.length !== 0){
        setItems(Products)
        if (Platform.OS === 'android'){
 
        //Your logic here to save the products in states etc
 
        } else if (Platform.OS === 'ios'){
 
        // your logic here to save the products in states etc
 
        // Make sure to check the response differently for android and ios as it is different for both
 
        }
 
      }
 
    } catch (err) {
 
      console.warn("IAP error",err.code, err.message, err);
 
    
 
    }
 
  };
 
   const isDarkMode = useColorScheme() === 'dark';
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
 
   return (
     <SafeAreaView style={backgroundStyle}>
       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       <ScrollView
         contentInsetAdjustmentBehavior="automatic"
         style={backgroundStyle}>
         <Header />
         <View
           style={{
             backgroundColor: isDarkMode ? Colors.black : Colors.white,
           }}>
             <Text>-----------Resultados-------</Text>
             <Text>{conection}</Text>
             <Text>{platform}</Text>
             <Text>items directo: {items}</Text>
             <Text>position 0: {items[0]}</Text>
             <Text>tamanio: {items.length}</Text>
             <Text>items string: {items.toString()}</Text>
             <Text>------------Resultados-------</Text>
             <Text>{counter}</Text>
             <Button onPress={()=>{getItems()}} title="reload"></Button>
           <Section title="Step One">
             Edit <Text style={styles.highlight}>App.js</Text> to change this
             screen and then come back to see your edits.
           </Section>
           <Section title="See Your Changes">
             <ReloadInstructions />
           </Section>
           <Section title="Debug">
             <DebugInstructions />
           </Section>
           <Section title="Learn More">
             Read the docs to discover what to do next:
           </Section>
           <LearnMoreLinks />
         </View>
       </ScrollView>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });
 
 export default App;