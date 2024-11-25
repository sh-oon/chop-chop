import { useState } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<null | any>(null);

  const getUser = async () => {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  };

  const isAuth = () => {
    console.log(user);
    return user !== null;
  }

  const login = async (email: string, password: string) => {
    // TODO: 로그인 API 호출
    // async storage에 유저 정보 저장
    await AsyncStorage.setItem('user', JSON.stringify(user));
    setUser(user);

    
    router.push('/(tabs)/explore');
  };

  const register = async (email: string, password: string) => {
    // TODO: 회원가입 API 호출
  };

  const logout = async () => {
    // TODO: 로그아웃 API 호출
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  return {
    user,
    getUser,
    isAuth,
    login,
    register,
    logout,
  };
};