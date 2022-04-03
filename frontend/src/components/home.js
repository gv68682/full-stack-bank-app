import {MediaCard } from '../contexts/card';
import CardMedia from '@mui/material/CardMedia';
import imge from './images/n_home2.JPG'
function Home(){
  return (
    <> 
      <MediaCard
        header="Welcome to our bank!!"
        title= { <div style={{color: '#dc3545'}}><h6 >Best Bank Landing Page</h6></div>}
        media={
          <CardMedia
            component="img"
            image={imge}
            // sx={{ flexGrow: 1, flexBasis: 0 }}
            sx={{ width: '25%', height: '25%', paddingTop: '3%', paddingRight: '8%' }}
            alt="Home page" />
        }
        actions = { <div style={{color: 'black', paddingBottom: '7%'}}><p > <i>We value our customers!!! <br/> Explore various features as we keep enhancing <br/> our application to provide best user experience.</i></p></div>}
      />
    </>  
  );  
}

export {Home};