import React, { FC, ReactNode } from 'react';

import { Formik, Form as FormFormik } from 'formik';

import { IFormProps, FChildren } from './IFormProps';

const Form: FC<IFormProps> = ({ schema, style, initialValues, children, onSubmit }) => {
  const isFunction = typeof children === 'function';
  const FChildrenVar = children as FChildren;
  return (
    <Formik initialValues={initialValues} style={style} validationSchema={schema} onSubmit={onSubmit} enableReinitialize={true}>
      {props => (
        isFunction
        ? FChildrenVar && FChildrenVar(props)
        : children
      )}
    </Formik>
  );
};

export default Form;
