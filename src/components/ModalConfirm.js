import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../services/fetchUser';
import { ToastContainer, toast } from 'react-toastify';

export default function ModalConfirm(props) {
  const { handleClose, show, dataUserDelete, handleDeleteUserModal } = props;
  console.log(dataUserDelete);
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const handleDeleteUser = async () => {
    let res = await deleteUser(dataUserDelete.id);
    console.log(res);
    if (res && +res.statusCode === 204) {
      toast.success('Delete user succeed');
      handleClose();
      handleDeleteUserModal(dataUserDelete);
    } else {
      toast.error('error delete user');
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body add-new">
            Are you sure delete this user ? <b>email:{dataUserDelete.email}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleDeleteUser();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
