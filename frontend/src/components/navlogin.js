import {useContext, useState} from 'react';
import { AuthContext } from '../contexts/Auth/authContext';
import { MediaCard } from '../contexts/card';

import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button'
import { InputLabel } from '@mui/material';
import imge from './images/b_login.JPG'
import imge_s from './images/b_signup_s.JPG'

function NavLogin(){

    const { login } = useContext(AuthContext)
    const {userInfo} = useContext(AuthContext);
    const {auth} = useContext(AuthContext);

    const [status, setStatus]     = useState('');
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');

    function validate(field, label){
      if (label == 'email' && !field.includes('@')) {
        setStatus('Error: Invalid email!!')
        setTimeout(() => setStatus(''), 6000);
        setTimeout(() =>  clearForm(), 5000);
        return false;
      }
        if (!field) {
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''),3000);
            return false;
        }
        return true;
    }

  async function handleSubmit(){
    console.log(email,password);
    if (!validate(email,    'Email is mandatory!'))    return;
    if (!validate(email, 'email')) return;
    if (!validate(password, 'Password is mandatory!')) return;
    if (await login(email, password) === false) {
      setStatus('Wrong Credentials!')
    }
  }    

  function clearForm() {
    setPassword('')
  }

if(!auth) {
    return <MediaCard
    header="Login"
    media={
      <CardMedia
        component="img"
        image={imge}
        sx={{flexGrow: 0, flexBasis: 0, width: '60%', height: '50%', paddingTop: '1%'}}
        alt="Login page"/>
    }
    actions={
      <div>
        <InputLabel>Email Adress </InputLabel>
        <input type="input" className="form-control" id="email" placeholder="abel@mit.edu" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br />
        <InputLabel>Password </InputLabel>
        <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.currentTarget.value)} /><br />
        <Button variant='contained' type="submit" color='primary' onClick={handleSubmit}>Login</Button> 
        {/* disabled={!validation}  */}
      </div>
    }
    status={status}
    /> 
  } else {

    return <MediaCard
        header="You are already logged in!!!"
        media={
            <CardMedia
              component="img"
              image={imge_s}
              sx={{flexGrow: 1, flexBasis: 0}}
              alt="Login page"/>
        }
    />
  }
}
export { NavLogin };