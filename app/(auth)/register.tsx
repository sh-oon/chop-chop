import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { router } from 'expo-router';
import { useSession } from '@/contexts/auth';
import styled, { css } from 'styled-components/native';

export default function RegisterScreen() {
  const [input, setInput] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<{ [key: string]: string }>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { signIn } = useSession();

  const nullCheck = (value: string) => {
    return value === '';
  };

  const validateNullCheck = () => {
    const obj: { [key: string]: string } = {};

    if (nullCheck(input.email)) {
      obj.email = '이메일을 입력해주세요.';
    }
    if (nullCheck(input.password)) {
      obj.password = '비밀번호를 입력해주세요.';
    }
    if (nullCheck(input.confirmPassword)) {
      obj.confirmPassword = '비밀번호를 입력해주세요.';
    }
    return obj;
  };

  const handleRegister = () => {
    const validateError = validateNullCheck();

    console.log(validateError);

    if (Object.keys(validateError).length > 0) {
      setError(validateError);
      return;
    }

    // 비밀번호 일치 확인
    if (input.password !== input.confirmPassword) {
      setError({
        ...error,
        confirmPassword: '비밀번호가 일치하지 않습니다.',
      });
      return;
    }
    // TODO: 회원가입 API 호출
    signIn(input.email, input.password);
  };

  const inputChangeHandler = (key: string, value: string) => {
    setInput({ ...input, [key]: value });
    setError({ ...error, [key]: '' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <ThemedText type="title" style={styles.title}>
          회원가입
        </ThemedText>

        <StyledFormContainer>
          <View>
            <StyledTextInput
              placeholder="이메일"
              value={input.email}
              onChangeText={(value: string) => inputChangeHandler('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              $isError={!!error.email}
            />
            {error.email && (
              <ThemedText type="small" lightColor="red">
                {error.email}
              </ThemedText>
            )}
          </View>

          <View>
            <StyledTextInput
              placeholder="비밀번호"
              value={input.password}
              onChangeText={(value: string) => inputChangeHandler('password', value)}
              secureTextEntry
              $isError={!!error.password}
            />
            {error.password && (
              <ThemedText type="small" lightColor="red">
                {error.password}
              </ThemedText>
            )}
          </View>

          <View>
            <StyledTextInput
              placeholder="비밀번호 확인"
              value={input.confirmPassword}
              onChangeText={(value: string) => inputChangeHandler('confirmPassword', value)}
              secureTextEntry
              $isError={!!error.confirmPassword}
            />
            {error.confirmPassword && (
              <ThemedText type="small" lightColor="red">
                {error.confirmPassword}
              </ThemedText>
            )}
          </View>
        </StyledFormContainer>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <ThemedText style={styles.buttonText}>가입하기</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} style={styles.linkButton}>
          <ThemedText style={styles.linkText}>이미 계정이 있으신가요? 로그인하기</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 15,
  },
  linkText: {
    textAlign: 'center',
    color: '#007AFF',
  },
});

const StyledFormContainer = styled.View`
  justify-content: center;
  gap: 16px;
`;

const StyledTextInput = styled.TextInput<{
  $isError: boolean;
}>`
  border-width: 1px;
  border-color: #ddd;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 4px;

  ${({ $isError }: { $isError: boolean }) =>
    $isError &&
    css`
      border-color: red;
    `}
`;
