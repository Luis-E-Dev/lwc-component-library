import { LightningElement, api } from 'lwc';

export default class CustomModal extends LightningElement {
    @api isOpen = false; //Controls the visibility of the modal
    @api title = ''; //Modal header title
    @api size = 'large'; //Modal size: small, medium, large
    @api showFooter = false; //Show/hide footer buttons
    @api confirmLabel = 'Confirm'; //Label for confirm button
    @api cancelLabel = 'Cancel'; //Label for cancel button

    handleConfirm() {
        this.dispatchEvent(new CustomEvent('confirm'));
        this.isOpen = false;
    }

    handleCancel() {
        this.dispatchEvent(new CustomEvent('cancel'));
        this.isOpen = false;
    }

    handleBackdropClick(event) {
        if(event.target === event.currentTarget) {
            this.handleCancel();
        }
    }

    get modalSizeClass() {
        return `slds-modal_${this.size}`;
    }

    get containerClass() {
        return this.isOpen ? 'slds-modal slds-fade-in-open' : 'slds-modal';
    }

    get backdropClass() {
        return this.isOpen ? 'slds-backdrop slds-backdrop_open' : 'slds-backdrop';
    }
}