import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/core';

import { useAuth } from '../../hooks/Auth';

import Button from '../../components/Button';
import Input from '../../components/Input';
import getYupValidationErrors from '../../utils/getYupValidationErrors';

import { Container, WelcomeText, AppName } from './styles';
import { colors } from '../../config/styles';

const Auth: React.FC = () => {
  const navigation = useNavigation();
  const { start } = useAuth();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleStart = useCallback(async () => {
    setLoading(true);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
      });

      const data = {
        email
      }

      await schema.validate(data, {
        abortEarly: false,
      });

      await start(email);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getYupValidationErrors(error);

        setEmailError(errors.email)
      } else {
        Alert.alert('Erro', 'Try again later.')
      }
    } finally {
      setLoading(false);
    }
  }, [email]);

  return (
    <Container>
      <WelcomeText>Welcome to</WelcomeText>
      <AppName>Expense App</AppName>
      <Input placeholder="E-mail" value={email} onChangeText={setEmail} autoCapitalize="none" error={emailError} />
      <Button onPress={handleStart}>{loading ? <ActivityIndicator size="small" color={colors.light} /> : 'Start'}</Button>
    </Container>
  );
};

export default Auth;

