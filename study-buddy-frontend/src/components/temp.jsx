import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

const MyList = () => {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  const handleRemoveItem = (index) => {
    // Create a copy of the items array
    const updatedItems = [...items];
    // Remove the item at the specified index
    updatedItems.splice(index, 1);
    // Update the state with the new array without the removed item
    setItems(updatedItems);
  };

  return (
    <div>
      <List>
        {items.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item} />
            <Button onClick={() => handleRemoveItem(index)}>Remove</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MyList;
