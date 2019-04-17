import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ msg }) => {
  return (
    <div className='teal lighten-1 message'>
      <span>{msg}</span>
    </div>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired
};

export default Message;
