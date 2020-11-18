import Index, { getStaticProps } from './index';
import { GetStaticPaths } from 'next';
import { openDb } from '../src/helpers';

export default Index;
export { getStaticProps };

export const getStaticPaths: GetStaticPaths = async () => {
  const db = await openDb();
  const { total } = await db.get('SELECT COUNT(id) as total FROM Microphone');

  const numberOfPages = Math.ceil(total / 5.0);

  const paths = Array(numberOfPages - 1)
    .fill('')
    .map((_: string, i: number) => {
      return { params: { currentPage: (i + 1).toString() } };
    });

  return {
    fallback: false,
    paths: paths,
  };
};
