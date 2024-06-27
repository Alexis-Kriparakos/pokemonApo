import styles from './index.module.scss';

export default function Loader() {
  return (
    <div className={styles.container}>
      <div className={styles.pokemon} />
    </div>
  );
}
