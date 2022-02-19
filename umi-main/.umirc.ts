import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/one', name: 'one', microApp: 'umi-one' },
    { path: '/two', name: 'two', microApp: 'umi-two' },
  ],
  fastRefresh: {},
  qiankun: {
    master: {
      apps: [
        {
          name: 'umi-one',
          entry: '//localhost:3001',
        },
        {
          name: 'umi-one-about',
          entry: '//localhost:3001/about',
        },
        {
          name: 'umi-two',
          entry: '//localhost:3002',
        },
      ],
    },
  },
});
