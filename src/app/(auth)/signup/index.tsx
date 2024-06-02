// /app/(auth)/signup.tsx
import { useRouter, Link } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { defaultStyles } from '@/styles';
import { colors, screenPadding } from '@/constants/tokens';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SignUpScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignUp = () => {
    // Perform sign-up logic here
    // If successful, navigate to the appropriate screen
    console.log("Sign-up successful");
    // You can handle sign-up logic and navigation here
    // For example, navigate to the login screen after successful sign-up
    router.replace('/login');
  };

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.signUpContainer}>
          <Text style={[defaultStyles.text, styles.headerText]}>Sign Up</Text>
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
            placeholder="Username"
            placeholderTextColor={colors.textMuted}
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={colors.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity onPress={handleSignUp} activeOpacity={0.8} style={styles.button}>
            <MaterialCommunityIcons name="account-plus" size={24} color={colors.primary} />
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginLinkText}>Already have an account?</Text>
            <Link href="/login" style={styles.loginLink}>Login</Link>
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
  signUpContainer: {
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
  loginLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  loginLinkText: {
    ...defaultStyles.text,
    fontSize: 14,
    color: colors.textMuted,
  },
  loginLink: {
    ...defaultStyles.text,
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default SignUpScreen;
