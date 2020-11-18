import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import { IMicrophone } from '../interfaces/IMicrophone';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			maxWidth: 345,
		},
		media: {
			height: 0,
			paddingTop: '56.25%', // 16:9
		},
		expand: {
			transform: 'rotate(0deg)',
			marginLeft: 'auto',
			transition: theme.transitions.create('transform', {
				duration: theme.transitions.duration.shortest,
			}),
		},
		expandOpen: {
			transform: 'rotate(180deg)',
		},
		avatar: {
			backgroundColor: red[500],
		},
	})
);

interface CardProps extends IMicrophone {}

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function ProductCard(props: IMicrophone | any) {
	const classes = useStyles();

	const { id, brand, model, price, imageUrl } = props;

	return (
		<Link href={`/microphones/${id}`}>
			<Card className={classes.root}>
				<CardActionArea>
					<CardMedia
						className={classes.media}
						image={prefix + imageUrl}
						title={brand + ' ' + model}
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{`${brand} ${model}`}
						</Typography>
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
						>
							Lizards are a widespread group of squamate reptiles,
							with over 6,000 species, ranging across all
							continents except Antarctica
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button size="small" color="primary">
						Share
					</Button>
					<Button size="small" color="primary">
						Learn More
					</Button>
				</CardActions>
			</Card>
		</Link>
	);
}
