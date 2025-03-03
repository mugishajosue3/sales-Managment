import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const OtpVerificationScreen = ({ navigation, route }) => {
  // Props that can be passed from previous screen
  const { phoneNumber = '983 3948 398', otpLength = 6, validTime = 2 } = route?.params || {};
  
  // State for OTP inputs and timer
  const [otp, setOtp] = useState(Array(otpLength).fill(''));
  const [timeLeft, setTimeLeft] = useState(validTime * 60); // Convert minutes to seconds
  
  // Refs for TextInputs to allow focus management
  const inputRefs = useRef([]);
  
  // Initialize refs array
  useEffect(() => {
    inputRefs.current = Array(otpLength)
      .fill(0)
      .map((_, i) => inputRefs.current[i] || React.createRef());
  }, [otpLength]);
  
  // Timer countdown effect
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timerId);
  }, [timeLeft]);
  
  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} minutes ${secs} seconds`;
  };
  
  // Handle input change for each digit
  const handleChange = (text, index) => {
    // Only allow digits
    if (!/^\d*$/.test(text)) return;
    
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    
    // Auto-focus to next input if current input is filled
    if (text && index < otpLength - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  
  // Handle backspace key press
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      // Focus previous input when backspace is pressed on an empty input
      inputRefs.current[index - 1].focus();
    }
  };
  
  // Go back to previous screen
  const handleGoBack = () => {
    navigation.goBack();
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Enter your Verification code</Text>
        <Text style={styles.subtitle}>
          Enter the OTP sent to your mobile number{'\n'}
          ({phoneNumber}) to proceed.
        </Text>
        
        <View style={styles.otpContainer}>
          {Array(otpLength).fill(0).map((_, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              value={otp[index]}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              ref={(ref) => (inputRefs.current[index] = ref)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>
        
        <Text style={styles.timerText}>
          The OTP is valid for the remaining time of {formatTime(timeLeft)}.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: '300',
    color: '#000000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 22,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    marginHorizontal: 5,
    textAlign: 'center',
    fontSize: 20,
  },
  timerText: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
  },
});

export default OtpVerificationScreen;