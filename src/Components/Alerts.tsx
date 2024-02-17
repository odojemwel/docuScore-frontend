import { Alert, AlertColor, Snackbar } from '@mui/material'

type alertsProps = {
  open: boolean,
  error?: boolean,
  message: string,
  onClose: () => void,
}

const Alerts = (props: alertsProps) => {
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={props.open}
        onClose={props.onClose}
        autoHideDuration={2000}
      >
        <Alert severity={props.error ? 'error' : 'success'} onClose={props.onClose} variant="standard">
          {props.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Alerts