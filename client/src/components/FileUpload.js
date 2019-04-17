import React, { Fragment, useState } from 'react';
import axios from 'axios';
import Message from './Message';
import Progress from './Progress';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 5000);
        }
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded');

      setTimeout(() => setMessage(''), 2500);
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit} className='file__form'>
        <div className='file-field input-field'>
          <div className='waves-effect waves-light btn'>
            <span>File</span>
            <input type='file' onChange={onChange} />
          </div>
          <div className='file-path-wrapper'>
            <input
              className='file-path validate'
              type='text'
              placeholder={filename}
            />
          </div>
        </div>
        <Progress percentage={uploadPercentage} />
        <button type='submit' className='waves-effect waves-light btn'>
          Upload
        </button>
      </form>
      <hr />
      {uploadedFile ? (
        <div className='file__container'>
          <h5 className='indigo-text file__name'>{uploadedFile.fileName}</h5>
          <img src={uploadedFile.filePath} alt='file' className='file' />
        </div>
      ) : (
        <div className='file__container'>
          <h5 className='indigo-text file__name'>There is no file</h5>
        </div>
      )}
    </Fragment>
  );
};

export default FileUpload;
