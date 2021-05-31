import styled from 'styled-components/native';
import { colors } from '../../config/styles';

interface CategoryProps {
  active: boolean;
}

export const Container = styled.ScrollView`
  flex: 1;
`;

export const Title = styled.Text`
  margin-bottom: 18px;
  font-weight: bold;
  font-size: 20px;
  color: ${colors.darkPrincipal};
`;

export const Categories = styled.ScrollView`
  flex-direction: row;
`;

export const CategoryButton = styled.TouchableOpacity<CategoryProps>`
  margin-right: 12px;
  border-radius: 5px;
  border-width: 2px;
  border-color: ${colors.principal};
  background-color: ${(props) => props.active ? colors.principal : colors.light};
  padding: 12px;
`;

export const CategoryButtonText = styled.Text<CategoryProps>`
  color: ${(props) => props.active ? colors.light : colors.principal};
  font-weight: bold;
`;
