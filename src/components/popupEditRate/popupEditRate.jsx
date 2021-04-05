import React from 'react'

import Zoom from '@material-ui/core/Zoom';
import CloseIcon from '@material-ui/icons/Close'
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import { Button } from '@material-ui/core'

const PopUpEditRate = ({checked2, editTheRate, roomers2, open2, setOpen2, setChecked2, setReview2, setSubmitError2, submitError2, review2}) => {

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
                        Review Edit Done!
                        </Alert>
                    </Collapse>

                        <div className="submitclose">
                            <CloseIcon onClick={() => {
                                setChecked2(false)
                                setReview2({ data2: "" })
                                setSubmitError2({
                                    error2: []
                                })
                            }} />
                        </div>

                        <form>
                            <h1 style={{margin: '0.5rem', fontSize: '2.5rem'}} > Edit a review </h1>
                            {submitError2.error2.length > 0 ? submitError2.error2.map(err => {
                                return <p key={err.msg} style={{color: 'red', fontSize: '0.8rem', margin: '0.3rem 0rem'}} > {err.msg} </p>
                            }) : ""}
                            <input className="submitreview" value={review2.data} type="number" min="1" onChange={(e) => setReview2({ data2: e.target.value }) } max="5" name="number"/>
                            <Button style={{marginTop: '1rem'}} onClick={() => {

                                if (review2.data2.length >= 2 ) {
                                    return setSubmitError2({
                                        error2: [{ msg: "Input must be 1 character." }]
                                    })
                                }

                                if (review2.data2 >= 6 || review2.data2 <= 0) {
                                    return setSubmitError2({
                                        error2: [{ msg: "Review must be 1 - 5." }]
                                    })
                                }

                                editTheRate({
                                    variables: {
                                        reviewID: roomers2,
                                        newRating: parseInt(review2.data2)
                                    }
                                })
                            }} variant="contained" color="primary" > Submit </Button>
                        </form>
                    </div>
                </Zoom>
    )
}

export default PopUpEditRate