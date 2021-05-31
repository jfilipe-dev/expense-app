import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { colors } from '../../config/styles';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  background-color: ${colors.principal};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const ImageProfile = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const ProfileName = styled.Text`
  margin-left: 12px;
  font-weight: bold;
  font-size: 22px;
  color: ${colors.light};
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: ${colors.darkPrincipal};
`;

export const Subtitle = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: ${colors.darkPrincipal};
  margin-bottom: 18px;
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
