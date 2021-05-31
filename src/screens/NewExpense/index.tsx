import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/Auth';
import { useProfile } from '../../hooks/Profile';

import { Container, Title, Categories, CategoryButton, CategoryButtonText } from './styles';
import getYupValidationErrors from '../../utils/getYupValidationErrors';
import api from '../../services/api';
import { maskDate, maskMoney } from '../../utils/masks';

interface FormErros {
  date: string;
  name: string;
  value: string;
}

interface Category {
  _id: string;
  name: string;
}

const NewExpense: React.FC = () => {
  const { user } = useAuth();
  const { categories } = useProfile();

  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState<Category>({} as Category);

  const [formErros, setFormErrors] = useState<FormErros>({} as FormErros);

  const handleAddNewExpense = useCallback(async () => {
    setFormErrors({} as FormErros)
    try {
      const schema = Yup.object().shape({
        date: Yup.string()
          .required('Date is required'),
        name: Yup.string()
          .required('Name is required'),
        value: Yup.string()
          .min(4, 'Invalid value')
          .required('Value is required'),
      });

      const data = {
        date,
        name,
        value
      }

      await schema.validate(data, {
        abortEarly: false,
      });

      const body = {
        date,
        item: name,
        value,
        additionalInfo: {
          category: category.name
        }
      }

      const response = await api.post('/expenses', body);

      console.log(response.data);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getYupValidationErrors(error);

        setFormErrors(errors as any)
      } else {
        console.log(error);
      }
    }
  }, [date, name, value, category]);

  useEffect(() => {
    setCategory(categories[0]);
  }, [categories])

  useEffect(() => {
    setCategory(categories[0]);
  }, [categories])

  return (
    <Container>
      <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
        <Title>New Expense</Title>

        <Input
          title="Date"
          placeholder="YYYY-MM-DD"
          error={formErros.date}
          value={date}
          onChangeText={(text) => setDate(maskDate(text))}
          keyboardType="numeric"
          maxLength={10}
        />

        <Input title="Name" placeholder="A energy bill" error={formErros.name} value={name} onChangeText={setName} />
        <Input
          title="Value"
          keyboardType="decimal-pad"
          placeholder="125,00"
          error={formErros.value}
          value={value}
          onChangeText={(text) => setValue(maskMoney(text))}
        />

      </View>

      <Categories horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
        {categories.map(item => (
          <CategoryButton active={category._id === item._id} activeOpacity={0.6} key={item._id.toString()} onPress={() => setCategory(item)}>
            <CategoryButtonText active={category._id === item._id}>{item.name}</CategoryButtonText>
          </CategoryButton>
        ))}
      </Categories>

      <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
        <Button onPress={handleAddNewExpense}>To Add</Button>
      </View>
    </Container>
  );
};

export default NewExpense;
