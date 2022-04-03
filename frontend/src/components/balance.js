import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/Auth/authContext';

import { MediaCard } from '../contexts/card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button'
import { InputLabel } from '@mui/material';
import imge from './images/b_balance.JPG'


function Balance() {

  const { userInfo, saveUserInfo } = useContext(AuthContext);
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const {auth} = useContext(AuthContext);

  function validate(field, label) {

    if (field && !field.includes('@')) {
      setStatus('Error: Invalid email!!')
      setTimeout(() => setStatus(''), 6000);
      setTimeout(() =>  clearForm(), 5000);
      return false;
    }
    if (!field) {
      setStatus('Error: '+ label + '  is mandatory!')
      setTimeout(() => setStatus(''), 6000);
      return false;
    }
    return true;
  }
 let handleSubmit = async () => {
    if (!validate(email, 'Email')) return;
    if (email !== userInfo.email){
        setStatus("Email doesn't belong to you!")
        setTimeout(() => setStatus(''), 5000);
        setTimeout(() =>  clearForm(), 5000);
        return false;      
    }
      let response = await   saveUserInfo(userInfo._id);
      setShow(false);
  }
  function clearForm() {
    setEmail('');
    setShow(true);
  }

  if (show) {
    return <MediaCard
      header="Check Balance"
      status={status}
      media={
        <CardMedia
          component="img"
          image={imge}
          sx={{ flexGrow: 1, flexBasis: 0 , width: '40%', height: '30%', paddingTop: '3%',paddingRight: '5%'}}
          alt="Balance page" />
      }
      actions={
        <div>
          <InputLabel>Email</InputLabel>
          <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br />
          <Button variant='contained' type="submit" color='primary' onClick={handleSubmit}>Balance</Button>
        </div>
      }
    />
  } else {

    return <MediaCard
      header= {`Account Balance: ${userInfo.balance} `}
      title= {<h5>"You can also see account balance from deposit or withdraw sections."</h5>}
      actions={
        <div>
          <Button variant='contained' type="submit" onClick={clearForm}>Want to check balance again?</Button>
        </div>
      }
    />
  }

}

export { Balance };