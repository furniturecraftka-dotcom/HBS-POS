
import { useContext } from 'react';
import { PosContext } from './PosProvider';

export const usePos = () => {
  const context = useContext(PosContext);
  if (context === undefined) {
    throw new Error('usePos must be used within a PosProvider');
  }
  return context;
};
