import { Button, Typography, Stack, Paper, Grid, MenuItem, Snackbar, Alert, Switch, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useEffect, useContext, useState, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClassContext, class_ } from '../Helpers/Context/ClassContext';
import ClassService from '../Helpers/Services/ClassService';

const EditClass = () => {
  const navigate = useNavigate();
  const { classId } = useParams();
  const ClassProvider = useContext(ClassContext);
  const yearLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false)
  const [class_, setClass_] = useState({} as class_)
  const [openDialog, setOpenDialog] = useState(false);


  useEffect(() => {
    ClassService.getClass(parseInt(classId! + ""))
      .then((response) => {
        const class_: class_ = response.data;
        ClassProvider?.setClass_(class_);
        setClass_(class_);
      })
      .catch((error) => console.log(error));

  }, [])



  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (class_.subject === "" || class_.subject === "" || class_.yearLevel === -1) {
      setError(true);
    } else if (class_.deleted) {
      setOpenDialog(true);
    } else {
      ClassService.editClass(class_, class_.classId!)
        .then((response) => {
          if (response.data.classId) {
            setSuccess(true);
          } else {
            setError(true);
          }
        })
    }

  }

  const markInactive = () => {
    if (class_.subject === "" || class_.subject === "" || class_.yearLevel === -1) {
      setError(true);
    } else {
      ClassService.editClass(class_, class_.classId!)
        .then((response) => {
          if (response.data.classId) {
            setOpenDialog(false);
            setSuccess(true);
          } else {
            setError(true);
          }
        })
    }
  }

  return (
    <>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>
          {"Mark Class Inactive?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText >
            If you mark a class as inactive, all details will become read-only. This process is final and cannot be reverted. Do you wish to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='secondary'
            onClick={() => setOpenDialog(false)}
          >No</Button>
          <Button variant='contained' color='secondary' autoFocus
            onClick={markInactive}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={success}
        onClose={() => setSuccess(false)}
        autoHideDuration={2000}
      >
        <Alert severity='success' onClose={() => setSuccess(false)} variant="standard">
          Class Update Successfull
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={error}
        onClose={() => setError(false)}
        autoHideDuration={2000}
      >
        <Alert severity='error' onClose={() => setError(false)} variant="standard">
          Please Input Valid Class Information
        </Alert>
      </Snackbar>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '100%'
      }}>
        <Stack sx={{
          width: "100%"
        }}
          spacing={4}>
          <Typography variant='h5'>Edit Class</Typography>
          <Paper
            elevation={6}
            sx={{
              width: '700px',
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Stack width='100%' spacing={3} marginY='30px'>
                <Grid container>
                  <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                    <Typography>Subject</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField sx={{ marginLeft: 1, width: '80%' }}
                      placeholder='Input Subject'
                      size='small'
                      value={class_.subject || ""}
                      onChange={(e) => setClass_({ ...class_, subject: e.target.value })} />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                    <Typography>Year Level</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField sx={{ marginLeft: 1, width: '80%' }}
                      select
                      value={class_.yearLevel || -1}
                      onChange={(e) => {
                        setClass_({ ...class_, yearLevel: parseInt(e.target.value) });
                      }}
                      placeholder='Input Year Level'
                      size='small' >
                      <MenuItem value={-1}>
                        <Typography color={"#A9A9A9"}>
                          Select Year Level
                        </Typography>
                      </MenuItem>
                      {
                        yearLevels.map((value) => (
                          <MenuItem key={value} value={value}>
                            {value}
                          </MenuItem>
                        ))
                      }
                    </TextField>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                    <Typography>Section</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField sx={{ marginLeft: 1, width: '80%' }}
                      placeholder='Input Section'
                      size='small'
                      value={class_.section || ""}
                      onChange={(e) => setClass_({ ...class_, section: e.target.value })} />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                    <Typography>Inactive</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField sx={{ marginLeft: 1, width: '80%' }}
                      select
                      value={class_.deleted ? 1 : 0}
                      onChange={(e) => {
                        setClass_({ ...class_, deleted: parseInt(e.target.value) === 0 ? false : true })
                      }}
                      size='small' >
                      <MenuItem value={0}>
                        <Typography >
                          No
                        </Typography>
                      </MenuItem>
                      <MenuItem value={1}>
                        <Typography >
                          Yes
                        </Typography>
                      </MenuItem>
                    </TextField>
                  </Grid>
                </Grid>

                <Box display='flex' justifyContent='center'>
                  <Button
                    variant="contained"
                    color="secondary"
                    type='submit'
                    sx={{
                      marginX: '10px'
                    }}>
                    Update Class
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{
                      marginX: '10px'
                    }}
                    onClick={() => navigate(-1)}>
                    Cancel
                  </Button>
                </Box>
              </Stack>
            </form>
          </Paper>
        </Stack>
      </Box >
    </ >
  )
}


export default EditClass