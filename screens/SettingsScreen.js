// screens/SettingsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {
  const [settings, setSettings] = useState({
    // Notification Settings
    pushNotifications: true,
    messageSounds: true,
    vibration: true,
    silentMode: false,
    
    // Privacy Settings
    onlineStatus: true,
    readReceipts: true,
    profileVisibility: 'everyone',
    lastSeen: true,
    
    // Audio Settings
    voiceQuality: 'high', // 'low', 'medium', 'high'
    noiseCancellation: true,
    autoPlayVoice: true,
    volume: 80,
    
    // App Settings
    theme: 'light', // 'light', 'dark', 'auto'
    language: 'english',
    dataSaver: false,
    autoDownload: 'wifi', // 'never', 'wifi', 'always'
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Log Out', 
          style: 'destructive',
          onPress: () => navigation.navigate('Login')
        }
      ]
    );
  };

  const SettingItem = ({ icon, title, subtitle, rightComponent, onPress }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={22} color="#007AFF" style={styles.settingIcon} />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightComponent}
    </TouchableOpacity>
  );

  const SwitchSetting = ({ icon, title, subtitle, value, onValueChange }) => (
    <SettingItem
      icon={icon}
      title={title}
      subtitle={subtitle}
      rightComponent={
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#f0f0f0', true: '#007AFF' }}
          thumbColor={value ? '#fff' : '#f4f3f4'}
        />
      }
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="person"
              title="Profile"
              subtitle="Edit your profile information"
              rightComponent={<Ionicons name="chevron-forward" size={20} color="#C7C7CC" />}
              onPress={() => Alert.alert('Profile', 'Profile settings would open here')}
            />
            <SettingItem
              icon="shield-checkmark"
              title="Privacy & Security"
              subtitle="Manage your privacy settings"
              rightComponent={<Ionicons name="chevron-forward" size={20} color="#C7C7CC" />}
              onPress={() => Alert.alert('Privacy', 'Privacy settings would open here')}
            />
            <SettingItem
              icon="key"
              title="Change Password"
              subtitle="Update your password"
              rightComponent={<Ionicons name="chevron-forward" size={20} color="#C7C7CC" />}
              onPress={() => Alert.alert('Password', 'Password change would open here')}
            />
          </View>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.sectionContent}>
            <SwitchSetting
              icon="notifications"
              title="Push Notifications"
              subtitle="Receive push notifications"
              value={settings.pushNotifications}
              onValueChange={(value) => updateSetting('pushNotifications', value)}
            />
            <SwitchSetting
              icon="volume-high"
              title="Message Sounds"
              subtitle="Play sounds for new messages"
              value={settings.messageSounds}
              onValueChange={(value) => updateSetting('messageSounds', value)}
            />
            <SwitchSetting
              icon="phone-vibrate"
              title="Vibration"
              subtitle="Vibrate for notifications"
              value={settings.vibration}
              onValueChange={(value) => updateSetting('vibration', value)}
            />
            <SwitchSetting
              icon="moon"
              title="Silent Mode"
              subtitle="Mute all sounds"
              value={settings.silentMode}
              onValueChange={(value) => updateSetting('silentMode', value)}
            />
          </View>
        </View>

        {/* Audio & Voice Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Audio & Voice</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="musical-notes"
              title="Voice Quality"
              subtitle={`Current: ${settings.voiceQuality}`}
              rightComponent={
                <View style={styles.settingValue}>
                  <Text style={styles.settingValueText}>
                    {settings.voiceQuality.charAt(0).toUpperCase() + settings.voiceQuality.slice(1)}
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </View>
              }
              onPress={() => {
                Alert.alert(
                  'Voice Quality',
                  'Select voice quality',
                  [
                    { text: 'Low', onPress: () => updateSetting('voiceQuality', 'low') },
                    { text: 'Medium', onPress: () => updateSetting('voiceQuality', 'medium') },
                    { text: 'High', onPress: () => updateSetting('voiceQuality', 'high') },
                  ]
                );
              }}
            />
            <SwitchSetting
              icon="ear"
              title="Noise Cancellation"
              subtitle="Reduce background noise"
              value={settings.noiseCancellation}
              onValueChange={(value) => updateSetting('noiseCancellation', value)}
            />
            <SwitchSetting
              icon="play-circle"
              title="Auto-play Voice Messages"
              subtitle="Play messages automatically"
              value={settings.autoPlayVoice}
              onValueChange={(value) => updateSetting('autoPlayVoice', value)}
            />
            <SettingItem
              icon="volume-medium"
              title="Volume"
              subtitle={`${settings.volume}%`}
              rightComponent={
                <View style={styles.volumeContainer}>
                  <Text style={styles.volumeText}>{settings.volume}%</Text>
                </View>
              }
              onPress={() => {
                Alert.alert(
                  'Volume',
                  'Adjust volume level',
                  [
                    { text: '25%', onPress: () => updateSetting('volume', 25) },
                    { text: '50%', onPress: () => updateSetting('volume', 50) },
                    { text: '75%', onPress: () => updateSetting('volume', 75) },
                    { text: '100%', onPress: () => updateSetting('volume', 100) },
                  ]
                );
              }}
            />
          </View>
        </View>

        {/* Privacy Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <View style={styles.sectionContent}>
            <SwitchSetting
              icon="radio-button-on"
              title="Online Status"
              subtitle="Show when you're online"
              value={settings.onlineStatus}
              onValueChange={(value) => updateSetting('onlineStatus', value)}
            />
            <SwitchSetting
              icon="checkmark-done-circle"
              title="Read Receipts"
              subtitle="Show when you've read messages"
              value={settings.readReceipts}
              onValueChange={(value) => updateSetting('readReceipts', value)}
            />
            <SwitchSetting
              icon="time"
              title="Last Seen"
              subtitle="Show when you were last active"
              value={settings.lastSeen}
              onValueChange={(value) => updateSetting('lastSeen', value)}
            />
            <SettingItem
              icon="eye"
              title="Profile Visibility"
              subtitle="Who can see your profile"
              rightComponent={
                <View style={styles.settingValue}>
                  <Text style={styles.settingValueText}>
                    {settings.profileVisibility.charAt(0).toUpperCase() + settings.profileVisibility.slice(1)}
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </View>
              }
              onPress={() => {
                Alert.alert(
                  'Profile Visibility',
                  'Choose who can see your profile',
                  [
                    { text: 'Everyone', onPress: () => updateSetting('profileVisibility', 'everyone') },
                    { text: 'Contacts Only', onPress: () => updateSetting('profileVisibility', 'contacts') },
                    { text: 'Nobody', onPress: () => updateSetting('profileVisibility', 'nobody') },
                  ]
                );
              }}
            />
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="color-palette"
              title="Theme"
              subtitle={`Current: ${settings.theme}`}
              rightComponent={
                <View style={styles.settingValue}>
                  <Text style={styles.settingValueText}>
                    {settings.theme.charAt(0).toUpperCase() + settings.theme.slice(1)}
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </View>
              }
              onPress={() => {
                Alert.alert(
                  'Theme',
                  'Choose app theme',
                  [
                    { text: 'Light', onPress: () => updateSetting('theme', 'light') },
                    { text: 'Dark', onPress: () => updateSetting('theme', 'dark') },
                    { text: 'Auto', onPress: () => updateSetting('theme', 'auto') },
                  ]
                );
              }}
            />
            <SettingItem
              icon="language"
              title="Language"
              subtitle="App language"
              rightComponent={
                <View style={styles.settingValue}>
                  <Text style={styles.settingValueText}>English</Text>
                  <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </View>
              }
              onPress={() => Alert.alert('Language', 'Language selection would open here')}
            />
            <SwitchSetting
              icon="cellular"
              title="Data Saver"
              subtitle="Reduce data usage"
              value={settings.dataSaver}
              onValueChange={(value) => updateSetting('dataSaver', value)}
            />
            <SettingItem
              icon="download"
              title="Auto-download"
              subtitle="When to download media"
              rightComponent={
                <View style={styles.settingValue}>
                  <Text style={styles.settingValueText}>
                    {settings.autoDownload.charAt(0).toUpperCase() + settings.autoDownload.slice(1)}
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </View>
              }
              onPress={() => {
                Alert.alert(
                  'Auto-download',
                  'Choose when to download media',
                  [
                    { text: 'Never', onPress: () => updateSetting('autoDownload', 'never') },
                    { text: 'Wi-Fi Only', onPress: () => updateSetting('autoDownload', 'wifi') },
                    { text: 'Always', onPress: () => updateSetting('autoDownload', 'always') },
                  ]
                );
              }}
            />
          </View>
        </View>

        {/* Support & About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & About</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="help-circle"
              title="Help & Support"
              subtitle="Get help with the app"
              rightComponent={<Ionicons name="chevron-forward" size={20} color="#C7C7CC" />}
              onPress={() => Alert.alert('Help', 'Help center would open here')}
            />
            <SettingItem
              icon="document-text"
              title="Terms of Service"
              rightComponent={<Ionicons name="chevron-forward" size={20} color="#C7C7CC" />}
              onPress={() => Alert.alert('Terms', 'Terms of service would open here')}
            />
            <SettingItem
              icon="lock-closed"
              title="Privacy Policy"
              rightComponent={<Ionicons name="chevron-forward" size={20} color="#C7C7CC" />}
              onPress={() => Alert.alert('Privacy Policy', 'Privacy policy would open here')}
            />
            <SettingItem
              icon="information-circle"
              title="About TALKI"
              subtitle="Version 1.0.0"
              rightComponent={<Ionicons name="chevron-forward" size={20} color="#C7C7CC" />}
              onPress={() => Alert.alert('About', 'TALKI v1.0.0\nWalkie-Talkie Social App')}
            />
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={22} color="#FF3B30" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>TALKI v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
    paddingHorizontal: 20,
    paddingVertical: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E5EA',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
    width: 24,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValueText: {
    fontSize: 16,
    color: '#8E8E93',
    marginRight: 4,
  },
  volumeContainer: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  volumeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007AFF',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  logoutText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FF3B30',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 14,
    color: '#8E8E93',
  },
});

export default SettingsScreen;