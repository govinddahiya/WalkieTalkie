// components/Auth/LoginScreen.js
import React from 'react';
import { View, Text, Alert } from 'react-native';
import ScreenLayout from '../Common/ScreenLayout';
import { 
  Header, 
  InputField, 
  PrimaryButton, 
  SecondaryButton, 
  LinkButton, 
  FooterImage 
} from '../Common/AuthForm';
import { styles } from '../Common/styles';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignIn = () => {
    // Navigate to MainApp which includes the BottomTabNavigator
    navigation.navigate('MainApp');
    console.log('Sign in attempted with:', { username, password });
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <ScreenLayout>
      <Header
        title="Woky-Talkie"
        subtitle="Stay connected instantly with the next-generation walkie-talkie social app! Talk to your friends, family, or community in real time with our push-to-talk feature."
      />

      <View style={styles.formContainer}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>

        <InputField
          label="Enter your username"
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
        />

        <InputField
          label="Enter your password"
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />

        <PrimaryButton title="Sign In" onPress={handleSignIn} />
        <SecondaryButton title="Sign Up" onPress={handleSignUp} />
        <LinkButton title="Forgot Password?" onPress={handleForgotPassword} />
        <FooterImage />
      </View>
    </ScreenLayout>
  );
};

export default LoginScreen;