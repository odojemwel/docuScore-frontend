import { PhotoCamera } from '@mui/icons-material'
import { Avatar, Box, Button, Divider, IconButton, MenuItem, Paper, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { createContext, CSSProperties, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import Alerts from '../Components/Alerts'
import CameraView from '../Components/CameraView'
import { PageContainerContext } from '../Components/PageContainer'
import { class_, exam, score, student } from '../Helpers/Context/ClassContext'
import ExamService from '../Helpers/Services/ExamService'
import ScanService from '../Helpers/Services/ScanService'
import ScoreService from '../Helpers/Services/ScoreService'
import StudentService from '../Helpers/Services/StudentService'
import TeacherService from '../Helpers/Services/TeacherService'
import Dialogs from '../Components/Dialog'

export const CameraContext = createContext<{
  cameraList: MediaDeviceInfo[],
  setCameraList: Dispatch<React.SetStateAction<MediaDeviceInfo[]>>,
  selectedDevice: string | null,
  setSelectedDevice: Dispatch<SetStateAction<string | null>>,
  click: number,
  setClick: Dispatch<React.SetStateAction<number>>,
  sendImage: (blob: Blob | null) => void,
  closePhoto: boolean,
  setClosePhoto: Dispatch<SetStateAction<boolean>>,
} | null>(null);

const ScanScore = () => {

  const [cameraList, setCameraList] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [click, setClick] = useState<number>(0);
  const [closePhoto, setClosePhoto] = useState(false);

  const [studentNo, setStudentNo] = useState("");
  const [score, setScore] = useState("");
  const NavContext = useContext(PageContainerContext);
  const [classes, setClasses] = useState<class_[]>([]);
  const [class_, setClass_] = useState<class_ | null>(null);
  const [exams, setExams] = useState<exam[]>([]);
  const [exam, setExam] = useState<exam | null>(null);
  const [student, setStudent] = useState<student | null>(null);
  const [errorImage, setErrorImage] = useState(false);
  const [errorStudent, setErrorStudent] = useState(false);
  const [errorClass, setErrorClass] = useState(false);
  const [errorExam, setErrorExam] = useState(false);
  const [errorScore, setErrorScore] = useState(false);
  const [errorAddScore, setErrorAddScore] = useState(false);
  const [errorServer, setErrorServer] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [successAddScore, setSuccessAddScore] = useState(false);
  const [successScoreOCR, setSuccessScoreOCR] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [currentScore, setCurrentScore] = useState<score | null>(null);



  const fieldStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  }

  const labelStyle: CSSProperties = {
    width: '15%',
    textAlign: 'right',
    marginRight: '10px'
  }

  const handleChangeDevice = (event: any) => {
    setSelectedDevice(event.target.value);
  }

  const sendImage = (blob: Blob | null) => {
    if (!blob) {
      return
    }

    console.log(blob.size, blob.type);
    const formData = new FormData();
    formData.append("imageFile", blob, "image.png");
    console.log(formData.getAll('imageFile'));
    console.log(formData.get('imageFile'));
    console.log(formData.has('imageFile'));

    // send file to api request
    ScanService.getScore(formData)
      .then((response) => {
        console.log(response);
        setStudentNo(response.data.student);
        setScore(response.data.score);
        setSuccessScoreOCR(true);
      })
      .catch((err) => {
        console.error(err);
        setErrorImage(true);
      });

  }

  const handleClass = (value: string) => {
    if (value !== null || value !== "") {
      const id = parseInt(value);
      setClass_(
        classes.filter((e) => (
          e.classId === id
        ))[0]
      );
    } else {
      setErrorClass(true);
    }

  }

  const handleExam = (value: string) => {
    console.log(value)
    if (value !== null || value !== "") {
      const id = parseInt(value);
      setExam(
        exams.filter(e => (
          e.examId === id
        ))[0]
      );
    } else {
      setErrorExam(true);
    }
  }

  // handle the saving of the scores
  const handleSave = () => {
    if (class_ === null) {
      setErrorClass(true);
      return;
    }
    if (exam === null || exam.examId === undefined) {
      setErrorExam(true);
      return;
    }

    // get student identified by student number
    if (parseInt(studentNo) !== 0) {
      StudentService.getStudentByStudentNumber(parseInt(studentNo))
        .then(response => {
          console.log(response.data as student);
          setStudent(response.data);
          handleSaveWithStudent(response.data as student);
        })
        .catch(error => {
          console.error(error);
          setErrorStudent(true);
        })
    }
  }

  const handleSaveWithStudent = (student: student) => {
    console.log(student);
    if (exam === null || exam.examId === undefined) {
      setErrorExam(true);
      return;
    }
    if (student === null || student.studentId === undefined) {
      setErrorStudent(true);
      return;
    }

    ScoreService.getScoreByExamAndStudent(exam.examId, student.studentId)
      .then((response) => {
        if (response.data.scoreId) {
          // updateScore(response.data.scoreId);
          setCurrentScore(response.data);
          setUpdateDialog(true);
        } else {
          addNewScore(student);
        }
      })
      .catch(error => console.error(error))

  }

  const addNewScore = (student: student) => {
    if (exam === null || exam.examId === undefined) {
      setErrorExam(true);
      return;
    }
    if (student === null || student.studentId === undefined) {
      setErrorStudent(true);
      return;
    }
    if (score === "") {
      setErrorScore(true);
      return;
    }
    ScoreService.addScore(parseInt(score), exam.examId, student.studentId)
      .then(response => {
        console.log(response);
        if (response.data.scoreId) {
          setStudentNo("");
          setScore("");
          setSuccessAddScore(true);
          setClosePhoto(true);
        }
      })
      .catch(e => {
        console.error(e)
        setErrorAddScore(true);
      });
  }

  const updateScore = (scoreId: number) => {
    if (score === "") {
      setErrorScore(true);
      return;
    }
    ScoreService.updateScore(scoreId, parseInt(score))
      .then((response) => {
        if (response.data.scoreId) {
          setStudentNo("");
          setScore("");
          setSuccessUpdate(true);
          setUpdateDialog(false);
          setClosePhoto(true);
        }
      })
      .catch(error => {
        console.error(error)
        setErrorUpdate(true);
      })
  }

  const handleStudent = (value: string) => {
    if (value !== "" || value !== null) {
      setStudentNo(value);
    }
  }

  const handleScore = (value: string) => {
    if (value !== "" || value !== null) {
      setScore(value);
    }
  }

  useEffect(() => {
    NavContext?.setSelectedIndex(3)
    TeacherService.getActiveClasses()
      .then((response) => {
        setClasses(response.data)
      })
      .catch((error) => {
        console.error(error);
        setErrorServer(true);
      })
  }, [])

  useEffect(() => {
    if (class_) {
      ExamService.getExamByClass(class_.classId!)
        .then((response) => {
          console.log(response.data);
          setExams(response.data);
        })
        .catch(error => {
          (console.error(error));
          setErrorServer(true);
        })
    }

  }, [class_])



  return (
    <CameraContext.Provider value={{
      cameraList, setCameraList, selectedDevice, setSelectedDevice, click, setClick, sendImage, closePhoto, setClosePhoto
    }}>
      <Alerts error open={errorImage} message="The image is not processed successfully. Please try again!" onClose={() => setErrorImage(false)} />
      <Alerts error open={errorStudent} message="Student is non-existent!" onClose={() => setErrorStudent(false)} />
      <Alerts error open={errorClass} message="Please input a valid class!" onClose={() => setErrorClass(false)} />
      <Alerts error open={errorExam} message="Please input a valid exam!" onClose={() => setErrorExam(false)} />
      <Alerts error open={errorScore} message="Please input a valid score!" onClose={() => setErrorScore(false)} />
      <Alerts error open={errorAddScore} message="There was an error adding the score. Please try again!" onClose={() => setErrorScore(false)} />
      <Alerts error open={errorUpdate} message="There was an error updating the score. Please try again!" onClose={() => setErrorUpdate(false)} />
      <Alerts error open={errorServer} message="Error connecting to server. Please contact your administrator!" onClose={() => setErrorServer(false)} />
      <Alerts open={successAddScore} message="Score Added!" onClose={() => setSuccessAddScore(false)} />
      <Alerts open={successUpdate} message="Score Updated!" onClose={() => setSuccessUpdate(false)} />
      <Alerts open={successScoreOCR} message="Written Score Extracted!" onClose={() => setSuccessScoreOCR(false)} />
      <Dialogs
        open={updateDialog}
        title={`Update Score for ${student?.lastName}.`}
        content={`Student no. ${student?.classNumber}, ${student?.firstName} ${student?.lastName} already have score for this exam. Current score is ${currentScore?.value}. Would you like to update the score?`}
        onClose={() => setUpdateDialog(false)}
        onConfirm={() => updateScore(currentScore?.scoreId!)}
      />
      <Box
        // border={1}
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          height: '100%'
        }}>
        <Stack
          // border={1}
          sx={{
            width: "70%"
          }}
          spacing={4}>
          <Typography variant='h5'>Scan Scores</Typography>
          <Paper
            elevation={6}
            sx={{
              width: '100%',
              padding: '30px',
              height: '100%'
            }}>
            <div
              style={{
                display: 'flex',
                height: '100%',
                justifyContent: 'space-between',
              }}>
              <Box position="relative"
                style={{
                  border: '2px',
                  borderStyle: 'solid',
                  borderRadius: '4px',
                  flexBasis: '50%',
                  margin: '5px',
                  marginRight: '30px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: '#18A0FB',
                  padding: '1px'
                }}>
                <CameraView />
              </Box>
              <div
                style={{
                  flexBasis: '50%',
                  margin: '5px',
                }}>
                <form style={{ height: '100%' }} action="">
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%'
                  }}>
                    <div style={fieldStyle}>
                      <label htmlFor='class' style={labelStyle}>Class</label>
                      <TextField sx={{ flexGrow: '1' }}
                        id='class' select
                        size='small'
                        onChange={(e) => (handleClass(e.target.value))}
                        value={class_?.classId ?? ""}
                        defaultValue={""}
                        SelectProps={{ displayEmpty: true }}
                      >
                        <MenuItem value="">
                          <label style={{ color: '#b9b5b5', opacity: '100%' }}>Select a Class</label>
                        </MenuItem>
                        {
                          classes.map((value) => (
                            <MenuItem key={value.classId} value={value.classId}>
                              {value.subject}
                            </MenuItem>
                          ))
                        }
                      </TextField>
                    </div>
                    <div style={fieldStyle}>
                      <label htmlFor='exam' style={labelStyle}>Exam</label>
                      <TextField sx={{ flexGrow: '1' }}
                        id='exam,' select
                        size='small'
                        onChange={e => (handleExam(e.target.value))}
                        value={exam?.examId ?? ""}
                        defaultValue=""
                        SelectProps={{ displayEmpty: true }}
                      >
                        <MenuItem value="">
                          <label style={{ color: '#b9b5b5', opacity: '100%' }}>
                            {`${class_ ? `Select an Exam` : `Select a Class First`}`}
                          </label>
                        </MenuItem>
                        {
                          exams.map((value) => (
                            <MenuItem key={value.examId} value={value.examId}>
                              {value.examTitle}
                            </MenuItem>
                          ))
                        }
                      </TextField>
                    </div>
                    <div style={fieldStyle}>
                      <label htmlFor='student' style={labelStyle}>Student</label>
                      <TextField sx={{ flexGrow: '1' }}
                        id='student,' type={'number'}
                        size='small'
                        placeholder='Enter Student'
                        value={studentNo ?? ""}
                        onChange={(e) => { handleStudent(e.target.value) }
                        }
                      >
                      </TextField>
                    </div>
                    <div style={fieldStyle}>
                      <label htmlFor='score' style={labelStyle}>Score</label>
                      <TextField sx={{ flexGrow: '1' }}
                        id='score,' type={'number'}
                        size='small'
                        placeholder='Enter Score'
                        value={score ?? ""}
                        onChange={(e) => { handleScore(e.target.value) }}
                      >
                      </TextField>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                      <Button variant='contained'
                        color='secondary'
                        onClick={() => (handleSave())}>
                        Save Score
                      </Button>
                    </div>
                    <Divider variant='middle' sx={{
                      borderBottomWidth: '1px', borderColor: '#8E8E8E', marginY: '20px'
                    }} />
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px', marginTop: '5px' }}>
                      <Avatar sx={{ bgcolor: '#cbcbcb' }}
                        style={{
                          border: '2px solid', borderColor: '#515151',
                          width: '50px',
                          height: '50px'
                        }}>
                        <IconButton disableRipple color='default'
                          onClick={() => {
                            setClick((click) => click + 1)
                          }}
                        >
                          <PhotoCamera />
                        </IconButton>
                      </Avatar>
                    </div>
                    <TextField
                      label='Camera'
                      size='small'
                      sx={{ marginTop: '10px' }}
                      select
                      value={selectedDevice ?? ''}
                      onChange={handleChangeDevice}
                    >
                      {
                        cameraList.map(camera => (
                          <MenuItem key={camera.deviceId} value={camera.deviceId}>
                            {camera.label}
                          </MenuItem>
                        ))
                      }
                    </TextField>
                  </div>
                </form>
              </div>
            </div>
          </Paper>
        </Stack>
      </Box >
    </CameraContext.Provider >
  )
}

export default ScanScore