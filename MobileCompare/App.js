import React, { useState } from 'react';
import {
  SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar,
} from 'react-native';
import { authenticate } from './logic';

// NOTE: on iOS a plain <View testID> is not exposed to XCUITest unless accessible,
// so screens are identified by a heading <Text testID> instead.

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    if (authenticate(email, password)) {
      setError('');
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <View style={s.screen}>
      <Text testID="login-screen" style={s.title}>Sign in</Text>
      <TextInput
        testID="email-input" style={s.input} placeholder="Email"
        autoCapitalize="none" autoCorrect={false} keyboardType="email-address"
        value={email} onChangeText={setEmail}
      />
      <TextInput
        testID="password-input" style={s.input} placeholder="Password"
        secureTextEntry autoCapitalize="none" value={password} onChangeText={setPassword}
      />
      {error ? <Text testID="error-message" style={s.error}>{error}</Text> : null}
      <TouchableOpacity testID="login-button" style={s.button} onPress={submit}>
        <Text style={s.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

function HomeScreen({ onLogout }) {
  const [count, setCount] = useState(0);
  return (
    <View style={s.screen}>
      <Text testID="welcome-text" style={s.title}>Welcome</Text>
      <View style={s.row}>
        <Text style={s.item}>Coffee beans</Text>
        <TouchableOpacity testID="add-to-cart-button" style={s.smallButton} onPress={() => setCount(count + 1)}>
          <Text style={s.buttonText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
      <Text style={s.item}>Cart: </Text>
      <Text testID="cart-badge" style={s.item}>{String(count)}</Text>
      <TouchableOpacity testID="logout-button" style={[s.button, s.secondary]} onPress={onLogout}>
        <Text style={s.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <SafeAreaView style={s.root}>
      <StatusBar barStyle="dark-content" />
      {loggedIn
        ? <HomeScreen onLogout={() => setLoggedIn(false)} />
        : <LoginScreen onLogin={() => setLoggedIn(true)} />}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  screen: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 24 },
  input: { borderWidth: 1, borderColor: '#bbb', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16 },
  button: { backgroundColor: '#2563eb', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  secondary: { backgroundColor: '#6b7280', marginTop: 24 },
  smallButton: { backgroundColor: '#2563eb', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: '600' },
  error: { color: '#dc2626', marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  item: { fontSize: 18 },
});
