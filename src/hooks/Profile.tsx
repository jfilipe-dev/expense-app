import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Category {
  _id: string;
  name: string;
}

interface ProfileContextData {
  categories: Category[];
  addCategory(name: string): Promise<void>;
  removeCategory(id: string): Promise<void>;
}

const ProfileContext = createContext<ProfileContextData>({} as ProfileContextData);

export const Profileprovider: React.FC = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([] as Category[]);

  const addCategory = useCallback(async (name: string) => {
    const newCategory: Category = {
      _id: Date.now().valueOf().toString(),
      name
    }

    const newCategories = [newCategory, ...categories];

    console.log(newCategories)
    setCategories(newCategories);

    const jsonValue = JSON.stringify(newCategories)
    await AsyncStorage.setItem('@expenseApp:categories', jsonValue)
  }, [categories]);

  const removeCategory = useCallback(async (id: string) => {
    const newCategories = categories.filter(item => item._id !== id);

    console.log(newCategories)
    setCategories(newCategories);

    const jsonValue = JSON.stringify(newCategories)
    await AsyncStorage.setItem('@expenseApp:categories', jsonValue)
  }, [categories]);

  useEffect(() => {
    const getProfileProps = async () => {
      const jsonValueCategories = await AsyncStorage.getItem('@expenseApp:categories');

      if (jsonValueCategories) {
        const newCategories = JSON.parse(jsonValueCategories);
        setCategories(newCategories);
      }
    }

    getProfileProps();
  }, []);

  return (
    <ProfileContext.Provider
      value={{ categories, addCategory, removeCategory }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export function useProfile(): ProfileContextData {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfile must be used within as Profileprovider');
  }

  return context;
}
