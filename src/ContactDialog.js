import './App.css';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  Dialog,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';

const Contact = (props) => {
  const [id, setId] = useState(undefined);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [sex, setSex] = useState('F');

  useEffect(() => {
    if (props.contact) {
      setId(props.contact.id);
      setFirstName(props.contact.firstName);
      setLastName(props.contact.lastName);
      setPhone(props.contact.phone);
      setEmail(props.contact.email);
      setSex(props.contact.sex);
    } else {
      setId(undefined);

      setFirstName('');
      setLastName('');
      setPhone('');
      setEmail('');
      setSex('F');
    }
  }, [props.contact]);
  const getRndInteger = () => {
    return Math.floor(Math.random() * 2000000);
  };

  return (
    <Dialog
      open={props.open}
      handleClose={props.handleClose}
      onBackdropClick={props.handleClose}
    >
      <Box display="flex" flexDirection={'column'} padding="40px" gap="10px">
        <TextField
          label="First name"
          value={firstName}
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        ></TextField>
        <TextField
          label="Last name"
          value={lastName}
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        ></TextField>
        <TextField
          label="Phone"
          value={phone}
          onChange={(event) => {
            setPhone(event.target.value);
          }}
        ></TextField>
        <TextField
          label="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        ></TextField>

        <InputLabel id="sex">Age</InputLabel>
        <Select
          labelId="sex"
          id="demo-select-small"
          label="Age"
          value={sex}
          onChange={(event) => {
            setSex(event.target.value);
          }}
        >
          <MenuItem value={'M'}>Male</MenuItem>
          <MenuItem value={'F'}>Female</MenuItem>
        </Select>

        <Button
          variant="contained"
          onClick={() => {
            props.onSave({
              id: props.contact ? props.contact.id : getRndInteger(),
              firstName,
              lastName,
              phone,
              email,
              sex,
            });
            props.handleClose();
          }}
        >
          Save
        </Button>

        <Button
          onClick={() => {
            props.onDelete(props.contact.id);
            props.handleClose();
          }}
          variant="contained"
        >
          Delete
        </Button>
      </Box>
    </Dialog>
  );
};

export default Contact;
