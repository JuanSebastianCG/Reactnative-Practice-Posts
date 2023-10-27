import React, { useState, useRef, useEffect } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import BasicStylesPage from "../../public_styles/css_public_Styles/Basic_Style";

const CustomInTextField = ({ label, style, value, onChangeText }) => {
  const [isFocused, setIsFocused] = useState(false);

  const translateY = useRef(
    new Animated.Value(value || isFocused ? -22 : 0)
  ).current;
  const fontSize = useRef(
    new Animated.Value(value || isFocused ? 12 : 16)
  ).current;
  const inputRef = useRef(null);

  const handlePress = () => {
    setIsFocused(true);
  };

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -22,
          duration: 150,
          useNativeDriver: false,
        }),
        Animated.timing(fontSize, {
          toValue: 12,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [isFocused]);

  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 150,
          useNativeDriver: false,
        }),
        Animated.timing(fontSize, {
          toValue: 16,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handlePress}
      style={[stylesForm.touchableContainer, style]}>
      <View style={[stylesForm.inputContainer]}>
        <TextInput
          ref={inputRef}
          style={[stylesForm.inputText, { width: style[0]?.width }]}
          value={value}
          onChangeText={onChangeText}
          onFocus={handlePress}
          onBlur={handleBlur}
        />
        <Animated.Text
          style={[
            stylesForm.label,
            {
              transform: [{ translateY }],
              fontSize: fontSize,
              color: isFocused
                ? BasicStylesPage.color2
                : BasicStylesPage.color1,
            },
          ]}>
          {label}
        </Animated.Text>
        <View style={[stylesForm.bottomLine, { width: style[0]?.width }]} />
      </View>
    </TouchableOpacity>
  );
};

const stylesForm = StyleSheet.create({
  touchableContainer: {
    width: "120%",
  },
  inputContainer: {
    marginVertical: 10,
  },
  inputText: {
    fontSize: 16,
    paddingVertical: 10,
    width: 200,
  },
  label: {
    position: "absolute",

    left: 0,
    top: 15,
    fontSize: 16,
  },
  bottomLine: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: BasicStylesPage.color0,
  },
});

const CustomInTextArea = ({ label, style, value, onChangeText }) => {
  const [isFocused, setIsFocused] = useState(false);

  const translateY = useRef(new Animated.Value(0)).current;
  const fontSize = useRef(new Animated.Value(16)).current;
  const inputRef = useRef(null);

  const handlePress = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(fontSize, {
          toValue: 16,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handlePress}
      style={[stylesFormTextArea.touchableContainer, style]}>
      <View
        style={[stylesFormTextArea.inputContainer, { height: style.height }]}>
        <TextInput
          ref={inputRef}
          style={[
            stylesFormTextArea.inputText,
            { width: style.width },
            { textAlignVertical: "top" }, // Ajusta la alineación vertical
          ]}
          value={value}
          onChangeText={onChangeText}
          onFocus={handlePress}
          onBlur={handleBlur}
          multiline={true}
          numberOfLines={50}
        />

        <Animated.Text
          style={[
            stylesFormTextArea.label,
            {
              transform: [{ translateY }],
              fontSize: fontSize,
              color: isFocused
                ? BasicStylesPage.color2
                : BasicStylesPage.color1,
              //top: isFocused ? -12 : 7,
            },
          ]}>
          {label}
        </Animated.Text>
      </View>
    </TouchableOpacity>
  );
};

const stylesFormTextArea = StyleSheet.create({
  touchableContainer: {
    width: "120%",
  },
  inputContainer: {
    marginVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: BasicStylesPage.color0,
    borderRadius: 5,
  },
  inputText: {
    fontSize: 16,
    padding: 5,
  },
  label: {
    position: "absolute",
    left: 7,
    top: -12,
    fontSize: 16,
    backgroundColor: BasicStylesPage.color3,
  },
});
export { CustomInTextField, CustomInTextArea };
