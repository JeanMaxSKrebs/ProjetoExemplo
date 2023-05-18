import React from 'react';
import {LivrosProvider} from '../context/LivrosProvider';
import {AuthUserProvider} from '../context/AuthUserProvider';
import Navigator from './Navigator';
import {ApiProvider} from '../context/ApiProvider';
import {EstanteProvider} from '../context/EstantesProvider';
import {GeneroProvider} from '../context/GenerosProvider';
import {ProfileProvider} from '../context/ProfileProvider';

export default function Providers() {
  return (
    <AuthUserProvider>
      <ApiProvider>
        <ProfileProvider>
          <EstanteProvider>
            <GeneroProvider>
              <LivrosProvider>
                <Navigator />
              </LivrosProvider>
            </GeneroProvider>
          </EstanteProvider>
        </ProfileProvider>
      </ApiProvider>
    </AuthUserProvider>
  );
}
