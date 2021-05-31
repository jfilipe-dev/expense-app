import styled from 'styled-components/native';
import { colors } from '../../config/styles';

export const Container = styled.View`
  background-color: ${colors.principal};
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const WelcomeText = styled.Text`
  color: ${colors.light};
  font-size: 24px;
`;

export const AppName = styled.Text`
  color: ${colors.light};
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 24px;
`;

