import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: Platform.select({
          ios: 'slide_from_right',
          android: 'slide_from_right',
        }),
        gestureEnabled: Platform.OS === 'ios',
        gestureDirection: 'horizontal',
        animationDuration: 200,
        presentation: 'card',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          animation: Platform.select({
            ios: 'slide_from_left',
            android: 'slide_from_left',
          }),
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          animation: Platform.select({
            ios: 'slide_from_right',
            android: 'slide_from_right',
          }),
        }}
      />
    </Stack>
  );
}
