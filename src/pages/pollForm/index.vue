<template>
<!-- build a form to create poll -->
    <view class="content">
        <!-- form with submit and reset callback -->
        <form @submit="createPoll">
            <view class="form-item">
                <view class="label">Create question</view>
                <input name="question" type="text" placeholder="Write your question..." />
            </view>
            <!-- <view class="form-item">
                <view class="label">Question</view>
                <input name="question" type="text" placeholder="Description" />
            </view> -->
            <view class="form-item">
                <view class="label">Enter choices below</view>
                <textarea name="options" type="text" placeholder="Enter each choice on a separate line" />
            </view>
            <view class="form-item">
                <button form-type="submit" type="primary">Create</button>
            </view>
        </form>
    </view>
</template>

<script>
    export default {
        data() {
            return {
              
            }
        },
        onLoad() {

        },
        methods: {
            createPoll(e) {
                // create a poll

                // get input data from form
                let formValue = e.detail.value
                let option = formValue['options']
                // split options by line break
                let options = option.split('\n')
                // remove empty options
                options = options.filter((option) => {
                    return option !== ''
                })
                 // add count to each option
                 options = options.map((option) => {
                    return {
                        text: option,
                        count: 0
                    }
                })

                this.$store.commit('addPoll', {
                    title: formValue.question,
                    options: options
                })
                console.log("success")

                // navigate to poll list page
                uni.navigateTo({
                    url: '/pages/poll/index'
                })
            },
        }
    }

</script>

<style>
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .form-item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        width: 100%;
        margin-top: 50rpx;
    }

    .label {
        font-size: 28rpx;
        color: #8f8f94;
    }

    input {
        width: 100%;
        height: 80rpx;
        border: 1px solid #8f8f94;
        border-radius: 10rpx;
        margin-top: 10rpx;
        padding: 0 20rpx;
        font-size: 28rpx;
    }

    textarea {
        width: 100%;
        height: 200rpx;
        border: 1px solid #8f8f94;
        border-radius: 10rpx;
        margin-top: 10rpx;
        padding: 20rpx;
        font-size: 28rpx;
    }

    button {
        width: 100%;
        height: 80rpx;
        border-radius: 10rpx;
        margin-top: 10rpx;
        padding: 0 20rpx;
        font-size: 28rpx;
    }

</style>