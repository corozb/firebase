import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import LinkForm from './LinkForm'
import { db } from '../firebase'

const Links = () => {
  const [links, setLinks] = useState([])
  const [currentId, setCurrentId] = useState('')

  const addOrEdit = async (linkObject) => {
    try {
      if (currentId === '') {
        await db.collection('links').doc().set(linkObject)
        toast('New task added', { type: 'success', autoClose: 2000 })
      } else {
        await db.collection('links').doc(currentId).update(linkObject)
        toast('Task updated successfully', { type: 'info', autoClose: 1000 })
      }
      setCurrentId('')
    } catch (error) {
      console.error(error)
    }
  }

  const getLink = () => {
    db.collection('links').onSnapshot((querySnapshot) => {
      const docs = []
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        console.log(doc.id)
        docs.push({ ...doc.data(), id: doc.id })
      })
      console.log(docs)
      setLinks(docs)
    })
  }

  const onDelete = (id) => {
    if (window.confirm('are you sure you want delete this link')) {
      db.collection('links').doc(id).delete()
      toast('Task was deleted', { type: 'error', autoClose: 2000 })
    }
  }

  useEffect(() => {
    getLink()
  }, [])

  return (
    <>
      <div className='col-md-4 p2'>
        <LinkForm {...{ addOrEdit, currentId, links }} />
      </div>
      <div className='col-md-8 p-2'>
        {links.map((link) => (
          <div className='card mb-1' key={link.id}>
            <div className='card-body'>
              <div className='d-flex justify-content-between'>
                <h4>{link.name}</h4>
                <div>
                  <i className='material-icons text-danger' onClick={() => onDelete(link.id)}>
                    close
                  </i>
                  <i className='material-icons' onClick={() => setCurrentId(link.id)}>
                    create
                  </i>
                </div>
              </div>
              <p>{link.description}</p>
              <a href={link.url} target='_blank' rel='noreferrer'>
                Go to Website
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Links
