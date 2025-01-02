import { addressFromContractId, groupOfAddress, subContractId, utils, web3 } from '@alephium/web3'
import { getSigner, getSigners, testAddress } from '@alephium/web3-test'
import { Metadata, VestingInstance } from '../artifacts/ts'
import { PrivateKeyWallet } from '@alephium/web3-wallet'
import {
  addVestingSchedule,
  addVestingScheduleFailed,
  addVestingScheduleWithPercentage,
  addVestingScheduleWithPercentageFailed,
  alph,
  deployVestingContract,
  claim,
  claimFailed,
  groupIndex,
  mineBlocks,
  generateSchedule
} from './utils'
import base58 from 'bs58'

describe('VestingWallet Tests', () => {
  let vesting: VestingInstance
  let manager: PrivateKeyWallet
  let users: PrivateKeyWallet[]
  let fakeManager: PrivateKeyWallet

  beforeEach(async () => {
    manager = await getSigner(alph(5000), groupIndex)
    fakeManager = await getSigner(alph(5000), groupIndex)
    vesting = (await deployVestingContract(manager.address)).contractInstance
    users = await getSigners(6, alph(100), groupIndex)
  })

  async function getUserMetadata(user: PrivateKeyWallet) {
    const path = utils.binToHex(base58.decode(user.address))
    const metadataContractId = subContractId(vesting.contractId, path, groupIndex)
    const metadataContract = Metadata.at(addressFromContractId(metadataContractId))
    const state = await metadataContract.fetchState()
    return state
  }

  async function checkUserLockedAmount(user: PrivateKeyWallet, lockedAmount: bigint) {
    const state = await getUserMetadata(user)
    expect(state.fields.totalAmount).toEqual(lockedAmount)
    expect(state.fields.address).toEqual(user.address)
    expect(state.fields.vesting).toEqual(vesting.contractId)
  }

  test('test: admin add schedule without cliff', async () => {
    const user1 = users[0]
    const lockedAmount = alph(100)
    const schedule = generateSchedule(60, false)
    await addVestingSchedule(
      manager,
      vesting,
      user1.address,
      schedule.startTime,
      schedule.cliffTime,
      schedule.endTime,
      lockedAmount
    )

    await checkUserLockedAmount(user1, lockedAmount)
  }, 30000)

  test('test: admin add schedule with cliff', async () => {
    const user1 = users[0]
    const lockedAmount = alph(100)
    const schedule = generateSchedule(60, true)
    await addVestingSchedule(
      manager,
      vesting,
      user1.address,
      schedule.startTime,
      schedule.cliffTime,
      schedule.endTime,
      lockedAmount
    )

    await checkUserLockedAmount(user1, lockedAmount)
  }, 30000)

  test('test: admin cannot add schedule to user twice', async () => {
    const user1 = users[0]
    const lockedAmount = alph(100)
    const schedule = generateSchedule(60, false)

    await addVestingSchedule(
      manager,
      vesting,
      user1.address,
      schedule.startTime,
      schedule.cliffTime,
      schedule.endTime,
      lockedAmount
    )

    await addVestingScheduleFailed(
      manager,
      vesting,
      user1.address,
      schedule.startTime,
      schedule.cliffTime,
      schedule.endTime,
      lockedAmount,
      5n
    )
  }, 30000)

  test('test: not admin cannot add schedule', async () => {
    const user1 = users[0]
    const lockedAmount = alph(100)
    const schedule = generateSchedule(60, false)

    await addVestingScheduleFailed(
      fakeManager,
      vesting,
      user1.address,
      schedule.startTime,
      schedule.cliffTime,
      schedule.endTime,
      lockedAmount,
      0n
    )
  }, 30000)

  test('test: admin cannot add schedule with invalid cliff time', async () => {
    const user1 = users[1]
    const lockedAmount = alph(100)
    const schedule = generateSchedule(60, false)

    // testing with cliff time less than start time
    await addVestingScheduleFailed(
      manager,
      vesting,
      user1.address,
      schedule.startTime,
      schedule.startTime - BigInt(1000),
      schedule.endTime,
      lockedAmount,
      1n
    )
  }, 30000)

  test('test: admin cannot add schedule with invalid end time', async () => {
    const user1 = users[0]
    const lockedAmount = alph(100)
    const schedule = generateSchedule(60, false)

    // testing with end time less than cliff time
    await addVestingScheduleFailed(
      manager,
      vesting,
      user1.address,
      schedule.startTime,
      schedule.cliffTime,
      schedule.cliffTime - BigInt(1000),
      lockedAmount,
      2n
    )
  }, 30000)

  test('test: admin add schedule with percentage', async () => {
    const user1 = users[0]
    const lockedAmount = alph(100)
    const schedule = generateSchedule(60, true)
    const percentage = 30n
    await addVestingScheduleWithPercentage(
      manager,
      vesting,
      user1.address,
      schedule.startTime,
      schedule.cliffTime,
      schedule.endTime,
      lockedAmount,
      percentage
    )

    const actualAmount = (lockedAmount * percentage) / 100n

    await checkUserLockedAmount(user1, actualAmount)
  }, 30000)

  // test('test: admin cannot add schedule with percentage greater than 100%', async () => {
  //   const user1 = users[0]
  //   const lockedAmount = alph(100)
  //   const schedule = generateSchedule(60, true)
  //   const percentage = 120n
  //   await addVestingScheduleWithPercentageFailed(
  //     manager,
  //     vesting,
  //     user1.address,
  //     schedule.startTime,
  //     schedule.cliffTime,
  //     schedule.endTime,
  //     lockedAmount,
  //     percentage,
  //     3n
  //   )

  //   const actualAmount = (lockedAmount * 30n) / 100n

  //   await checkUserLockedAmount(user1, actualAmount)
  // }, 30000)
})
