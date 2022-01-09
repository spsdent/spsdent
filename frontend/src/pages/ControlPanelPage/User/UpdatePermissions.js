import React, { useState, useEffect, isValidElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Field, Form } from 'formik'
import Select from 'react-select'

import { refreshApp } from '../../../store/actions/refresh'
import DoctorService from '../../../services/doctor'
import UserService from '../../../services/user'
import RoleService from '../../../services/role'
import ServiceData from '../../../services/service'
import {
  updatePermissionsValidationSchema,
  godzinyKoniec,
  godzinyStart,
  specjalizacja,
  updateRoleValidationSchema,
} from '../../../utils/validationSchemas'

import useFetchAllUsers from '../../../hooks/useFetchAllUsers'

const UpdateUser = ({ setBtnType, selectedUser }) => {
  let initialState = {
    rola: {
      value: '',
      label: '',
    },
    specjalizacja: [],
    godzinyStart: '',
    godzinyKoniec: '',
  }
  const [user, setUser] = useState(initialState)
  const [doctorsArr, setDoctorsArr] = useState([])
  const [rolesArr, setRolesArr] = useState([])
  const [specsArr, setSpecsArr] = useState([])
  const [selectedSpecs, setSelectedSpecs] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const { isRefresh } = useSelector((state) => state.refresh)
  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const allUsers = useFetchAllUsers()

  useEffect(() => {
    retrieveDoctors()
    retrieveRoles()
    retrieveSpecs()
  }, [isRefresh])

  const retrieveDoctors = () => {
    DoctorService.getAll()
      .then((response) => {
        setDoctorsArr(response.data)
      })
      .catch((e) => console.log(e))
  }

  const retrieveRoles = () => {
    RoleService.getAll()
      .then((response) => {
        setRolesArr(response.data)
      })
      .catch((e) => console.log(e))
  }

  const retrieveSpecs = () => {
    ServiceData.getAll()
      .then((response) => {
        setSpecsArr(response.data)
      })
      .catch((e) => console.log(e))
  }

  const updateRoles = () => {
    const rolesIdArr = selectedOption.value
    let userObj = {
      roles: rolesIdArr,
    }
    const currentSelectedUser = allUsers.filter(
      (user) => user._id === selectedUser
    )[0]
    const selectedUserIsSpec = currentSelectedUser.roles.includes(
      '61a795d1bd23a782906a1dfd'
    )
    const doctorToDelete = doctorsArr.filter(
      (doctor) => doctor.doctorId === selectedUser
    )[0]
    if (
      selectedUserIsSpec &&
      doctorToDelete &&
      selectedOption.label !== 'spec'
    ) {
      DoctorService.remove(doctorToDelete._id)
        .then((res) => console.log('usunieto pomyslnie', res))
        .catch((e) => console.log(e))
      UserService.updateUser(selectedUser, userObj)
        .then((response) => {
          setBtnType('')
          setUser({
            roles: [{}],
          })
          setSelectedOption(null)
          setErrorMsg('')
        })
        .catch((e) => console.log(e))
    }
    UserService.updateUser(selectedUser, userObj)
      .then((response) => {
        setBtnType('')
        setUser({
          roles: [{}],
        })
        setSelectedOption(null)
        setErrorMsg('')
      })
      .catch((e) => console.log(e))
  }

  const handleDoctor = (values) => {
    const specsIdArr = selectedSpecs.map((spec) => spec.value)
    let godzinyPracy = []
    for (let i = +values.godzinyStart; i <= +values.godzinyKoniec; i++) {
      godzinyPracy = [...godzinyPracy, i]
    }
    let doctorObj = {
      doctorId: selectedUser,
      specjalnosci: specsIdArr,
      godzinyPracy,
    }
    const isDoctorAlreadyCreated = doctorsArr.filter(
      (doctor) => doctor.doctorId === selectedUser
    )

    if (isDoctorAlreadyCreated.length > 0) {
      const doctorId = isDoctorAlreadyCreated[0]._id
      DoctorService.update(doctorId, doctorObj)
        .then((response) => {
          setBtnType('')
          setUser({
            godzinyStart: '',
            godzinyKoniec: '',
          })
          setSelectedSpecs(null)
          setErrorMsg('')
        })
        .catch((e) => console.log(e))
    } else {
      DoctorService.create(doctorObj)
        .then((response) => {
          setBtnType('')
          setUser({
            godzinyStart: '',
            godzinyKoniec: '',
          })
          setSelectedSpecs(null)
          setErrorMsg('')
          console.log(response)
        })
        .catch((e) => console.log(e))
    }
  }

  const handleUpdateMethods = (values) => {
    if (selectedOption && !selectedSpecs) {
      updateRoles(values)
    } else if (selectedOption && selectedSpecs) {
      updateRoles(values)
      handleDoctor(values)
    } else if (selectedSpecs) {
      handleDoctor(values)
    } else {
      setErrorMsg('Jesli chcesz zaktualizowac wprowadz dane')
    }
  }

  return (
    <>
      {selectedUser && (
        <Formik
          enableReinitialize={true}
          initialValues={user}
          validationSchema={
            selectedOption && selectedOption.label === 'spec'
              ? updatePermissionsValidationSchema
              : updateRoleValidationSchema
          }
          onSubmit={(values, actions) => {
            handleUpdateMethods(values)
          }}
        >
          {({ errors, touched, values, setValues, handleBlur }) => (
            <Form
              style={{
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <>
                <label>Role</label>
                <Select
                  isClearable
                  onChange={(value) => {
                    setSelectedOption(value)
                    setValues({ ...values, rola: value })
                  }}
                  placeholder='Wybierz role...'
                  options={rolesArr.map((role) => ({
                    value: role._id,
                    label: role.name,
                  }))}
                  name='rola'
                  onBlur={handleBlur}
                />
                {values.rola && values.rola.label === 'spec' && (
                  <>
                    <label>Specjalizacja</label>
                    <Select
                      isMulti
                      defaultValue={selectedSpecs}
                      onChange={(value) => {
                        setSelectedSpecs(value)
                        setValues({ ...values, specjalizacja: [...value] })
                      }}
                      options={specsArr.map((spec) => ({
                        value: spec._id,
                        label: spec.grupa,
                      }))}
                      name='specjalizacja'
                      onBlur={handleBlur}
                    />
                    {errors.specjalizacja && touched.specjalizacja ? (
                      <p style={{ color: 'red' }}>{errors.specjalizacja}</p>
                    ) : null}
                    <label>Godziny pracy</label>
                    <div style={{ display: 'flex' }}>
                      <p>Od</p>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Field
                          name='godzinyStart'
                          style={{
                            backgroundColor: 'transparent',
                            border: '2px solid #333',
                            height: '3em',
                            paddingLeft: '1em',
                            width: '100%',
                            marginRight: '5px',
                          }}
                          placeholder='Start pracy'
                          onBlur={handleBlur}
                        />
                        {errors.godzinyStart && touched.godzinyStart ? (
                          <p style={{ color: 'red' }}>{errors.godzinyStart}</p>
                        ) : null}
                      </div>
                      <p>do</p>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Field
                          name='godzinyKoniec'
                          style={{
                            backgroundColor: 'transparent',
                            border: '2px solid #333',
                            height: '3em',
                            paddingLeft: '1em',
                            width: '100%',
                            marginLeft: '5px',
                          }}
                          placeholder='Koniec pracy'
                          onBlur={handleBlur}
                        />
                        {errors.godzinyKoniec && touched.godzinyKoniec ? (
                          <p style={{ color: 'red' }}>{errors.godzinyKoniec}</p>
                        ) : null}
                      </div>
                    </div>
                  </>
                )}
                {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
                {values.rola && values.rola.label !== '' && (
                  <button
                    type='submit'
                    style={{
                      backgroundColor: 'none',
                      border: '2px solid #333',
                      height: '3em',
                      margin: '10px 0',
                      cursor: 'pointer',
                    }}
                  >
                    Aktualizuj uprawnienia
                  </button>
                )}
              </>
            </Form>
          )}
        </Formik>
      )}
    </>
  )
}

export default UpdateUser
