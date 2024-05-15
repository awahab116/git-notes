import React from 'react';
import { GistDetailsType } from '../../types/gistsDetail.type';
import './gistContent.scss';

interface FileContentsProps {
  gistDetails: GistDetailsType;
}

const GistContent: React.FC<FileContentsProps> = ({ gistDetails }) => {
  return (
    <>
      {Object.values(gistDetails.files).map((file) => (
        <div className="code-container" key={file.filename}>
          <div className="file-name">{file.filename}</div>
          <div className="border-bottom"></div>
          <div className="file-content">
            <p>{file.content}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default GistContent;
