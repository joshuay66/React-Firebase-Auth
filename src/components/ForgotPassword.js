import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'


const ForgotPassword = () => {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e){
      e.preventDefault()
      
      try {
        setError('')
        setMessage('')
        setLoading(true)
        await resetPassword(emailRef.current.value)
        setMessage('Check your inbox for further instructions')
      } catch {
         setError('Failed to reset password') 
      }
      setLoading(false)
  }

  return <>
    <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Password Reset</h2>
            {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
            {message && <Alert variant="success" dismissible onClose={() => setMessage('')}>{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required/>
                </Form.Group>
                <Button disabled={loading} type="submit" className='w-100 mt-3'>Reset Password</Button>                          
            </Form>
            <div className='w-100 text-center mt-3'>
                <Link to="/login">Login</Link>
            </div>
        </Card.Body>
    </Card> 
    <div className='w-100 text-center mt-2'>
        Need an account? <Link to="/signup">Sign Up</Link>
    </div>
  </>;
};

export default ForgotPassword;
