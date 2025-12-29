import { LightningElement, track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DropdownDemo extends LightningElement {

    menuItems1 = [
            { id: '1', label: 'Option 1', value: 'option1' },
            { id: '2', label: 'Option 2', value: 'option2' },
            { id: '3', label: 'Option 3', value: 'option3' }
    ];

    menuItems2 = [
            { id: '4', label: 'Option A', value: 'optionA' },
            { id: '5', label: 'Option B', value: 'optionB' },
            { id: '6', label: 'Option C', value: 'optionC' }
    ];

    menuItems3 = [
            { id: '7', label: 'Option X', value: 'optionX' },
            { id: '8', label: 'Option Y', value: 'optionY' },
            { id: '9', label: 'Option Z', value: 'optionZ' }
    ];

    handleItemSelected(event) {
        let selectedItem = event.detail;
        console.log('Items are displayed!!');
        const toastEvent = new ShowToastEvent({
            title: 'Item Selected',
            message: `You selected: ${selectedItem.label}`,
            variant: 'success'
        });
        this.dispatchEvent(toastEvent);
    }
}