import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './createGist.scss';
import Form from '../../components/form';
import Input from '../../components/input';

// interface for form
interface CreateGistInterface {
  gistDiscription: string;
  gistFileName: string;
  gistFileContent: string;
}

// Yup schema
const schema = Yup.object().shape({
  gistFileName: Yup.string().required(),
  gistFileContent: Yup.string().required(),
});

type Inputs = {
  example: string;
  exampleRequired: string;
  aboutYou: string;
};

const CreateGist = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch('example')); // watch input value by passing the name of it

  return (
    <div className="create-gist-main-container">
      <div>
        <h2>Create Gist</h2>
      </div>
      <div className="create-gist-div-form">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="create-gist-form-container"
        >
          <input
            className="create-gist-description-input"
            placeholder="Gist description"
            {...register('example')}
          />

          <div className="create-gist-filename-container">
            <input
              className="create-gist-filename-input"
              placeholder="Filename "
              {...register('exampleRequired', { required: true })}
            />

            {errors.exampleRequired && <span>This field is required</span>}
            <textarea
              className="create-gist-textarea"
              {...register('aboutYou')}
            />
          </div>
          <div className="create-gist-button-container">
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="create-gist-addFile-button"
            >
              Add File
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="create-gist-createGist-button"
            >
              Create Gist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// const CreateGist = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     mode: 'all',
//     defaultValues: { gistFileName: '', gistFileContent: '' },
//     resolver: yupResolver(schema), // add the resolver here
//   });

//   const onSubmit = (data: CreateGistInterface) => alert(JSON.stringify(data));
//   return (
//     <div style={{ padding: '0rem 8rem' }}>
//       <Form
//         register={register}
//         handleSubmit={handleSubmit}
//         onSubmit={onSubmit}
//         className="change-form"
//       >
//         <h1 style={{ textAlign: 'center', color: '#333' }}>Login</h1>
//         <Input
//           name="gistDiscription"
//           type="text"
//           placeholder="Enter gist discription"
//           autoFocus
//           style={{ width: '100%', margin: '8px 0', padding: '4px' }}
//         />
//         <Input
//           name="gistFileName"
//           type="text"
//           placeholder="Enter file name"
//           error={errors.gistFileName?.message}
//           style={{ width: '100%', margin: '8px 0', padding: '4px' }}
//         />

//         <textarea
//           {...register('gistFileContent')}
//           placeholder="Enter file content"
//           style={{ width: '100%', margin: '8px 0', padding: '4px' }}
//         />

//         <button
//           className="btn btn--brand"
//           style={{
//             width: '80px',
//             margin: '8px 0',
//             padding: '8px',
//             backgroundColor: '#333',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '5px',
//           }}
//         >
//           Submit
//         </button>
//       </Form>
//     </div>
//   );
// };

export default CreateGist;
