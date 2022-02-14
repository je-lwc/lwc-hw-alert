import { getRandom } from './util';

export default function getAlerts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'f3afa46893c0',
          content: 'Last Payment failed',
          color: 'rgb(255,127,127)',
          background: '#ffffff',
          rank: 105
        },
        {
          id: 'd5787e976786',
          content: 'Customer Enrolled with Gift Card',
          color: '#b5f5bd',
          background: '#0f1210',
          rank: 150
        },
        {
          id: '0bee9f40509f',
          content: 'Customer is HIGH RISK',
          color: 'red',
          background: 'white',
          rank: 100
        }
      ]);
    }, getRandom(800, 2500));
  });
}
