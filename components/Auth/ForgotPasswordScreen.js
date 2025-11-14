// components/Auth/ForgotPasswordScreen.js
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

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');

  const handleResetPassword = () => {
    console.log('Password reset requested for:', email);
    
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    
    Alert.alert(
      'Reset Link Sent!', 
      `Password reset instructions have been sent to ${email}`,
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
        subtitle="Recover your account and get back to connecting!"
      />

      <View style={styles.formContainer}>
        <Text style={styles.welcomeText}>Reset Password</Text>
        
        <Text style={styles.instructionText}>
          Enter your email address and we'll send you instructions to reset your password.
        </Text>

        <InputField
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your registered email"
          keyboardType="email-address"
        />

        <PrimaryButton title="Send Reset Link" onPress={handleResetPassword} />

        <LinkButton 
          title={
            <Text>
              Remember your password? <Text style={styles.loginLink}>Sign In</Text>
            </Text>
          } 
          onPress={() => navigation.goBack()} 
        />

        <FooterImage />
      </View>
    </ScreenLayout>
  );
};

export default ForgotPasswordScreen;