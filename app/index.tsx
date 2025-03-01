import React, { useState } from "react";
import Svg, { Path } from "react-native-svg";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import Flag from "../assets/images/flag.svg";

export default function Index() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const appendNumber = (num: string) => {
    if (phoneNumber.length < 10) {
      setPhoneNumber(phoneNumber + num);
    }
  };

  const deleteNumber = () => {
    setPhoneNumber(phoneNumber.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Enter your Mobile Number</Text>
        <Text style={styles.subheading}>
          Enter your mobile number to start using Sales Management App.
        </Text>

        {/* Phone Number Input */}

        <View style={styles.inputContainer}>
          <View style={styles.countryCode}>
            {/* <Flag width={24} height={16} style={styles.flag} /> */}
            <Text style={styles.countryCodeText}>+250</Text>
            <Text style={styles.downArrow}>▼</Text>
          </View>
          <Text style={styles.phoneInput}>
            {phoneNumber &&
              phoneNumber.replace(/(.{3})(.{3})(.{3})/, "$1-$2-$3")}
          </Text>
        </View>

        {/* Keypad */}
        <View style={styles.keypad}>
          <View style={styles.keypadRow}>
            <TouchableOpacity
              style={styles.keypadButton}
              onPress={() => appendNumber("1")}
            >
              <Text style={styles.keypadButtonText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadButton}
              onPress={() => appendNumber("2")}
            >
              <Text style={styles.keypadButtonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadButton}
              onPress={() => appendNumber("3")}
            >
              <Text style={styles.keypadButtonText}>3</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.keypadRow}>
            <TouchableOpacity
              style={styles.keypadButton}
              onPress={() => appendNumber("4")}
            >
              <Text style={styles.keypadButtonText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadButton}
              onPress={() => appendNumber("5")}
            >
              <Text style={styles.keypadButtonText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadButton}
              onPress={() => appendNumber("6")}
            >
              <Text style={styles.keypadButtonText}>6</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.keypadRow}>
            <TouchableOpacity
              style={styles.keypadButton}
              onPress={() => appendNumber("7")}
            >
              <Text style={styles.keypadButtonText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadButton}
              onPress={() => appendNumber("8")}
            >
              <Text style={styles.keypadButtonText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadButton}
              onPress={() => appendNumber("9")}
            >
              <Text style={styles.keypadButtonText}>9</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.keypadRow}>
            <View style={styles.keypadButton}>
              <Text style={styles.keypadButtonText}></Text>
            </View>
            <TouchableOpacity
              style={styles.keypadButton}
              onPress={() => appendNumber("0")}
            >
              <Text style={styles.keypadButtonText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadButton}
              onPress={deleteNumber}
            >
              <Text style={styles.keypadButtonText}>⌫</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={
            phoneNumber.length >= 9
              ? styles.continueButtonActive
              : styles.continueButton
          }
        >
          <Text style={styles.continueButtonText}>Continue</Text>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>

        {/* Terms */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By giving your information, you agree to our{" "}
            <Text style={styles.termsLink}>Terms & Conditions</Text> and{" "}
            <Text style={styles.termsLink}>Privacy Policy</Text>.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  flag: {
    width: 24,
    height: 16,
    marginRight: 8,
  },
  countryCodeText: {
    fontSize: 16,
    marginRight: 5,
  },
  downArrow: {
    fontSize: 10,
    color: "#666",
  },
  phoneInput: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
  },
  otpPrefix: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  otpIcon: {
    marginRight: 8,
  },
  otpText: {
    fontSize: 16,
    marginRight: 5,
  },
  otpInput: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
  },
  keypad: {
    marginTop: 0,
    marginBottom: 0,
  },
  keypadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  keypadButton: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  keypadButtonText: {
    fontSize: 24,
    fontWeight: "500",
  },
  continueButton: {
    flexDirection: "row",
    backgroundColor: "#cccccc",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  continueButtonActive: {
    flexDirection: "row",
    backgroundColor: "blue",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  continueButtonTextActive: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  arrowIcon: {
    color: "white",
    fontSize: 16,
  },
  termsContainer: {
    alignItems: "center",
  },
  termsText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  termsLink: {
    color: "#00BBD4",
  },
});
