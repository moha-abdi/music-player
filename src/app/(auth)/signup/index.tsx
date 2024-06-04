// /app/(auth)/signup.tsx
import { useRouter, Link } from 'expo-router';
import { LegacyRef, useRef, useState } from 'react';
import { StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { defaultStyles } from '@/styles';
import { colors, screenPadding } from '@/constants/tokens';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Loading from '@/components/Loading';
import { useAuth } from '@/context/AuthContext';

const SignUpScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const {register} = useAuth()

  const handleSignUp = async () => {
    if(!email || !username || !password) {
      Alert.alert('Sign Up', 'Please fill all the fields!')
      return
    }
    setLoading(true)
    let response = await register(email, username, password)
    setLoading(false)

    if (!response.success){
      Alert.alert("Sign Up", response.message)
      return
    }
    console.log("Sign-up successful");
    // no need to do the route.dismiss() anymore as we handled it in AuthContext :)
    // router.dismiss();
  };

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.signUpContainer}>
          <Text style={styles.headerText}>Create Account</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={22} color={colors.textMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={email => setEmail(email)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="person-circle-outline" size={22} color={colors.textMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor={colors.textMuted}
              value={username}
              onChangeText={username => setUsername(username)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={22} color={colors.textMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={colors.textMuted}
              value={password}
              onChangeText={password => setPassword(password)}
              secureTextEntry
            />
          </View>
          <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
            {
              loading ? (
                <View style={styles.loadingContainer}>
                  <Loading size={80} />
                </View>
              ) : (
                <TouchableOpacity onPress={handleSignUp} onLayout={(event) => {
                    const {height} = event.nativeEvent.layout
                    console.log("DEBUG: Height-ka (Sign-up button) waxa weeyi: "+height)
                  }} activeOpacity={0.8} style={styles.button}>
                  <MaterialCommunityIcons name="account-plus" size={24} color={colors.primary} />
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
              )
            }
          </View> 
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
    color: colors.textMuted,
    fontSize: 20,
    fontFamily: 'Lato',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    ...defaultStyles.text,
    flex: 1,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 0.8,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 8,
    width: '100%',
  },
  inputIcon: {
    marginRight: 8,
  },
  button: {
    height: 50,
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
  loadingContainer: {
    height: 50,
    backgroundColor: 'rgba(47, 47, 47, 0.5)',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 3,
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
