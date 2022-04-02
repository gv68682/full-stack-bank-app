import {MediaCard } from '../contexts/card';

function Home(){
  return (
    <> 
      <MediaCard
        header="Welcome to our bank!!"
        title= { <div style={{color: '#dc3545'}}><h6 >Best Bank Landing Page</h6></div>}
        actions = { <div style={{color: 'white'}}><h5 > We value our customers!!! <br/> Explore various features as we keep enhancing <br/> our application to provide best user experience.</h5></div>}
      />
    </>  
  );  
}

export {Home};