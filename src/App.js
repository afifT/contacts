import './App.css';
import Contact from './Contact';
import ContactDialog from './ContactDialog';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Button, Dialog } from '@mui/material';

function App() {
  const [openDialog, setOpenDialog] = useState(false);
  const [contact, setContact] = useState(undefined);

  const [contacts, setContacts] = useState([]);
  return (
    <Box minHeight="100vh">
      <Typography variant="h1" padding="20px">
        Contact App
      </Typography>
      <Button
        sx={{ margin: '24px' }}
        variant="contained"
        onClick={() => {
          setContact(undefined);
          setOpenDialog(true);
        }}
      >
        Add contact
      </Button>

      <Box display="flex" flexDirection="column" alignItems="center" gap="20px">
        {contacts.map((c, index) => {
          return (
            <Contact
              key={index}
              contact={c}
              onClick={(contact) => {
                setContact(contact);
                setOpenDialog(true);
              }}
            />
          );
        })}
      </Box>
      <ContactDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        contact={contact}
        onSave={(contact) => {
          setContacts((prevContacts) => {
            if (prevContacts.some((c) => c.id === contact.id)) {
              return prevContacts.map((c) => {
                if (c.id === contact.id) {
                  return contact;
                }
                return c;
              });
            }

            return [...prevContacts, contact];
          });
        }}
        onDelete={(id) => {
          setContacts((prevContacts) => {
            return prevContacts.filter((c) => {
              if (c.id === id) {
                return false;
              }
              return true;
            });
          });
        }}
      />
    </Box>
  );
}

export default App;
