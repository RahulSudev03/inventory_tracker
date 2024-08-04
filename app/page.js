// app/page.js
"use client"; // Ensure this file is treated as a client component

import { useState, useEffect } from 'react';
import { Box, Modal, Typography, Stack, TextField, Button, Card, CardContent, CardActions } from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import theme from './theme'; // Adjusted relative import path
import { firestore } from '@/firebase';
import { collection, getDocs, query, getDoc, setDoc, doc, deleteDoc } from 'firebase/firestore';

function Home() {
  const theme = useTheme();
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }

    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }

    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
      padding={2}
      bgcolor={theme.palette.background.default}
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width={400}
          bgcolor="white"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <Typography variant="h6" style={{ fontFamily: theme.typography.fontFamily }}>Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant='outlined'
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
              style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button
        variant="contained"
        onClick={handleOpen}
        style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}
      >
        Add New Item
      </Button>
      <TextField
        variant='outlined'
        placeholder="Search items"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ width: '50%', marginBottom: 2 }}
      />
      <Box border="1px solid #333" width="80%">
        <Box
          width="100%"
          height="100px"
          bgcolor={theme.palette.primary.light}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant='h2' color={theme.palette.primary.contrastText} style={{ fontFamily: theme.typography.fontFamily }}>
            Inventory Items
          </Typography>
        </Box>
        <Box
          width="100%"
          maxHeight="300px" // Set a max height to enable scrolling
          overflow="auto"
          padding={2}
        >
          <Stack spacing={2}>
            {
              filteredInventory.map(({ name, quantity }) => (
                <Card key={name} variant="outlined">
                  <CardContent>
                    <Typography variant='h5' color={theme.palette.primary.dark} style={{ fontFamily: theme.typography.fontFamily }}>
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </Typography>
                    <Typography variant='body1' color={theme.palette.primary.dark} style={{ fontFamily: theme.typography.fontFamily }}>
                      Quantity: {quantity}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}
                      onClick={() => addItem(name)}
                    >
                      Add
                    </Button>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.contrastText }}
                      onClick={() => removeItem(name)}
                    >
                      Remove
                    </Button>
                  </CardActions>
                </Card>
              ))
            }
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}




