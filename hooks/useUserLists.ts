
import { useContext } from 'react';
import { UserListsContext } from '../context/UserListsContext';

export const useUserLists = () => {
  const context = useContext(UserListsContext);
  if (context === undefined) {
    throw new Error('useUserLists must be used within a UserListsProvider');
  }
  return context;
};
