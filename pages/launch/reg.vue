<template>
	<view class="page page-reg">
		<view class="page-title">
			<view class="page-title-item">注册账号</view>
			<view class="page-title-desc">请先填写信息。</view>
		</view>
		
		<view class="page-form-box">
			<view class="page-form-item">
				<view class="page-form-item-left">
					<text style="display: inline-block;vertical-align: middle;margin-right: 4rpx;">+86</text>
				</view>
				<view class="page-line"></view>
				<input maxlength="11" class="page-form-input" type="number" placeholder="请输入手机号码" placeholder-style="color: #595959;">
			</view>
		</view>
		
		<view style="margin: 70rpx 0 0;">
			<view class="page-reg-btn-box">
				<button class="page-reg-btn-text">下一步</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {}
</script>

<style lang="scss" scoped>
	.page-reg {
		background-color: #fff;
		padding: 0 64rpx;

		.text-active {
			color: #02A3E3;
		}
		
		.page-title {
			padding: 80rpx 0 40rpx;
			margin-bottom: 40rpx;
			
			.page-title-item {
				font-size: 52rpx;
				font-weight: bold;
				margin-bottom: 10rpx;
			}
			.page-title-desc {
				color: #999;
				font-size: 26rpx;
				line-height: 44rpx;
			}
		}
		
		.page-form-box {
			position: relative;
			z-index: 2;
			background-color: #fff;
			border-radius: 16rpx;
			transition: all .2s;
			
			.page-form-item {
				display: -webkit-box;
				display: -moz-box;
				display: -ms-flexbox;
				display: -webkit-flex;
				display: flex;
				min-width: 0;
				align-items: center;
				-webkit-align-items: center;
				-webkit-box-align: center;
				min-width: 0;
				background-color: #f8f8f8;
				margin-bottom: 30rpx;
				
				.page-form-input {
					color: #262626;
					font-size: 28rpx;
					width: 100%;
					padding: 24rpx 32rpx;
				}
			}
			
			.page-form-item-left {
				text-align: center;
				word-break: keep-all;
				width: 180rpx;
			}
			.page-line {
				height: 38rpx;
				width: 2rpx;
				background-color: #bbb;
			}
		}
		
		.page-reg-btn-text {
			color: #fff;
			font-size: 26rpx;
			padding: 10rpx 0;
			background-color: var(--default-color);
		}
	}
</style>
