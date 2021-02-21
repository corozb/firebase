import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import { db } from '../firebase'

const LinkForm = ({ addOrEdit, currentId }) => {
  const initialState = {
    name: '',
    url: '',
    description: '',
  }

  const [values, setValues] = useState(initialState)

  const validURL = (str) => {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ) // fragment locator
    return !!pattern.test(str)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validURL(values.url)) {
      return toast("There's no an url", { type: 'warning', autoClose: 1000 })
    }

    addOrEdit(values)
    setValues({ ...initialState })
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setValues({
      ...values,
      [name]: value,
    })
  }

  const getLink = async (id) => {
    const doc = await db.collection('links').doc(id).get()
    console.log(doc.data())
    setValues({ ...doc.data() })
  }

  useEffect(() => {
    console.log(currentId)
    if (currentId === '') {
      setValues({ ...initialState })
    } else {
      console.log('editing...')
      getLink(currentId)
    }
  }, [currentId])

  return (
    <form className='card card-body' onSubmit={handleSubmit}>
      <div className='form-group input-group'>
        <div className='input-group-text bg-light'>
          <i className='material-icons'>insert link</i>
        </div>
        <input
          type='text'
          name='url'
          className='form-control'
          placeholder='https://someurl.com'
          value={values.url}
          onChange={handleChange}
        />
      </div>

      <div className='form-group input-group'>
        <div className='input-group-text bg-light'>
          <i className='material-icons'>create</i>
        </div>
        <input
          type='text'
          name='name'
          className='form-control'
          placeholder='Website name'
          value={values.name}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <textarea
          name='description'
          rows='3'
          className='form-control'
          placeholder='Write a description'
          value={values.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <button className='btn btn-primary btn-block'>{currentId ? 'Update' : 'Save'}</button>
    </form>
  )
}

export default LinkForm
