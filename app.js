document.addEventListener('DOMContentLoaded', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    const contractAddress = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'; // Підставте реальну адресу вашого контракту
    const contractABI = [[
        {
            "inputs": [],
            "name": "get",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "x",
                    "type": "uint256"
                }
            ],
            "name": "set",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "storedData",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]]; // ABI контракту

    const simpleStorageContract = new web3.eth.Contract(contractABI, contractAddress);

    // Отримати поточне значення
    const storedValueElement = document.getElementById('storedValue');
    const currentValue = await simpleStorageContract.methods.get().call();
    storedValueElement.textContent = currentValue;

    // Встановити нове значення
    window.setValue = async () => {
        const newValue = document.getElementById('newValue').value;
        await simpleStorageContract.methods.set(newValue).send({ from: web3.eth.defaultAccount });
        const updatedValue = await simpleStorageContract.methods.get().call();
        storedValueElement.textContent = updatedValue;
    };
});
