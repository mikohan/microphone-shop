import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  })
);

interface PaginatorProps {
  count: number;
  page: number;
}

export default function PaginatorProps(props: PaginatorProps) {
  const router = useRouter();
  const classes = useStyles();
  let { page, count } = props;
  if (page === 0) {
    page = 1;
  }
  const [currentPage, setCurrentPage] = useState(page);

  function handlePagination(event: object, page: number) {
    setCurrentPage(page);
    router.push(`/${page}`);
  }
  return (
    <div className={classes.root}>
      <Pagination
        count={count}
        page={currentPage}
        color="primary"
        onChange={handlePagination}
      />
    </div>
  );
}
