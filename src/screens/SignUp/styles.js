import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

export const Body = styled.SafeAreaView`
  flex: 1;
  background-color: ${COLORS.primary};
  align-items: center;
  padding-top: 100px;
`;

export const TextInput = styled.TextInput`
  width: 70%;
  height: 50px;
  border-bottom-color: ${COLORS.black};
  border-bottom-width: 2px;
  font-size: 18px;
  color: ${COLORS.black};
  margin-bottom: 20px;
  text-align: center;
`;
