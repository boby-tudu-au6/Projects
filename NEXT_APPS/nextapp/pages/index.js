import * as React from 'react';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import Card from 'components/Card';
import { Grid, Typography, Container, Box } from '@material-ui/core'

export default function Index(props) {
  const { data } = props;
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} style={{ marginTop: 24 }}>
      {
        data.map(item => (
          <Grid key={item._id} item md={4} sm={6} xs={12}>
            <Card {...item} />
          </Grid>
        ))
      }
      </Grid>
      <h1>{process.env.MONGO_URI}</h1>
    </Container>
  );
}

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/product')
    const data = await res.json();
    return {
      props: { data }
    }
}
