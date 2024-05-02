import React from 'react';

const ActivePageContext = React.createContext({
  activePage: 'list',
  setActivePage: () => {},
});

export const ActivePageProvider = ({ children }) => {
  const [activePage, setActivePage] = React.useState('list');

  return (
    <ActivePageContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </ActivePageContext.Provider>
  );
};

export const useActivePage = () => React.useContext(ActivePageContext);
