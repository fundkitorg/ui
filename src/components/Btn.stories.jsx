import Btn from './Btn';

export default {
  title: 'Components/Btn',
  component: Btn,
  args: { children: 'Donate' },
};

export const Primary = { args: { variant: 'primary' } };
export const Ghost = { args: { variant: 'ghost' } };
export const Danger = { args: { variant: 'danger' } };
export const Small = { args: { variant: 'primary', size: 'sm' } };
export const Busy = { args: { variant: 'primary', isBusy: true } };
export const Disabled = { args: { variant: 'primary', disabled: true } };
export const Link = { args: { variant: 'primary', href: '#' } };
