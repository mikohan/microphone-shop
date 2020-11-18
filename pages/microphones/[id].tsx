import { GetStaticPaths, GetStaticProps, NextPageContext } from 'next';
import { openDb } from '../../src/helpers';
import { IMicrophone } from '../../src/interfaces/IMicrophone';
import { useRouter } from 'next/router';
import ProductCard from '../../src/components/ProductCard';
import Grid from '@material-ui/core/Grid';

export type MicrophoneProps = IMicrophone;

export default function Microphone({
	id,
	brand,
	model,
	price,
	imageUrl,
}: MicrophoneProps) {
	const router = useRouter();
	if (router.isFallback) {
		return <div>Is Loading ..... Sorry!</div>;
	}
	return (
		<div>
			<Grid container spacing={5}>
				<Grid item xs={12}>
					<ProductCard
						id={id}
						brand={brand}
						model={model}
						price={price}
						imageUrl={imageUrl}
					/>
				</Grid>
			</Grid>
		</div>
	);
}

export const getStaticProps = async (context: any) => {
	const id = context.params.id as string;
	const db = await openDb();
	const mic = await db.get('SELECT * FROM Microphone WHERE id = ?', [+id]);

	return {
		props: mic,
	};
};

export const getStaticPaths = async () => {
	const db = await openDb();
	const urls = await db.all('SELECT id FROM Microphone');
	const paths = urls.map((id: IMicrophone) => ({
		params: { id: `${id.id}` },
	}));
	return {
		paths: paths,
		fallback: false,
	};
};
