import { Button, TextField, Typography, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'

const useStyles = makeStyles(() => {
    return {
        root: {
            height: '85vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'right'
        },
        form: {
            width: '40%',
            margin: 'auto',
            padding: 24,
            boxShadow: '1px 1px 4px lightgray',
            borderRadius: 8
        },
        input: {
            marginBottom: 8
        },
        font: {
            margin: 12,
            textAlign: 'center'
        },
        inputBase: {
            border: '1px solid black'
        },
        link: {
            margin: 8
        }
    }
})

const Login = () => {
    const classes = useStyles();
    const handleSubmit = e => {
        e.preventDefault();
        const { email, password } = e.target;
    }

    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit} className={classes.form} type="post">
                <Typography variant="h2" className={classes.font}>Login</Typography>
                <TextField size="small" fullWidth className={classes.input} name="email" type="email" label="Enter Email" />
                <TextField size="small" fullWidth className={classes.input} name="password" type="password" label="Enter Email" />
                <Button fullWidth type="submit" className={classes.input} variant="contained" color="primary">Login</Button>
                <Link href="/register">
                    <a>Don't have an account? Click here.</a>
                </Link>
            </form>
        </div>
    );
}
 
export default Login;