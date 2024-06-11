import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/constants/tokens';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/configs/firebaseConfig';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Loading from '@/components/Loading';
import { defaultStyles } from '@/styles';
import { useAuth } from '@/context/AuthContext';

const AccountScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fetching, setFetching] = useState(false)
  const [username, setUsername] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(false);
  const user = auth.currentUser;
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const { logout } = useAuth()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setFetching(true)
        if (!user?.uid) return;
        const userDocRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setFirstName(userData.firstName || '');
          setLastName(userData.lastName || '');
          setUsername(userData.username || '');
          setIsFirstTime(!userData.firstName);
          console.log('user first is: ' + userData.firstName)
        } else {
          console.error('User document does not exist');
        }
      } catch (error) {
        console.error('Error fetching user profile:', (error as Error).message);
      } finally {
        setFetching(false)
      }
    };
    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      setLoading(true)
      if (!user?.uid) return;
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        firstName,
        lastName,
        username,
      });
      setIsFirstTime(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', (error as Error).message);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false)
    }
  };

  const handleLogout = async () => {
    await logout()
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <MaterialCommunityIcons name="account-circle" size={64} color={colors.textMuted} />
          <Text style={styles.headerText}>Account</Text>
          <View style={styles.emailContainer}>
            <MaterialCommunityIcons name="pen-off" size={15} color={colors.primary} />
            <Text style={styles.emailText}>{user?.email}</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={24} color={colors.textMuted} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor={colors.textMuted}
            value={firstName}
            onChangeText={firstName => setFirstName(firstName)}
            editable={!fetching}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={24} color={colors.textMuted} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor={colors.textMuted}
            value={lastName}
            onChangeText={lastName => setLastName(lastName)}
            editable={!fetching}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="person-circle-outline" size={24} color={colors.textMuted} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={colors.textMuted}
            value={username}
            onChangeText={username => setUsername(username)}
            editable={!fetching}
          />
        </View>
        <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
            {
              loading ? (
                <View style={styles.loadingContainer}>
                  <Loading size={80} />
                </View>
              ) : (
                <TouchableOpacity onPress={handleUpdateProfile} onLayout={(event) => {
                    const {height} = event.nativeEvent.layout
                    console.log("DEBUG: Height-ka (Sign-up button) waxa weeyi: "+height)
                  }} activeOpacity={0.8} style={styles.button}>
                  <MaterialCommunityIcons name={ isFirstTime ? "account-plus" : "account-edit"} size={24} color={colors.primary} />
                  <Text style={styles.buttonText}>{isFirstTime ? 'Set Profile' : 'Update Profile'}</Text>
                </TouchableOpacity>
              )
            }
          </View>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={24} color={colors.primary} />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <View style={styles.fetchingLoadingContainer}>
            {
              fetching ? (
                <View style={{height: 50}}>
                  <Loading size={80} />
                </View>
              ) : (
                <View />
              )
            }
          </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerText: {
    color: colors.textMuted,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emailText: {
    color: colors.textMuted,
    fontSize: 16,
    marginLeft: 4
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
  fetchingLoadingContainer: { 
    position: 'absolute', 
    backgroundColor: 'transparent', 
    justifyContent: 'center', 
    flexDirection: 'row', 
    alignItems: 'center', 
    alignSelf: 'center' 
  },
  buttonText: {
    ...defaultStyles.text,
    color: colors.primary,
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  setProfileButton: {
    backgroundColor: colors.primary,
  },
  updateProfileButton: {
    backgroundColor: colors.primary,
  },
  logoutButton: {
    marginTop: 16,
    alignSelf: 'center',
  },
  logoutText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccountScreen;
