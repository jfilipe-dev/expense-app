import styled from 'styled-components/native';
import { colors } from '../../config/styles';

interface InputProps {
  error: boolean;
}

export const Container = styled.View`
  width: 100%;
  margin-bottom: 24px;
`;

export const Content = styled.View<InputProps>`
  height: 54px;
  width: 100%;
  padding: 0 8px;
  justify-content: center;
  border-radius: 5px;
  background-color: ${colors.light};
  border-color: ${(props) => props.error ? colors.error : colors.gray1};
  border-width: 2px;
`;

export const TextInput = styled.TextInput`
  color: ${colors.darkPrincipal};
`;

export const Title = styled.Text`
  margin-bottom: 4px;
  color: ${colors.principal};
  font-weight: bold;
  font-size: 14px;
`;

export const Error = styled.Text`
  margin-top: 2px;
  color: ${colors.error};
  font-weight: bold;
  font-size: 10px;
`;
