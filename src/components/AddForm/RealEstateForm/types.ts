import { IAddFormValues, IErrorsValues } from '../types.ts';
import { Dispatch, SetStateAction } from 'react';

export interface IRealEstateFormProps {
  formValues: IAddFormValues;
  onDataChange: (data: Partial<IAddFormValues>) => void;
  setStep: Dispatch<SetStateAction<number>>;
  errors: IErrorsValues;
  setErrors: Dispatch<SetStateAction<IErrorsValues>>;
}
