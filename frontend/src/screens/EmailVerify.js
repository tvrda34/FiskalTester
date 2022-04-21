import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { verifyEmail } from '../actions/userActions'
import { useSearchParams } from 'react-router-dom'

function EmailVerify() {

    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get('token')

    const dispatch = useDispatch()
    const verified = useSelector(state => state.verified)

    useEffect(() => {
        dispatch(verifyEmail(token))
    }, [dispatch])
  
    return (
        <div className="container">
          <div className="row">
            <div className="col-md-12">

              <div className="custom-alert">
                  
                    {verified === 1 && (
                      <div class="alert alert-success" role="alert">
                        <p>Email Verification Done</p>
                      </div>
                    )}
                    {verified === 2 && (
                      <div class="alert alert-danger" role="alert">
                        <p>Email Verification Failed. Email may be already verified or the link is broken.</p>
                      </div>
                    )}

              </div>

            </div>
          </div>
        </div>
    )
}

export default EmailVerify