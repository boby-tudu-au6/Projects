import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Snackbar, SnackbarContent } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutlined'
import {ErrorOutline} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    content: {
        // backgroundColor: colors.green[600],
        backgroundColor:'red'
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        marginRight: theme.spacing(2),
    },
}))

const SuccessSnackbar = (props) => {
    const { open, onClose, type, text } = props

    const classes = useStyles()

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            autoHideDuration={6000}
            onClose={onClose}
            open={open}>
            <SnackbarContent
                className={`bg-${type==='ok'?'success':"danger"}`}
                message={
                    <span className={classes.message}>
                        {
                            type==='ok'?
                            <CheckCircleIcon className={classes.icon} />:
                            <ErrorOutline className={classes.icon} />
                        }
                        {text}
                    </span>
                }
                variant="elevation"
            />
        </Snackbar>
    )
}


export default SuccessSnackbar
