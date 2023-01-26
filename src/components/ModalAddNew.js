import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../services/fetchUser';
import { ToastContainer, toast } from 'react-toastify';
export default function ModalAddNew(props) {
  const { handleClose, show, handleUpdateTable } = props;
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const handleSaveUser = async () => {
    let res = await postCreateUser(name, job);
    console.log('check res', res);
    if (res && res.id) {
      //success
      handleClose();
      setName('');
      setJob('');
      toast.success('A user is created success');
      handleUpdateTable({ email: name, first_name: job, id: res.id });
    } else {
      // error
      toast.error('An error...');
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body add-new">
            <div>
              <div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Job
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      setJob(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSaveUser();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
