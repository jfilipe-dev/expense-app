import React, { ReactNode } from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, ButtonText } from './styles';

interface Buttonpros extends TouchableOpacityProps {
  children: string | ReactNode;
}

const Button: React.FC<Buttonpros> = ({ children, ...rest }) => {
  return (
    <Container activeOpacity={0.6} {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};

export default Button;
