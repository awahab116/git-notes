import React, { useState } from 'react';
import {
  useForm,
  SubmitHandler,
  useWatch,
  useFieldArray,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import DeleteIcon from '../../assets/deleteIcon.svg';
import './gistForm.scss';
import { GistApiType } from '../../types/gistsApi.type';
import { createGist } from '../../api/gistsApi';

type CreateGistFormValues = {
  gistDiscription: string;
  addGistFile: {
    gistFilename: string;
    gistFileContent: string;
  }[];
};

const schema = Yup.object().shape({
  gistDiscription: Yup.string().required('Gist description is required'),
  addGistFile: Yup.array().of(
    Yup.object().shape({
      gistFilename: Yup.string().required('Filename is required'),
      gistFileContent: Yup.string().required('File content is required'),
    })
  ),
});

const GistForm = () => {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<CreateGistFormValues>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      gistDiscription: '',
      addGistFile: [
        {
          gistFilename: '',
          gistFileContent: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'addGistFile',
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          console.log('data ', data);

          const { gistDiscription, addGistFile } = data;

          // Creating an array to hold files data
          const filesData: { content: string; filename: string }[] = [];

          // Populating filesData with addGistFile data
          addGistFile.forEach(({ gistFilename, gistFileContent }) => {
            filesData.push({
              filename: gistFilename,
              content: gistFileContent,
            });
          });

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

          createGist(gistApiObject)
            .then((resp) => console.log('Created Gist: ', resp))
            .catch((err) => console.error(err));
        })}
        className="create-gist-form-container"
      >
        <input
          className="create-gist-description-input"
          placeholder="Gist description"
          {...register('gistDiscription')}
        />
        {errors.gistDiscription && (
          <span>{errors.gistDiscription.message}</span>
        )}
        <div>
          {fields.map((field, index) => (
            <div key={field.id} className="create-gist-filename-container">
              <div className="create-gist-filename-delete-container">
                <input
                  className="create-gist-filename-input"
                  placeholder="Filename"
                  {...register(`addGistFile.${index}.gistFilename` as const)}
                />
                {/* delete button with DeleteIcon component */}
                <button
                  className="create-gist-delete-button"
                  type="button"
                  onClick={() => remove(index)}
                >
                  <img src={DeleteIcon} alt="Delete Icon" />
                </button>
              </div>
              {errors.addGistFile?.[index]?.gistFilename && (
                <span>
                  {errors.addGistFile?.[index]?.gistFilename?.message}
                </span>
              )}
              <textarea
                className="create-gist-textarea"
                {...register(`addGistFile.${index}.gistFileContent` as const)}
              />
              {errors.addGistFile?.[index]?.gistFileContent && (
                <span>
                  {errors.addGistFile?.[index]?.gistFileContent?.message}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="create-gist-button-container">
          <button
            type="button"
            className="create-gist-addFile-button"
            onClick={() => append({ gistFilename: '', gistFileContent: '' })}
          >
            Add File
          </button>
          <button type="submit" className="create-gist-createGist-button">
            Create Gist
          </button>
        </div>
      </form>
    </div>
  );
};

export default GistForm;
