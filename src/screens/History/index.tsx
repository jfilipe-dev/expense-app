import { parseISO } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, View, FlatList, Modal, ActivityIndicator } from 'react-native';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { colors } from '../../config/styles';

import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';
import getYupValidationErrors from '../../utils/getYupValidationErrors';
import { maskMoney } from '../../utils/masks';

import HistoryItem from './HistoryItem';

import {
  Container,
  Header,
  ImageProfile,
  ProfileName,
  Subtitle,
  Title,
  CenteredView,
  ModalCloseButton,
  ModalCloseButtonText,
  ModalView
} from './styles';

interface ExpensesProps {
  _id: string,
  additionalInfo: { category: string },
  date: string,
  item: string,
  value: number
}

interface FormErros {
  date: string;
  name: string;
  value: string;
}

const History: React.FC = () => {
  const { user } = useAuth();

  const [modalVisible, setModalVisible] = useState(false);
  const [expenseToUpdate, setExpenseToUpdate] = useState<ExpensesProps>({} as ExpensesProps);
  const [formErros, setFormErrors] = useState<FormErros>({} as FormErros);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const [expenses, setExpenses] = useState<ExpensesProps[]>([] as ExpensesProps[])
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [onEnd, setOnEnd] = useState(false);

  const loadExpenseHistory = useCallback(async (page = 1, refresh = false, onEndReached = false) => {
    setLoading(true);
    try {
      if (onEndReached && !refresh) return;

      const response = await api.get(`/expenses?page=${page}&perPage=20`);

      if (refresh) {
        console.log('asas')
        setExpenses(response.data);
        setCurrentPage(1);
        setOnEnd(false);
      } else {
        setExpenses((pastState) => [...pastState, ...response.data]);
      }

      if (response.data.length < 20) setOnEnd(true);

      setCurrentPage(page);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  }, [api]);

  const removeExpense = useCallback(async (id: string) => {
    const response = await api.delete(`expenses/${id}`);
    console.log(response.data);

    const newExpenses = expenses.filter(item => item._id !== id);

    setExpenses(newExpenses)
  }, [expenses]);

  useEffect(() => {
    loadExpenseHistory(1, true, onEnd);
  }, [loadExpenseHistory]);

  const selectExpenseToUpdate = useCallback((expense: ExpensesProps) => {
    setExpenseToUpdate(expense);
    setModalVisible(true);
  }, [])

  const handleUpdateExpense = useCallback(async () => {
    setFormErrors({} as FormErros);
    setLoadingUpdate(true);
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
        date: expenseToUpdate.date,
        name: expenseToUpdate.item,
        value: expenseToUpdate.value
      }

      await schema.validate(data, {
        abortEarly: false,
      });

      const body = {
        date: expenseToUpdate.date,
        item: expenseToUpdate.item,
        value: expenseToUpdate.value,
        additionalInfo: expenseToUpdate.additionalInfo
      }

      const response = await api.put(`/expenses/${expenseToUpdate._id}`, body);

      setModalVisible(false);
      loadExpenseHistory(1, true, onEnd);

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getYupValidationErrors(error);

        setFormErrors(errors as any)
      } else {
        console.log(error);
      }
    } finally {
      setLoadingUpdate(false);
    }
  }, [expenseToUpdate])

  return (
    <Container>
      {/* <Header >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ImageProfile source={{ uri: `https://api.hello-avatar.com/adorables/200/${user?.email}` }} />
          <ProfileName>Hello, joao</ProfileName>
        </View>
      </Header> */}

      <Modal animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)} visible={modalVisible}>
        <CenteredView>
          <ModalView>
            <Input
              title="Date"
              placeholder="YYYY-MM-DD"
              error={formErros.date}
              value={expenseToUpdate.date && expenseToUpdate.date.toString()}
              onChangeText={(text) => setExpenseToUpdate({...expenseToUpdate, date: text})}
              keyboardType="numeric"
              maxLength={10}
            />

            <Input
              title="Name"
              placeholder="A energy bill"
              error={formErros.name}
              value={expenseToUpdate.item || ''}
              onChangeText={(text) => setExpenseToUpdate({...expenseToUpdate, item: text})}
            />

            <Input
              title="Value"
              keyboardType="decimal-pad"
              placeholder="125,00"
              error={formErros.value}
              value={ expenseToUpdate.value && maskMoney(Number(expenseToUpdate.value).toFixed(2)) || ''}
              onChangeText={(text) => setExpenseToUpdate({...expenseToUpdate, value: maskMoney(text)})}
            />

            <Button onPress={handleUpdateExpense}>{loadingUpdate ? <ActivityIndicator size="small" color={colors.light} /> : 'Update expense'}</Button>
            <ModalCloseButton onPress={() => setModalVisible(false)}>
              <ModalCloseButtonText>Close X</ModalCloseButtonText>
            </ModalCloseButton>
          </ModalView>
        </CenteredView>
      </Modal>

      <FlatList
        onEndReached={() => loadExpenseHistory(currentPage + 1, false, onEnd)}
        onEndReachedThreshold={0.2}
        onRefresh={() => loadExpenseHistory(1, true, onEnd)}
        refreshing={loading}
        ListHeaderComponent={() => (
          <>
            <Title>Expense History</Title>
            <Subtitle>LongPress to remove an expense</Subtitle>
          </>
        )}
        contentContainerStyle={{ padding: 24 }}
        data={expenses}
        renderItem={({ item }) => {
          const renderItem: ExpensesProps = item as ExpensesProps;
          return (
            <HistoryItem
              expense={renderItem as any}
              onLongPress={() => removeExpense(item._id)}
              onPress={() => selectExpenseToUpdate(renderItem)}
            />
          )
        }}
        keyExtractor={(item) => {
          const renderItem: ExpensesProps = item as ExpensesProps;
          return renderItem._id.toString()
        }}
      />
    </Container>
  );
};

export default History;
