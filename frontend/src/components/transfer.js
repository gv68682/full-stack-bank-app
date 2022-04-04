import { useContext, useState, useEffect } from 'react';
import { MediaCard } from '../contexts/card';
import { AuthContext } from '../contexts/Auth/authContext';
import Button from '@mui/material/Button'
import { InputLabel } from '@mui/material';
import { bankAPI } from '../services';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CardMedia from '@mui/material/CardMedia';
import imge from './images/n_transfer2.JPG'
import imge_s from './images/n_success.JPG'


function Transfer() {

    const { userInfo, saveUserInfo } = useContext(AuthContext);
    const [show, setShow] = useState(true);
    const [status, setStatus] = useState('');
    const [transferAmount, setTransferAmount] = useState(0);
    const [allUsersData, setAllUsersData] = useState([])
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(async () => {
        const response = await bankAPI.allUsers();
        let arr1 = [{ "Select Account": "select acc" }];
        const filtered = response.data.filter(user => user.name != userInfo.name)
        let arr2 = arr1.concat(filtered)
        setAllUsersData(arr2);
    }, []);

    const handleChange = (event) => {
        const idx = Number(event.target.value)
        setSelectedAccount(allUsersData[idx]);
        setSelectedIndex(idx);
    };

    function validate(field, label) {

        if (!selectedAccount) {
            setTransferAmount(0)
            setStatus('Select account to transfer!')
            setTimeout(() => setStatus(''), 6000);
            return false;
        }
        if (userInfo.balance == "null") {
            setTransferAmount(0)
            setStatus('Account has 0 balance to transfer')
            setTimeout(() => setStatus(''), 6000);
            return false;
        }
        if (!field) {
            setTransferAmount(0)
            setStatus('Enter amount to transfer!')
            setTimeout(() => setStatus(''), 6000);
            return false;
        }
        if (field <= 0) {
            setTransferAmount(0)
            setStatus('Error: Invalid amount! ')
            setTimeout(() => setStatus(''), 6000);
            return false;
        }
        if (field <= userInfo.balance && field > 10000) {
            setTransferAmount(0)
            setStatus('Exceeded transfer limit per day!')
            setTimeout(() => setStatus(''), 6000);
            return false;
        }
        if (field > userInfo.balance) {
            setTransferAmount(0)
            setStatus('Amount is greaterthan balance!')
            setTimeout(() => setStatus(''), 6000);
            return false;
        }

        return true;
    }

    let handleTransfer = async () => {
        if (!validate(transferAmount, selectedAccount)) return;
        //console.log("userinfo balance", userInfo.balance)
        let newBalance = Number(userInfo.balance) - Number(transferAmount);
        await bankAPI.updateUser(userInfo._id, { balance: newBalance });
        //console.log("userinfo balance after UPDATE", userInfo.balance)
        userInfo.balance = newBalance;
        //console.log("local storage userinfo balance", userInfo.balance)
        await saveUserInfo(userInfo._id);
        //console.log("userinfo balance after GET Call", userInfo.balance)

        //Update other account balance
        let otherUserNewAccBalance = Number(selectedAccount.balance) + Number(transferAmount);
        await bankAPI.updateUser(selectedAccount._id, { balance: otherUserNewAccBalance });
        setShow(false);
    }
    function clearForm() {
        let arr1 = [{ "Select Account": "select acc" }];
        const filtered = allUsersData.filter(user => user.name != userInfo.name)
        let arr2 = arr1.concat(filtered)
        setAllUsersData(arr2);
        setTransferAmount(0);
        setShow(true);
    }

    if (show) {
        return <MediaCard
            header="Transfer"
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
                    <div>
                        <FormControl fullWidth>
                            <div style={{ color: '#a31f34', paddingBottom: '25px' }}> Select Account to Transfer </div>
                            <InputLabel id="demo-simple-select-label" sx={{ paddingBottom: '10px' }} ></InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Select Account to Transfer"
                                onChange={handleChange}
                                sx={{ backgroundColor: 'white', height: '40px' }}
                                value={selectedIndex}
                            >
                                {allUsersData.map((user, index) => { return <MenuItem sx={{ color: "black" }} key={index} value={index}>{user.name}</MenuItem> })}
                                {/* <MenuItem value={10}>Ten</MenuItem> */}
                            </Select>
                        </FormControl>
                    </div>
                    <InputLabel sx={{ paddingTop: '30px'}}>Transfer Amount </InputLabel>
                    <input type="number" className="form-control" id="name" placeholder="Enter Amount" value={transferAmount} onChange={e => setTransferAmount(e.currentTarget.value)} /><br />
                    <Button variant='contained' type="submit" color='primary' onClick={handleTransfer}>Transfer Now</Button>
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
                  sx={{ width: '18%', height: '18%', paddingTop: '3%', paddingRight: '8%' }}
                  alt="Success page" />
            }
            actions={
                <div>
                    <Button variant='contained' type="submit" onClick={clearForm}>Want to transfer again?</Button>
                </div>
            }
        />
    }

}

export { Transfer };