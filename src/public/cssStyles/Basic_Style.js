import React from 'react'
import { StyleSheet } from 'react-native';
const color0 = '#4d036d';
const color1 = '#010101'; 
const color2 = '#f6e0ff';
const color3 = '#FFFFFF';
const color4 = '#a954ad';
const color5 = "#120e13"
const color6 = "#1d0047"

const colorWarning1 = '#FF0000';
const colorWarning2 = '#bdffc6';
const colorWarning3 = '#ff9f9f';

const colorHrefLink = '#c300e1';
/* const color0 = '#b90202';
const color1 = '#c54040'; 
const color2 = '#FFDBDB';
const color3 = '#FFFFFF';
const color4 = '#ff3a3a';
const color5 = "#999"
const color6 = "#e84646"

const colorWarning1 = '#FF0000';
const colorWarning2 = '#bdffc6';
const colorWarning3 = '#ff9f9f'; */

const fontText = 'normal';  
const fontWeightTitle = 'bold';
const fontWeightText = 'normal';


const sizeFontFormInput = 16;
const sizeFontButton = 19; 


const BasicStyles = StyleSheet.create({

});

const hrefLinkFontStyles = StyleSheet.create({
  hrefLink: {
    color: colorHrefLink,
    fontSize: sizeFontFormInput,
    fontWeight: fontWeightText,
    textDecorationLine: 'underline',
  },
});


const BasicStylesPage = {
  color0,
  color1,
  color2,
  color3,
  color4,
  color5,
  color6,
  colorWarning1,
  colorWarning2,
  colorWarning3,
  fontText,
  fontWeightTitle,
  fontWeightText,
  sizeFontFormInput,
  sizeFontButton,
  BasicStyles,
  hrefLinkFontStyles,
};


export default BasicStylesPage;
