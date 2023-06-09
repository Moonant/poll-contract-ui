import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


const contractABI = require("../static/contract-abi.json");
const contractAddress = "0x1A634ffcdE89909E774fFC0561aBCb9174699879";
const PRIVATE_KEY = "0b2f98bc70eca128927f2edf218bc01f2528aa721f4181cf79473d440e3ab438"  
//  # alchemy Hello world project key
const alchemyKey = "M2jcn1fE0ar94QApJ1fI5tDLYzTj4wZ5";
console.log("alchemyKey: ", alchemyKey)

import { Alchemy, Network, Contract, Wallet } from 'alchemy-sdk';
const settings = {
    apiKey: alchemyKey, // Replace with your Alchemy API key.
    network: Network.ETH_SEPOLIA // Replace with your network.
  };
const alchemy = new Alchemy(settings);
console.log("createAlchemyWeb3: ", alchemy)

// new a Contract
const alchemyProvider = alchemy.config.getProvider();
console.log("alchemyProvider: ", alchemyProvider)
const signer = new Wallet(PRIVATE_KEY, alchemy);
const voteContract = new Contract(contractAddress, contractABI, signer);

const store = new Vuex.Store({
    state: {
        polls: []
    },
    mutations: {
        addPoll(state, poll) {
            state.polls.push(poll)
        },
        vote(state, { pollId, optionId }) {
            const poll = state.polls[pollId]
            poll.options[optionId].count++
        }
    },
    actions: {
        // 
    }
})

async function loadPolls() {
    const pollsCount = await voteContract.getVoteCount()
    console.log("pollsCount: ", pollsCount)
    for (let i = 0; i < pollsCount; i++) {
        const question = await voteContract.getVote(i)
        console.log("question: ", question)
        const optionCount = await voteContract.getOptionCount(i)
        console.log("optionCount: ", optionCount)
        let options = []
        for (let j = 0; j < optionCount; j++) {
            const option = await voteContract.getOption(i, j)
            console.log("option: ", option)
            options.push({
                "text": option[0],
                "count": option[1]
            })
        }
        store.commit('addPoll', {
            title: question,
            options: options
        })                
    }
}

loadPolls()

export default store