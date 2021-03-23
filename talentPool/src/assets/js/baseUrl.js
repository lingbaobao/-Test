// 接口请求地址
const base = {
    // 基础请求地址
    baseUrl:{
        url202:'http://gateway.wupao.com/erp/', 
		url62:'http://gateway.wupao.com/talent/', 
        // 翔龙 254  王炎213  永孝70  秦蕊62
        urlxl:"http://gateway.wupao.com/talent/",
        urlyx:"http://gateway.wupao.com/talent/",
		url70:"http://gateway.wupao.com/talent/",
    },
    // 登录模块
    login:"",
	//应聘者模块
	talent:"talent",
    // 职位模块
    job:"api/job/",
    // 面试模块
    interview:'api/interview/',
    // 流程模板
    flowTemplate:'flowTemplate/',
    // 阶段
    flowNode:'flowNode/',
    // 状态
    flowState:'flowState/',
    // 原因
    flowReason:'flowReason/',
    // 渠道来源
    channel:'channel/',
    // 渠道账号
    channelAccount:'channelAccount/',
    // 收取邮件
    postReceiveEmail:'api/postReceiveEmail/',
    // 归档规则
    filingrules:'filingrules/',
	// 模版配置
    model:'model/',
    // 发邮件
    email:'api/send/email/',
    // 面试类型
    interviewType:"interviewType/"
}

// 图片请求地址
const baseImgUrl = "http://static.img.com"; 

export default {
    base,baseImgUrl
}
