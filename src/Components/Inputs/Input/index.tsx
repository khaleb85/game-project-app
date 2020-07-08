import React, { FC } from 'react';
import { Input as KittenInput, InputProps } from '@ui-kitten/components';
import { useFormikContext, useField, Field } from 'formik';

export interface IInput extends InputProps {
  name: string;
}

export function useFieldToTextField({ disabled, name, ...props }: IInput
) {
  const { isSubmitting } = useFormikContext();
  const fieldProps = useField(name);

  const [field, meta] = fieldProps;

  const fieldError = meta.error;
  const showError = meta.touched && !!fieldError;

  return {
    ...props,
    caption: showError ? fieldError : props.caption,
    status: showError ? 'danger': props.status,
    helperText: showError ? fieldError : null,
    disabled: disabled ?? isSubmitting,
  };
}

export const Input: FC<IInput> = (props) => {
  const textField = useFieldToTextField(props);
  return (
    <Field name={props.name}>
      {
        (field: any) => (
        <KittenInput
          {...textField}
          value={field.field.value}
          onChangeText={(value: string) => {
            field.form.setFieldValue(props.name, value);
            props.onChangeText && props.onChangeText(value);
          }}
        />
      )}
    </Field>
  );
}