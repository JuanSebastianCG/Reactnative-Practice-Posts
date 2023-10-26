/* import React, { useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import Svg, { Polygon } from "react-native-svg";

const AnimatedRain = () => {
  const triangleRef = useRef(null);

  const animateTriangle = () => {
  
    const delay = Math.floor(Math.random() * 2000) + 5000;
    triangleRef.current.transitionTo({ translateY: 1000 }, delay, "linear");
    console.log("delay:",triangleRef.current.props.onAnimationEnd);
    if (triangleRef.current) {
      setTimeout(() => {
        triangleRef.current.transitionTo({ translateY: 0 }, 0, "linear");
        animateTriangle();
      }, delay);
    }

  };

  useEffect(() => {
    animateTriangle(); // Comienza la animación
  }, []);

  return (
    <Animatable.View style={styles.triangleContainer}>
      <Animatable.View
        ref={triangleRef}
        iterationCount="infinite"
        style={styles.triangle}>
        <Svg height="50" width="50">
          <Polygon points="25,0 0,50 50,50" fill="blue" />
        </Svg>
      </Animatable.View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  triangleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  triangle: {},
});

export default AnimatedRain;
 */