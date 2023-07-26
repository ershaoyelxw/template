/**
 * 获取APP权限状态模块
 * @description 参考文档:https://ext.dcloud.net.cn/plugin?id=594
 * @author ershaoyes
 * @date 2023-07-24
 */

module.exports = {
  /**
   * 判断是否开启对应权限
   * @param {string} permissionID - 权限类型
   * */
  init(permissionID) {
    switch(permissionID) {
			// 相机
      case 'camera':
				return this.checkCamera()
			// 相册
      case 'photo':
				return this.checkPhoto()
			// 定位
      case 'location':
				return this.checkLocation()
			// 通讯录
      case 'contact':
				return this.checkContact()
			// 打电话
      case 'call':
				return this.checkCall()
    }
    return 0
  },
  /**
	 * 设置授权状态结果
	 * */
	setStatus(authStatus) {
		let result = 1
		if (authStatus === 3) {
			result = 1
			console.log("权限已经开启")
		} else if (authStatus === 0) {
			result = -1
			console.log("永久拒绝权限")
		} else {
			result = 0
			console.log("权限没有开启")
		}
		return result
	},
  /**
   * 相机权限查询，如果没有权限则提示打开设置页面
   * 支持android、ios
   * @return {boolean} result - -1:永久拒绝申请的权限,0:拒绝本次申请的权限,1:已获取的权限
   * */
	checkCamera() {
    const self = this
		return new Promise(async (resolve, reject) => {
      // #ifndef APP-PLUS
      //H5端不支持调用plus
      resolve(1)
      // #endif
      
      // #ifdef APP-PLUS
      let result = 1
      let isAndroid = self.isAndroid()
      if (isAndroid) {
      	result = await self.requestAndroidPermission('CAMERA')
      } else {
				let AVCaptureDevice = plus.ios.import("AVCaptureDevice")
				let authStatus = AVCaptureDevice.authorizationStatusForMediaType('vide')
				result = self.setStatus(authStatus)
      	plus.ios.deleteObject(AVCaptureDevice)
      }
			
      // 已获取的权限
      if(result === 1) {
        resolve(result)
        return
      }
      
      // 永久拒绝申请的权限
      if (!(!isAndroid && result === -1)) {
        // 打开系统设置
        self.modal({
          success: (res) => {
            if (res) {
            	self.openSystemSetting()
            }
          }
        })
        resolve(result)
        return
      }
      
      resolve(result)
      // #endif
    })
	},
  checkPhoto() {
    const self = this
		return new Promise(async (resolve, reject) => {
      // #ifndef APP-PLUS
      //H5端不支持调用plus
      resolve(1)
      // #endif
      
      // #ifdef APP-PLUS
      let result = 1
      let isAndroid = self.isAndroid()
      if (isAndroid) {
      	result = await self.requestAndroidPermission('WRITE_EXTERNAL_STORAGE')
      } else {
      	let PHPhotoLibrary = plus.ios.import("PHPhotoLibrary")
      	let authStatus = PHPhotoLibrary.authorizationStatus()
      	result = self.setStatus(authStatus)
      	plus.ios.deleteObject(PHPhotoLibrary)
      }
      
      // 已获取的权限
      if(result === 1) {
        resolve(result)
        return
      }
      
      // 永久拒绝申请的权限
      if (!(!isAndroid && result === -1)) {
        // 打开系统设置
        self.modal({
          success: (res) => {
            if (res) {
            	self.openSystemSetting()
            }
          }
        })
        resolve(result)
        return
      }
      
      resolve(result)
      // #endif
    })
	},
  
  /**
   * 定位权限查询，如果没有权限则提示打开设置页面
   * 支持android、ios
   * @return {boolean} result - 0:拒绝本次申请的权限,1:已获取的权限
   * */
  checkLocation() {
    const self = this
    return new Promise(async (resolve, reject) => {
      // #ifndef APP-PLUS
      //H5端不支持调用plus
      resolve(1)
      // #endif
      
      // #ifdef APP-PLUS
      let result = -1
			let status = true
      if(self.isAndroid()) {
        let context = plus.android.importClass("android.content.Context")
        let locationManager = plus.android.importClass("android.location.LocationManager")
        let main = plus.android.runtimeMainActivity()
        let mainSvr = main.getSystemService(context.LOCATION_SERVICE)
        status = mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)
				result = status ? 1 : 0
      }else {
        let cllocationManger = plus.ios.import("CLLocationManager")
        let enable = cllocationManger.locationServicesEnabled()
				status = cllocationManger.authorizationStatus()
				result = enable && status !== 2 ? 1 : 0
        plus.ios.deleteObject(cllocationManger)
      }
      console.log("系统定位开启:" + result)
      resolve(result)
      // #endif
    })
  },
  
  /**
   * 获取通讯录权限查询，如果没有权限则提示打开设置页面
   * 支持android、ios
   * @return {boolean} result - -1:永久拒绝申请的权限,0:拒绝本次申请的权限,1:已获取的权限
   * */
  checkContact() {
    const self = this
    return new Promise(async (resolve, reject) => {
      // #ifndef APP-PLUS
      //H5端不支持调用plus
      resolve(1)
      // #endif
      
      // #ifdef APP-PLUS
      let result = -1
      if(self.isAndroid()) {
        result = await self.requestAndroidPermission('READ_CONTACTS')
      }else {
        let CNContactStore = plus.ios.import("CNContactStore")
        let authStatus = CNContactStore.authorizationStatusForEntityType(0)
        result = self.setStatus(authStatus)
        plus.ios.deleteObject(CNContactStore)
      }
      console.log("通讯录权限:" + result)
      resolve(result)
      // #endif
    })
  },
  
  /**
   * 获取拨打电话权限查询，如果没有权限则提示打开设置页面
   * 支持android、ios
   * @return {boolean} result - -1:永久拒绝申请的权限,0:拒绝本次申请的权限,1:已获取的权限
   * */
  checkCall() {
    const self = this
    return new Promise(async (resolve, reject) => {
      // #ifndef APP-PLUS
      //H5端不支持调用plus
      resolve(1)
      // #endif
      
      // #ifdef APP-PLUS
      let result = -1
      if(self.isAndroid()) {
        result = await self.requestAndroidPermission('CALL_PHONE')
      }else {
        result = 1
      }
      console.log("拨打电话权限:" + result)
      resolve(result)
      // #endif
    })
  },
  
  /**
   * android权限查询
   * @description 参考文档:https://ext.dcloud.net.cn/plugin?id=594
   * @param {string} permissionID - 只需要传android.permission.后面的字符串
   * @return {boolean} result - -1:永久拒绝申请的权限,0:拒绝本次申请的权限,1:已获取的权限
   * */
  requestAndroidPermission(permissionID) {
  	// #ifdef APP-PLUS
  	return new Promise((resolve, reject) => {
      // 理论上支持多个权限同时查询，本函数封装只处理了一个权限的情况。有需要的可自行扩展封装
  		plus.android.requestPermissions(['android.permission.' + permissionID], function(resultObj) {
        let result = 0
        for (let i = 0; i < resultObj.granted.length; i++) {
          let grantedPermission = resultObj.granted[i]
          result = 1
          console.log(`[${permissionID}]:已获取的权限：${grantedPermission}`)
        }
        for (let i = 0; i < resultObj.deniedPresent.length; i++) {
          let deniedPresentPermission = resultObj.deniedPresent[i]
          result = 0
          console.log(`[${permissionID}]:拒绝本次申请的权限：${deniedPresentPermission}`)
        }
        for (let i = 0; i < resultObj.deniedAlways.length; i++) {
          let deniedAlwaysPermission = resultObj.deniedAlways[i]
          result = -1
          console.log(`[${permissionID}]:永久拒绝申请的权限：${deniedAlwaysPermission}`)
        }
        // 若所需权限被拒绝,则打开APP设置界面,可以在APP设置界面打开相应权限
        resolve(result)
      },
      function(error) {
        console.log('申请权限错误：' + error.code + " = " + error.message)
        resolve(-1)
      }
    )})
  	// #endif
  },
  
  /**
   * 判断系统是否为安卓
	 * @return {boolean}
   * */
  isAndroid() {
    // #ifdef APP-PLUS
    return uni.getSystemInfoSync().platform.toLocaleLowerCase() === "android"
    // #endif
  },
  
  /**
   * 打开系统设置
   * */
  openSystemSetting() {
    // #ifdef APP-PLUS
		const isAndroid = this.isAndroid()
    if (isAndroid) {
			// 安卓
			let Intent = plus.android.importClass("android.content.Intent")
			let Settings = plus.android.importClass("android.provider.Settings")
			let Uri = plus.android.importClass("android.net.Uri")
			let mainActivity = plus.android.runtimeMainActivity()
			let intent = new Intent()
			intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
			let uri = Uri.fromParts("package", mainActivity.getPackageName(), null)
			intent.setData(uri)
			mainActivity.startActivity(intent)
      return
    }
    
		// IOS
		let UIApplication = plus.ios.import("UIApplication")
		let application2 = UIApplication.sharedApplication()
		let NSURL2 = plus.ios.import("NSURL")
		let setting2 = NSURL2.URLWithString("app-settings:")
		application2.openURL(setting2)
		plus.ios.deleteObject(setting2)
		plus.ios.deleteObject(NSURL2)
		plus.ios.deleteObject(application2)
    // #endif
  },
  
  /**
   * uni弹出框，提示打开权限
	 * @param {object} args
	 * @param {string} args.title 提示标题
	 * @param {string} args.content 提示内容
	 * @param {boolean} args.showCancel 是否显示取消按钮，默认:true
	 * @param {string} args.cancelColor 取消按钮颜色，默认:#555
	 * @param {string} args.confirmColor 确定按钮颜色，默认:#EB0909
	 * @param {string} args.confirmText 确定按钮文本，默认:确定
	 * @callback {function} args.success 点击确定按钮回调
   * */
  modal(args = {}) {
  	uni.showModal({
  		title: args.title || '提示',
  		content: args.content || '您还没有开启对应权限，是否立即设置？',
  		showCancel: typeof args.showCancel === 'boolean' ? args.showCancel : true,
  		cancelColor: args.cancelColor || "#555",
  		confirmColor: args.confirmColor || "#EB0909",
  		confirmText: args.confirmText || "确定",
  		success(res) {
  			if(typeof args.success === 'function') {
  			  args.success(res.confirm)
  			}
  		}
  	})
  },
}