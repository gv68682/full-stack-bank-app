import {useContext, useState} from 'react';
import styled from 'styled-components'
import logo from '../../NavBar/n_logol.JPG'

import * as Yup from 'yup'
import { Formik, Form } from 'formik'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
// import { DebugFormik } from '../../../util/DebugFormik'
import { AuthContext } from '../../../contexts/Auth/authContext'

const userSchema = Yup.object().shape({
  email: Yup.string().required('Required field'),
  password: Yup.string().required('Required field'),
})

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 60vh;
  justify-content: center;
`
const Logo = styled.img`
  width: 50px;
`

export const Login = () => {

  const [status, setStatus]     = useState('');
  const { login } = useContext(AuthContext)
  const handleSubmit = async (values) => {
    //login(values.email, values.password)
    if (await login(values.email, values.password) === false) {
      setStatus('Wrong Credentials!')
     
    }
  }
  return (
    <Container>
      <Logo src={logo} />
      <Formik
        initialValues={{ email: 'abel@mit.edu', password: 'secret' }}
        validationSchema={userSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, values, handleChange, touched, errors }) => {
          return (
            <>
              <Form>
                <TextField
                  style={{ marginBottom: '16px', marginTop: '26px', backgroundColor: 'white'}}
                  fullWidth
                  id='email'
                  name='email'
                  label='Email'
                  size='small'
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  style={{ marginBottom: '32px', backgroundColor: 'white'}} 
                  fullWidth
                  id='password'
                  name='password'
                  label='Password'
                  type='password'
                  size='small'
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />

                <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  type='submit'
                  disabled={!isValid || isSubmitting}
                >
                  Log in
                </Button>
                <div style={{color: 'white'}}>{status}</div>
                <div> 
                  <br/>
                  <span style={{color: 'black'}}> Do not have an account?</span>
                  <span><a style={{color: '#a31f34'}} href = "http://padma-vel-full-stack-bank-app.s3-website-us-east-1.amazonaws.com/createAccount"> Sign-up</a> </span>
                  {/* http://localhost:3000/createAccount */}
                </div>
               
              </Form>
              {/* <DebugFormik /> */}
            </>
          )
        }}
      </Formik>
    </Container>
  )
}
