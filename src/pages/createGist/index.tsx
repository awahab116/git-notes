import GistForm from '../../components/gistForm';
import './createGist.scss';

const CreateGist = () => {
  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="create-gist-main-container">
      <div>
        <h2>Create Gist</h2>
      </div>
      <div className="create-gist-div-form">
        <GistForm />
      </div>
    </div>
  );
};

export default CreateGist;
