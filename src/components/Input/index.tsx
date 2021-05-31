import React from 'react';
import { TextInputProps, View } from 'react-native';
import { colors } from '../../config/styles';

import { Container, Content, TextInput, Title, Error } from './styles';

interface InputProps extends TextInputProps {
  title?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ title, error, ...rest }) => {
  return (
    <>
      <Container>
        {!!title && <Title>{title}</Title>}
        <Content error={!!error}>
          <TextInput {...rest} placeholderTextColor={colors.gray2} />
        </Content>
        {!!error && <Error>{error}</Error>}
      </Container>
    </>
  );
}

export default Input;
