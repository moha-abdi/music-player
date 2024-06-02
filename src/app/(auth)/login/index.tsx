import { useRouter, Link } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View, Pressable } from 'react-native';
import { defaultStyles } from '@/styles';
import { colors, screenPadding } from '@/constants/tokens';
import { useAuth } from '@/context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleLogin = () => {
    // Perform login logic here
    // If successful, navigate to the appropriate screen
    console.log("Local auth: " + isAuthenticated);
    console.log("Successful");
    setIsAuthenticated(true);
    router.replace('/(tabs)');
  };

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.loginContainer}>
          <Text style={[defaultStyles.text, styles.headerText]}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.textMuted}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={colors.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity onPress={handleLogin} activeOpacity={0.8} style={styles.button}>
            <MaterialCommunityIcons name="login" size={24} color={colors.primary} />
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <Pressable onPress={() => {router.push("/signup")}}> 
              <Text style={styles.signUpLink}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  headerText: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    ...defaultStyles.text,
    width: '100%',
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 8,
  },
  button: {
    padding: 12,
    backgroundColor: 'rgba(47, 47, 47, 0.5)',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 8,
    marginTop: 16,
    width: '100%',
  },
  buttonText: {
    ...defaultStyles.text,
    color: colors.primary,
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
  signUpText: {
    ...defaultStyles.text,
    marginTop: 16,
    fontSize: 14,
    color: colors.textMuted,
  },
  signUpLink: {
    ...defaultStyles.text,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 16,
    fontSize: 14
  },
});

export default LoginScreen;
