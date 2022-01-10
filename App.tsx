import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, FlatList, Image } from 'react-native';


const { width, height } = Dimensions.get('screen')

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
    'https://images.pexels.com/photos/6857165/pexels-photo-6857165.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};
const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
  ref: React.createRef()
}));

const Indicator = () => {
  return (<View style={{
    position: 'absolute',
    height: 4,
    width: 100,
    backgroundColor: 'white',
    bottom: -10
  }} />);

}

const Tab = React.forwardRef(({ item }, ref) => {
  return (
    <View ref={ref}>
      <Text style={{
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '800',
        fontSize: 84 / data.length,
        textTransform: 'uppercase'
      }}>{item.title}</Text>
    </View>
  );
});

const Tabs = ({ data, scrollX }) => {
  const [measures, setMeasures] = React.useState([])
  const containerRef = React.useRef();

  React.useEffect(() => {
    let m = []
    data.forEach((i) => {
      i.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          m.push({ x, y, width, height })
          console.log(x, y, width, height)
        }
      );
      if (m.length === data.length) {
        setMeasures(m)
      }
    });
  }, [])
  console.log(measures);
  return (<View style={{ position: 'absolute', top: 50, width }}>
    <View style={{ justifyContent: 'space-evenly', flex: 1, flexDirection: 'row' }}>
      {
        data.map((item) => {
          return <Tab key={item.key} item={item} ref={item.ref} />
        })
      }
    </View>
    <Indicator />
  </View>
  )

}


export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;


  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        data={data}
        keyExtractor={item => item.key}
        renderItem={({ item }) => {
          return (<View style={{ width, height }}>
            <Image
              source={{ uri: item.image }}
              style={{ flex: 1, resizeMode: 'cover' }}
            />
            <View style={
              [
                StyleSheet.absoluteFillObject,
                { backgroundColor: 'rgba(0,0,0, 0.3)' }
              ]} />
          </View>)
        }
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        bounces={false}
      />
      <Tabs scrollX={scrollX} data={data} />
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