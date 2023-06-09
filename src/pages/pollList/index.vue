<!-- template -->
<template>
    <!-- list of polls -->
    <view class="content">
  
        <view class="poll-list">
            <view class="poll-item" v-for="(poll, pollIndex) in polls" :key="pollIndex">
                <view class="poll-title">{{ poll.title }}</view>
                <!-- <view class="poll-description">{{ poll.description }}</view> -->
                <view class="poll-button-area">
                    <!-- list poll options as button -->
                    <button class="button" type="primary" v-for="(option, optionIndex) in poll.options" :key="optionIndex" @click="vote(pollIndex, optionIndex)">{{ option.text }} ({{ option.count }}) </button>
                </view>
            </view>
        </view>
    </view>
</template>

<!-- script -->
<script>
    import { mapState } from 'vuex'

    export default {
        computed: {
            ...mapState(['polls'])
        },
        onLoad() {
            
        },
        // store create Poll

        methods: {
            vote(pollId, optionId) {
                // navigate to poll form page
                // update poll
                this.$store.commit('vote', {
                    pollId: pollId,
                    optionId: optionId
                })
                // navigate to poll page
                uni.navigateTo({
                    url: '/pages/poll/index'
                })
            },
        }
    }
</script>

<!-- style -->
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

    .poll-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-top: 50rpx;
    }

    .poll-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 90%;
        margin-bottom: 50rpx;
        border: 1px solid #8f8f94;
        border-radius: 10rpx;
        padding: 20rpx;
    }

    .poll-title {
        font-size: 32rpx;
        color: #8f8f94;
    }

    .poll-description {
        font-size: 28rpx;
        color: #8f8f94;
        margin-top: 20rpx;
    }

    .poll-button-area {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        margin-top: 50rpx;
    }

    .button {
        width: 40%;
        height: 80rpx;
        border-radius: 10rpx;
        font-size: 28rpx;
        margin-top: 20rpx;
    }
</style>
