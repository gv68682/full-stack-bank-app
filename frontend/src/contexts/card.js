import { createContext, useState, useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { AuthContext } from './Auth/authContext';
import Typography from '@mui/material/Typography';

const UserContext = createContext(null);

function MediaCard(props) {
  return (
    <>
      <Card sx={{ maxWidth: 1100, maxHeight: 1000, display: 'flex', justifyContent: 'flex-start', columnGap: '0%', background: '#f5f5f5' }} >
        <div style={{ display: 'flex', flexDirection: "column", flexGrow: 1, columnGap: '0%' }}>
          {/* <div style={{ width: '50%', height: '130%', justifyContent: 'center', borderColor: 'white', borderStyle: 'solid', borderWidth: '1px'}}> */}
            <CardContent sx={{ paddingLeft: '7px', flexGrow: 1, marginBottom: '5%' }}>
              <Typography gutterBottom variant="h5" sx={{ color: 'black' }} component="div">
                {props.header}
              </Typography>
              <Typography variant="body2" gutterBottom variant="h6" color="text.secondary" sx={{ color: 'black' }} >
                {props.title}
              </Typography>
            </CardContent>
            <CardActions sx={{ flexGrow: 2 }}>
              {/* {console.log("Media card")} */}
              {props.actions}
            </CardActions>
            <div style={{ color: 'black' }}>{props.status} </div>
            {props.link}
          {/* </div> */}
        </div>
        {props.media}
      </Card>
    </>
  );
}
export { MediaCard };



























//width: '1%', height: '5%', borderColor: 'white', borderStyle: 'solid', borderWidth: '1px', 

// const MediaCard = (props) => {
//   return (
//     <Box sx={{display: 'flex', justifyContent:'flex-start', columnGap:'12%', background:'black'}}>
//       <Box >
//         <Typography gutterBottom variant="h4" sx={{ color: 'white' }} component="div">
//           {props.header}
//         </Typography>
//         <Button> SignUp</Button>
//         <Button> Signin</Button>
//       </Box>
//       <Box sx={{background: 'white'}}>
//         <img src={bank} width="100px" height="100px"/>
//       </Box>
//     </Box>
//   )
// }
