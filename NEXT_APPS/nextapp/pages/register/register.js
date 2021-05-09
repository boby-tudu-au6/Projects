import { Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

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
            padding: 24,
            margin: 'auto',
            borderRadius: 8,
            boxShadow: '1px 1px 4px lightgray'
        },
        input: {
            marginBottom: 8
        },
        font: { textAlign: 'center', margin: 12 },
        link: { textAlign: 'center', margin: 8 }
    }
})

const Register = () => {
    const classes = useStyles();
    const handleSubmit = e => {
        e.preventDefault();
        const { phone, email, password } = e.target;

    }

    return (
        <div className={classes.root}>
            <form type="post" onSubmit={handleSubmit} className={classes.form}>
                <Typography variant="h3" className={classes.font}>Register</Typography>
                <TextField fullWidth type="number" name="phone" className={classes.input} label="Enter Phone" size="small" />
                <TextField fullWidth type="email" name="email" className={classes.input} label="Enter Phone" size="small" />
                <TextField fullWidth type="password" name="phone" className={classes.input} label="Enter Phone" size="small" />
                <Button fullWidth variant='contained' color="primary" className={classes.input}>Register</Button>
                <Link href="/login">
                    <a className={classes.link}>Alredy have an Account? Click here. </a>
                </Link>
            </form>
        </div>
    );
}
 
export default Register;