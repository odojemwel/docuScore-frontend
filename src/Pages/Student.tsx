import { Button, Typography, Stack, Paper, Grid, Switch, Snackbar, Alert } from '@mui/material'
import { FormEvent, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from 'react-router-dom';
import { student } from '../Helpers/Context/ClassContext';
import StudentService from '../Helpers/Services/StudentService';

const Student = () => {
  const [edit, setEdit] = useState(false)
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [student, setStudent] = useState({} as student)
  const { studentId } = useParams();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isNaN(student.classNumber) || student.firstName === "" || student.lastName === "" || student.studSchoolId === "") {
      setError(true);
    } else {
      StudentService.updateStudent(student, parseInt(studentId!))
        .then(response => {
          if (response.data.studentId) {
            setSuccess(true);
            setEdit(false);
          } else {
            setError(true);
          }
        })
        .catch(error => console.log(error));
    }
  }


  useEffect(() => {
    StudentService.getStudentByID(parseInt(studentId!))
      .then(response => {
        setStudent(response.data)
      })
      .catch(error => console.log(error))
  }, [])


  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={success}
        onClose={() => setSuccess(false)}
        autoHideDuration={2000}
      >
        <Alert severity='success' onClose={() => setSuccess(false)} variant="standard">
          Student Update Successful
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={error}
        onClose={() => setError(false)}
        autoHideDuration={2000}
      >
        <Alert severity='error' onClose={() => setError(false)} variant="standard">
          Please Input Valid Student Information
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
          <Typography variant='h5'>Student</Typography>
          <Paper
            elevation={6}
            sx={{
              width: '700px',
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <Grid container justifyContent='end' alignItems={'center'}>
              <Grid item >
                <Switch color='secondary'
                  checked={edit}
                  onChange={() => (setEdit(!edit))} />
              </Grid>
              <Grid item >
                <Typography>Edit Student</Typography>
              </Grid>
            </Grid>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Stack width='100%' spacing={3} marginY='30px'>

                <Grid container>
                  <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                    <Typography>Student ID</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField sx={{ marginLeft: 1, width: '80%' }}
                      placeholder='Input Student ID'
                      size='small'
                      inputProps={{
                        readOnly: !edit
                      }}
                      value={student.studSchoolId || ""}
                      onChange={e => setStudent({ ...student, studSchoolId: e.target.value })} />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                    <Typography>Class Number</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField sx={{ marginLeft: 1, width: '80%' }}
                      placeholder='Input Class Number'
                      type='number'
                      size='small'
                      inputProps={{
                        readOnly: !edit,
                      }}
                      value={student.classNumber || ""}
                      onChange={e => setStudent({ ...student, classNumber: parseInt(e.target.value) })}
                    />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                    <Typography>First Name</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField sx={{ marginLeft: 1, width: '80%' }}
                      placeholder='Input First Name'
                      size='small'
                      inputProps={{
                        readOnly: !edit,
                      }}
                      value={student.firstName || ""}
                      onChange={e => setStudent({ ...student, firstName: e.target.value })}
                    />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                    <Typography>Last Name</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField sx={{ marginLeft: 1, width: '80%' }}
                      placeholder='Input Last Name'
                      size='small'
                      inputProps={{
                        readOnly: !edit,
                      }}
                      value={student.lastName || ""}
                      onChange={e => setStudent({ ...student, lastName: e.target.value })}
                    />
                  </Grid>
                </Grid>

                <Box display='flex' justifyContent='center'>
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={!edit}
                    type='submit'
                    sx={{
                      marginX: '10px'
                    }}>
                    SAVE CHANGES
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{
                      marginX: '10px'
                    }}
                    onClick={() => navigate(-1)}>
                    CANCEL
                  </Button>
                </Box>
              </Stack>
            </form>
          </Paper>
        </Stack>
      </Box >
    </>
  )
}


export default Student
