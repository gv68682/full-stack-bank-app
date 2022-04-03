import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/Auth/authContext';
import { MediaCard } from '../contexts/card';
import { bankAPI } from '../services';

import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button'
import { InputLabel } from '@mui/material';
import imge from './images/n_deposit1.JPG'
import imge_s from './images/n_success.JPG'


function Deposit() {

  const { userInfo, saveUserInfo } = useContext(AuthContext);
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');
  const [depositAmount, setDepositAmount] = useState(0);


  function validate(field, label) {
  
    if (!field) {
      setDepositAmount(0);
      setStatus('Error: Mandatory field!')
      setTimeout(() => setStatus(''), 6000);
      // alert('Amount should be between 1 & 10000')
      return false;
    }
    if (field <= 0 ) {
      setDepositAmount(0);
      setStatus('Error: Invalid deposit amount! ')
      setTimeout(() => setStatus(''), 6000);
      return false;
    }
    if ( field > 10000) {
      setDepositAmount(0);
      setStatus('Exceeded deposit limit per day!')
      setTimeout(() => setStatus(''), 6000);
      return false;
    }
    return true;
  }

  let handleCreate = async () => {
    if (!validate(depositAmount, 'Invalid transaction. ')) return;
    let newBalance = Number(userInfo.balance) + Number(depositAmount);
    //console.log(userInfo._id)
    await bankAPI.updateUser(userInfo._id, { balance: newBalance });
    //console.log("userinfo balance after UPDATE", userInfo.balance)
    userInfo.balance = newBalance;
    //console.log("local storage userinfo balance", userInfo.balance)
    await saveUserInfo(userInfo._id)
    //console.log("userinfo balance after GET Call", userInfo.balance)
    setShow(false);
  }
  function clearForm() {
    setDepositAmount(0);
    setShow(true);
  }

  if (show) {
    return <MediaCard
      header="Deposit"
      title={`Account Balance: ${userInfo.balance} `}
      status={status}
      media={
        <CardMedia
          component="img"
          image={imge}
          // sx={{ flexGrow: 1, flexBasis: 0 }}
          sx={{ width: '25%', height: '25%', paddingTop: '5%', paddingRight: '8%' }}
          alt="Deposit page" />
      }
      actions={
        <div>
          <InputLabel>Deposit Amount </InputLabel>
          <input type="number" className="form-control" id="name" placeholder="Enter Amount" value={depositAmount} onChange={e => setDepositAmount(e.currentTarget.value)} /><br />
          <Button variant='contained' type="submit" color='primary' onClick={handleCreate}>Deposit Now</Button>
        </div>
      }
    />
  } else {

    return <MediaCard
      header="Success"
      title={`Account Balance: ${userInfo.balance} `}
      media={
        <CardMedia
          component="img"
          image={imge_s}
          sx={{ width: '20%', height: '20%', paddingTop: '3%', paddingRight: '8%' }}
          alt="Success page" />
      }
      actions={
        <div>
          <Button variant='contained' type="submit" onClick={clearForm}>Want to deposit more?</Button>
        </div>
      }
    />
  }

}

export { Deposit };