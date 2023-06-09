<!-- create template with buttons -->
<template>
    <view class="content">
        <view class="button-area">
            <button class="button" type="primary" @click="showPollList">Poll list</button>
            <button class="button" type="primary" @click="createPoll">Create Poll</button>
        </view>
    </view>
</template>

<!-- create script -->
<script>

    const alchemyKey = "M2jcn1fE0ar94QApJ1fI5tDLYzTj4wZ5";
    // import { createAlchemyWeb3 } from '@alch/alchemy-web3'
    // const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    

    // const contractABI = require("../../static/contract-abi.json");
    // const contractAddress = "0x1A634ffcdE89909E774fFC0561aBCb9174699879";

    // const voteContract = new web3.eth.Contract(
    //     contractABI,
    //     contractAddress
    // );


    export default {
        data() {
            return {
                title: ''
            }
        },
        onLoad() {
            // const pollsCount = voteContract.methods.getVoteCount()
            // for (let i = 0; i < pollsCount; i++) {
            //     const question = voteContract.methods.getVote(i)
            //     console.log("poll: ", question)
            //     const optionCount = voteContract.methods.getOptionCount(i)
            //     let options = []
            //     for (let j = 0; j < optionCount; j++) {
            //         const option = voteContract.methods.getOption(i, j)
            //         options.push({
            //             "text": option.description,
            //             "count": option.voteCount
            //         })
            //     }
            //     this.$store.commit('addPoll', {
            //         title: question,
            //         options: options
            //     })                
            // }

            // const web3 = createAlchemyWeb3(alchemyKey); 

            // let xx = Math.pow(BigInt(2**3), 3)
            // console.log("xx: ", xx)
            
        },
        methods: {
            showPollList() {
                   // navigate to poll list page
                   uni.navigateTo({
                    url: '/pages/pollList/index'
                })
            },
            createPoll() {
                // navigate to poll form page
                uni.navigateTo({
                    url: '/pages/pollForm/index'
                })
            }
        }
    }   
</script>

<!-- create style -->
<style>
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .title {
        font-size: 36rpx;
        color: #8f8f94;
    }

    .button-area {
        display: flex;
        flex-direction: column;
        /* vertical space between */
        justify-content: space-between;
        width: 100%;
        margin-top: 50rpx;
    }

    .button {
        width: 40%;
        height: 100rpx;
        font-size: 36rpx;
        color: #fff;
        background-color: #007aff;
        border-radius: 10rpx;
        /* vertical margin */
        margin-top: 20rpx;
    }
</style>