import { IMicrophone } from '../../src/interfaces/IMicrophone';
import { GetServerSideProps } from 'next';

import { openDb } from '../../src/helpers';
import ProductCard from '../../src/components/ProductCard';
import Box from '@material-ui/core/Box';

interface MicrophonesProps {
	microphones: IMicrophone[];
}

export default function Microphones(props: MicrophonesProps) {
	const { microphones } = props;
	return (
		<div>
			<Box style={{ padding: '50px', fontSize: '3rem' }}></Box>

			<Box display="flex" flexWrap="wrap" justifyContent="space-around">
				{microphones.map((mic: IMicrophone) => {
					return <ProductCard {...mic} key={mic.id} />;
				})}
			</Box>
		</div>
	);
}

export const getStaticProps = async (context: any) => {
	const currentPage = context.params?.currentPage as string;
	const currentPageNumber: number = +(currentPage || 0);
	const min = currentPageNumber * 5;
	const max = (currentPageNumber + 1) * 5;
	const db = await openDb();
	const microphones: IMicrophone[] = await db.all(
		'SELECT * FROM Microphone WHERE id > ? AND id <= ?',
		[min, max]
	);
	return {
		props: {
			microphones: microphones,
			currentPage: currentPageNumber,
		},
	};
};
