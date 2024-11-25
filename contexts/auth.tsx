import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '@/hooks/useStorageState';
import { router } from 'expo-router';
import HomeScreen from '../app/(tabs)/index';
const AuthContext = createContext<{
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  register: (email: string, password: string) => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: (email, password) => null,
  signOut: () => null,
  register: (email, password) => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  
  console.log(session);

  return (
    <AuthContext.Provider
      value={{
        signIn: (email: string, password: string) => {
          // TODO: 로그인 API 호출
          console.log(email, password);
          setSession(JSON.stringify({ email, password }));
          router.push('/(tabs)/explore');
        },
        signOut: () => {
          setSession(null);
          router.push('/(auth)');
        },
        register: (email: string, password: string) => {
          // TODO: 회원가입 API 호출
          console.log(email, password);
          setSession(JSON.stringify({ email, password }));
          router.push('/(tabs)/explore');
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
