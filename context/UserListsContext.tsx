
import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { UserLists, ListType } from '../types';

const defaultUserLists: UserLists = {
  favorites: [],
  played: [],
  discarded: [],
};

interface UserListsContextType {
  userLists: UserLists;
  addToList: (appId: number, list: ListType) => void;
  removeFromList: (appId: number, list: ListType) => void;
  isInList: (appId: number, list: ListType) => boolean;
  isGameInAnyList: (appId: number) => ListType | null;
}

export const UserListsContext = createContext<UserListsContextType | undefined>(undefined);

export const UserListsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userLists, setUserLists] = useState<UserLists>(() => {
    try {
      const savedLists = localStorage.getItem('userGameLists');
      return savedLists ? JSON.parse(savedLists) : defaultUserLists;
    } catch (error) {
      console.error("Could not load user lists from localStorage", error);
      return defaultUserLists;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('userGameLists', JSON.stringify(userLists));
    } catch (error) {
      console.error("Could not save user lists to localStorage", error);
    }
  }, [userLists]);

  const addToList = useCallback((appId: number, list: ListType) => {
    setUserLists(prevLists => {
      // Remove from other lists first
      const newLists: UserLists = {
        favorites: prevLists.favorites.filter(id => id !== appId),
        played: prevLists.played.filter(id => id !== appId),
        discarded: prevLists.discarded.filter(id => id !== appId),
      };
      // Add to the new list if it's not already there
      if (!newLists[list].includes(appId)) {
        newLists[list] = [...newLists[list], appId];
      }
      return newLists;
    });
  }, []);

  const removeFromList = useCallback((appId: number, list: ListType) => {
    setUserLists(prevLists => ({
      ...prevLists,
      [list]: prevLists[list].filter(id => id !== appId),
    }));
  }, []);
  
  const isInList = useCallback((appId: number, list: ListType) => {
    return userLists[list].includes(appId);
  }, [userLists]);
  
  const isGameInAnyList = useCallback((appId: number) => {
      if (userLists.favorites.includes(appId)) return 'favorites';
      if (userLists.played.includes(appId)) return 'played';
      if (userLists.discarded.includes(appId)) return 'discarded';
      return null;
  }, [userLists]);

  const value = { userLists, addToList, removeFromList, isInList, isGameInAnyList };

  return (
    <UserListsContext.Provider value={value}>
      {children}
    </UserListsContext.Provider>
  );
};
