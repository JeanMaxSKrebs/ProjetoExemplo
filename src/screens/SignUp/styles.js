import styled from 'styled-components/native';
import { COLORS } from '../../assets/colors';

export const Body = styled.ScrollView`
    flex:1;
    background-color: ${COLORS.primary};
    padding-top: 20px;
`;

export const TextInput = styled.TextInput`
    width: 95%;
    height: 50px;
    border-bottom-color: ${COLORS.black};
    border-bottom-width: 2px;
    font-size: 18px;
    color: ${COLORS.black};
    margin-bottom: 20px;
    margin-left: 10px;
    `;