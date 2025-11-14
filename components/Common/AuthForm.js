// components/Common/AuthForm.js
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { styles } from './styles';

export const InputField = ({ label, value, onChangeText, placeholder, secureTextEntry = false, keyboardType = 'default' }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.textInput}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#999"
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize="none"
      autoCorrect={false}
    />
  </View>
);

export const PrimaryButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.signInButton} onPress={onPress}>
    <Text style={styles.signInButtonText}>{title}</Text>
  </TouchableOpacity>
);

export const SecondaryButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.signUpButton} onPress={onPress}>
    <Text style={styles.signUpButtonText}>{title}</Text>
  </TouchableOpacity>
);

export const LinkButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.forgotPasswordButton} onPress={onPress}>
    <Text style={styles.forgotPasswordText}>{title}</Text>
  </TouchableOpacity>
);

export const FooterImage = () => (
  <View style={styles.imageContainer}>
    <Image 
      source={require('../../assets/iconfp.png')}
      style={styles.smallImage}
      resizeMode="contain"
    />
  </View>
);

export const Header = ({ title, subtitle }) => (
  <View style={styles.header}>
    <Text style={styles.appTitle}>{title}</Text>
    <Text style={styles.appSubtitle}>{subtitle}</Text>
  </View>
);