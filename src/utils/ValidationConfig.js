export const validationConfig = {
  required: {
    msg: 'Required!',
    fn: value => {
      return !!value;
    }
  },
  string: {
    msg: 'must be string!',
    fn: value => {
      const regex = /^[A-Za-z]/g;
      return regex.test(value);
    }
  },
  number: {
    msg: 'must be number!',
    fn: value => {
      if (typeof value != 'string') return false;
      return !isNaN(value) && !isNaN(parseFloat(value));
    }
  }
};
