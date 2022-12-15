import { Button, Typography, Stack, Paper, Grid, Snackbar, Alert } from '@mui/material'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClassContext, class_, student } from '../Helpers/Context/ClassContext';
import ClassService from '../Helpers/Services/ClassService';
import StudentService from '../Helpers/Services/StudentService';

const CreateStudent = () => {
  const ClassProvider = useContext(ClassContext)
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [classNo, setClassNo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false)
  const { classId } = useParams();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (studentId === "" || firstName === "" || classNo === "" || lastName === "") {
      setError(true)
    } else {
      StudentService.addStudent({
        studSchoolId: studentId,
        classNumber: parseInt(classNo),
        firstName: firstName,
        lastName: lastName,
      } as student, ClassProvider?.class_.classId!)
        .then((response) => {
          if (response.data.studentId) {
            setSuccess(true)
            setStudentId("");
            setClassNo("");
            setFirstName("");
            setLastName("");
          }
        })
        .catch(error => console.log(error))
    }
  }

  useEffect(() => {
    ClassService.getClass(parseInt(classId! + ""))
      .then((response) => {
        const class_: class_ = response.data;
        ClassProvider?.setClass_({
          classId: class_.classId,
          subject: class_.subject,
          section: class_.section,
          yearLevel: class_.yearLevel,
          deleted: class_.deleted,
        });
      })
      .catch((error) => console.log(error));

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
          Student Added Successfully
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
          <Typography variant='h5'>Create Student</Typography>
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
                    <Typography>Student ID</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField sx={{ marginLeft: 1, width: '80%' }}
                      value={studentId}
                      onChange={e => { setStudentId(e.target.value) }}
                      placeholder='Input Student ID'
                      size='small' />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                    <Typography>Class Number</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField sx={{ marginLeft: 1, width: '80%' }}
                      type="number"
                      onChange={(e) => setClassNo(e.target.value)}
                      value={classNo}
                      placeholder='Input Class Number'
                      size='small' />
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
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName} />
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
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName} />
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
                    CREATE STUDENT
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate(-1)}
                    sx={{
                      marginX: '10px'
                    }}>
                    CANCEL
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


export default CreateStudent
