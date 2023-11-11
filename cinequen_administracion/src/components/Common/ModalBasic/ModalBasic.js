import React from 'react'
import "./ModalBasic.scss"
import { Dialog, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function ModalBasic(props) {
    const { show, title, children, onClose } = props;

    return (
        < Dialog open={show} TransitionComponent={Transition} fullWidth={true} onClose={onClose}>
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {children}
                </DialogContentText>
            </DialogContent>
        </Dialog >
    )
}
