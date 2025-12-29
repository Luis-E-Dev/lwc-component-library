import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CustomDropdown extends LightningElement {
    @api label = 'Menu';
    @api iconName = 'utility:down';
    @api menuItems = [
        { id: '1', label: 'Option 1', value: 'option1' },
        { id: '2', label: 'Option 2', value: 'option2' },
        { id: '3', label: 'Option 3', value: 'option3' }
    ];
    @api variant = 'neutral';
    @api menuAlignment = 'left'

    isOpen = false;
    focusedIndex = 0;
    storeWindowClickHandler;

    connectedCallback() {
        this.storeWindowClickHandler = this.handleClickOutside.bind(this);
        document.addEventListener('click', this.storeWindowClickHandler);
    }

    disconnectedCallback() {
        document.removeEventListener('click', this.storeWindowClickHandler);
    }

    toggleDropdown(event) {
        this.isOpen = !this.isOpen;
        event.stopPropagation();
    }

    toastEvent(event) {
        const toastEvent = new ShowToastEvent({
            title: 'Item Selected',
            message: `You selected: ${event.detail.label}`,
            variant: 'success'
        });
        this.dispatchEvent(toastEvent);
    }

    handleMenuItemClick(event) {
        const selectedValue = event.detail.value;
        const selectedItem = this.menuItems.find(item => item.value === selectedValue);
        
        // Show toast notification
        const toast = new ShowToastEvent({
            title: 'Item Selected',
            message: `You selected: ${selectedItem.label}`,
            variant: 'success'
        });
        this.dispatchEvent(toast);
        
        // Dispatch custom event to parent
        this.dispatchEvent(new CustomEvent('itemselected', {
            detail: { 
                value: selectedItem.value,
                label: selectedItem.label
            }
        }));
    }

    handleClickOutside(event) {
        const dropdown = this.template.querySelector('.dropdown');
        const button = this.template.querySelector('button');
        
        // Don't close if clicking on own button (let toggleDropdown handle it)
        if (button && button.contains(event.target)) {
            return;
        }
        
        // Close if clicking outside this dropdown
        if (dropdown && this.isOpen && !dropdown.contains(event.target)) {
            this.isOpen = false;
        }
    }

    handleKeyDown(event) {
        const key = event.key;
        if (!this.isOpen && (key === 'Enter' || key === ' ' || key === 'ArrowDown')) {
            this.isOpen = true;
            event.preventDefault();
            return;
        }

        if (!this.isOpen) {
            return;
        }

        switch (key) {
            case 'ArrowDown':
                this.focusNextItem();
                event.preventDefault();
                break;
            case 'ArrowUp':
                this.focusPreviousItem();
                event.preventDefault();
                break;
            case 'Enter':
            case ' ':
                this.selectItem(this.focusedIndex);
                event.preventDefault();
                break;
            case 'Escape':
                this.isOpen = false;
                event.preventDefault();
                break;
        }
    }

    updateFocusedItem() {
        const items = this.template.querySelectorAll('[role="menuitem"]');
        if (items && items[this.focusedIndex]) {
            items[this.focusedIndex].focus();
        }
    }

    focusNextItem() {
        this.focusedIndex = (this.focusedIndex + 1) % this.menuItems.length;
        this.updateFocusedItem();
    }

    focusPreviousItem() {
        this.focusedIndex = (this.focusedIndex - 1 + this.menuItems.length) % this.menuItems.length;
        this.updateFocusedItem();
    }

    selectItem(index) {
        const selectedItem = this.menuItems[index];
        this.dispatchEvent(new CustomEvent('itemselected', {
            detail: { value: selectedItem.value,
                      label: selectedItem.label
             }
        }));
        this.isOpen = false;
    }

    get dropdownClass() {
        const baseClass = 'slds-dropdown slds-dropdown_' + this.menuAlignment;
        if(this.isOpen) {
            return baseClass + ' slds-show';
        } else {
            return baseClass + ' slds-hide';
        }
    }

    get hasIcon() {
        return this.iconName && this.iconName !== '';
    }

    get hasMenuItems() {
        return this.menuItems && this.menuItems.length > 0;
    }
    
    getItemClass(index) {
        return this.focusedIndex === index ? 'slds-is-focused' : '';
    }
}