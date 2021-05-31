import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { colors } from '../../config/styles';

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 54px;
  background: ${colors.darkPrincipal};
  border-radius: 5px;
  margin-top: 8px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: ${colors.light};
  font-weight: bold;
  font-size: 18px;
`;
