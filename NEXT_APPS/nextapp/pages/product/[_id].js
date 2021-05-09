import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
    return {
        root: {
            padding: 24,
        }
    }
})

const Product = ({ data }) => {
    const router = useRouter();
    const classes = useStyles();
    
    useEffect(() => {
        if (typeof data === typeof 'hello') router.push('/')
    }, [])
    return (
        <Grid container>
            <Grid item className={classes.root} container spacing={6} md={12} sm={12} xs={12}>
                <Grid item md={4} sm={4} xs={12}>
                    <img src={data.media} alt="product_img" width="100%" />
                </Grid>
                <Grid item md={8} sm={8} xs={12}>
                    <Typography variant="h2">{data.name}</Typography>
                    <Typography variant="h5">{data.price}</Typography>
                    <Typography variant="subtitle">{data.desc}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}
 
export default Product;

export async function getServerSideProps({ params : { _id }}) {
    try {
        const res = await fetch(`http://localhost:3000/api/product/${_id}`);
        const data = await res.json();
        return {
            props: { data: data.error || data }
        }
    } catch (error) {
        console.log(error)
        return {
            props: { data: error.message.error || error.message }
        }
    }
}