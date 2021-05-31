import React, { useMemo } from 'react';
import { TouchableOpacityProps, View } from 'react-native';
import { format, parseISO, addDays } from 'date-fns';

import { Container, Info, Name, Date, Category, Value } from './styles';

interface ExpensesProps {
  _id: string,
  additionalInfo: { category: string },
  date: Date,
  item: string,
  value: number
}

interface HistoryItemProps extends TouchableOpacityProps {
  expense: ExpensesProps;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ expense, ...rest }) => {
  const date = useMemo(() => {
    return format(addDays(parseISO(expense.date.toString()), 1), "PP")
  }, [expense])

  return (
    <Container activeOpacity={0.6} {...rest}>
      <Info>
        <Name>{expense.item} - <Category>{expense.additionalInfo.category}</Category></Name>
        <Date>{date}</Date>
      </Info>
      <Value>$ {expense.value.toFixed(2)}</Value>
    </Container>
  );
}

export default HistoryItem;
