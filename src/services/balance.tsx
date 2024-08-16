import axios from "axios";
import Balance, { Transaction } from "../data/models/budget";

const BASE_URL = "https://plans-expenses-default-rtdb.firebaseio.com/budgets";

export async function updateBalance(
  amount: number,
  transaction: Transaction,
  uid: string,
) {
  try {
    const oldBalance = await getBalance(uid);
    if (oldBalance) {
      const newBalance = oldBalance.copyWith({
        total: oldBalance.total + amount,
        transactions: [transaction, ...oldBalance.transactions],
      });

      const response = await axios.patch(`${BASE_URL}/${uid}.json`, newBalance);

      console.log("API - updateBalance(): ", response.status, response.data);
    }
  } catch (e) {
    console.log(e);
  }
}

export async function postBalance(balance: Balance, uid: string) {
  try {
    const response = await axios.put(`${BASE_URL}/${uid}.json`, balance);
    console.log("API - postBalance(): ", response.status, response.data);
  } catch (e) {
    console.error("API - postBalance(): ", e);
  }
}

export async function createBalance(uid: string) {
  postBalance(new Balance(0, []), uid);
}

export async function getBalance(uid: string) {
  try {
    const response = await axios.get(`${BASE_URL}/${uid}.json`);

    console.log("API - getBalance(): ", response.status, response.data);

    return Balance.fromObject(response.data);
  } catch (e) {
    console.error("Error getting the user's balance", e);
  }
}

export async function getBalanceTotal(uid: string) {
  try {
    const response = await axios.get(`${BASE_URL}/${uid}/total.json`);

    console.log("API - getBalanceTotal(): ", response.status, response.data);

    return response.data;
  } catch (e) {
    console.error("Error getting the user's balance", e);
  }
}
