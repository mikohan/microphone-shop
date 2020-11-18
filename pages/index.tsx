import { IMicrophone } from '../src/interfaces/IMicrophone';
import { openDb } from '../src/helpers';
import ProductCard from '../src/components/ProductCard';

import Box from '@material-ui/core/Box';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paginator from '../src/components/Paginator';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		card: {
			marginBottom: '2rem',
		},
	})
);

interface HomeProps {
	microphones: IMicrophone[];
	currentPage: number;
}

export default function Home({
	microphones,
	currentPage,
}: HomeProps): JSX.Element {
	const classes = useStyles();
	return (
		<div>
			<h1>Hello world</h1>
			<Box display="flex" flexWrap="wrap" justifyContent="space-around">
				{microphones.map((mic: IMicrophone) => (
					<div key={mic.id} className={classes.card}>
						<ProductCard {...mic}>
							{mic.brand + ' ' + mic.model}
						</ProductCard>
					</div>
				))}
			</Box>
			<Box display="flex" justifyContent="center">
				<Paginator page={currentPage} count={3} />
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
