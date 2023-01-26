import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../components/Home';
import TableUsers from '../components/TableUsers';
import Login from '../components/Login';
import PrivateRoutes from './PrivateRoutes';
import NotFound from './NotFound';

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        {/* <PrivateRoutes>
          <TableUsers path1="/users" />
        </PrivateRoutes> */}
        <Route
          path="/users"
          element={
            <PrivateRoutes>
              <TableUsers />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
