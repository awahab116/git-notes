import GistForm from '../../components/gistForm';
import { useParams } from 'react-router-dom';
import './createGist.scss';

const CreateGist = () => {
  const { id } = useParams();

  return (
    <div className="create-gist-main-container">
      <div>
        <h2>{id ? 'Update' : 'Create'} Gist</h2>
      </div>
      <div className="create-gist-div-form">
        <GistForm gistId={id ? id : ''} />
      </div>
    </div>
  );
};

export default CreateGist;
