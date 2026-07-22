import Notice from './Notice';

export default {
  title: 'Components/Notice',
  component: Notice,
  args: { children: 'Your changes have been saved.' },
};

export const Info = { args: { status: 'info' } };
export const Success = { args: { status: 'success' } };
export const Warning = { args: { status: 'warning' } };
export const Error = { args: { status: 'error' } };
export const NotDismissible = { args: { status: 'info', isDismissible: false } };
