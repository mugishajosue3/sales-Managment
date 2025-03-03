import React, { useEffect, useState } from "react";
import Svg, { Path } from "react-native-svg";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  TextInput,FlatList, SafeAreaView,Modal,
} from "react-native";
import { useRouter } from "expo-router"; // Import router for navigation
import Flag from "../assets/images/flag.svg";
import countryCodes from "@/app/(tabs)/countryCodes";

export default function Index() {
  const router = useRouter(); // Initialize the router
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+250",
    name: "Rwanda",
    // flag: 'rw' // If you're using a flag library
  });
  const [isDisabled, setIsDisabled] = useState(true);

  const renderCountryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => {
        setSelectedCountry(item);
        setModalVisible(false);
      }}
    >
      {/* {item.flag && <Flag code={item.flag} width={24} height={16} style={styles.itemFlag} />} */}
      <Text style={styles.countryName}>{item.name}</Text>
      <Text style={styles.countryCode}>{item.code}</Text>
    </TouchableOpacity>
  );

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

  useEffect(() => {
    // Enable the button when phone number is valid
    setIsDisabled(phoneNumber.length < 11);
  }, [phoneNumber]);

  // Updated handler to navigate to OTP screen
  const handleContinue = () => {
    // Navigate to the OTP screen and pass the phone number as parameter
    router.push({
      pathname: "/otp",
      params: { 
        phoneNumber: selectedCountry.code + " " + phoneNumber 
      }
    });
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
          <TouchableOpacity
            style={styles.countryCode}
            onPress={() => setModalVisible(true)}
          >
            {/* <Flag width={24} height={16} style={styles.flag} /> */}
            <Text style={styles.countryCodeText}>{selectedCountry.code}</Text>
            <Text style={styles.downArrow}>▼</Text>
          </TouchableOpacity>

          {/* Country code selection modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <SafeAreaView style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Country</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={countryCodes}
                renderItem={renderCountryItem}
                keyExtractor={item => item.code}
                style={styles.countryList}
              />
            </SafeAreaView>
          </Modal>

          <TextInput
            style={styles.phoneInput}
            value={phoneNumber}
            onChangeText={(text) => {
              if (text.length < phoneNumber.length) {
                // Simple deletion without reformatting
                setPhoneNumber(text);
                return;
              }
              // Remove non-numeric characters
              const cleaned = text.replace(/\D/g, "");
              // Limit to 10 digits (adjust as needed)
              const trimmed = cleaned.substring(0, 10);

              // Format phone number with hyphens if there's enough digits
              let formatted = trimmed;
              if (trimmed.length >= 6) {
                formatted = trimmed.replace(/(.{3})(.{3})(.*)/, "$1-$2-$3");
              }

              // Update your state (assuming you have a setter function)
              setPhoneNumber(formatted);
            }}
            keyboardType="phone-pad"
            placeholder="798-434-426"
          />
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={
            phoneNumber.length >= 11
              ? styles.continueButtonActive
              : styles.continueButton
          }
          disabled={isDisabled}
          onPress={handleContinue}
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
  // New styles for the modal
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 50, // Adjust as needed
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 18,
    fontWeight: "bold",
  },
  countryList: {
    flex: 1,
  },
  countryItem: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  countryName: {
    flex: 1,
    marginLeft: 10,
  },
  itemFlag: {
    marginRight: 10,
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