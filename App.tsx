import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Animated, Dimensions, FlatList, StyleSheet, Text, View, Image } from 'react-native';

const images = {
  man:
    'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  women:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  kids:
    'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  skullcandy:
    'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  help:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};
const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
}));

const { width, height } = Dimensions.get("window");

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.key}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return <View style={{ width, height }}>
            {console.log(item)}
            <Image source={{ uri: item.image }} style={{ flex: 1 }} />
            <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.3)' }]} />
          </View>
        }} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});