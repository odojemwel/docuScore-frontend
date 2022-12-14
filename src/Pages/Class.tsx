import { Box, Button, Menu, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, GridColumnHeaderParams, GridColumns, GridRenderCellParams, GridRowsProp, GridValidRowModel } from '@mui/x-data-grid'
import React, { useContext, useEffect, useState } from 'react'
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
  let scores: score[][] = [[]];

  interface GridColTypeDef {
    field: String,
    headerName: String,
    type: String,
    width: number,
    sortable: boolean,
    renderCell: any,
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
      renderCell: (cellValue: GridRenderCellParams) => {
        return (
          <Score cellValue={cellValue} />
        );
      },
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
    ClassProvider?.setScores([[]])
    ClassProvider?.setStudents([])
    ClassProvider?.setExams([])
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

  }, [])

  useEffect(() => {
    for (let i = 0; i < ClassProvider?.students.length!; i++) {
      ScoreService.getScoreByStudent(ClassProvider?.students[i].studentId!)
        .then((response) => {
          const grade: score[] = Object.values(response.data);
          console.log("after api call" + ClassProvider?.students[i].studentId!)
          console.log(grade);
          if (i === 0) {
            scores = [grade];
          } else {
            scores.push(grade);
          }
          console.log('scores')
          console.log(scores)
          if (i === ClassProvider?.students.length! - 1) {
            ClassProvider?.setScores(scores);
          }
        })
    }

  }, [ClassProvider?.students])

  useEffect(() => {
    console.log("before assignment")
    console.log(ClassProvider?.scores)
    const stud = ClassProvider?.students.map((student) => {
      let temp = {
        studentId: student.studentId,
        studSchoolId: student.studSchoolId,
        classNumber: student.classNumber,
        fullName: `${student.firstName} ${student.lastName}`,
      };
      ClassProvider.scores.map((scores) => {
        scores.map((score) => {
          if (student.studentId === score.student.studentId) {
            temp = { ...temp, [`${score.exam.examId}`]: score.value + "" }
          }
        })
      })
      console.log("after assignment")
      console.log(temp);
      return temp;
    })
    setStudents(stud!);
  }, [ClassProvider?.scores])


  return (
    <>
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
            <Button variant='contained' size='small' color='secondary'
              sx={{ marginLeft: '10px' }}
              onClick={() => navigate("/edit_class")}>
              <Typography variant='button'>Edit Class</Typography>
            </Button>
          </Box>
          <Box display={'flex'} >
            <Typography variant='h5'>Students' Record</Typography>
          </Box>

          <DataGrid
            columns={columns as GridColumns<GridValidRowModel>}
            rows={rows}
            getRowId={(row) => row.studentId}
            disableColumnMenu
          />
          <Stack direction={'row'} spacing={2}>
            <Button variant='contained'
              color='secondary'
              size='small'
              onClick={() => navigate("/create_student")}
            >Add Student</Button>
            <Button variant='contained'
              color='secondary'
              size='small'
              onClick={() => navigate("/create_exam")}
            >Add Exam</Button>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}

export default Class


export const Name = (props: { cellValue: GridRenderCellParams }) => {
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
    <Box minWidth={'100 %'} sx={{ cursor: 'pointer' }} >
      <Box onClick={handleClick}>
        {props.cellValue.value}
        {props.cellValue.id}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            navigate("/student");
            handleClose();
          }}>
          View Student
        </MenuItem>
        <MenuItem onClick={handleClose}>Delete Student</MenuItem>
      </Menu>
    </Box>
  );
}

export const Score = (props: { cellValue: GridRenderCellParams }) => {
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
      <Box sx={{ cursor: 'pointer' }} onClick={handleClick} >
        {props.cellValue.value}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={handleClose}>Edit Score</MenuItem>
        <MenuItem onClick={handleClose}>Delete Score</MenuItem>
      </Menu>
    </>
  );
}

export const Exam = (props: { cellValue: GridColumnHeaderParams }) => {
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
            navigate("/exam")
          }}>View Exam</MenuItem>
        <MenuItem onClick={handleClose}>Delete Exam</MenuItem>
      </Menu>
    </>
  );
}