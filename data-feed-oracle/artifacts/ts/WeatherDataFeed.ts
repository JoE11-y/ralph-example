/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Address,
  Contract,
  ContractState,
  TestContractResult,
  HexString,
  ContractFactory,
  EventSubscribeOptions,
  EventSubscription,
  CallContractParams,
  CallContractResult,
  TestContractParams,
  ContractEvent,
  subscribeContractEvent,
  subscribeContractEvents,
  testMethod,
  callMethod,
  multicallMethods,
  fetchContractState,
  Asset,
  ContractInstance,
  getContractEventsCurrentCount,
  TestContractParamsWithoutMaps,
  TestContractResultWithoutMaps,
  SignExecuteContractMethodParams,
  SignExecuteScriptTxResult,
  signExecuteMethod,
  addStdIdToFields,
  encodeContractFields,
  Narrow,
} from "@alephium/web3";
import { default as WeatherDataFeedContractJson } from "../WeatherDataFeed.ral.json";
import { getContractByCodeHash, registerContract } from "./contracts";
import { Request, AllStructs } from "./types";
import { RalphMap } from "@alephium/web3";

// Custom types for the contract
export namespace WeatherDataFeedTypes {
  export type Fields = {
    ownerId: HexString;
    authorizedOraclesCount: bigint;
    lastTimestamp: bigint;
    lastRequestId: HexString;
    fee: bigint;
    feeWallet: Address;
  };

  export type State = ContractState<Fields>;

  export type NewRequestEvent = ContractEvent<{
    requestId: HexString;
    lat: bigint;
    lon: bigint;
  }>;
  export type RequestCompletedEvent = ContractEvent<{
    requestId: HexString;
    temp: HexString;
  }>;

  export interface CallMethodTable {
    addOracle: {
      params: CallContractParams<{ newOracle: Address }>;
      result: CallContractResult<null>;
    };
    removeOracle: {
      params: CallContractParams<{ oracle: Address }>;
      result: CallContractResult<null>;
    };
    makeRequest: {
      params: CallContractParams<{ lat: bigint; lon: bigint }>;
      result: CallContractResult<HexString>;
    };
    completeRequest: {
      params: CallContractParams<{
        requestId: HexString;
        temp: HexString;
        publicKey: HexString;
        signature: HexString;
        timestamp: bigint;
      }>;
      result: CallContractResult<null>;
    };
    getRequest: {
      params: CallContractParams<{ requestId: HexString }>;
      result: CallContractResult<Request>;
    };
  }
  export type CallMethodParams<T extends keyof CallMethodTable> =
    CallMethodTable[T]["params"];
  export type CallMethodResult<T extends keyof CallMethodTable> =
    CallMethodTable[T]["result"];
  export type MultiCallParams = Partial<{
    [Name in keyof CallMethodTable]: CallMethodTable[Name]["params"];
  }>;
  export type MultiCallResults<T extends MultiCallParams> = {
    [MaybeName in keyof T]: MaybeName extends keyof CallMethodTable
      ? CallMethodTable[MaybeName]["result"]
      : undefined;
  };
  export type MulticallReturnType<Callss extends MultiCallParams[]> = {
    [index in keyof Callss]: MultiCallResults<Callss[index]>;
  };

  export interface SignExecuteMethodTable {
    addOracle: {
      params: SignExecuteContractMethodParams<{ newOracle: Address }>;
      result: SignExecuteScriptTxResult;
    };
    removeOracle: {
      params: SignExecuteContractMethodParams<{ oracle: Address }>;
      result: SignExecuteScriptTxResult;
    };
    makeRequest: {
      params: SignExecuteContractMethodParams<{ lat: bigint; lon: bigint }>;
      result: SignExecuteScriptTxResult;
    };
    completeRequest: {
      params: SignExecuteContractMethodParams<{
        requestId: HexString;
        temp: HexString;
        publicKey: HexString;
        signature: HexString;
        timestamp: bigint;
      }>;
      result: SignExecuteScriptTxResult;
    };
    getRequest: {
      params: SignExecuteContractMethodParams<{ requestId: HexString }>;
      result: SignExecuteScriptTxResult;
    };
  }
  export type SignExecuteMethodParams<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["params"];
  export type SignExecuteMethodResult<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["result"];

  export type Maps = {
    authorizedOracles?: Map<Address, boolean>;
    requests?: Map<HexString, Request>;
  };
}

class Factory extends ContractFactory<
  WeatherDataFeedInstance,
  WeatherDataFeedTypes.Fields
> {
  encodeFields(fields: WeatherDataFeedTypes.Fields) {
    return encodeContractFields(
      addStdIdToFields(this.contract, fields),
      this.contract.fieldsSig,
      AllStructs
    );
  }

  eventIndex = { NewRequest: 0, RequestCompleted: 1 };
  consts = {
    ErrorCodes: {
      UnauthorizedOracle: BigInt("0"),
      InvalidCaller: BigInt("1"),
      InvalidTimestamp: BigInt("2"),
    },
  };

  at(address: string): WeatherDataFeedInstance {
    return new WeatherDataFeedInstance(address);
  }

  tests = {
    addOracle: async (
      params: TestContractParams<
        WeatherDataFeedTypes.Fields,
        { newOracle: Address },
        WeatherDataFeedTypes.Maps
      >
    ): Promise<TestContractResult<null, WeatherDataFeedTypes.Maps>> => {
      return testMethod(this, "addOracle", params, getContractByCodeHash);
    },
    removeOracle: async (
      params: TestContractParams<
        WeatherDataFeedTypes.Fields,
        { oracle: Address },
        WeatherDataFeedTypes.Maps
      >
    ): Promise<TestContractResult<null, WeatherDataFeedTypes.Maps>> => {
      return testMethod(this, "removeOracle", params, getContractByCodeHash);
    },
    makeRequest: async (
      params: TestContractParams<
        WeatherDataFeedTypes.Fields,
        { lat: bigint; lon: bigint },
        WeatherDataFeedTypes.Maps
      >
    ): Promise<TestContractResult<HexString, WeatherDataFeedTypes.Maps>> => {
      return testMethod(this, "makeRequest", params, getContractByCodeHash);
    },
    completeRequest: async (
      params: TestContractParams<
        WeatherDataFeedTypes.Fields,
        {
          requestId: HexString;
          temp: HexString;
          publicKey: HexString;
          signature: HexString;
          timestamp: bigint;
        },
        WeatherDataFeedTypes.Maps
      >
    ): Promise<TestContractResult<null, WeatherDataFeedTypes.Maps>> => {
      return testMethod(this, "completeRequest", params, getContractByCodeHash);
    },
    getRequest: async (
      params: TestContractParams<
        WeatherDataFeedTypes.Fields,
        { requestId: HexString },
        WeatherDataFeedTypes.Maps
      >
    ): Promise<TestContractResult<Request, WeatherDataFeedTypes.Maps>> => {
      return testMethod(this, "getRequest", params, getContractByCodeHash);
    },
  };

  stateForTest(
    initFields: WeatherDataFeedTypes.Fields,
    asset?: Asset,
    address?: string,
    maps?: WeatherDataFeedTypes.Maps
  ) {
    return this.stateForTest_(initFields, asset, address, maps);
  }
}

// Use this object to test and deploy the contract
export const WeatherDataFeed = new Factory(
  Contract.fromJson(
    WeatherDataFeedContractJson,
    "=6-2+4c=2+9=2-1+1=1-2+d=2-2+c9=1-3+203=11-1+8=68+7a7e0214696e73657274206174206d617020706174683a2000=33-1+7=68+7a7e021472656d6f7665206174206d617020706174683a2000=30-2+31=128+7a7e0214696e73657274206174206d617020706174683a2000=538",
    "e1c0ab5fe3aec77f5b33947d02e427555dc1dcffa57dbcffc60376b727cf3ab3",
    AllStructs
  )
);
registerContract(WeatherDataFeed);

// Use this class to interact with the blockchain
export class WeatherDataFeedInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  maps = {
    authorizedOracles: new RalphMap<Address, boolean>(
      WeatherDataFeed.contract,
      this.contractId,
      "authorizedOracles"
    ),
    requests: new RalphMap<HexString, Request>(
      WeatherDataFeed.contract,
      this.contractId,
      "requests"
    ),
  };

  async fetchState(): Promise<WeatherDataFeedTypes.State> {
    return fetchContractState(WeatherDataFeed, this);
  }

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribeNewRequestEvent(
    options: EventSubscribeOptions<WeatherDataFeedTypes.NewRequestEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      WeatherDataFeed.contract,
      this,
      options,
      "NewRequest",
      fromCount
    );
  }

  subscribeRequestCompletedEvent(
    options: EventSubscribeOptions<WeatherDataFeedTypes.RequestCompletedEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      WeatherDataFeed.contract,
      this,
      options,
      "RequestCompleted",
      fromCount
    );
  }

  subscribeAllEvents(
    options: EventSubscribeOptions<
      | WeatherDataFeedTypes.NewRequestEvent
      | WeatherDataFeedTypes.RequestCompletedEvent
    >,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvents(
      WeatherDataFeed.contract,
      this,
      options,
      fromCount
    );
  }

  view = {
    addOracle: async (
      params: WeatherDataFeedTypes.CallMethodParams<"addOracle">
    ): Promise<WeatherDataFeedTypes.CallMethodResult<"addOracle">> => {
      return callMethod(
        WeatherDataFeed,
        this,
        "addOracle",
        params,
        getContractByCodeHash
      );
    },
    removeOracle: async (
      params: WeatherDataFeedTypes.CallMethodParams<"removeOracle">
    ): Promise<WeatherDataFeedTypes.CallMethodResult<"removeOracle">> => {
      return callMethod(
        WeatherDataFeed,
        this,
        "removeOracle",
        params,
        getContractByCodeHash
      );
    },
    makeRequest: async (
      params: WeatherDataFeedTypes.CallMethodParams<"makeRequest">
    ): Promise<WeatherDataFeedTypes.CallMethodResult<"makeRequest">> => {
      return callMethod(
        WeatherDataFeed,
        this,
        "makeRequest",
        params,
        getContractByCodeHash
      );
    },
    completeRequest: async (
      params: WeatherDataFeedTypes.CallMethodParams<"completeRequest">
    ): Promise<WeatherDataFeedTypes.CallMethodResult<"completeRequest">> => {
      return callMethod(
        WeatherDataFeed,
        this,
        "completeRequest",
        params,
        getContractByCodeHash
      );
    },
    getRequest: async (
      params: WeatherDataFeedTypes.CallMethodParams<"getRequest">
    ): Promise<WeatherDataFeedTypes.CallMethodResult<"getRequest">> => {
      return callMethod(
        WeatherDataFeed,
        this,
        "getRequest",
        params,
        getContractByCodeHash
      );
    },
  };

  transact = {
    addOracle: async (
      params: WeatherDataFeedTypes.SignExecuteMethodParams<"addOracle">
    ): Promise<WeatherDataFeedTypes.SignExecuteMethodResult<"addOracle">> => {
      return signExecuteMethod(WeatherDataFeed, this, "addOracle", params);
    },
    removeOracle: async (
      params: WeatherDataFeedTypes.SignExecuteMethodParams<"removeOracle">
    ): Promise<
      WeatherDataFeedTypes.SignExecuteMethodResult<"removeOracle">
    > => {
      return signExecuteMethod(WeatherDataFeed, this, "removeOracle", params);
    },
    makeRequest: async (
      params: WeatherDataFeedTypes.SignExecuteMethodParams<"makeRequest">
    ): Promise<WeatherDataFeedTypes.SignExecuteMethodResult<"makeRequest">> => {
      return signExecuteMethod(WeatherDataFeed, this, "makeRequest", params);
    },
    completeRequest: async (
      params: WeatherDataFeedTypes.SignExecuteMethodParams<"completeRequest">
    ): Promise<
      WeatherDataFeedTypes.SignExecuteMethodResult<"completeRequest">
    > => {
      return signExecuteMethod(
        WeatherDataFeed,
        this,
        "completeRequest",
        params
      );
    },
    getRequest: async (
      params: WeatherDataFeedTypes.SignExecuteMethodParams<"getRequest">
    ): Promise<WeatherDataFeedTypes.SignExecuteMethodResult<"getRequest">> => {
      return signExecuteMethod(WeatherDataFeed, this, "getRequest", params);
    },
  };

  async multicall<Calls extends WeatherDataFeedTypes.MultiCallParams>(
    calls: Calls
  ): Promise<WeatherDataFeedTypes.MultiCallResults<Calls>>;
  async multicall<Callss extends WeatherDataFeedTypes.MultiCallParams[]>(
    callss: Narrow<Callss>
  ): Promise<WeatherDataFeedTypes.MulticallReturnType<Callss>>;
  async multicall<
    Callss extends
      | WeatherDataFeedTypes.MultiCallParams
      | WeatherDataFeedTypes.MultiCallParams[]
  >(callss: Callss): Promise<unknown> {
    return await multicallMethods(
      WeatherDataFeed,
      this,
      callss,
      getContractByCodeHash
    );
  }
}