import './App.css';
import Contact from './Contact';
import ContactDialog from './ContactDialog';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Button, Dialog, TextField } from '@mui/material';

function App() {
  const [openDialog, setOpenDialog] = useState(false);
  const [contact, setContact] = useState(undefined);

  const [contacts, setContacts] = useState([]);

  const [searchValue, setSearchValue] = useState('');

  const [random, setRandom] = useState(undefined);
  useEffect(() => {
    if (contacts?.length > 0) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  useEffect(() => {
    const cc = localStorage.getItem('contacts');

    if (cc) {
      setContacts(JSON.parse(cc));
    }

    if (cc) {
      const parsedContacts = JSON.parse(cc);

      if (parsedContacts.length >= 10) {
        setRandom({
          low: Math.floor(Math.random() * parsedContacts.length),
          high: Math.floor(Math.random() * parsedContacts.length),
        });
      }
    }
  }, [setContacts]);

  const downloadTxtFile = () => {
    const element = document.createElement('a');

    let res = 'First Name, Last Name, Email, Phone, Sex';
    for (const c of contacts) {
      res = res + '\n';
      res = res + `${c.firstName},${c.lastName},${c.email},${c.phone},${c.sex}`;
    }

    const file = new Blob([res], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = 'export.csv';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const getContacts = () => {
    return (contacts ?? [])
      .map((c, index) => {
        if (random && index === random.low) {
          return contacts[random.high];
        }
        if (random && index === random.high) {
          return contacts[random.low];
        }
        return c;
      })
      .filter((c, index) => {
        if (index === 6) {
          return false;
        }
        const search = searchValue.toLocaleLowerCase();
        if (search === '') {
          return true;
        }
        if (c.firstName.toLocaleLowerCase().includes(search)) {
          return true;
        }
        if (c.lastName.toLocaleLowerCase().includes(search)) {
          return true;
        }
        if (c.email.toLocaleLowerCase().includes(search)) {
          return true;
        }
        return false;
      });
  };
  return (
    <Box minHeight="100vh" backgroundColor="#E1D89F">
      <Box
        display="flex"
        alignItems="center"
        justifyContent={'space-between'}
        paddingRight="20px"
      >
        <Typography variant="h1" padding="20px" color="#27474E">
          Contact App
        </Typography>
        <TextField
          // inputProps={{ className: classes.input }}
          value={searchValue}
          sx={{ backgroundColor: 'white' }}
          placeholder="Search"
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
        />
      </Box>

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

      <Button
        sx={{ margin: '24px' }}
        variant="contained"
        onClick={downloadTxtFile}
      >
        Export
      </Button>
      <div id="myInput"></div>
      <Box display="flex" flexDirection="column" alignItems="center" gap="20px">
        {(getContacts() ?? []).map((c, index) => {
          return (
            <Contact
              key={index}
              contact={c}
              onClick={(contact) => {
                if (
                  /[^\u0000-\u00ff]/.test(contact.firstName) ||
                  /[^\u0000-\u00ff]/.test(contact.lastName)
                ) {
                  throw new Error('');
                }
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
          setContact(undefined);
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
          setContact(undefined);
        }}
      />
    </Box>
  );
}

export default App;
