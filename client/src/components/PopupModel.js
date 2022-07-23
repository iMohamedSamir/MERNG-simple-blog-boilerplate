import React, { useState, cloneElement } from 'react';
import { render } from 'react-dom';
import { Button, Modal } from 'semantic-ui-react';

function PopupModel(props) {
    
    const [open, setOpen] = useState(false)

    const { buttonName, content, icon, color, size } = props

    var clonedContent = cloneElement(content, {setOpen: setOpen});

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button icon={icon} size={size} color={color}>{buttonName && buttonName}</Button>}
        >
            <Modal.Header>Add new Post</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                    {/* //TODO: Refactor.
                    //TODO: Move the submit button here.
                    //TODO: Return error if any.
                    //TODO: return success message.*/}
                   {clonedContent} 
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>Cancel</Button>
            </Modal.Actions>
        </Modal>
    );
}

export default PopupModel;