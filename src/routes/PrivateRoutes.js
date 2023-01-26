import React, { useContext } from 'react';
import TableUsers from '../components/TableUsers';
import { Routes, Route, Link } from 'react-router-dom';
import { UserContext } from '../context/UsersContext';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

export default function PrivateRoutes(props) {
  const { user } = useContext(UserContext);
  if (user && !user.auth) {
    return (
      <Alert variant="danger" className="mt-3">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>You dont have permission to access this route</p>
      </Alert>
    );
  }
  return <>{props.children}</>;
}
