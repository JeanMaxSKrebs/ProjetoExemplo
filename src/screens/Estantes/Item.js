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

const TextGenero = styled.Text`
  font-size: 24px;
  color: ${COLORS.black};
`;

const TextQuantidade = styled.Text`
  font-size: 16px;
  text-align: justify;
  color: ${COLORS.black};
`;

const Item = ({item, onPress}) => {
  //console.log(item);
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
        <TextGenero>{item.genero}</TextGenero>
        <TextQuantidade>
          {item.quantidade} {item.quantidade > 1 ? 'livros' : 'livro'}
        </TextQuantidade>
      </>
    </Button>
  );
};
export default Item;
