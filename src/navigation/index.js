import React from 'react';
import {LivrosProvider} from '../context/LivrosProvider';
import {AuthUserProvider} from '../context/AuthUserProvider';
import Navigator from './Navigator';
import {ApiProvider} from '../context/ApiProvider';
import {EstanteProvider} from '../context/EstantesProvider';
import {GeneroProvider} from '../context/GenerosProvider';
import Estantes from '../screens/Estantes';

export default function Providers() {
  return (
    <AuthUserProvider>
      <ApiProvider>
        <EstanteProvider>
          <GeneroProvider>
            <LivrosProvider>
              <Navigator />
            </LivrosProvider>
            </GeneroProvider>
        </EstanteProvider>
      </ApiProvider>
    </AuthUserProvider>
  );
}
