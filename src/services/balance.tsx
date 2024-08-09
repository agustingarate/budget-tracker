import axios from "axios";
import Balance, { Transaction } from "../data/models/budget";

const baseUrl = "https://plans-expenses-default-rtdb.firebaseio.com/budgets";

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

      const response = await axios.patch(`${baseUrl}/${uid}.json`, newBalance);

      console.log("API - updateBalance(): ", response.status, response.data);
    }
  } catch (e) {
    console.log(e);
  }
}

export async function postBalance(balance: Balance, uid: string) {
  const response = await axios.put(`${baseUrl}/${uid}.json`, balance);
  console.log("API - postBalance(): ", response.status, response.data);
}

export async function createBalance(uid: string) {
  postBalance(new Balance(0, []), uid);
}

export async function getBalance(uid: string) {
  try {
    const response = await axios.get(`${baseUrl}/${uid}.json`);

    console.log("API - getBalance(): ", response.status, response.data);

    return new Balance(response.data.total, response.data.transactions ?? []);
  } catch (e) {
    console.error("Error getting the user's balance", e);
  }
}
