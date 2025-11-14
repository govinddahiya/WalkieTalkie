// components/Auth/SignUpScreen.js
import React from 'react';
import { View, Text, Alert } from 'react-native';
import ScreenLayout from '../Common/ScreenLayout';
import { 
  Header, 
  InputField, 
  PrimaryButton, 
  LinkButton, 
  FooterImage 
} from '../Common/AuthForm';
import { styles } from '../Common/styles';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleSignUp = () => {
    console.log('Sign up attempted with:', { email, username, password });
    
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    Alert.alert(
      'Success!', 
      'Account created successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login')
        }
      ]
    );
  };

  return (
    <ScreenLayout>
      <Header
        title="Woky-Talkie"
        subtitle="Join our community and start connecting instantly!"
      />

      <View style={styles.formContainer}>
        <Text style={styles.welcomeText}>Create Account</Text>

        <InputField
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <InputField
          label="Username"
          value={username}
          onChangeText={setUsername}
          placeholder="Choose a username"
        />

        <InputField
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Create a password"
          secureTextEntry
        />

        <InputField
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
          secureTextEntry
        />

        <PrimaryButton title="Create Account" onPress={handleSignUp} />

        <LinkButton 
          title={
            <Text>
              Already have an account? <Text style={styles.loginLink}>Sign In</Text>
            </Text>
          } 
          onPress={() => navigation.goBack()} 
        />

        <FooterImage />
      </View>
    </ScreenLayout>
  );
};

export default SignUpScreen;