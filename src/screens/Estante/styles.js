import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  padding-top: 20px;
  background-color:  ${COLORS.gray};
  width: 100%;
`;

export const TextInput = styled.TextInput`
  color: black;
  width: 95%;
  height: 50px;
  border-bottom-color: ${COLORS.primary};
  border-bottom-width: 2px;
  font-size: 16px;
  padding-left: 2px;
  padding-bottom: 1px;
  margin-bottom: 10px;
`;

export const FlatList = styled.FlatList`
  /* background-color:  ${COLORS.red}; */
  width: 70%;

`;
