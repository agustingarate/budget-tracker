import axios from "axios";
import { Plan } from "../data/models/plan";
import { getBalance, getBalanceTotal } from "./balance";

const BASE_URL = "https://plans-expenses-default-rtdb.firebaseio.com/plans";

export async function addPlan(uid: string, plan: Plan) {
  try {
    await setNewTotal(uid, plan.percentage);

    const response = await axios.post(`${BASE_URL}/${uid}/data.json`, plan);
    console.log("API - addPlan(): ", response.status, response.data, "\n");
  } catch (e) {
    console.log(e);
    return;
  }
}

export async function getTotal(uid: string) {
  try {
    const response = await axios.get(`${BASE_URL}/${uid}/total.json`);
    console.log("API - getTotal(): ", response.status, response.data, "\n");

    if (response.data == null) {
      return 0;
    }

    return response.data;
  } catch (e) {
    console.error("API - getTotal()", e);
  }
}

export async function setNewTotal(uid: string, percentage: number) {
  try {
    const totalBalance = await getBalanceTotal(uid);
    let oldTotal = await getTotal(uid);

    const calculatedAmount = (totalBalance - oldTotal) * percentage + oldTotal;

    if (calculatedAmount > 0 && calculatedAmount < totalBalance) {
      console.log(calculatedAmount);
      const response = await axios.patch(`${BASE_URL}/${uid}.json`, {
        total: calculatedAmount,
      });

      console.log(
        "API - setNewTotal(): ",
        response.status,
        response.data,
        "\n",
      );
      return response.data;
    } else {
      throw Error("Se utilizo todo el total");
    }
  } catch (e) {
    console.error("API - setNewTotal(): ", e);
    throw e;
  }
}

export async function getAllPlans(uid: string) {
  try {
    const response = await axios.get(`${BASE_URL}/${uid}/data.json`);
    console.log("API - getPlans(): ", response.status, response.data);
    const plans: Plan[] = [];
    if (response.data != null) {
      Object.keys(response.data).forEach((key: string) => {
        const planResponse = response.data[key];

        plans.push(
          new Plan(
            planResponse.title,
            planResponse.totalRequired,
            planResponse.percentage,
            planResponse.category,
            planResponse.deadline,
            key,
          ),
        );
      });
    }

    return plans;
  } catch (e) {
    console.log(e);
  }
}
