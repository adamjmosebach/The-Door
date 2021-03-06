import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  createVolunteer,
  updateVolunteer,
  getVolunteer,
  deleteVolunteer,
} from '../../services/formServices.js'
import { Formik, Field } from 'formik'
import CheckboxInput from './CheckboxInput'
import flower4 from '../../assets/Form/flower4.svg'
import StandWith from '../../components/shared/StandWith/StandWith'
import './VolunteerForm.css'

function VolunteerForm({
  formStatus,
  setFormStatus,
  setVolunteerId,
  volunteerId,
}) {
  const [volunteer, setVolunteer] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    programs: [],
    roles: [],
  })
  const [serverErrors, setServerErrors] = useState({})

  const history = useHistory()

  useEffect(() => {
    if (formStatus === 'edit') {
      async function fetchVolunteer() {
        const volunteer = await getVolunteer(volunteerId)
        setVolunteer(volunteer)
      }
      fetchVolunteer()
    }
  }, [volunteerId])

  return (
    <>
      <div className='shim-1'></div>
      <div className='form-body'>
        <div className='shim-2'></div>
        <div
          className='flower-4'
          style={{
            backgroundImage: `url(${flower4})`,
            backgroundSize: 'cover',
            width: '100%',
            height: '100%',
            backgroundPositionY: '20%',
          }}>
          <div className='form-content'>
            <h1 className='volunteer-title'>Sign up to Volunteer</h1>

            <Formik
              initialValues={volunteer}
              enableReinitialize
              isValid
              validate={(values) => {
                const errors = {}
                if (!values.firstName) errors.firstName = 'Required'
                if (!values.lastName) errors.lastName = 'Required'
                if (!values.phone) errors.phone = 'Required'
                if (!values.email) {
                  errors.email = 'Required'
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                    values.email
                  )
                ) {
                  errors.email = 'Please enter a valid e-mail address'
                }
                if (values.programs.length === 0)
                  errors.programs = 'Please select a program choice.'
                if (values.roles.length === 0)
                  errors.roles = 'Please select a roles choice.'
                return errors
              }}
              onSubmit={async (value) => {
                let response
                if (formStatus === 'edit') {
                  response = await updateVolunteer(volunteerId, value)
                } else {
                  response = await createVolunteer(value)
                  await setVolunteerId(response.data._id)
                }
                // if Status is NOT OK
                if (!(response.status >= 200 && response.status <= 300)) {
                  return setServerErrors(response.data)
                }
                // implied "else" ...
                setFormStatus('submitted')
              }}>
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  <div className='primary-data-section'>
                    <div className='primary-data-field'>
                      <label htmlFor='firstName'>First Name</label>
                      <Field name='firstName' className='text' type='text' />
                    </div>

                    <div className='primary-data-field'>
                      <label htmlFor='lastName'>Last Name</label>
                      <Field name='lastName' className='text' type='text' />
                    </div>

                    <div className='primary-data-field'>
                      <label htmlFor='phone'>Phone</label>
                      <Field name='phone' className='text' type='text' />
                    </div>

                    <div className='primary-data-field'>
                      <label htmlFor='email'>Email</label>
                      <Field name='email' className='text' type='text' />
                    </div>
                  </div>
                  <div className='checkbox-groups-flexbox'>
                    <div className='checkbox-group' id='program-selection'>
                      <h2>Which programs would you like to assist with?</h2>
                      <div
                        role='group'
                        className='checkbox-input-group'
                        aria-labelledby='checkbox-group'
                        id='program-input-group'>
                        <CheckboxInput
                          props={props}
                          name='programs'
                          value='Health Services'
                        />
                        <CheckboxInput
                          props={props}
                          name='programs'
                          value='College and Academic Supports'
                        />
                        <CheckboxInput
                          props={props}
                          name='programs'
                          value='Creative Arts'
                        />
                        <CheckboxInput
                          props={props}
                          name='programs'
                          value={
                            "Broome Street Academy \n(The Door's charter high school)"
                          }
                        />
                        <CheckboxInput
                          props={props}
                          name='programs'
                          value='Career Services'
                        />
                        <CheckboxInput
                          props={props}
                          name='programs'
                          value='Runaway and Homeless Youth'
                        />
                        <CheckboxInput
                          props={props}
                          name='programs'
                          value='High School Equivalency (or GED)'
                        />
                        <CheckboxInput
                          props={props}
                          name='programs'
                          value='Mental Health'
                        />
                        <CheckboxInput
                          props={props}
                          name='programs'
                          value='LGBTQ'
                        />

                        <CheckboxInput
                          props={props}
                          name='programs'
                          value='Legal Services'
                        />
                        <CheckboxInput
                          props={props}
                          name='programs'
                          value={"Hmmm I'm not sure yet.."}
                        />
                      </div>
                    </div>

                    <div className='checkbox-group' id='role-selection'>
                      <h2>What roles are you interested in?</h2>

                      <div
                        role='group'
                        className='checkbox-input-group'
                        aria-labelledby='checkbox-group'
                        id='role-input-group'>
                        <CheckboxInput
                          props={props}
                          name='roles'
                          value='Volunteer'
                        />
                        <CheckboxInput
                          props={props}
                          name='roles'
                          value='Advocate'
                        />
                        <CheckboxInput
                          props={props}
                          name='roles'
                          value='Mentor'
                        />
                        <CheckboxInput
                          props={props}
                          name='roles'
                          value='Fundraiser'
                        />
                        <CheckboxInput
                          props={props}
                          name='roles'
                          value='Teach Class'
                        />
                        <CheckboxInput
                          props={props}
                          name='roles'
                          value={"Hmmm I'm not sure yet.."}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='button-area'>
                    <button
                      className={`form submit-button ${
                        props.isValid && (props.dirty || formStatus === 'edit')
                          ? 'active'
                          : null
                      }`}
                      type='submit'>
                      <span className='button-text'>
                        {formStatus === 'edit' ? 'Update' : 'Submit'}
                      </span>
                    </button>
                    {formStatus === 'edit' && (
                      <button
                        className={'form delete-button active'}
                        onClick={() => {
                          deleteVolunteer(volunteerId)
                          history.push('/')
                        }}>
                        <span className='button-text'>Nevermind</span>
                      </button>
                    )}
                  </div>
                </form>
              )}
            </Formik>
          </div>

          <pre>
          {Object.keys(serverErrors).length ? 
            serverErrors.error
             : ''}
            </pre>
        </div>
        <StandWith />
      </div>
    </>
  )
}

export default VolunteerForm
