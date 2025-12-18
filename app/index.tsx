import { Text, View, StyleSheet, Button, Pressable } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polygon, Circle } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef } from "react";
import MapViewDirections from "react-native-maps-directions";

const GOOGLE_MAPS_API_KEY = "AIzaSyBoB-V_sTwkkgcj3-JbKnDTXsetJ8uS8LI";

export default function Index() {

  const mapRef = useRef<MapView>(null);

  const [origin, setOrigin] = useState({
    latitude: -12.045782788117789,
    longitude: -77.03004710692879,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [destination, setDestination] = useState({
    latitude: -12.051856789689692,
    longitude: -77.03131033081843,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const handleZoomIn = () => {
    const newRegion = {
      ...origin,
      latitudeDelta: origin.latitudeDelta / 2,
      longitudeDelta: origin.longitudeDelta / 2,
    };
    setOrigin(newRegion);
    mapRef.current?.animateToRegion(newRegion, 300);
  };

  const handleZoomOut = () => {
     const newRegion = {
      ...origin,
      latitudeDelta: origin.latitudeDelta *2,
      longitudeDelta: origin.longitudeDelta *2,
    };
    setOrigin(newRegion);
    mapRef.current?.animateToRegion(newRegion, 300);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={origin}
        >
          <Marker
            coordinate={origin}
            title="Marker Title"
            description="Marker Description"
            pinColor="green"
            draggable={true}
            onDragEnd={(e) => console.log(e.nativeEvent)}
          >
            <Callout>
              <Text>This is CallOut</Text>
            </Callout>
          </Marker>

          {/* <Polyline 
            coordinates={[origin, destination]} 
            strokeColor="red"
            strokeWidth={5}
          /> */}
          {/* <Polygon 
            coordinates={[origin, destination]} 
            strokeColor="green"
            strokeWidth={5}
            fillColor="green"
          /> */}
          <Circle 
            center={origin}
            radius={100}     
          />
          <MapViewDirections 
            origin={origin}
            destination={destination}
            strokeColor="red"
            strokeWidth={5}
            apikey={GOOGLE_MAPS_API_KEY}
          />
        </MapView>

        <Button
          title="Get Directions"
          onPress={() => {
            setOrigin(destination);
            setDestination(origin);
          }}
        />

        <View style={styles.zoomControls}>
          <Pressable style={styles.zoomButton} onPress={handleZoomIn}>
            <Text style={styles.zoomButtonText}> + </Text>
          </Pressable>
          <Pressable style={styles.zoomButton} onPress={handleZoomOut}>
            <Text style={styles.zoomButtonText}> - </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  zoomControls: {
    position: "absolute",
    bottom: 20,
    right: 20,
    flexDirection: "column",
    paddingVertical: 10,
  },

  zoomButton: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 5,
  },

  zoomButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    lineHeight: 20,
  },
});

