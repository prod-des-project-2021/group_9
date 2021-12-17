import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
    
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle className ={{}} sx={{ m: 0, p: 1, width: "xl" ,}} {...other}>
      {children}
      {onClose ? (
        <IconButton
        style={{
          borderRadius: 20,
          color: '#000000',
          backgroundColor: "#F5D142",
          padding: "1px 22px",
          fontSize: "15px",
          position: 'flex',
          right:'-85%'
      }}
          aria-label="close"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({children}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button 
      variant="outlined" onClick={handleClickOpen}
      style={{
        borderRadius: 20,
        color: '#000000',
        backgroundColor: "#F5D142",
        padding: "1px 22px",
        fontSize: "15px", 
    }}>
        Create new recipe
      </Button>
      <BootstrapDialog 
        maxWidth = "md"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        </BootstrapDialogTitle>
        <DialogContent>
        {children}
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
