import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../assets/colors';

const ButtonSearch = styled.TouchableHighlight`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const Image = styled.Image`
  width: 45px;
  height: 50px;
`;

const BuscaButton = props => {
  console.log("props");
  console.log(props);
  return (
    <ButtonSearch onPress={props.onClick()} underlayColor="transparent">
      <Image
        source={require('../assets/images/logo.png')}
        acessibilityLabel="botão pesquisar"
      />
    </ButtonSearch>
  );
};

export default BuscaButton;
