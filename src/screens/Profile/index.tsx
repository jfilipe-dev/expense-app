import React, { useCallback, useState } from 'react';
import { Modal, View } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { useProfile } from '../../hooks/Profile';
import { useAuth } from '../../hooks/Auth';

import {
  Container,
  Title,
  NewCategoryButton,
  Categories,
  NewCategoryButtonText,
  CategoryButton,
  CategoryButtonText,
  CenteredView,
  ModalView,
  ModalCloseButton,
  ModalCloseButtonText,
  Subtitle,
  LogoutButton,
  LogoutButtonText
} from './styles';

const Profile: React.FC = () => {
  const { addCategory, categories, removeCategory } = useProfile();
  const { logOut } = useAuth();

  const [modalVisible, setModalVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddCategory = useCallback(async () => {
    if (newCategoryName) {
      await addCategory(newCategoryName);
      setModalVisible(false);
      setNewCategoryName('');
    }
  }, [newCategoryName])

  return (
    <Container>

      <Modal animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)} visible={modalVisible}>
        <CenteredView>
          <ModalView>
            <Input title="Category name" placeholder="Food" value={newCategoryName} onChangeText={setNewCategoryName} />
            <Button onPress={handleAddCategory}>Add category</Button>
            <ModalCloseButton onPress={() => setModalVisible(false)}>
              <ModalCloseButtonText>Close X</ModalCloseButtonText>
            </ModalCloseButton>
          </ModalView>
        </CenteredView>
      </Modal>

      <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
        <Title>My Categories</Title>
        {categories.length === 0 && <Subtitle>To add an expense, you need to add a category.</Subtitle>}
      </View>

      <Categories horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
        <NewCategoryButton activeOpacity={0.6} onPress={() => setModalVisible(true)}>
          <NewCategoryButtonText>New +</NewCategoryButtonText>
        </NewCategoryButton>

        {categories.map(item => (
          <CategoryButton activeOpacity={0.6} key={item._id.toString()} onLongPress={() => removeCategory(item._id)}>
            <CategoryButtonText>{item.name}</CategoryButtonText>
          </CategoryButton>
        ))}
      </Categories>

      <LogoutButton onPress={logOut}>
        <LogoutButtonText>LogOut</LogoutButtonText>
      </LogoutButton>
    </Container>
  );
};

export default Profile;
