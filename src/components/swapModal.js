import React from 'react'
import {Button, Modal} from 'react-bootstrap'

const modal = props => {
	const {show, user, amountFrom, cryptoFrom, amountTo, cryptoTo, handleClose} = props

	return <>
		<Modal show={show} onHide={handleClose}>
		  	<Modal.Header closeButton>
				<Modal.Title>Now we are waiting your tip </Modal.Title>
		  	</Modal.Header>
			<Modal.Body>
				<p>{user} send tip to <strong>cryptoantelope</strong> with {amountFrom} {cryptoFrom}.</p>
				<p>In approximately 2 minutes after that you will receive your {amountTo} {cryptoTo}</p>
			</Modal.Body>
		  	<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
			  		Close
				</Button>
		  	</Modal.Footer>
		</Modal>
  	</>
}

export default modal
