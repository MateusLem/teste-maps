import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default function App() {
  const[nome,setNome] = useState("");
  const[desc,setDesc] = useState("");
  const[lati,setLati] = useState("");
  const[long,setLong] = useState("");
  const[lista,setLista] = useState([]);

  const mapRef = useRef();

  const salvar = () =>{
    const obj = {nome, desc, lati, long}
    setLista([...lista, obj])
    mapRef.current.animateToRegion
    ({
      latitude: parseFloat(lati),
      longitude: parseFloat(long),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }, 1000)
  }

  return (
    <View style={{flex: 1}}>

      <Text>Mapa Google</Text>

      <View style = {{flex:1}}>

        <TextInput placeholder='Nome do Restaurante'
          value={nome} onChangeText={setNome}/>
        <TextInput placeholder='Descrição do Restaurante'
          value={desc} onChangeText={setDesc}/>
        <TextInput placeholder='Latitude do Restaurante'
          value={lati} onChangeText={setLati}/>
        <TextInput placeholder='Longitude do Restaurante'
          value={long} onChangeText={setLong}/>

        <Button title='Salvar' onPress={salvar}/>
      </View>


      <MapView 
        ref={mapRef}
        style={ {flex: 2} }
        initialRegion={{
        latitude: -8.83833,
        longitude: 13.2344,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421}}>

       {lista.map((item, indice) => 
          <Marker
            key={indice}
            title={item.nome}
            description={item.desc}
            coordinate = {{
              latitude: parseFloat(item.lati),
              longitude: parseFloat(item.long)}}/>)}
      </MapView>
    </View>
    
    
  );
}
