import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { colors } from '../../config/styles';

export const Container = styled.ScrollView`
  flex: 1;
`;

export const Title = styled.Text`
  margin-bottom: 6px;
  font-weight: bold;
  font-size: 20px;
  color: ${colors.darkPrincipal};
`;

export const Subtitle = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: ${colors.darkPrincipal};
`;

export const Categories = styled.ScrollView`
  flex-direction: row;
  margin-top: 24px;
`;

export const NewCategoryButton = styled.TouchableOpacity`
  border-radius: 5px;
  border-style: dashed;
  border-width: 2px;
  border-color: ${colors.gray2};
  padding: 12px;
`;

export const NewCategoryButtonText = styled.Text`
  color: ${colors.gray2};
  font-weight: bold;
`;

export const CategoryButton = styled.TouchableOpacity`
  margin-left: 12px;
  border-radius: 5px;
  border-width: 2px;
  border-color: ${colors.principal};
  padding: 12px;
`;

export const CategoryButtonText = styled.Text`
  color: ${colors.principal};
  font-weight: bold;
`;

export const CenteredView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ModalView = styled.View`
  width: ${Dimensions.get('window').width - 50}px;
  justify-content: center;
  margin: 20px;
  background-color: #FFF;
  border-radius: 10px;
  padding: 18px;
  align-items: center;
  elevation: 4;
`;

export const ModalCloseButton = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ModalCloseButtonText = styled.Text`
  font-weight: bold;
  color: ${colors.error}
`;

export const LogoutButton = styled.TouchableOpacity`
  border-radius: 5px;
  border-color: ${colors.error};
  border-width: 2px;
  padding: 12px;
  margin: 48px 24px;
`;

export const LogoutButtonText = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: ${colors.error};
  text-align: center;
`;
