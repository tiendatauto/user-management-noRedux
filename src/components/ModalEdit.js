import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser, putUpdateUser } from '../services/fetchUser';
import { ToastContainer, toast } from 'react-toastify';
export default function ModalEdit(props) {
  const { handleClose, show, dataUserEdit, handleEditUserFromModal } = props;
  //   console.log('dataUserEdit', dataUserEdit);
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  useEffect(() => {
    if (show) {
      setName(dataUserEdit.email);
      setJob(dataUserEdit.first_name);
    }
  }, [dataUserEdit]);
  const handleEditUser = async () => {
    let res = await putUpdateUser(name, job);
    console.log(res);
    if (res && res.updatedAt) {
      handleEditUserFromModal({
        email: name,
        id: dataUserEdit.id,
      });
      handleClose();
      toast.success('Update Success');
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit a user</Modal.Title>
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
                    value={name}
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
                    value={job}
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
              handleEditUser();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
