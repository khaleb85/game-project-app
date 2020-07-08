import React, { CSSProperties } from 'react';

import { FormikValues, FormikHelpers, FormikProps } from 'formik';

import { ObjectSchema } from 'yup';

export type FChildren = (props: FormikProps<FormikValues>) => React.ReactNode;

export interface IFormProps {
  schema: ObjectSchema<any>;
  initialValues: FormikValues;
  children: React.ReactNode | FChildren;
  style?: CSSProperties;
  onSubmit: (values: any, formikHelpers: FormikHelpers<FormikValues>) => void;
}
