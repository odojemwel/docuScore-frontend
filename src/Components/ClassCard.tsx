import { EditRounded } from '@mui/icons-material'
import { Avatar, Box, Card, CardHeader, IconButton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'


interface ClassCardContext {
  classId: number,
  subject: String,
  section: String,
  yearLevel: number
}


const ClassCard = (props: ClassCardContext) => {
  const navigate = useNavigate()
  return (
    <Card
      style={{ backgroundColor: '#B1FAFF' }}
      sx={{ border: 2, width: 'auto', height: 150, borderColor: '#1CA1FC', cursor: 'pointer' }}
      onClick={() => (navigate(`/class/${props.classId}`))}>
      <CardHeader title={`${props.subject}`}
        action={
          <Avatar sx={{ backgroundColor: '#ffffff' }}>
            <IconButton sx={{ color: '#000000' }}
              // component={Link}
              // to="/edit_class"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/edit_class");
              }}
            >
              <EditRounded />
            </IconButton>
          </Avatar>

        }
        subheader={
          <Box sx={{ marginTop: 5 }}>
            <Typography>Year Level: {props.yearLevel} </Typography>
            <Typography>Section: {props.section}</Typography>
          </Box>
        }>
      </CardHeader>
    </Card>
  )
}

export default ClassCard



export const InactiveClass = (props: { className: String }) => {
  return (
    <Card
      sx={{
        border: 2, width: 'auto', height: 150, borderColor: '#1CA1FC',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        cursor: 'pointer'
      }}>
      <CardHeader
        title={props.className}>
      </CardHeader>
    </Card>
  )
}



export const CreateClassCard = () => {
  const navigate = useNavigate()
  return (
    <Card
      sx={{
        border: 2, width: 'auto', height: 150, borderColor: '#1CA1FC', cursor: 'pointer',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        borderStyle: 'dashed'
      }}
      onClick={() => navigate("/create_class")}>
      <CardHeader title={"+Create Class"} sx={{ color: '#8E8E8E' }}>
      </CardHeader>
    </Card>
  )
}

