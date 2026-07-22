import MetricCard from './MetricCard';

export default {
  title: 'Widgets/MetricCard',
  component: MetricCard,
};

export const Positive = {
  args: {
    label: 'Amount raised',
    value: '€34,439.00',
    sub: 'Last 30 days',
    changePct: 12,
  },
};

export const Negative = {
  args: {
    label: 'Donors',
    value: '2',
    sub: 'Last 30 days',
    changePct: -8,
  },
};

export const Loading = {
  args: {
    label: 'Average donation',
    value: '',
    skeleton: true,
  },
};
