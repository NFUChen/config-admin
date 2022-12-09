import { validationConfig } from './ValidationConfig';

export const useValidateForm = (formFields, setFormFields) => {
  let hasError = false;
  const formValues = {};
  const cloneFields = JSON.parse(JSON.stringify(formFields));
  const newForm = cloneFields.map(field => {
    formValues[field.name] = field.value;
    if (field.validation) {
      let breakFlag = false;
      field.validation.forEach(rule => {
        if (breakFlag) return;
        const ruleChecker = validationConfig[rule];
        const isValid = ruleChecker.fn(field.value);
        if (!isValid) {
          hasError = true;
          breakFlag = true;
          field.errorMsg = ruleChecker.msg;
          return;
        }
        field.errorMsg = '';
      });
    }

    return field;
  });
  setFormFields(newForm);

  return { hasError, formValues };
};
