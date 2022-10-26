import './App.css';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const Contact = (props) => {
  return (
    <Box
      width="250px"
      height="100px"
      display="flex"
      sx={{ boxShadow: 1, cursor: 'pointer' }}
      flexDirection={'column'}
      elevation={1}
      padding="8px"
      onClick={() => props.onClick(props.contact)}
    >
      <Typography fontSize="24px" fontWeight={700}>
        {props.contact.firstName} {props.contact.lastName}{' '}
        {props.contact.sex ? '(' + props.contact.sex + ')' : ''}
      </Typography>

      <Typography fontSize="16px" fontWeight={400} color="#797979">
        {props.contact.phone}
      </Typography>
      <Typography fontSize="16px" fontWeight={400} color="#797979">
        {props.contact.email}
      </Typography>
    </Box>
  );
};

export default Contact;
