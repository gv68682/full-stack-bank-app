import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/Auth/authContext';

import { MediaCard } from '../contexts/card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button'
import { InputLabel } from '@mui/material';
import imge from './images/n_home2.JPG'

function CreateAccount() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState(false);

  const { auth } = useContext(AuthContext);
  const { signup } = useContext(AuthContext);
  const { userInfo } = useContext(AuthContext);


  function validate(field, label) {

    if (!field) {
      setStatus(label + '  is mandatory!');
      return false;
    }
    if ((field && label == 'Email' && !field.includes('@'))) {
      setStatus('Error: Invalid email!!')
      return false;
    }
    if ((field && label == 'Email' && field.substring(0, 1) === '@')) {
      setStatus('Error: Invalid email!!')
      return false;
    }

    let l = field.length;
    let v = field.substring(l - 4, l)
    if ((field && label == 'Email') && (v !== '.edu' && v !== '.com' && v !== '.org' && v !== '.net' && v !== '.biz')) {
      setStatus('Error: Invalid email!!')
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
    // if (!validate(email, 'Email')) {
    //   //setTimeout(() => setStatus(''), 4000)
    //   return false;
    // }
    pwdVal(password, true);
    if (name.length > 0 && email.length > 0 && password.length > 0) { setValidation(true); }
    else setValidation(false);
  }

  useEffect(() => {
    formValidate();
  }, [name, password]);

  const handleCreate = async () => {
    if (!validate(name, 'Name')) return;
    if (!validate(email, 'Email')) return;
    if (!pwdVal(password)) return;
    setShow(false);
    // signup(name, email, password)
    if (await signup(name, email, password) === false) {
      setStatus('User exists, try to login!');
      setValidation(false);

    }
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
      // media={
      //   <CardMedia
      //     component="img"
      //     image={imge}
      //     sx={{ width: '20%', height: '20%', paddingTop: '3%', paddingRight: '8%' }}
      //     alt="Success page" />
      // }
      actions={
        <div>
          <InputLabel>Name </InputLabel>
          <input type="input" maxLength="6" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br />
          <InputLabel>Email Adress </InputLabel>
          <input type="input" maxLength="15" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br />
          <InputLabel>Password </InputLabel>
          <input type="password" maxLength="10" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)} /><br />
          <Button variant='contained' type="submit" color='primary' disabled={!validation} onClick={handleCreate}>Create Account</Button>
        </div>
      }

      link={
        <div style={{ paddingBottom: '25px' }}>
          <br />
          <span style={{ color: 'black', paddingLeft: '8px' }}> Already have an account?</span>
          <span><a style={{ color: '#a31f34' }} href="http://padma-vel-full-stack-bank-app.s3-website-us-east-1.amazonaws.com/login"> Log-in</a> </span>
          {/* http://localhost:3000/login*/}
        </div>
      }
    />
  } else {

    return <MediaCard
      header="Success"
      title="Created new account"
      actions={
        <div>
          <Button variant='contained' type="submit" onClick={clearForm}>Add another account</Button>
        </div>
      }
    />
  }
}
export { CreateAccount };
