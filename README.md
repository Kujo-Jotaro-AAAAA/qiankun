# qiankun

## 搭建环境

```bash
mkdir qiankun
cd qiankun
yarn create @umijs/umi-app umi-main # 主项目
yarn create @umijs/umi-app umi-one # 子项目1
yarn create @umijs/umi-app umi-two # 子项目2

# 3个项目分别下好依赖包, 并安装umi的qiankun插件

yarn add @umijs/plugin-qiankun -D
```

### 主项目配置

进入 `umi-main/.umirc.ts`, 开启乾坤配置

```ts
import { defineConfig } from 'umi';
export default defineConfig({
  routes: [
    // 路由挂载的方式, 此处的name与qiankun.master.app中的name要一致
    { path: '/one', name: 'one', microApp: 'umi-one' },
    { path: '/two', name: 'two', microApp: 'umi-two' },
  ],
  fastRefresh: {},
  qiankun: {
    master: {
      apps: [
        { // 子项目1
          name: 'umi-one',
          entry: '//localhost:3001',
        },
        { // 子项目1中的about路由
          name: 'umi-one-about',
          entry: '//localhost:3001/about',
        },
        { // 子项目2
          name: 'umi-two',
          entry: '//localhost:3002',
        },
      ],
    },
  },
});

```
引入子项目有两种方式: 
1. 路由挂载。指定一个路由地址, 并通过`microApp`字段指定引入的是哪个微应用。
2. 嵌套挂载方式。

嵌套方式先放后面再说, 先配置好子应用

### 子应用配置

进入`umi-one/.umirc.ts`, 配置如下: 

```ts
import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: '/', component: '@/pages/index' },
    { // 增加一个about的页面, 用于嵌套路由的演示
      path: '/about',
      component: '@/pages/about/index',
    },
  ],
  fastRefresh: {},
  qiankun: { //! 重点在这里, 酱紫就行了
    slave: {},
  },
});
```

然后在`umi-one/.env`配置好端口为`3001`。

在`package.json`中配置`"name": "umi-one"`

`umi-two`配置也是一样的, 端口为`3002`, `package.name`为`umi-two`。

### 准备点火

回到`umi-main/src/pages/index.tsx`, 通过`MicroApp`进行微应用的嵌套。

```tsx
import styles from './index.less';
import { MicroApp } from 'umi';
export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>我是主应用</h1>
      <div>
        <p>one 应用</p>
        <MicroApp name="umi-one" autoSetLoading />
      </div>
      <div>
        <p>two 应用</p>
        <MicroApp name="umi-two" />
      </div>
      <div>
        <p>one-about 应用</p>
        <MicroApp name="umi-one-about" />
      </div>
    </div>
  );
}
```

先启动两个子应用, 然后启动主应用, 即可看到效果。
通过切换路由到`/one` `/two` 可以看到路由挂载也是成功的。
