import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name:"首页",
		meta: { title: '首页'},
		component: function() {
			return import('../components/home.vue')
		},
		redirect:"/index",
		children:[
			// 首页
			{
				path: '/index',
				name:"index",
				meta: { title: '首页',noCache:true },
				component: function() {
					return import('../views/index.vue')
				}
			},
			//应聘者列表
			{
				name:"applicantList",
				meta: { title: '应聘者列表'},
				path: '/applicant/applicantList',
				component: () => import('../views/applicants/applicantList.vue')
			},
			//新建应聘者
			{
				name:"addApplicant",
				meta: { title: '新建应聘者'},
				path: '/applicant/addApplicant',
				component: () => import('../views/applicants/addApplicant.vue')
			},
			// 职位列表
			{
				path: '/position/list',
				name:"positionList",
				meta: { title: '职位列表'},
				component: () => import('../views/position/list.vue')
			},
			// 新建职位
			{
				path: '/position/add',
				name:"新建职位",
				meta: { title: '新建职位'},
				component: () => import('../views/position/add.vue')
			},
			// 职位详情
			{
				path: '/position/detail',
				name:"职位详情",
				meta: { title: '职位详情'},
				component: () => import('../views/position/detail.vue')
			},
			// 发布渠道
			{
				path: '/position/channel',
				name:"channel",
				meta: { title: '发布渠道'},
				component: () => import('../views/position/channel.vue')
			},
			// 面试列表
			{
				path: '/interview/list',
				name:"list",
				meta: { title: '面试列表'},
				component: () => import('../views/interview/list.vue')
			},
			// 面试详情
			{
				path: '/interview/detail',
				name:"interviewDetail",
				meta: { title: '面试详情'},
				component: () => import('../views/interview/detail.vue')
			},
			// 设置 流程 列表
			{
				path: '/set/process/list',
				name:"process/list",
				meta: { title: '面试流程列表'},
				component: () => import('../views/set/process/list.vue')
			},
			// 设置 添加 流程
			{
				path: '/set/process/add',
				name:"process/add",
				meta: { title: '添加流程'},
				component: () => import('../views/set/process/add.vue')
			},
			// 设置 详情 流程
			{
				path: '/set/process/detail',
				name:"process/detail",
				meta: { title: '流程详情'},
				component: () => import('../views/set/process/detail.vue')
			},
			// 设置 阶段配置 流程
			{
				path: '/set/process/configure',
				name:"process/configure",
				meta: { title: '阶段配置'},
				component: () => import('../views/set/process/configure.vue')
			},
			// 设置 原因 列表
			{
				path: '/set/reason/list',
				name:"reason/list",
				meta: { title: '设置-原因列表'},
				component: () => import('../views/set/reason/list.vue')
			},
			// 设置 原因 添加编辑
			{
				path: '/set/reason/add',
				name:"reason/add",
				meta: { title: '添加/编辑原因'},
				component: () => import('../views/set/reason/add.vue')
			},
			// 设置 原因 详情
			{
				path: '/set/reason/detail',
				name:"reason/detail",
				meta: { title: '原因详情'},
				component: () => import('../views/set/reason/detail.vue')
			},
			// 设置 状态 列表
			{
				path: '/set/state/list',
				name:"state/list",
				meta: { title: '设置-状态列表'},
				component: () => import('../views/set/state/list.vue')
			},
			// 设置 状态 添加编辑
			{
				path: '/set/state/add',
				name:"state/add",
				meta: { title: '添加/编辑状态'},
				component: () => import('../views/set/state/add.vue')
			},
			// 设置 状态 详情
			{
				path: '/set/state/detail',
				name:"state/detail",
				meta: { title: '状态详情'},
				component: () => import('../views/set/state/detail.vue')
			},
			// 设置 阶段 列表
			{
				path: '/set/stage/list',
				name:"stage/list",
				meta: { title: '设置-阶段列表'},
				component: () => import('../views/set/stage/list.vue')
			},
			// 设置 阶段 添加编辑
			{
				path: '/set/stage/add',
				name:"stage/add",
				meta: { title: '添加/编辑阶段'},
				component: () => import('../views/set/stage/add.vue')
			},
			// 设置 阶段 详情
			{
				path: '/set/stage/detail',
				name:"stage/detail",
				meta: { title: '阶段详情'},
				component: () => import('../views/set/stage/detail.vue')
			},
			// 设置 首页
			{
				path: '/set/index',
				name:"set/index",
				meta: { title: '设置'},
				component: () => import('../views/set/index.vue')
			},
			// 设置 渠道来源 列表
			{
				path: '/set/channel/list',
				name:"set/channel/list",
				meta: { title: '渠道来源-列表'},
				component: () => import('../views/set/channel/list.vue')
			},
			// 设置 渠道来源 详情
			{
				path: '/set/channel/detail',
				name:"set/channel/detail",
				meta: { title: '渠道来源-详情'},
				component: () => import('../views/set/channel/detail.vue')
			},
			// 设置 渠道账号 列表
			{
				path: '/set/account/list',
				name:"set/account/list",
				meta: { title: '渠道账号-列表'},
				component: () => import('../views/set/account/list.vue')
			},
			// 设置 渠道账号 详情
			{
				path: '/set/account/detail',
				name:"set/account/detail",
				meta: { title: '渠道账号-详情'},
				component: () => import('../views/set/account/detail.vue')
			},
			// 设置 收取邮箱 列表
			{
				path: '/set/email/list',
				name:"set/email/list",
				meta: { title: '收取邮箱-列表'},
				component: () => import('../views/set/email/list.vue')
			},
			// 设置 收取邮箱 详情
			{
				path: '/set/email/detail',
				name:"set/email/detail",
				meta: { title: '收取邮箱-详情'},
				component: () => import('../views/set/email/detail.vue')
			},
			// 设置 收取邮箱 添加
			{
				path: '/set/email/add',
				name:"set/email/add",
				meta: { title: '收取邮箱-添加'},
				component: () => import('../views/set/email/add.vue')
			},
			// 设置 归档规则 添加
			{
				path: '/set/rule/add',
				name:"set/rule/add",
				meta: { title: '归档规则-添加'},
				component: () => import('../views/set/rule/add.vue')
			},
			// 设置 归档规则 列表
			{
				path: '/set/rule/list',
				name:"set/rule/list",
				meta: { title: '归档规则-列表'},
				component: () => import('../views/set/rule/list.vue')
			},
			// 设置 归档规则 详情
			{
				path: '/set/rule/detail',
				name:"set/rule/detail",
				meta: { title: '归档规则-详情'},
				component: () => import('../views/set/rule/detail.vue')
			},
			// 设置 面试类型 添加
			{
				path: '/set/interviewType/add',
				name:"set/interviewType/add",
				meta: { title: '面试类型-添加'},
				component: () => import('../views/set/interviewType/add.vue')
			},
			// 设置 面试类型 详情
			{
				path: '/set/interviewType/detail',
				name:"set/interviewType/detail",
				meta: { title: '面试类型-详情'},
				component: () => import('../views/set/interviewType/detail.vue')
			},
			// 设置 面试类型 列表
			{
				path: '/set/interviewType/list',
				name:"set/interviewType/list",
				meta: { title: '面试类型-列表'},
				component: () => import('../views/set/interviewType/list.vue')
			},
			{
				path: '/talentPool/talentPoolList',
				name:"talentPoolList",
				meta: { title: '人才库列表'},
				component: () => import('../views/talentPool/talentPoolList.vue')
			},  
			{
			 	path: '/set/notice/modelList',
			 	name:"modelList",
			 	meta: { title: '模版列表'},
			 	component: () => import('../views/set/notice/modelList.vue')
			 }, 
		]
	},
	//应聘者详情
	{
		name:"applicantDetail",
		meta: { title: '应聘者详情'},
		path: '/applicant/applicantDetail/:cvId/:postId',//cvId简历id  postId职位id
		component: () => import('../views/applicants/applicantDetail.vue')
	},
	//应聘者简历筛选
	{
		name:"resumeScreening",
		meta: { title: '简历筛选'},
		path: '/applicant/resumeScreening',
		component: () => import('../views/applicants/resumeScreening.vue')
	},
	//offer审批
	{
		name:"offerApproval",
		meta: { title: '创建审批'},
		path: '/applicant/offerApproval',
		component: () => import('../views/applicants/offerApproval.vue')
	},
	//发送offer
	{
		name:"sendOffer",
		meta: { title: '发送offer'},
		path: '/applicant/sendOffer',
		component: () => import('../views/applicants/sendOffer.vue')
	},
	//面试安排
	{
		name:"arrangeInterview",
		meta: { title: '面试安排'},
		path: '/applicant/arrangeInterview',
		component: () => import('../views/applicants/arrangeInterview.vue')
	},
	// 取消面试
	{
		name:"cancelInterview",
		meta: { title: '取消面试'},
		path: '/applicant/cancelInterview',
		component: () => import('../views/applicants/cancelInterview.vue')
	},
	//系统总首页
	{
		name:"system",
		meta: { title: '系统首页'},
		path: '/system',
		component: () => import('../views/system.vue')
	},
]

const router = new VueRouter({
	mode:"history",
	routes
})

export default router
