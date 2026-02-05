import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../lib/api';
import css from './NoteForm.module.css';

const validationSchema = Yup.object({
  title: Yup.string().min(3).max(50).required('Title is required'),
  content: Yup.string().max(500),
  tag: Yup.mixed()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Tag is required'),
});

interface NoteFormProps {
  onCancel: () => void;
}

interface FormValues {
  title: string;
  content: string;
  tag: string;
}

function NoteForm({ onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onCancel();
    },
  });

  const initialValues: FormValues = {
    title: '',
    content: '',
    tag: 'Todo',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => mutation.mutate(values)}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              id="content"
              as="textarea"
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field id="tag" as="select" name="tag" className={css.select}>
              <option className={css.dropDownMenu} value="Todo">
                Todo
              </option>
              <option className={css.dropDownMenu} value="Work">
                Work
              </option>
              <option className={css.dropDownMenu} value="Personal">
                Personal
              </option>
              <option className={css.dropDownMenu} value="Meeting">
                Meeting
              </option>
              <option className={css.dropDownMenu} value="Shopping">
                Shopping
              </option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting || mutation.isPending}
            >
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default NoteForm;
