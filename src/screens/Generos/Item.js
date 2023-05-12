import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

const Button = styled.TouchableHighlight`
  width: 100%;
  height: auto;
  background-color: ${COLORS.primary};
  padding: 30px;
  margin-top: 10px;
  border-radius: 20px;
`;

const TextNome = styled.Text`
  font-size: 24px;
  color: ${COLORS.black};
`;

const Item = ({item, onPress}) => {
  //console.log(item);
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
        <TextNome>{item.nome}</TextNome>
      </>
    </Button>
  );
};
export default Item;
