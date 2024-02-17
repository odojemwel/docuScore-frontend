import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useState } from 'react';

type dialogsProps = {
  open: boolean,
  title: string,
  content: string,
  onClose: () => void,
  onConfirm: () => void,
}

const Dialogs = (props: dialogsProps) => {
  return (
    <Dialog
      open={props.open}
      onClose={() => props.onClose}
    >
      <DialogTitle>
        {`${props.title}`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText >
          {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' color='secondary'
          onClick={() => (
            props.onClose()
          )}>
          No
        </Button>
        <Button variant='contained' color='secondary' autoFocus
          onClick={() => (props.onConfirm())}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Dialogs