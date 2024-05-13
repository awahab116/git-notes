import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { createGist, getGist, updateGist } from '../../api/gistsApi';
import { GistApiType } from '../../types/gistsApi.type';
import { GistFileType } from '../../types/gistsFile.type';
import DeleteIcon from '../../assets/deleteIcon.svg';
import './gistForm.scss';

type GistFormValues = {
  gistDiscription: string;
  files: {
    gistFilename: string;
    gistFileContent: string;
  }[];
};

type GistFormProps = {
  gistId: string;
};

const schema = Yup.object().shape({
  gistDiscription: Yup.string().required('Gist description is required'),
  files: Yup.array().of(
    Yup.object().shape({
      gistFilename: Yup.string().required('Filename is required'),
      gistFileContent: Yup.string().required('File content is required'),
    })
  ),
});

const GistForm: React.FC<GistFormProps> = ({ gistId }) => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm<GistFormValues>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      gistDiscription: '',
      files: [
        {
          gistFilename: '',
          gistFileContent: '',
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'files',
  });

  useEffect(() => {
    console.log('editing gist with id: ', gistId);
    if (gistId) {
      getGist(gistId)
        .then((data) => {
          console.log('fetched edit gist details ', data);
          const files: GistFileType[] = [];

          Object.entries(data.files).forEach(([key, val]: [string, any]) => {
            files.push({ filename: key, content: val.content });
          });

          const mappedFiles = files.map((file) => ({
            gistFilename: file.filename,
            gistFileContent: file.content,
          }));
          reset({ gistDiscription: data.description, files: mappedFiles });
        })
        .catch((_) => console.log('error fetching gist'));
    }
  }, [gistId]);

  const gistCreateUpdateAction = (data: GistFormValues) => {
    console.log('data ', data);

    const { gistDiscription, files } = data;

    // Creating an array to hold files data
    const filesData: { content: string; filename: string }[] = [];

    // Populating filesData with files data
    files.forEach(
      ({
        gistFilename,
        gistFileContent,
      }: {
        gistFilename: string;
        gistFileContent: string;
      }) => {
        filesData.push({
          filename: gistFilename,
          content: gistFileContent,
        });
      }
    );

    // Creating an object of type GistApiType
    const gistApiObject: GistApiType = {
      public: true, // Assuming "public" is always true
      description: gistDiscription,
      files: {},
    };

    // Assigning files data to gistApiObject
    filesData.forEach(({ filename, content }) => {
      gistApiObject.files[filename] = {
        content: content,
        filename: filename,
      };
    });

    console.log(gistApiObject);

    if (gistId) {
      updateGist(gistApiObject, gistId)
        .then((resp) => {
          console.log('gist updated', resp);
          navigate('/');
        })
        .catch((err) => console.error(err));
    } else {
      createGist(gistApiObject)
        .then((resp) => navigate('/'))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(gistCreateUpdateAction)}
        className="gist-form-container"
      >
        <input
          className="gist-form-description-input"
          placeholder="Gist description"
          {...register('gistDiscription')}
        />
        {errors.gistDiscription && (
          <span>{errors.gistDiscription.message}</span>
        )}
        <div>
          {fields.map((field, index) => (
            <div key={field.id} className="gist-form-filename-container">
              <div className="gist-form-filename-delete-container">
                <input
                  className="gist-form-filename-input"
                  placeholder="Filename"
                  {...register(`files.${index}.gistFilename` as const)}
                />
                {/* delete button with DeleteIcon component */}
                <button
                  className="gist-form-delete-button"
                  type="button"
                  onClick={() => remove(index)}
                >
                  <img src={DeleteIcon} alt="Delete Icon" />
                </button>
              </div>
              {errors.files?.[index]?.gistFilename && (
                <span>{errors.files?.[index]?.gistFilename?.message}</span>
              )}
              <textarea
                className="gist-form-textarea"
                {...register(`files.${index}.gistFileContent` as const)}
              />
              {errors.files?.[index]?.gistFileContent && (
                <span>{errors.files?.[index]?.gistFileContent?.message}</span>
              )}
            </div>
          ))}
        </div>
        <div className="gist-form-button-container">
          <button
            type="button"
            className="gist-form-addFile-button"
            onClick={() => append({ gistFilename: '', gistFileContent: '' })}
          >
            Add File
          </button>
          <button type="submit" className="gist-form-createGist-button">
            {gistId ? 'Update' : 'Create'} Gist
          </button>
        </div>
      </form>
    </div>
  );
};

export default GistForm;
