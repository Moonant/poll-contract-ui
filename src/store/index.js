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
import { tr } from '@dcloudio/vue-cli-plugin-uni/packages/postcss/tags';
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
        async vote(state, { pollId, optionId }) {
            const poll = state.polls[pollId]
            poll.options[optionId].count++

            // catch error of await voteContract.voteVote(pollId, optionId)
            try {
                const result = await voteContract.voteVote(pollId, optionId)
                console.log("The voteVote result is: " + JSON.stringify(result));
            } catch (error) {
                console.log("The voteVote error is: " + JSON.stringify(error));
            }
        },
        async createPoll(state, { title, options }) {
            const pollId = state.polls.length
            state.polls.push({
                title,
                options: options.map(text => ({
                    text,
                    count: 0
                }))
            })


            const currentTime = Date.now();
            const tomorrowTime = currentTime + 864000000; // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
            const tomorrowTimestamp = BigInt(Math.floor(tomorrowTime / 1000));

            const result = await voteContract.createVoteWithOption(title, tomorrowTimestamp.toString(), options);
            console.log("The createVoteWithOption result is: " + JSON.stringify(result));
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

async function vote(pollId, optionId) {
    await voteContract.vote(pollId, optionId)
    store.commit('vote', { pollId, optionId })
}

loadPolls()

export default store