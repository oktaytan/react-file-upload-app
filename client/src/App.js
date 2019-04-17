import React, { Fragment } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';

const App = () => (
  <Fragment>
    <div className=' header z-depth-2'>
      <div className='container'>
        <div className='row'>
          <div className='col s12'>
            <h4 className='center-align indigo-text title'>
              <i className='material-icons logo'>cloud_upload</i> React File
              Upload
            </h4>
          </div>
        </div>
      </div>
    </div>
    <div className='container'>
      <div className='row form'>
        <div className='col- s12'>
          <FileUpload />
        </div>
      </div>
    </div>
  </Fragment>
);

export default App;
