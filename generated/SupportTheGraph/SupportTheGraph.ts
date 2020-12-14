// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Supported extends ethereum.Event {
  get params(): Supported__Params {
    return new Supported__Params(this);
  }
}

export class Supported__Params {
  _event: Supported;

  constructor(event: Supported) {
    this._event = event;
  }

  get supporter(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get aliasName(): string {
    return this._event.parameters[1].value.toString();
  }

  get comment(): string {
    return this._event.parameters[2].value.toString();
  }
}

export class SupportTheGraph extends ethereum.SmartContract {
  static bind(address: Address): SupportTheGraph {
    return new SupportTheGraph("SupportTheGraph", address);
  }

  supporters(param0: Address): boolean {
    let result = super.call("supporters", "supporters(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBoolean();
  }

  try_supporters(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("supporters", "supporters(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }
}

export class TheGraphIsAwesomeCall extends ethereum.Call {
  get inputs(): TheGraphIsAwesomeCall__Inputs {
    return new TheGraphIsAwesomeCall__Inputs(this);
  }

  get outputs(): TheGraphIsAwesomeCall__Outputs {
    return new TheGraphIsAwesomeCall__Outputs(this);
  }
}

export class TheGraphIsAwesomeCall__Inputs {
  _call: TheGraphIsAwesomeCall;

  constructor(call: TheGraphIsAwesomeCall) {
    this._call = call;
  }

  get _aliasName(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _comment(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class TheGraphIsAwesomeCall__Outputs {
  _call: TheGraphIsAwesomeCall;

  constructor(call: TheGraphIsAwesomeCall) {
    this._call = call;
  }
}
