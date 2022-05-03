import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { verifyEmail } from '../actions/userActions'
import { useParams } from 'react-router-dom'

function EmailVerifyScreen() {

    const { id } = useParams();
    const token = id;

    const dispatch = useDispatch()
    const verification = useSelector(state => state.verified)
    const { success } = verification

    useEffect(() => {
        dispatch(verifyEmail(token))
    }, [dispatch])
  
    return (
        <div className="container">
          <div className="row">
            <div className="col-md-12">

              <div className="custom-alert">
                  
                    {success === true && (
                      <div class="alert alert-success" role="alert">
                        <p>Email Verification Done</p>
                      </div>
                    )}
                    {success === false && (
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

export default EmailVerifyScreen