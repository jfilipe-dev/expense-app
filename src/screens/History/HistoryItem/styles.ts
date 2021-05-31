import styled from 'styled-components/native';
import { colors } from '../../../config/styles';

export const Container = styled.TouchableOpacity`
  padding: 12px;
  background-color: ${colors.gray1};
  border-radius: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0;
`;

export const Info = styled.View``;

export const Name = styled.Text`
  font-size: 16px;
  color: ${colors.darkPrincipal};
`;

export const Category = styled.Text`
  font-size: 14px;
  color: ${colors.error};
  text-transform: uppercase;
  font-weight: bold;
`;

export const Date = styled.Text`
  font-size: 14px;
  color: ${colors.principal};
  font-weight: bold;
  margin-top: 4px;
`;

export const Value = styled.Text`
  font-size: 20px;
  color: ${colors.principal};
  font-weight: bold;
`;
