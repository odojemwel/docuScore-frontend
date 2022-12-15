import { Button, Typography, Stack, Paper, Grid, Switch, Snackbar, Alert } from '@mui/material'
import { FormEvent, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from 'react-router-dom';
import { exam } from '../Helpers/Context/ClassContext';
import ExamService from '../Helpers/Services/ExamService';

const Exam = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  const [exam, setExam] = useState({} as exam);
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);


  useEffect(() => {
    ExamService.getExamById(parseInt(examId!))
      .then(response => {
        setExam(response.data)
      })
      .catch(error => console.log(error))

  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isNaN(exam.examNo) || exam.examTitle === "" || isNaN(exam.totalItems)) {
      setError(true);
    } else {
      ExamService.updateExam(exam, parseInt(examId!))
        .then(response => {
          if (response.data.examId) {
            setSuccess(true);
            setEdit(false);
          } else {
            setError(true);
          }
        })
        .catch(error => console.log(error))
    }
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={success}
        onClose={() => setSuccess(false)}
        autoHideDuration={2000}
      >
        <Alert severity='success' onClose={() => setSuccess(false)} variant="standard">
          Exam Update Successful
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={error}
        onClose={() => setError(false)}
        autoHideDuration={2000}
      >
        <Alert severity='error' onClose={() => setError(false)} variant="standard">
          Please Input Valid Exam Information
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
          <Typography variant='h5'>Exam</Typography>
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
                <Typography>Edit Exam</Typography>
              </Grid>
            </Grid>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Stack width='100%' spacing={3} marginY='30px'>
                <Grid container>
                  <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                    <Typography>Exam Number</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField sx={{ marginLeft: 1, width: '80%' }}
                      type='number'
                      placeholder='Input Exam Number'
                      size='small'
                      inputProps={{
                        readOnly: !edit,
                      }}
                      value={exam.examNo || ""}
                      onChange={e => setExam({ ...exam, examNo: parseInt(e.target.value) })}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                    <Typography>Exam Title</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField sx={{ marginLeft: 1, width: '80%' }}
                      placeholder='Input Exam Title'
                      size='small'
                      inputProps={{
                        readOnly: !edit,
                      }}
                      value={exam.examTitle || ""}
                      onChange={e => setExam({ ...exam, examTitle: e.target.value })}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                    <Typography>Total Items</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField sx={{ marginLeft: 1, width: '80%' }}
                      type='number'
                      placeholder='Input Total Items'
                      size='small'
                      inputProps={{
                        readOnly: !edit,
                      }}
                      value={exam.totalItems || ""}
                      onChange={e => setExam({ ...exam, totalItems: parseInt(e.target.value) })}
                    />
                  </Grid>
                </Grid>
                <Box display='flex' justifyContent='center'>
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={!edit}
                    sx={{
                      marginX: '10px'
                    }}
                    type='submit'
                  >
                    SAVE CHANGES
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate(-1)}
                    sx={{
                      marginX: '10px',
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


export default Exam
