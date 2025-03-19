import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { BeaconEvent, NetworkType } from '@airgap/beacon-dapp';
import { mongoSmartContract } from './ip';
import axios from "axios";

interface SmartContractInfo {
  name: string;
  address: string;
  rpcUrl: string;
  netType: string;
  mintPrice: string;
  minTransferPrice: string;
  requestFee: string;
  split: number;
}

const getSmartContractInfo = async (): Promise<SmartContractInfo> => {
  try {
    const responseMongo = await axios.get(`${mongoSmartContract}`);
    return responseMongo.data;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw error;
  }
};

const responseMongo = await getSmartContractInfo();

const smartContractAddress = responseMongo.address;
export const getsmartContractAddress = () => {
  return smartContractAddress;
}

const rpcUrl = responseMongo.rpcUrl;
let netType;
if (responseMongo.netType == 'ghostnet') netType = NetworkType.GHOSTNET;
else netType = NetworkType.MAINNET;

const Tezos = new TezosToolkit(rpcUrl);
const wallet = new BeaconWallet({
  name: responseMongo.name,
  preferredNetwork: netType,
});
Tezos.setWalletProvider(wallet);
wallet.client.subscribeToEvent(BeaconEvent.ACTIVE_ACCOUNT_SET, () => {});

export const getWallet = () => {
  return wallet;
};

export const getTezos = () => {
  return Tezos;
};

export const setWalletConnection = async (wallet: BeaconWallet, setMyAddress: React.Dispatch<React.SetStateAction<string | undefined>>): Promise<undefined> => {
  try {
    const activeAccount = await wallet.client.getActiveAccount();
    if (activeAccount) {
      setMyAddress(activeAccount.address);
      localStorage.setItem('address', activeAccount.address);
      return; 
    } else {
      setMyAddress(undefined);
      localStorage.setItem('address', '');
      return; 
    }
  } catch (error) {
    console.error('Error setting wallet connection:', error);
    return; 
  }
};

export const connectWallet = async (wallet: BeaconWallet, setMyAddress: React.Dispatch<React.SetStateAction<string | undefined>>): Promise<undefined> => {
  try {
    try {
      await wallet.requestPermissions({
        network: {
          type: netType,
          rpcUrl: rpcUrl,
        },
      });
    } catch (permissionError) {
        console.error('Error requesting permissions from wallet:', permissionError);
        return;
      }
    try {
      const pkh = await wallet.getPKH();
      setMyAddress(pkh);
      localStorage.setItem('address', pkh);
      return;
    } catch (pkhError) {
      console.error('Error getting public key hash (PKH):', pkhError);
      return;
    }
  } catch (error) {
    console.error('Error connecting to wallet:', error);
    return;
  }
};

export const disconnectWallet = async (wallet: BeaconWallet, setMyAddress: React.Dispatch<React.SetStateAction<string | undefined>>): Promise<undefined> => {
  try {
    try {
      await wallet.clearActiveAccount();
      setMyAddress(undefined);
      localStorage.setItem('address', '');
      return;
    } catch (error) {
        console.error("Error clearing active account:", error);
        return;
    }
  } catch (error) {
    console.error('Error disconnecting from wallet:', error);
    return;
  }
};