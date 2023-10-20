/*import React, { useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Polygon } from "react-native-svg";
import * as Animatable from "react-native-animatable";


const AnimatedTriangleRain = () => {
  const triangleRef = useRef(null);

  const animateTriangles = () => {
    if (triangleRef.current) {
      triangleRef.current.transitionTo(
        { translateY: -2 }, // Desplaza hacia arriba
        1000, // Duración de la animación en milisegundos (ajustado a 1 segundo)
        "linear",
        () => {
          triangleRef.current.transitionTo(
            { translateY: 0 }, // Restablece la posición del triángulo arriba
            0, // Duración cero para que sea instantáneo
            "linear",
            () => {
              animateTriangles(); // Llamada recursiva para continuar la animación
            }
          );
        }
      );
    }
  };

  useEffect(() => {
    animateTriangles(); // Comienza la animación
  }, []);

  return (
    <Animatable.View
      ref={triangleRef}
      style={styles.triangleContainer}
      iterationCount="infinite"
    >
      <Svg height="30" width="30">
        <Polygon points="0,30 15,0 30,30" fill="blue" />
      </Svg>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  triangleContainer: {
    alignItems: "center",
  },
});

export default AnimatedTriangleRain;
 */

import React, { useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import Svg, { Polygon } from "react-native-svg";

const AnimatedRain = () => {
  const triangleRef = useRef(null);

  const animateTriangle = () => {
    triangleRef.current.slideInDown(3000)
  };

  useEffect(() => {
    animateTriangle();
  }, []);

  return (
    <Animatable.View style={styles.triangleContainer}>
      <Animatable.View
        ref={triangleRef}
      >
        <Svg height="50" width="50">
          <Polygon
            points="25,0 0,50 50,50"
            fill="blue"
          />
        </Svg>
      </Animatable.View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  triangleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AnimatedRain;
