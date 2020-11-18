import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		},
		toolbar: {
			'& h6': {
				cursor: 'pointer',
			},
		},
	})
);

export default function ButtonAppBar() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar className={classes.toolbar} variant="dense">
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
					>
						<MenuIcon />
					</IconButton>
					<Link href="/">
						<Typography variant="h6" className={classes.title}>
							News
						</Typography>
					</Link>

					<Link href="/microphones">
						<Typography variant="h6" className={classes.title}>
							Microphones
						</Typography>
					</Link>

					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}
