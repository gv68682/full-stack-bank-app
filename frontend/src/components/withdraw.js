import { useContext, useState } from 'react';
import { MediaCard } from '../contexts/card';
import { AuthContext } from '../contexts/Auth/authContext';
import { bankAPI } from '../services';

import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button'
import { InputLabel } from '@mui/material';
import imge_s from './images/b_signup_s.JPG'


function Withdraw() {

  const { userInfo, saveUserInfo } = useContext(AuthContext);
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState(0);


  function validate(field, label) {

    if (userInfo.balance == "null") {
      setWithdrawAmount(0)
      setStatus('Account has 0 balance to withdraw')
      setTimeout(() => setStatus(''), 6000);
      return false;
    }
    if (!field) {
      setWithdrawAmount(0)
      setStatus('Error: Mandatory field!')
      setTimeout(() => setStatus(''), 6000);
      return false;
    }
    if (field <= 0 ) {
      setWithdrawAmount(0)
      setStatus('Error: Invalid amount! ')
      setTimeout(() => setStatus(''), 6000);
      return false;
    }
    if (field <= userInfo.balance && field > 10000) {
      setWithdrawAmount(0)
      setStatus('Exceeded withdraw limit per day!')
      setTimeout(() => setStatus(''), 6000);
      return false;
    }
    if (field > userInfo.balance) {
      setWithdrawAmount(0)
      setStatus('Amount is greaterthan balance!')
      setTimeout(() => setStatus(''), 6000);
      return false;
    }
    return true;
  }

  let handleWithdraw = async () => {
  
    if (!validate(withdrawAmount, 'Invalid transaction. ')) return;
    let newBalance = Number(userInfo.balance) - Number(withdrawAmount);
    await bankAPI.updateUser(userInfo._id, { balance: newBalance });
    userInfo.balance = newBalance;
    await saveUserInfo(userInfo._id);
    setShow(false);
  }

  function clearForm() {
    setWithdrawAmount(0);
    setShow(true);
  }

  if (show) {
    return <MediaCard
      header="Withdraw"
      title={`Account Balance: ${userInfo.balance} `}
      status={status}
      actions={
        <div>
          <InputLabel>Withdraw Amount </InputLabel>
          <input type="number" className="form-control" id="name" placeholder="Enter Amount" value={withdrawAmount} onChange={e => setWithdrawAmount(e.currentTarget.value)} /><br />
          <Button variant='contained' type="submit" color='primary' onClick={handleWithdraw}>Withdraw Now</Button>
        </div>
      }
    />
  } else {

    return <MediaCard
      header="Success"
      title={`Latest Account Balance: ${userInfo.balance} `}
      media={
        <CardMedia
          component="img"
          image={imge_s}
          sx={{ flexGrow: 0, flexBasis: 0 }}
          alt="Withdraw page" />
      }
      actions={
        <div>
          <Button variant='contained' type="submit" onClick={clearForm}>Want to withdraw more?</Button>
          {/* <div>  {status}</div> */}
        </div>
      }
      status={status}
    />
  }
}

export { Withdraw };