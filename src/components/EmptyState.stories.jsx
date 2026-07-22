import EmptyState from './EmptyState';
import Btn from './Btn';

export default {
  title: 'Components/EmptyState',
  component: EmptyState,
};

export const Basic = {
  args: {
    title: 'No donations yet',
    body: 'When donations come in, they will show up here.',
  },
};

export const WithAction = {
  args: {
    title: 'No campaigns yet',
    body: 'Create your first campaign to start collecting donations.',
    action: <Btn variant="primary">New campaign</Btn>,
  },
};

export const Compact = {
  args: {
    title: 'Nothing to show',
    body: 'Try a different filter.',
    compact: true,
  },
};
