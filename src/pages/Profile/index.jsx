import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Col, Form, Row,
} from 'react-bootstrap';

import { fetchUserThunk } from '../../redux/slices/users/asyncThunks';
import { registerUserThunk } from '../../redux/slices/user/asyncThunks';

import './index.scss';

const User = () => {
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: users.byId[login]?.name || '',
    mail: users.byId[login]?.mail || '',
    bio: users.byId[login]?.bio || '',
    password: users.byId[login]?.password || '',
  });
  const [isPasswordDoesNotMatch, setIsPasswordDoesNotMatch] = (useState(false));

  // fetch user
  useEffect(() => {
    dispatch(fetchUserThunk(login));
  }, []);

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
    setForm({
      name: users.byId[login]?.name || '',
      mail: users.byId[login]?.mail || '',
      bio: users.byId[login]?.bio || '',
      password: users.byId[login]?.password || '',
    });
  };

  const handleChangeProfileData = (e) => {
    e.preventDefault();
    if (form.confirmPassword === form.password) {
      console.log(users.byId[login], 'profile');
      dispatch(registerUserThunk({
        ...users.byId[login],
        name: form.name || users.byId[login]?.name,
        mail: form.mail || users.byId[login]?.mail,
        bio: form.bio || users.byId[login]?.bio,
        password: form.password || users.byId[login]?.password,
      }));
      setIsEditing(!isEditing);
      setIsPasswordDoesNotMatch(false);
    } else {
      setIsPasswordDoesNotMatch(true);
    }
  };

  return (
    <div>
      <Row>
        <Col>{users.byId[login]?.profilePic && <img src={users.byId[login].profilePic} alt="user face" />}</Col>
        <Col>
          {isEditing ? (
            <>
              <Form onSubmit={(e) => handleChangeProfileData(e)}>
                <h2>Change your profile data</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Please enter a name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Mail:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Please enter a mail"
                    value={form.mail}
                    onChange={(e) => setForm({ ...form, mail: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Bio:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Please enter a bio"
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Please enter a password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Confirm password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Please confirm new password"
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  />
                </Form.Group>
                {isPasswordDoesNotMatch && (
                <div className="profile__error">Password does not match</div>
                )}
                <div className="profile__form-buttons">
                  <Button variant="primary" type="submit">
                    Save
                  </Button>
                  <Button variant="primary" type="button" onClick={handleEditProfile}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </>
          ) : (
            <>
              <Button variant="primary" type="button" onClick={handleEditProfile}>
                Edit
              </Button>
              <Row>
                <Col>{`Name: ${users.byId[login]?.name || ''}`}</Col>
              </Row>
              <Row>
                <Col>{`Role: ${users.byId[login]?.role || ''}`}</Col>
              </Row>
              <Row>
                <Col>{`Mail: ${users.byId[login]?.mail || ''}`}</Col>
              </Row>
              <Row>
                <Col>{`Bio: ${users.byId[login]?.bio || ''}`}</Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default User;
