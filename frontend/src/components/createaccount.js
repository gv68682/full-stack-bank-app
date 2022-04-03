import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/Auth/authContext';

import { MediaCard } from '../contexts/card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button'
import { InputLabel } from '@mui/material';
import imge_s from './images/b_signup_s.JPG'

function CreateAccount() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState(false);

  const { auth } = useContext(AuthContext);
  const { signup } = useContext(AuthContext);
  const {userInfo} = useContext(AuthContext);


  function validate(field, label) {
    if (!field) {
      setStatus( label + '  is mandatory!');
      return false;
    }
    return true;
  }

  function pwdVal(field, onlyClear) {
    if (field.length < 6) {
      if (!onlyClear) setStatus('Pwd must be 6 char min');
      return false
    }
    setStatus('');
    return true
  }

  function formValidate() {
    if (!validate(name, 'Name')) {
      setTimeout(() => setStatus(''), 2000)
      return false;
    }
      if (!validate(email, 'Email')) {
        setTimeout(() => setStatus(''), 4000)
        return false;
      }
    pwdVal(password, true);
    if (name.length > 0 && email.length > 0 && password.length > 0) { setValidation(true); }
    else setValidation(false);
  }

  useEffect(() => {
    formValidate();
  }, [name, email, password]);

  function handleCreate() {
    if (!validate(name, 'Name is mandatory!')) return;
    if (!validate(email, 'Email is mandatory!')) return;
    if (!pwdVal(password)) return;
    setShow(false);
    signup(name, email, password)
    //console.log("about to go to authContext signup function")
  }

  function clearForm() {
    setName('');
    setEmail('');
    setPassword('');
    setValidation(false);
    setShow(true);
  }

  if (!auth) {
    return <MediaCard
      header="Create Account"
      status={status}
      actions={
        <div>
          <InputLabel>Name </InputLabel>
          <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br />
          <InputLabel>Email Adress </InputLabel>
          <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br />
          <InputLabel>Password </InputLabel>
          <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)} /><br />
          <Button variant='contained' type="submit" color='primary' disabled={!validation} onClick={handleCreate}>Create Account</Button>
        </div>
      }

      link={
        <div>
          <br />
          <span style={{ color: 'black' }}> Already have an account?</span>
          <span><a style={{ color: '#a31f34' }} href="http://padma-vel-full-stack-bank-app.s3-website-us-east-1.amazonaws.com/login"> Log-in</a> </span>
        </div>
      }
    />
  } else {

    return <MediaCard
      header="Success"
      title="Created new account"
      media={
        <CardMedia
          component="img"
          image={imge_s}
          sx={{ flexGrow: 0, flexBasis: 0 }}
          alt="green iguana" />
      }
      actions={
        <div>
          <Button variant='contained' type="submit" onClick={clearForm}>Add another account</Button>
        </div>
      }
    />
  }
}
export { CreateAccount };
