import { useRouter, Link } from 'expo-router';
import { LegacyRef, RefObject, useRef, useState } from 'react';
import { StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View, Pressable, Alert } from 'react-native';
import { defaultStyles } from '@/styles';
import { colors, screenPadding } from '@/constants/tokens';
import { useAuth } from '@/context/AuthContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Loading from '@/components/Loading';

const LoginScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    if(!email || !password) {
      Alert.alert('Login', 'Please fill all the fields!')
      return
    }
    setLoading(true)
    let response = await login(email, password)
    setLoading(false)

    if (!response.success){
      Alert.alert("Login", response.message)
      return
    }
    console.log("Login successful");
  };

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.loginContainer}>
          <Text style={styles.headerText}>Login</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={22} color={colors.textMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={22} color={colors.textMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={colors.textMuted}
              value={password}
              onChangeText={setPassword}
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
                <TouchableOpacity onPress={handleLogin} activeOpacity={0.8} style={styles.button}>
                  <MaterialCommunityIcons name="login" size={24} color={colors.primary} />
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                )
            }
          </View>
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
  inputIcon: {
    marginRight: 8,
  },
});

export default LoginScreen;
