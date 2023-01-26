import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/fetchUser';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEdit from './ModalEdit';
import _ from 'lodash';
import { debounce } from 'lodash';
import ModalConfirm from './ModalConfirm';
import './TableUsers.scss';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';
import { ToastContainer, toast } from 'react-toastify';
export default function TableUsers() {
  const [listUser, setListUser] = useState([]);
  const [totalUsers, setTotalUser] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [show, setShow] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const [sortBy, setSortBy] = useState('asc');
  const [sortField, setSortField] = useState('id');

  const [dataExport, setDataExport] = useState([]);
  const handleSearch = debounce((e) => {
    let term = e.target.value;
    if (term) {
      let cloneListUser = _.cloneDeep(listUser);
      cloneListUser = cloneListUser.filter((item) => item.email.includes(term));
      setListUser(cloneListUser);
    } else {
      getUser(1); // load lại api
    }
  }, 500);
  const handleClose = () => {
    setShow(false);
    setIsShowModal(false);
    setIsShowModalDelete(false);
  };
  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setIsShowModal(true);
  };
  useEffect(() => {
    getUser(1);
  }, []);
  const getUser = async (page) => {
    let res = await fetchAllUser(page);
    console.log('>>> check new res', res);
    if (res && res.data) {
      setTotalUser(res.total);
      setListUser(res.data);
      setTotalPages(res.total_pages);
    }
  };
  console.log(listUser);
  const handlePageClick = (event) => {
    console.log('event lib', event);
    getUser(+event.selected + 1);
  };

  const handleUpdateTable = (user) => {
    setListUser([user, ...listUser]);
  };

  const handleEditUserFromModal = (user) => {
    console.log('user', user);
    // let cloneListUser = [...listUser];
    let cloneListUser = _.cloneDeep(listUser); // cách clone mà lưu 2 địa chỉ vùng nhớ khác nhau
    let index = listUser.findIndex((item) => item.id === user.id);
    cloneListUser[index].email = user.email;
    console.log('cloneListUser', cloneListUser);
    console.log(listUser);
    setListUser(cloneListUser);
  };

  const handleDelete = (user) => {
    setIsShowModalDelete(true);
    setDataUserDelete(user);
  };

  const handleDeleteUserModal = (user) => {
    // console.log(user);

    let cloneListUser = _.cloneDeep(listUser);
    cloneListUser = cloneListUser.filter((item) => item.id !== user.id);

    setListUser(cloneListUser);
  };

  const handleSort = (sortBy, sortField) => {
    // setSortBy('desc');
    // setSortField('id');
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListUser = _.cloneDeep(listUser);

    cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
    setListUser(cloneListUser);
  };
  console.log('check sort', sortBy, sortField);
  const csvData = [
    ['firstName', 'lastName', 'email'],
    ['Aham', 'Tomi', 'ah@smthing.com'],
  ];

  const getUsersẼport = (event, done) => {
    let result = [];
    if (listUser && listUser.length > 0) {
      result.push(['id', 'email', 'Tên đệm', 'Tên chính']);
      listUser.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });
      setDataExport(result);
      console.log('result', dataExport);
      done();
    }
  };

  const handleImportCSV = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      if (file.type !== 'text/csv') {
        toast.error('Only accept CSV file...');
        return;
      }
      Papa.parse(file, {
        // delimiter: "",
        // chunkSize: 3,
        // header: true,
        complete: function (result) {
          //   console.log('check result', result.data);
          let rawCSV = result.data;
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (
                rawCSV[0][0] !== 'email' ||
                rawCSV[0][1] !== 'first_name' ||
                rawCSV[0][2] !== 'last_name'
              ) {
                toast.error('Wrong format header CSV file');
              } else {
                let result = [];
                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {};
                    obj.email = item[0];
                    obj.first_name = item[1];
                    obj.last_name = item[2];
                    result.push(obj);
                    console.log(obj);
                  }
                });
                setListUser(result);
                console.log('check result', result);
              }
            } else {
              toast.error('Wrong format CSV file');
            }
          } else {
            toast.error('Not found data on CSV file');
          }
        },
      });
      console.log('file', file);
    }
  };
  return (
    <>
      {/* {id: 7, email: 'michael.lawson@reqres.in', first_name: 'Michael', last_name: 'Lawson', avatar: 'https://reqres.in/img/faces/7-image.jpg'} */}
      <div className="my-3 add-new d-sm-flex">
        <span>
          <b>List Users:</b>
        </span>
        <div className="group-btns mt-sm-2 mt-2">
          <label htmlFor="test" className="btn btn-warning">
            <i className="fa-solid fa-file-import"></i>
          </label>
          <input id="test" type="file" hidden onChange={handleImportCSV} />
          <CSVLink
            filename={'users.csv'}
            className="btn btn-primary"
            data={dataExport}
            asyncOnClick={true}
            onClick={getUsersẼport}
          >
            <i className="fa-solid fa-file-arrow-down">Export</i>
          </CSVLink>
          <button
            onClick={() => {
              setShow(true);
            }}
            className="btn btn-success modal show"
            style={{ display: 'inline ', position: 'initial' }}
          >
            Add new user
          </button>
        </div>
      </div>
      <div className="col-12 col-sm-4 mt-3">
        <input
          className="form-control"
          placeholder="Search user by email"
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <div className="customize-table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <div className="sort-header">
                  <span>ID</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-down-long"
                      onClick={() => {
                        //   setSortBy('desc');
                        //   setSortField('id');
                        handleSort('desc', 'id');
                      }}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-up-long"
                      onClick={() => {
                        handleSort('asc', 'id');
                      }}
                    ></i>
                  </span>
                </div>
              </th>

              <th>Email</th>
              <th>
                <div className="sort-header">
                  <span>First Name</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-down-long"
                      onClick={() => {
                        handleSort('desc', 'first_name');
                      }}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-up-long"
                      onClick={() => {
                        handleSort('asc', 'first_name');
                      }}
                    ></i>
                  </span>
                </div>
              </th>

              <th>Last Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {listUser?.map()} cách dc học ở cyber*/}
            {listUser &&
              listUser.length > 0 &&
              listUser.map((item, index) => {
                return (
                  <tr key={`users-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>
                      <button
                        className="btn btn-warning mx-3"
                        onClick={() => {
                          handleEditUser(item);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleDelete(item);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>

      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      <ModalAddNew
        handleClose={handleClose}
        show={show}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEdit
        show={isShowModal}
        handleClose={handleClose}
        dataUserEdit={dataUserEdit}
        handleEditUserFromModal={handleEditUserFromModal}
      />
      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserModal={handleDeleteUserModal}
      />
    </>
  );
}
