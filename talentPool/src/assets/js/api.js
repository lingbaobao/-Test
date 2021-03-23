import apiUrl from './baseUrl'
import axios from './http';

const api = {
	////////////////////////////////应聘者模块///////////////////////////////////////////////////////////////////////
	importApplicants(params){
		//新建应聘者（文件导入）
		return axios.post(apiUrl.base.baseUrl.url62+"/applicants/importApplicants",params)
	},
	addManually(params){
		//新建应聘者（手动添加）
		return axios.post(apiUrl.base.baseUrl.url62+"/applicants/addManually",params)
	},
	getTalentList(params){
		//分页查询全部应聘者
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/getTalentList",params)
    },
    getRawTalentById(params){
		//查询原始简历
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/getRawTalentById",params)
	},
	getTalentById(params){
		//查询标准简历
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/getTalentById",params)
	},
	talentUpdateBaseInfor(params){
		//编辑简历基本信息
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/updateBaseInfor",params)
	},
	getDetailById(params){
		//查询简历信息 1：个人信息 2.求职意向 3.教育背景 4.工作经验 5.证书信息 6.技能 7.培训经历 8.实习经历 9.项目经验 10.获奖情况 11.在校职务
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/getDetailById",params)
    },
	updateIntention(params){
		//编辑求职意向 
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/updateIntention",params)
	},
	updateEdu(params){
		//编辑教育背景
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/updateEdu",params)
	},
	updateSchool(params){
		//编辑在校职务
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/updateSchool",params)
	},
	updatePracti(params){
		//编辑实习经历
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/updatePracti",params)
	},
	updateWork(params){
		//编辑工作经验
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/updateWork",params)
	},
	updateProject(params){
		//编辑项目经验
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/updateProject",params)
	},
	updateTrain(params){
		//编辑培训经历
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/updateTrain",params)
	},
	updateCert(params){
		//编辑证书
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/updateCert",params)
	},
	updateSkill(params){
		//编辑技能
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/updateSkill",params)
	},
	updatePrize(params){
		//编辑获奖情况
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/updatePrize",params)
	},
	getIndustry(params){
		//查询行业类别 
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/getIndustry",params)
	},
	getPositiony(params){
		//查询职业类别 
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/getPositiony",params)
	},
	delBaseTalent(params){
		//删除标准简历中的模块信息 1教育背景；2工作经验；3培训经历；4证书；5技能；6实习和在校职务；7项目经验；8获奖记录 9在校职务
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/delBaseTalent",params)
	},
	getAppraiseList(params){
		//查询所有评价
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/getAppraiseList",params)
	},
	getPickList(params){
		//查询筛选记录
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/getPickList",params)
	},
	getOfferList(params){
		//查询offer记录
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/getOfferList",params)
	},
	getRecordList(params){
		//查询操作记录
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/getRecordList",params)
	},
	getFileList(params){
		//查询附件记录
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/getFileList",params)
	},
	uploadFile(cvId,params){
		//上传附件记录
		return axios.post(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/uploadFile?cvId="+cvId,params)
	},
	deleteFile(params){
		//删除附件记录
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/deleteFile",params)
	},
	download(params){
		//下载附件记录
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/download",params)
	},
	download(params){
		//下载附件记录
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/download",params)
	},
	findCvNodes(params){
		//获取当前应聘者应聘当前职位的流程
		 return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.flowNode+"findCvNodes",params)
	},
	updateCvState(params){
		//转移节点状态
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/updateCvState",params)
	},
	updateState(params){
		//1、删除简历 2、加入黑名单
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/updateState",params)
	},
	addStock(params){
		//储备到人才库:0未分类 1人才公海 2精英库 3基础
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/addStock",params)
	},
	getStockList(params){
		//人才库分页
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/getStockList",params)
	},
	getStockCount(params){
		//人才库数量统计
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/getStockCount",params)
	},
	exportTalent(params){
		//应聘者数据导出
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/exportTalent",params)
	},
	downloadContent(params){
		//导出原始简历
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/downloadContent",params)
	},
	downloadPDF(params){
		//导出标准简历
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/downloadPDF",params)
	},
	checkContactInfoMissing(params){
		//批量检查应聘者联系方式是否缺失
		return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.talent+"/checkContactInfoMissing",params)
	},
	////////////////////////////////职位模块///////////////////////////////////////////////////////////////////////
	
     // 更改职位状态
     updateBaseInfor(params){
        return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.job+"/updateBaseInfor",params)
    },
    // 职位列表
    getJobList(params){
        return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.job+"list",params)
    },
    // 查询职位模板列表
    getTemplateList(){
        return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.job+"templateList")
    },
    // 查询所有项目
    getListAll(){
        return axios.get(apiUrl.base.baseUrl.url202+"project/listAll")
    },
    // 查询所有部门
    getFindAll(){
        return axios.get(apiUrl.base.baseUrl.url202+"department/findAll")
    },
    // 添加职位
    editDetails(params){
        return axios.post(apiUrl.base.baseUrl.urlxl+apiUrl.base.job+"editDetails",params)
    },
    // 删除职位
    delPosition(params){
        return axios.post(apiUrl.base.baseUrl.urlxl+apiUrl.base.job+"delete",params)
    },
    // 更改职位状态
    updateStatePostion(params){
        return axios.post(apiUrl.base.baseUrl.urlxl+apiUrl.base.job+"updateState",params)
    },
	//推荐到职位--查询职位
	getPostList(params){
		//导出原始简历
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/getPostList",params)
	},
	//推荐到职位--提交表单
	addPostCv(params){
		//导出原始简历
		return axios.get(apiUrl.base.baseUrl.url62+apiUrl.base.talent+"/addPostCv",params)
	},
    // 根据ID查询职位详情
    positionDetails(params){
        return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.job+"details",{params:params})
    },
    // 查询所有省份
    queryProvince(){
        return axios.get(apiUrl.base.baseUrl.url202+"china/queryProvince")
    },
    // 简历收信箱
    postReceiveEmail(params){
        return axios.get(apiUrl.base.baseUrl.urlxl+"api/postReceiveEmail/list",{params:params})
    },
    // 获取所有用户
    empDepartTree(){
        return axios.get(apiUrl.base.baseUrl.url202+"empdepart/empDepartTree")
    },
    // 发布渠道列表
    positionChannelList(){
        return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.job+"channelList")
    },
    // 选择发布渠道
    selectChannel(params){
        return axios.post(apiUrl.base.baseUrl.urlxl+apiUrl.base.job+"selectChannel",params)
    },
    // 面试列表
    interviewList(params){
        return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.interview+"list",params)
    },
	// 面试地点列表
	interviewAddressList(params){
	    return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.interview+"address/list",params)
	},
    // 标记面试状态
    interviewDone(params){
        return axios.post(apiUrl.base.baseUrl.urlxl+apiUrl.base.interview+"done",params)
    },
    // 修改签到状态接口
    updateSignInState(params){
        return axios.post(apiUrl.base.baseUrl.urlxl+apiUrl.base.interview+"updateSignInState",params)
    },
    // 面试主题详情接口
    interviewDetail(params){
        return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.interview+"theme/detail",params)
    },
    // 招聘流程模板
    flowTemplate(){
        return axios.get(apiUrl.base.baseUrl.urlxl+"flowTemplate/findAll")
    },
    // 添加流程
    addTemplate(params){
        return axios.post(apiUrl.base.baseUrl.urlxl+apiUrl.base.flowTemplate+"add",params)
    },
    // 阶段配置
    configTemplate(params){
        return axios.post(apiUrl.base.baseUrl.urlxl+apiUrl.base.flowTemplate+"nodesConfig",params)
    },
    // 流程详情
    detailTemplate(params){
        return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.flowTemplate+"detail",params)
    },
     // 编辑流程
     updateTemplate(params){
        return axios.post(apiUrl.base.baseUrl.urlxl+apiUrl.base.flowTemplate+"update",params)
    },
     // 面试流程列表 分页查询
     flowListPage(params){
        return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.flowTemplate+"listPage",params)
    },
     // 面试流程列表 查询全部
     flowListAll(params){
        return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.flowTemplate+"listAll",params)
    },
    // 查询流程应聘者统计
    flowNodes(params){
        return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.flowTemplate+"postNodes",params)
    },
    // 添加阶段
    addFlowNode(params){
        return axios.post(apiUrl.base.baseUrl.urlxl+apiUrl.base.flowNode+"add",params)
    },
    // 阶段详情
    flowNodeDetail(params){
        return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.flowNode+"detail",params)
    },
    // 编辑阶段
    flowNodeUpdate(params){
        return axios.post(apiUrl.base.baseUrl.urlxl+apiUrl.base.flowNode+"update",params)
    },
    // 分页查询所有阶段
    flowNodeList(params){
        return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.flowNode+"listPage",params)
    },
    // 查询所有阶段（启用）
    flowNodeAll(params){
        return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.flowNode+"findAll",params)
    },
    // 根据流程查询阶段
    findNodesByTemplate(params){
        return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.flowNode+"findNodesByTemplate",params)
    },
    // 添加状态
    addFlowState(params){
        return axios.post(apiUrl.base.baseUrl.urlxl+apiUrl.base.flowState+"add",params)
    },
    // 状态详情
    flowStateDetail(params){
        return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.flowState+"detail",params)
    },
    // 状态 分页查询全部
    flowStateList(params){
        return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.flowState+"listPage",params)
    },
    // 状态 部分也查询全部启用
    flowStateAll(){
        return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.flowState+"findAll")
    },
    // 编辑状态
    updateFlowState(params){
        return axios.post(apiUrl.base.baseUrl.urlxl+apiUrl.base.flowState+"update",params)
    },
    // 添加原因
    addFlowReason(params){
        return axios.post(apiUrl.base.baseUrl.urlxl+apiUrl.base.flowReason+"add",params)
    },
    // 原因详情
    flowReasonDetail(params){
        return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.flowReason+"detail",params)
    },
    // 编辑原因
    updateFlowReason(params){
        return axios.post(apiUrl.base.baseUrl.urlxl+apiUrl.base.flowReason+"update",params)
    },
    // 原因  分页查询
    flowReasonList(params){
        return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.flowReason+"listPage",params)
    },
    // 原因  查询全部(启用)
    flowReasonAll(){
        return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.flowReason+"findAll")
    },
    //面试官
	interviewerList(params){
		return axios.get(apiUrl.base.baseUrl.url202+"api/interviewerList",params)
    },
    //添加面试官
	addUser(params){
		return axios.post(apiUrl.base.baseUrl.url70+"user/addInterviewer",params)
    },
    // 查询渠道类型
    channelType(){
        return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.channel+"findTypes")
    },
    // 添加渠道来源
    addChannel(params){
        return axios.post(apiUrl.base.baseUrl.urlxl+apiUrl.base.channel+"add",params)
    },
    // 渠道来源详情
    channelDetail(params){
        return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.channel+"detail",params)
    },
    // 编辑渠道来源
    updateChannel(params){
        return axios.post(apiUrl.base.baseUrl.urlxl+apiUrl.base.channel+"update",params)
    },
    // 渠道来源列表 分页查询
    channelList(params){
        return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.channel+"listPage",params)
    },
    // 渠道来源列表 查询全部 不分页
    channelSourceAll(){
        return axios.get(apiUrl.base.baseUrl.urlyx+apiUrl.base.channel+"findAll")
    },
    // 渠道账号属性
    channelAccountExtAttr(params){
        return axios.get(apiUrl.base.baseUrl.urlyx+apiUrl.base.channel+"accountExtAttr",params)
    },
    // 新增渠道账号
    addChannelAccount(params){
        return axios.post(apiUrl.base.baseUrl.urlyx+apiUrl.base.channelAccount+"add",params)
    },
    // 删除渠道账号
    delChannelAccount(params){
        return axios.get(apiUrl.base.baseUrl.urlyx+apiUrl.base.channelAccount+"delete",params)
    },
    // 渠道账号详情
    channelAccountDetail(params){
        return axios.get(apiUrl.base.baseUrl.urlyx+apiUrl.base.channelAccount+"detail",params)
    },
    // 编辑渠道账号详情
    channelAccountUpdate(params){
        return axios.post(apiUrl.base.baseUrl.urlyx+apiUrl.base.channelAccount+"update",params)
    },
    // 渠道账号列表 分页查询
    channelAccountList(params){
        return axios.get(apiUrl.base.baseUrl.urlyx+apiUrl.base.channelAccount+"listPage",params)
    },
    // 渠道账号列表 查询全部 不分页
    channelAccountAll(){
        return axios.get(apiUrl.base.baseUrl.urlyx+apiUrl.base.channelAccount+"findAll")
    },
    // 获取邮件类型
    emailTypes(){
        return axios.get(apiUrl.base.baseUrl.urlyx+apiUrl.base.postReceiveEmail+"emailTypes")
    },
    // 添加收取邮箱
    addEmail(params){
        return axios.post(apiUrl.base.baseUrl.urlyx+apiUrl.base.postReceiveEmail+"add",params)
    },
    // 编辑收取邮箱
    updateEmail(params){
        return axios.post(apiUrl.base.baseUrl.urlyx+apiUrl.base.postReceiveEmail+"update",params)
    },
    // 邮箱详情
    emailDetail(params){
        return axios.get(apiUrl.base.baseUrl.urlyx+apiUrl.base.postReceiveEmail+"detail",params)
    },
    // 获取协议类型
    emailProtocolTypes(){
        return axios.get(apiUrl.base.baseUrl.urlyx+apiUrl.base.postReceiveEmail+"protocolTypes")
    },
    // 删除邮箱
    emailDel(params){
        return axios.get(apiUrl.base.baseUrl.urlyx+apiUrl.base.postReceiveEmail+"del",params)
    },
    // 邮箱 分页查询
    emailListPage(params){
        return axios.get(apiUrl.base.baseUrl.urlyx+apiUrl.base.postReceiveEmail+"listPage",params)
    },
    // 邮箱 不分页查询全部
    findAllEmail(){
        return axios.get(apiUrl.base.baseUrl.urlyx+apiUrl.base.postReceiveEmail+"findAll")
    },
    // 归档规则  添加
    addRules(params){
        return axios.post(apiUrl.base.baseUrl.urlyx+apiUrl.base.filingrules+"add",params)
    },
    // 归档规则  编辑
    updateRules(params){
        return axios.post(apiUrl.base.baseUrl.urlyx+apiUrl.base.filingrules+"update",params)
    },
    // 归档规则  删除
    delRules(params){
        return axios.get(apiUrl.base.baseUrl.urlyx+apiUrl.base.filingrules+"del",params)
    },
    // 归档规则  详情
    rulesDetail(params){
        return axios.get(apiUrl.base.baseUrl.urlyx+apiUrl.base.filingrules+"detail",params)
    },
    // 归档规则  分页
    rulesListPage(params){
        return axios.get(apiUrl.base.baseUrl.urlyx+apiUrl.base.filingrules+"listPage",params)
    },
    // 归档规则 查询全部
    findConditionsTypes(){
        return axios.get(apiUrl.base.baseUrl.urlyx+apiUrl.base.filingrules+"findConditionsTypes")
    },
    // 面试类型  添加
    addInterviewType(params){
        return axios.post(apiUrl.base.baseUrl.urlyx+apiUrl.base.interviewType+"add",params)
    },
    // 面试类型  详情
    detailInterviewType(params){
        return axios.get(apiUrl.base.baseUrl.urlyx+apiUrl.base.interviewType+"detail",params)
    },
    // 面试类型  编辑
    updateInterviewType(params){
        return axios.post(apiUrl.base.baseUrl.urlyx+apiUrl.base.interviewType+"update",params)
    },
    // 面试类型  分页
    interviewTypeListPage(params){
        return axios.get(apiUrl.base.baseUrl.urlyx+apiUrl.base.interviewType+"listPage",params)
    },
    // 面试类型  全部
    interviewTypeFindAll(){
        return axios.get(apiUrl.base.baseUrl.urlyx+apiUrl.base.interviewType+"findAll")
    },
    // 手动收取邮件 
    onReceiveEmail(params){
        return axios.get(apiUrl.base.baseUrl.urlyx+apiUrl.base.postReceiveEmail+"receiveEmail",params)
    },
    // 创建offer审批
    createOfferApproval(params,config){
        return axios.post(apiUrl.base.baseUrl.urlxl+apiUrl.base.email+"createOfferApproval",params,config)
    },
    // 创建offer审批
    sendOffer(params,config){
        return axios.post(apiUrl.base.baseUrl.urlxl+apiUrl.base.email+"sendOffer",params,config)
    },
	// 简历筛选
	resumeScreening(params){
	    return axios.post(apiUrl.base.baseUrl.urlxl+apiUrl.base.email+"resumeScreening",params)
	},
    // 取消面试
	cancelInterview(params,config){
	    return axios.post(apiUrl.base.baseUrl.urlxl+apiUrl.base.email+"cancelInterview",params,config)
	},
	// 安排面试
	arrangeInterview(params,config){
	    return axios.post(apiUrl.base.baseUrl.urlxl+apiUrl.base.email+"arrangeInterview",params,config)
	},
	
	////////////////////////////////邮件模版////////////////////////////////////////////////////////////////
	// 模版自定义button
	buttonMap(params){
	    return axios.get(apiUrl.base.baseUrl.urlxl+"field/findAll",params)
	},
	// 模版配置详情
	modelDetail(params){
	    return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.model+"detail",params)
	},
	// 模版配置查询全部
	modelFindAll(params){
	    return axios.get(apiUrl.base.baseUrl.urlxl+apiUrl.base.model+"findAll",params)
	},
	// 模版列表分页
	modelListPage(params){
	    return axios.get(apiUrl.base.baseUrl.urlxl+"notifyModel/listPage",params)
	},
	// 模版全部列表
	modelListAll(params){
	    return axios.get(apiUrl.base.baseUrl.url70+"notifyModel/findAll",params)
	},
	// 模版类型全部列表
	modelTypeAll(){
	    return axios.get(apiUrl.base.baseUrl.urlxl+"modelType/findAll")
    },
    // 根据通知模板id和类型查询
	modelContent(params){
	    return axios.get(apiUrl.base.baseUrl.url70+"notifyModel/findContent",params)
	},
	// 通知模版基本信息
	detailBase(params){
	    return axios.get(apiUrl.base.baseUrl.urlxl+"notifyModel/detailBase",params)
	},
	// 通知模板子模板配置信息
	detailNotify(params){
	    return axios.get(apiUrl.base.baseUrl.urlxl+"notifyModel/detailNotify",params)
	},
	//新增通知模板
	addModel(params){
	    return axios.post(apiUrl.base.baseUrl.urlxl+"notifyModel/add",params)
	},
	//编辑通知模板基本信息
	updateBase(params){
	    return axios.post(apiUrl.base.baseUrl.urlxl+"notifyModel/updateBase",params)
	},
	//编辑通知模板通知信息
	updateNotify(params){
	    return axios.post(apiUrl.base.baseUrl.urlxl+"notifyModel/updateNotify",params)
	},
	
	////////////////////////////////面试类型////////////////////////////////////////////////////////////////
	
	//面试类型全部
	interviewTypeAll(params){
	    return axios.get(apiUrl.base.baseUrl.url70+"/interviewType/findAll",params)
	},
	

    //首页
	getTalentHome(params){
	    return axios.get(apiUrl.base.baseUrl.url70+"talent/getTalentHome",params)
	},
	
}
export default api;

