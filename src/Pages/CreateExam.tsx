import { Button, Typography, Stack, Paper, Grid, Snackbar, Alert } from '@mui/material'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClassContext, class_, exam } from '../Helpers/Context/ClassContext';
import ClassService from '../Helpers/Services/ClassService';
import ExamService from '../Helpers/Services/ExamService';

const CreateExam = () => {
  const navigate = useNavigate();
  const { classId } = useParams();
  const ClassProvider = useContext(ClassContext);
  const [title, setTitle] = useState("");
  const [examNo, setExamNo] = useState("");
  const [totalItems, setTotalItems] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false)


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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title === "" || examNo === "" || totalItems === "") {
      setError(true);
    } else {
      ExamService.addExam({
        examNo: parseInt(examNo),
        examTitle: title,
        totalItems: parseInt(totalItems)
      } as exam, ClassProvider?.class_.classId!)
        .then(response => {
          if (response.data.examId) {
            setSuccess(true);
            setTitle("");
            setExamNo("");
            setTotalItems("");
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
          Exam Created Successfully
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
          <Typography variant='h5'>Create Exam</Typography>
          <Paper
            elevation={6}
            sx={{
              width: '700px',
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Stack width='100%' spacing={3} marginY='30px'>
                <Grid container>
                  <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                    <Typography>Exam Number</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField sx={{ marginLeft: 1, width: '80%' }}
                      type="number"
                      placeholder='Input Exam Number'
                      size='small'
                      value={examNo}
                      onChange={e => setExamNo(e.target.value)} />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                    <Typography>Exam title</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField sx={{ marginLeft: 1, width: '80%' }}
                      placeholder='Input Exam Title'
                      size='small'
                      value={title}
                      onChange={e => setTitle(e.target.value)} />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                    <Typography>Total Items</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField sx={{ marginLeft: 1, width: '80%' }}
                      type="number"
                      placeholder='Input Total Items'
                      size='small'
                      value={totalItems}
                      onChange={e => setTotalItems(e.target.value)} />
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
                    CREATE EXAM
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{
                      marginX: '10px',
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
    </ >
  )
}


export default CreateExam
