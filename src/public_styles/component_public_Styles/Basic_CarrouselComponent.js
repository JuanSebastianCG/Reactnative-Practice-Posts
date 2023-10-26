import React, { useEffect, useState } from "react";
import { Dimensions, Image, Text, View, StyleSheet } from "react-native";
import { interpolate, useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import BasicStylesPage from "../css_public_Styles/Basic_Style";

function CustomCarrousel({ data = [], width = 350, height = 200 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const calculateIndex = (index) => {
    if (index > currentIndex - 0.5  || index < currentIndex - 0.5 ) {
        if( index + 1 > data.length) {
            setCurrentIndex(0);
        } else {
        setCurrentIndex(Math.round(index));    
        }
    } 

  };
  return (
    <View style={styles.container}>
      <Carousel
        autoPlay={true}
        width={width}
        height={height}
        scrollAnimationDuration={1000}
        data={data}
        autoPlayInterval={3000}
        onProgressChange={(_, absoluteProgress) =>
          calculateIndex(absoluteProgress)
        }
        customAnimation={(value, index, offset, length) => {
          "worklet";
          const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
          const translateX = interpolate(value, [-1, 0, 1], [-300, 0, 300]);
          const opacity = interpolate(value, [-1, 0, 1], [0.5, 1, 0.5]);
          const scale = interpolate(value, [-1, 0, 1], [1.25, 1, 0.25]);

          return {
            /* transform: [{ scale }, { translateX }], */
            transform: [{ translateX }],
            zIndex,
            opacity,
          };
        }}
        renderItem={({ index }) => (
          <View>
            <Image source={{ uri: data[index].uri }} style={styles.image} />
          </View>
        )}
      />
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                opacity: interpolate(
                  currentIndex,
                  [index - 1, index, index + 1],
                  [0.5, 1, 0.5]
                ),
                width: interpolate(
                  currentIndex,
                  [index - 1, index, index + 1],
                  [6, 10, 6]
                ),
                height: interpolate(
                  currentIndex,
                  [index - 1, index, index + 1],
                  [6, 10, 6]
                ),
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

/* styles */
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    backgroundColor: BasicStylesPage.color3,
    borderRadius: 10,
  },
  dot: {
    borderRadius: 6,
    margin: 4,
    backgroundColor: "transparent",
    borderWidth: 3,
    borderColor: BasicStylesPage.color0,
  },
});

export { CustomCarrousel };
