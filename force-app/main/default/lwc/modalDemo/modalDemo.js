import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ModalDemo extends LightningElement {
    showModal = false;

    openModal() {
        this.showModal = true;
    }

    handleModalConfirm() {
        console.log('Modal confirmed');
        this.showYesToast();
        this.showModal = false;
    }

    handleModalCancel() {
        console.log('Modal canceled');
        this.showNoToast();
        this.showModal = false;
    }

    showYesToast() {
        const event = new ShowToastEvent({
            title: 'Message for Yes!',
            message: 'You clicked Yes!',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }

    showNoToast() {
        const event = new ShowToastEvent({
            title: 'Message for No!',
            message: 'You clicked No!',
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }
}