interface Item {
    id: string;
    name: string;
    quantity: number;
    minimumQuantity: number;
    isToxic: boolean;
    expirationDate: number;
    notes: string[];
    // msds - check with aharon what it is and how to handle it within the system.
    
}

export default Item;