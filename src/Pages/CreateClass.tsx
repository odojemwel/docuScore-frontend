import { Button, Typography, Stack, Paper, Grid, MenuItem, FormControl, InputLabel, Select, Snackbar, Alert } from '@mui/material'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { PageContainerContext } from '../Components/PageContainer'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { class_ } from '../Helpers/Context/ClassContext';
import ClassService from '../Helpers/Services/ClassService';
import { LoginContext } from '../Helpers/Context/LoginContext';

const CreateClass = () => {
  const NavContext = useContext(PageContainerContext);
  const LoginProvider = useContext(LoginContext);
  const navigate = useNavigate();
  const [subject, setSubject] = useState("")
  const [section, setSection] = useState("")
  const [yearLevel, setYearLevel] = useState(-1);
  const yearLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false)

  useEffect(() => {
    NavContext?.setSelectedIndex(2)
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (subject === "" || section === "" || yearLevel === -1) {
      setError(true)
    } else {
      ClassService.createClass(subject, yearLevel, section, LoginProvider?.loggedIn.teacherId!)
        .then((response) => {
          if (response.data.classId) {
            setSuccess(true);
            setSection("");
            setSubject("");
            setYearLevel(-1);
          }
        })
        .catch((error) => console.log(error));
    }

  }

  const handleYearLevel = (value: string) => {
    let num = parseInt(value);
    if (num >= 1 && num <= 12) {
      setYearLevel(num)
    } else {
      setError(true);
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
          Class Created Successfully
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
          <Typography variant='h5'>Create Class</Typography>
          <Paper
            elevation={6}
            sx={{
              width: '700px',
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <form style={{ width: '100%' }} onSubmit={handleSubmit}>
              <Stack width='100%' spacing={3} marginY='30px'>
                <Grid container>
                  <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                    <Typography>Subject</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField sx={{ marginLeft: 1, width: '80%' }}
                      type="string"
                      value={subject}
                      onChange={(e) => { setSubject(e.target.value) }}
                      multiline placeholder='Input Subject'
                      size='small' />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                    <Typography>Year Level</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField sx={{ marginLeft: 1, width: '80%' }}
                      select
                      // type="number"
                      defaultValue={-1}
                      value={yearLevel}
                      // value={newClass.yearLevel}
                      onChange={(e) => {
                        handleYearLevel(e.target.value);
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
                      type="string"
                      value={section}
                      onChange={(e) => { setSection(e.target.value) }}
                      multiline placeholder='Input Section'
                      size='small' />
                  </Grid>
                </Grid>
                <Box display='flex' justifyContent='center'>
                  <Button
                    type='submit'
                    variant="contained"
                    color="secondary"
                    sx={{
                      marginX: '10px'
                    }}>
                    Create Class
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


export default CreateClass
