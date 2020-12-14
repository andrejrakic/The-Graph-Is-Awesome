import { BigInt } from '@graphprotocol/graph-ts';
import {
	SupportTheGraph,
	Supported,
} from '../generated/SupportTheGraph/SupportTheGraph';
import { Support, Supporter } from '../generated/schema';

export function handleSupported(event: Supported): void {
	let supporterEntity = new Supporter(event.params.supporter.toHex());
	let supportEntity = Support.load(event.transaction.hash.toHex());

	if (supportEntity == null) {
		supportEntity = new Support(event.transaction.hash.toHex());
	}

	supportEntity.supporter = supporterEntity.id;
	supportEntity.aliasName = event.params.aliasName;
	supportEntity.comment = event.params.comment;

	supportEntity.save();
	supporterEntity.save();

	// Note: If a handler doesn't require existing field values, it is faster
	// _not_ to load the entity from the store. Instead, create it fresh with
	// `new Entity(...)`, set the fields that should be updated and save the
	// entity back to the store. Fields that were not set or unset remain
	// unchanged, allowing for partial updates to be applied.

	// It is also possible to access smart contracts from mappings. For
	// example, the contract that has emitted the event can be connected to
	// with:
	//
	// let contract = Contract.bind(event.address)
	//
	// The following functions can then be called on this contract to access
	// state variables and other data:
	//
	// - contract.supporters(...)
}
