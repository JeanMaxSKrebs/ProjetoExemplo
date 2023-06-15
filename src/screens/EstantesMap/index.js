import React, {useState, useContext} from 'react';
import {StyleSheet, View, Alert, TouchableHighlight, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {COLORS} from '../../assets/colors';
import {EstanteContext} from '../../context/EstantesProvider';
import Icon from 'react-native-vector-icons/Ionicons';

const EstantesMap = ({route}) => {
  const [mapType, setMapType] = useState('standard');
  const {estantes} = useContext(EstanteContext);

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    text: {
      fontSize: 20,
      color: mapType === 'standard' ? COLORS.primary : COLORS.white,
    },
    button: {
      width: '35%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff0',
      padding: 10,
      margin: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: mapType === 'standard' ? COLORS.primary : COLORS.white,
    },
  });

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        ref={map => (this.map = map)}
        style={styles.map}
        mapType={mapType}
        showsUserLocation={true}
        followsUserLocation={true}
        onPress={e => {
          route.params.onGoBack(
            e.nativeEvent.coordinate.latitude,
            e.nativeEvent.coordinate.longitude,
          );
          Alert.alert(
            'Coordenadas',
            'latitude= ' +
              e.nativeEvent.coordinate.latitude +
              ' longitude= ' +
              e.nativeEvent.coordinate.longitude,
          );
        }}
        initialRegion={{
          //região onde deve focar o mapa na inicialização
          latitude: -31.766108372781073,
          longitude: -52.35215652734042,
          latitudeDelta: 0.015, //baseado na documentação
          longitudeDelta: 0.0121, //baseado na documentação
        }}>
        {estantes.map(estante => {
          return (
            <Marker
              key={estante.uid}
              coordinate={{
                latitude: Number(estante.latitude),
                longitude: Number(estante.longitude),
              }}
              title={estante.nome}
              draggable>
              <Icon
                name="business"
                color={mapType === 'standard' ? COLORS.primary : COLORS.white}
                size={35}
              />
            </Marker>
          );
        })}
      </MapView>
      <TouchableHighlight
        style={styles.button}
        onPress={() =>
          mapType === 'standard'
            ? setMapType('satellite')
            : setMapType('standard')
        }>
        <Text style={styles.text}>
          {mapType === 'standard' ? 'Padrão' : 'Satélite'}
        </Text>
      </TouchableHighlight>
    </View>
  );
};
export default EstantesMap;
