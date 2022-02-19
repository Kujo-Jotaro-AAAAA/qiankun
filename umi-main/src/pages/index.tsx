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
