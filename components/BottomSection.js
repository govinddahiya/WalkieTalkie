// components/BottomSection.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const BottomSection = () => {
  const [isRecording, setIsRecording] = useState(false);
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    setIsRecording(true);
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsRecording(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.bottomSection}>
      {/* Credit and Settings Row */}
      <View style={styles.creditSection}>
        <Text style={styles.creditText}>Cell Voice Message Credit</Text>
        <TouchableOpacity>
          <Text style={styles.settingsText}>Group Settings</Text>
        </TouchableOpacity>
      </View>
      
      {/* Push to Talk Button */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity 
          style={[
            styles.pushToTalkButton,
            isRecording && styles.pushToTalkButtonActive
          ]}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
        >
          <Text style={styles.pushToTalkText}>
            {isRecording ? 'Recording...' : 'Push to Talk'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSection: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    paddingBottom: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  creditSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  creditText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  settingsText: {
    color: '#4a90e2',
    fontSize: 14,
    fontWeight: '600',
  },
  pushToTalkButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 20,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  pushToTalkButtonActive: {
    backgroundColor: '#357abd',
  },
  pushToTalkText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default BottomSection;