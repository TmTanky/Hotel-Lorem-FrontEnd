import React from 'react'

import Zoom from '@material-ui/core/Zoom';
import CloseIcon from '@material-ui/icons/Close'
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import { Button } from '@material-ui/core'

const PopUpEditRate = ({checked2, roomers2, open2, setOpen2, setChecked2, setReview2, setSubmitError, submitError, rateTheRoom, userID, item, review2}) => {

    return (
        <Zoom in={checked2}>
                    <div className="ratebox">

                    <Collapse in={open2} className="submitdone" >
                        <Alert
                        action={
                            <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen2(false);
                                setChecked2(false)
                            }}
                            >
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        >
                        Review Submitted!
                        </Alert>
                    </Collapse>

                        <div className="submitclose">
                            <CloseIcon onClick={() => {
                                setChecked2(false)
                                setReview2({ data2: "" })
                                // setSubmitError({
                                //     error: []
                                // })
                            }} />
                        </div>

                        <form>
                            <h1 style={{margin: '0.5rem', fontSize: '2.5rem'}} > Submit a review </h1>
                            {/* {submitError.error.length > 0 ? submitError.error.map(err => {
                                return <p key={err.msg} style={{color: 'red', fontSize: '0.8rem', margin: '0.3rem 0rem'}} > {err.msg} </p>
                            }) : ""} */}
                            <input className="submitreview" value={review2.data} type="number" min="1" onChange={(e) => setReview2({ data2: e.target.value }) } max="5" name="number"/>
                            <Button style={{marginTop: '1rem'}} onClick={() => {
                                rateTheRoom({
                                    variables: {
                                        roomID: item.theBookedRoom[0]._id,
                                        userID,
                                        rating: parseInt(review2.data),
                                        theRoomToUpdate: roomers2
                                    }
                                })
                            }} variant="contained" color="primary" > Submit </Button>
                        </form>
                    </div>
                </Zoom>
    )
}

export default PopUpEditRate