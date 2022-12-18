import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Menu, MenuItem, Snackbar, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, GridCellEditCommitParams, GridColumnHeaderParams, GridColumns, GridRenderCellParams, GridRowsProp, GridValidRowModel, MuiEvent } from '@mui/x-data-grid'
import React, { SyntheticEvent, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ClassContext, class_, exam, score, student } from '../Helpers/Context/ClassContext'
import ClassService from '../Helpers/Services/ClassService'
import ExamService from '../Helpers/Services/ExamService'
import ScoreService from '../Helpers/Services/ScoreService'
import StudentService from '../Helpers/Services/StudentService'


const Class = () => {
  const ClassProvider = useContext(ClassContext);
  const navigate = useNavigate();
  const { classId } = useParams();
  const [students, setStudents] = useState<any[]>([])
  const [scores, setScores] = useState<score[][]>([[]])
  const [successAdd, setSuccessAdd] = useState(false);
  const [error, setError] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false)
  const [update, setUpdate] = useState(false)
  const [updateScores, setUpdateScores] = useState(false);

  interface GridColTypeDef {
    field: String,
    headerName: String,
    type: String,
    width: number,
    sortable: boolean,
    renderCell?: any,
    renderHeader?: any,
  }

  const student: GridColTypeDef[] | undefined = [{
    field: 'fullName',
    headerName: 'Name',
    type: 'string',
    width: 150,
    sortable: false,
    renderCell: (cellValue: GridRenderCellParams) => {
      return (
        <Name cellValue={cellValue} />

      )
    }
  }]

  const exams: GridColTypeDef[] | undefined = ClassProvider?.exams.map((exam) => {
    return {
      field: exam.examId + "",
      headerName: exam.examTitle,
      type: "number",
      width: 100,
      sortable: false,
      editable: true,
      renderHeader: (cellValue: GridColumnHeaderParams) => {
        return (
          <Exam cellValue={cellValue} />
        );

      }
    }
  })

  const columns: GridColTypeDef[] | undefined = student.concat(exams!);
  const rows: GridRowsProp = students as GridValidRowModel[];


  useEffect(() => {
    ClassProvider?.setStudents([])
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

    StudentService.getStudentByClass(parseInt(classId! + ""))
      .then((response) => {
        const students: student[] = Object.values(response.data)
        ClassProvider?.setStudents(students)
      })
      .catch((error) => console.log(error));

    ExamService.getExamByClass(parseInt(classId! + ""))
      .then(response => {
        const exams: exam[] = Object.values(response.data);
        ClassProvider?.setExams(exams);
      })
      .catch(error => console.log(error))


  }, [update])

  useEffect(() => {
    ClassProvider?.setScores([[]])
    ClassProvider?.students.map((student, i) => {
      ScoreService.getScoreByStudent(student.studentId!)
        .then((response) => {
          const grade: score[] = Object.values(response.data);
          let temp = scores
          temp.push(grade);
          setScores(temp)
          if (i === ClassProvider?.students.length! - 1) {
            ClassProvider?.setScores(scores);
          }
        })
    })

  }, [ClassProvider?.students, updateScores])

  useEffect(() => {
    const stud = ClassProvider?.students.map((student) => {
      let temp = {
        studentId: student.studentId,
        studSchoolId: student.studSchoolId,
        classNumber: student.classNumber,
        fullName: `${student.firstName} ${student.lastName}`,
      };
      ClassProvider.scores.map((elements) => {
        elements.map((element) => {
          if (student.studentId === element.student.studentId) {
            temp = { ...temp, [`${element.exam.examId}`]: element.value + "" }
          }
        })
      })
      return temp;
    })
    setStudents(stud!);

  }, [ClassProvider?.scores])

  const updateScore = (params: GridCellEditCommitParams, event: MuiEvent) => {
    const temp = event as SyntheticEvent;
    const oldVal = (temp.target as HTMLInputElement).defaultValue;
    if (oldVal === "") {
      if (params.value === undefined || params.value === null) {
        setError(true);
      } else {
        ScoreService.addScore(parseInt(params.value), parseInt(params.field), parseInt(params.id + ""))
          .then(response => {
            if (response.data.scoreId) {
              setSuccessAdd(true);
            } else {
              setError(true);
            }
          })
          .catch(error => console.log(error));
      }
    } else {
      if (params.value === null || params.value === undefined) {
        setError(true);
        setUpdateScores(!updateScores);
      } else {
        ScoreService.getScoreByExamAndStudent(parseInt(params.field), parseInt(params.id + ""))
          .then(response => {
            if (response.data.value === parseInt(oldVal)) {
              ScoreService.updateScore(response.data.scoreId, params.value)
                .then(res => {
                  if (res.data.scoreId === response.data.scoreId) {
                    setSuccessUpdate(true);
                  } else {
                    setError(true);
                  }
                })
                .catch(error => console.log(error))
            }
          })
          .catch(error => console.log(error));
      }
    }
  }

  const deleteStudent = () => {
    StudentService.deleteStudent(ClassProvider?.idDelete!)
      .then((response) => {
        if (response.data === `Student ID Number ${ClassProvider?.idDelete} is successfully deleted!`) {
          setUpdate(!update);
        }
      })
      .catch(error => console.log(error))
  }

  const deleteExam = () => {
    ExamService.deleteExam(ClassProvider?.idDelete!)
      .then(response => {
        if (response.data === `exam with ID ${ClassProvider?.idDelete} is deleted!`) {
          setUpdate(!update);
        }
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <Dialog
        open={ClassProvider?.studentDialog!}
        onClose={() => ClassProvider?.setStudentDialog(false)}
      >
        <DialogTitle>
          {"Delete Student?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText >
            This will delete the student and their scores. Would you like to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='secondary'
            onClick={() => {
              ClassProvider?.setStudentDialog(false);
              ClassProvider?.setIdDelete(0);
            }
            }
          >No</Button>
          <Button variant='contained' color='secondary' autoFocus
            onClick={() => {
              deleteStudent();
              ClassProvider?.setStudentDialog(false);
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={ClassProvider?.examDialog!}
        onClose={() => ClassProvider?.setExamDialog(false)}
      >
        <DialogTitle>
          {"Delete Exam?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText >
            This will delete the exam and the scores associated with it. Would you like to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='secondary'
            onClick={() => {
              ClassProvider?.setExamDialog(false);
              ClassProvider?.setIdDelete(0);
            }
            }
          >No</Button>
          <Button variant='contained' color='secondary' autoFocus
            onClick={() => {
              // deleteStudent();
              deleteExam();
              ClassProvider?.setExamDialog(false);
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={successAdd}
        onClose={() => setSuccessAdd(false)}
        autoHideDuration={2000}
      >
        <Alert severity='success' onClose={() => setSuccessAdd(false)} variant="standard">
          Score Added
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={successUpdate}
        onClose={() => setSuccessUpdate(false)}
        autoHideDuration={2000}
      >
        <Alert severity='success' onClose={() => setSuccessUpdate(false)} variant="standard">
          Score Updated
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={error}
        onClose={() => setError(false)}
        autoHideDuration={2000}
      >
        <Alert severity='error' onClose={() => setError(false)} variant="standard">
          Please Input Valid Score
        </Alert>
      </Snackbar>
      <Box sx={{ paddingX: '100px', width: '100%', height: '100%' }}>
        <Stack sx={{ height: '100%' }} spacing={2}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            height: '50px',
            paddingY: '5px',
            marginBottom: '20px',
            alignItems: 'center'
          }}>
            <Typography variant='h5' gutterBottom sx={{ flexGrow: 1, fontWeight: '500' }}>
              Class Details
            </Typography>
            <TextField
              id="standard-disabled"
              label="Subject"
              value={`${ClassProvider?.class_.subject}`}
              variant="filled"
              size='small'
              sx={{ marginX: '5px' }}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id="standard-disabled"
              label="Year level"
              value={`${ClassProvider?.class_.yearLevel}`}
              variant="filled"
              size='small'
              sx={{ marginX: '5px' }}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id="standard-disabled"
              label="Section"
              value={`${ClassProvider?.class_.section}`}
              variant="filled"
              size='small'
              sx={{ marginX: '5px' }}
              InputProps={{
                readOnly: true,
              }}
            />
            {
              ClassProvider?.class_.deleted ?
                <></> :
                <Button variant='contained' size='small' color='secondary'
                  sx={{ marginLeft: '10px' }}
                  onClick={() => navigate(`/edit_class/${classId}`)}>
                  <Typography variant='button'>Edit Class</Typography>
                </Button>
            }
          </Box>
          <Box display={'flex'} >
            <Typography variant='h5'>Students' Record</Typography>
          </Box>
          {
            ClassProvider?.class_.deleted ?
              <DataGrid
                columns={columns as GridColumns<GridValidRowModel>}
                rows={rows}
                getRowId={(row) => row.studentId}
                disableColumnMenu
                disableSelectionOnClick
                isCellEditable={() => { return false }}
              /> :
              <>
                <DataGrid
                  columns={columns as GridColumns<GridValidRowModel>}
                  rows={rows}
                  getRowId={(row) => row.studentId}
                  disableColumnMenu
                  disableSelectionOnClick
                  onCellEditCommit={updateScore}
                />
                <Stack direction={'row'} spacing={2}>
                  <Button variant='contained'
                    color='secondary'
                    size='small'
                    onClick={() => navigate(`/create_student/${classId}`)}
                  >Add Student</Button>
                  <Button variant='contained'
                    color='secondary'
                    size='small'
                    onClick={() => navigate(`/create_exam/${classId}`)}
                  >Add Exam</Button>
                </Stack>
              </>
          }
        </Stack>
      </Box>
    </>
  )
}

export default Class


export const Name = (props: { cellValue: GridRenderCellParams }) => {
  const ClassProvider = useContext(ClassContext)
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ cursor: 'pointer' }} >
        {
          ClassProvider?.class_.deleted ?
            <Box>
              {props.cellValue.value}
            </Box>
            :
            <>
              <Box onClick={handleClick}>
                {props.cellValue.value}
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    navigate(`/student/${props.cellValue.id}`);
                    handleClose();
                  }}>
                  View Student
                </MenuItem>
                <MenuItem onClick={() => {
                  ClassProvider?.setStudentDialog(true);
                  ClassProvider?.setIdDelete(parseInt(props.cellValue.id + ""));
                  handleClose();
                }
                }>Delete Student</MenuItem>
              </Menu>
            </>
        }
      </Box>
    </>
  );
}


export const Exam = (props: { cellValue: GridColumnHeaderParams }) => {
  const ClassProvider = useContext(ClassContext)
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {
        ClassProvider?.class_.deleted ?
          <Box sx={{ cursor: 'pointer' }} >
            {props.cellValue.colDef.headerName}
          </Box>
          :
          <>
            <Box sx={{ cursor: 'pointer' }} onClick={handleClick} >
              {props.cellValue.colDef.headerName}
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  navigate(`/exam/${props.cellValue.colDef.field}`)
                }}>View Exam</MenuItem>
              <MenuItem onClick={() => {
                ClassProvider?.setExamDialog(true);
                ClassProvider?.setIdDelete(parseInt(props.cellValue.field + ""));
                handleClose();
              }}>Delete Exam</MenuItem>
            </Menu>
          </>
      }
    </>
  );
}