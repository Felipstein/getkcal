import { AddConsumptionContract } from "@getkcal/contracts";
import { api } from "./axios";

export async function addConsumption(body: AddConsumptionContract.BodyRequest) {
  const response = await api.post<AddConsumptionContract.Response>('/consumptions', body)

  return AddConsumptionContract.response.parse(response.data);
}
