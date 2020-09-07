import React from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

function Button({ iconName, onPress }) {
  return (
    <TouchableOpacity onPressOut={onPress}>
      <FontAwesome5 name={iconName} size={80} color="white" />
    </TouchableOpacity>
  );
}

Button.propTypes = {
  iconName: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default Button;