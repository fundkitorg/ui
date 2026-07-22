import Card from './Card';
import Btn from './Btn';

export default {
  title: 'Components/Card',
  component: Card,
};

export const Basic = {
  args: {
    title: 'Annual Fund',
    sub: 'Active campaign',
    children: 'Pledge tiers, dedication options, and stewardship capture.',
  },
};

export const WithMetaAndFooter = {
  args: {
    title: 'The Annual Gala',
    sub: 'Draft',
    meta: '5 tiers',
    edited: '2 days ago',
    children: 'Tiered pledge form for galas and paddle-raise events.',
    foot: <Btn variant="primary" size="sm">Edit form</Btn>,
  },
};
