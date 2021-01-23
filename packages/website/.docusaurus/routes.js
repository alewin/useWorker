
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';
export default [
{
  path: '/',
  component: ComponentCreator('/','deb'),
  exact: true,
},
{
  path: '/docs',
  component: ComponentCreator('/docs','b90'),
  
  routes: [
{
  path: '/docs/api-useworker',
  component: ComponentCreator('/docs/api-useworker','527'),
  exact: true,
},
{
  path: '/docs/api-workerstatus',
  component: ComponentCreator('/docs/api-workerstatus','967'),
  exact: true,
},
{
  path: '/docs/examples/examples-csv',
  component: ComponentCreator('/docs/examples/examples-csv','215'),
  exact: true,
},
{
  path: '/docs/examples/examples-external',
  component: ComponentCreator('/docs/examples/examples-external','17e'),
  exact: true,
},
{
  path: '/docs/examples/examples-sort',
  component: ComponentCreator('/docs/examples/examples-sort','a25'),
  exact: true,
},
{
  path: '/docs/installation',
  component: ComponentCreator('/docs/installation','b2a'),
  exact: true,
},
{
  path: '/docs/introduction',
  component: ComponentCreator('/docs/introduction','fca'),
  exact: true,
},
{
  path: '/docs/limitations',
  component: ComponentCreator('/docs/limitations','fc0'),
  exact: true,
},
{
  path: '/docs/usage',
  component: ComponentCreator('/docs/usage','184'),
  exact: true,
},
]
},
{
  path: '*',
  component: ComponentCreator('*')
}
];
