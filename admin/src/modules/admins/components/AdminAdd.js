import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Form,
  Input,
  Icon,
  Button,
  message,
} from 'antd';

function AdminAdd(props) {
  const { getFieldDecorator } = props.form;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          setIsSubmitting(true);
          await props.createUser(values);
          message.success('User created successfully.');
          props.history.push('/users/list');
        } catch (error) {
          message.error(error.message);
          setIsSubmitting(false);
        }
      }
    });
  }, [props]);

  return (
    <Card
      title={<div>Add Admin <Link to="/admins/list" style={{ float: 'right' }}>Back To List</Link></div>}
    >
      <form onSubmit={handleSubmit}>
        <Form.Item>
          {
            getFieldDecorator('email', {
              rules: [{ required: true }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />,
            )
          }
        </Form.Item>
        <Form.Item>
          {
            getFieldDecorator('password', {
              rules: [{ required: true }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" />,
            )
          }
        </Form.Item>
        <Button type="primary" loading={isSubmitting} htmlType="submit">Save</Button>
      </form>
    </Card>
  );
}

export default Form.create()(AdminAdd);
