<template>
	<!--简历-->
	<div>
		<p style="margin: 20px 0;">
			<el-button size="mini">原始简历</el-button>
			<el-button type="primary" size="mini">标准简历</el-button>
		</p>
		<!--原始简历-->
		<div class="originalTxt" v-show="isShowOriginal==true"></div>
		<!--标准简历-->
		<div class="standardsTxt" v-show="isShowOriginal==false">
			<div class="detail clear">
				<el-divider content-position="left">个人信息</el-divider>
				<div class="detail_main" v-show="editOneShow==false">
					<ul class="detailUl">
						<li v-show="baseInfoForm.name!=null"><span class="baseUl-tips">姓名：</span><span class="baseUl-txt" v-html="baseInfoForm.name"></span></li>
						<li v-show="baseInfoForm.gender!=null">
							<span class="baseUl-tips">性别：</span>
							<span class="baseUl-txt" v-if="baseInfoForm.gender==0">女</span>
							<span class="baseUl-txt" v-if="baseInfoForm.gender==1">男</span>
						</li>
						<li v-show="baseInfoForm.birthday!=null"><span class="baseUl-tips">出生日期：</span><span class="baseUl-txt" v-html="baseInfoForm.birthday"></span></li>
						<li v-show="baseInfoForm.email!=null"><span class="baseUl-tips">邮箱：</span><span class="baseUl-txt" v-html="baseInfoForm.email"></span></li>
						<li v-show="baseInfoForm.phone!=null"><span class="baseUl-tips">手机号：</span><span class="baseUl-txt" v-html="baseInfoForm.phone"></span></li>
						<li v-show="baseInfoForm.workYearNorm!=null">
							<span class="baseUl-tips">工作年限：</span>
							<span class="baseUl-txt" v-if="baseInfoForm.workYearNorm==99">在读学生</span>
							<span class="baseUl-txt" v-if="baseInfoForm.workYearNorm==98">应届毕业生</span>
							<span class="baseUl-txt" v-if="baseInfoForm.workYearNorm==1">1年</span>
							<span class="baseUl-txt" v-if="baseInfoForm.workYearNorm==2">2年</span>
							<span class="baseUl-txt" v-if="baseInfoForm.workYearNorm==3">3年</span>
							<span class="baseUl-txt" v-if="baseInfoForm.workYearNorm==4">4年</span>
							<span class="baseUl-txt" v-if="baseInfoForm.workYearNorm==5">5年</span>
							<span class="baseUl-txt" v-if="baseInfoForm.workYearNorm==6">6年</span>
							<span class="baseUl-txt" v-if="baseInfoForm.workYearNorm==7">7年</span>
							<span class="baseUl-txt" v-if="baseInfoForm.workYearNorm==8">8年</span>
							<span class="baseUl-txt" v-if="baseInfoForm.workYearNorm==9">9年</span>
							<span class="baseUl-txt" v-if="baseInfoForm.workYearNorm==10">10年及以上</span>
						</li>
						<li v-show="baseInfoForm.degree!=null">
							<span class="baseUl-tips">最高学位：</span>
							<span class="baseUl-txt" v-if="baseInfoForm.degree==1">无</span>
							<span class="baseUl-txt" v-if="baseInfoForm.degree==2">学士</span>
							<span class="baseUl-txt" v-if="baseInfoForm.degree==3">双学士</span>
							<span class="baseUl-txt" v-if="baseInfoForm.degree==4">硕士</span>
							<span class="baseUl-txt" v-if="baseInfoForm.degree==5">MBA</span>
							<span class="baseUl-txt" v-if="baseInfoForm.degree==6">博士</span>
						</li>
						<li v-show="baseInfoForm.hasOverseaEdu!=null">
							<span class="baseUl-tips">海外留学经历：</span>
							<span class="baseUl-txt" v-if="baseInfoForm.hasOverseaEdu==0">否</span>
							<span class="baseUl-txt" v-if="baseInfoForm.hasOverseaEdu==1">是</span>
						</li>
						<li v-show="baseInfoForm.gradTime!=null"><span class="baseUl-tips">毕业时间：</span><span class="baseUl-txt" v-html="baseInfoForm.gradTime"></span></li>
						<li v-show="baseInfoForm.workStartTime!=null"><span class="baseUl-tips">参加工作时间：</span><span class="baseUl-txt" v-html="baseInfoForm.workStartTime"></span></li>
						<li v-show="baseInfoForm.livingAddress!=null"><span class="baseUl-tips">现居住地：</span><span class="baseUl-txt" v-html="baseInfoForm.livingAddress"></span></li>
						<li v-show="baseInfoForm.hukouAddress!=null"><span class="baseUl-tips">户口所在地：</span><span class="baseUl-txt" v-html="baseInfoForm.hukouAddress"></span></li>
						<li v-show="baseInfoForm.politSatus!=null">
							<span class="baseUl-tips">政治面貌：</span>
							<span class="baseUl-txt" v-if="baseInfoForm.politSatus==0">群众</span>
							<span class="baseUl-txt" v-if="baseInfoForm.politSatus==1">共青团员</span>
							<span class="baseUl-txt" v-if="baseInfoForm.politSatus==2">预备党员</span>
							<span class="baseUl-txt" v-if="baseInfoForm.politSatus==3">党员</span>
							<span class="baseUl-txt" v-if="baseInfoForm.politSatus==4">无党派人士</span>
							<span class="baseUl-txt" v-if="baseInfoForm.politSatus==5">其他</span>
						</li>
						<li v-show="baseInfoForm.telephone!=null"><span class="baseUl-tips">固定电话：</span><span class="baseUl-txt" v-html="baseInfoForm.telephone"></span></li>
						<li v-show="baseInfoForm.postalCode!=null"><span class="baseUl-tips">邮政编码：</span><span class="baseUl-txt" v-html="baseInfoForm.postalCode"></span></li>
						<li v-show="baseInfoForm.education!=null">
							<span class="baseUl-tips">最高学历：</span>
							<span class="baseUl-txt" v-if="baseInfoForm.education==1">小学</span>
							<span class="baseUl-txt" v-if="baseInfoForm.education==2">初中</span>
							<span class="baseUl-txt" v-if="baseInfoForm.education==3">高中</span>
							<span class="baseUl-txt" v-if="baseInfoForm.education==4">中技(中专/技校/职高)</span>
							<span class="baseUl-txt" v-if="baseInfoForm.education==5">大专</span>
							<span class="baseUl-txt" v-if="baseInfoForm.education==6">本科</span>
							<span class="baseUl-txt" v-if="baseInfoForm.education==7">硕士研究生</span>
							<span class="baseUl-txt" v-if="baseInfoForm.education==8">MBA</span>
							<span class="baseUl-txt" v-if="baseInfoForm.education==9">博士研究生</span>
							<span class="baseUl-txt" v-if="baseInfoForm.education==10">保密</span>
						</li>
						<li v-show="baseInfoForm.recruit!=null">
							<span class="baseUl-tips">学习形式：</span>
							<span class="baseUl-txt" v-if="baseInfoForm.recruit==1">全国普通高等院校非全日制</span>
							<span class="baseUl-txt" v-if="baseInfoForm.recruit==2">全国普通高等院校全日制</span>
							<span class="baseUl-txt" v-if="baseInfoForm.recruit==3">成人高等教育</span>
							<span class="baseUl-txt" v-if="baseInfoForm.recruit==4">统招专升本</span>
							<span class="baseUl-txt" v-if="baseInfoForm.recruit==5">非统招专升本</span>
							<span class="baseUl-txt" v-if="baseInfoForm.recruit==6">自学考试</span>
							<span class="baseUl-txt" v-if="baseInfoForm.recruit==7">海外留学生</span>
							<span class="baseUl-txt" v-if="baseInfoForm.recruit==8">其他</span>
						</li>
						<li v-show="baseInfoForm.maritalStatus!=null">
							<span class="baseUl-tips">婚否：</span>
							<span class="baseUl-txt" v-if="baseInfoForm.maritalStatus==1">已婚</span>
							<span class="baseUl-txt" v-if="baseInfoForm.maritalStatus==2">未婚</span>
							<span class="baseUl-txt" v-if="baseInfoForm.maritalStatus==3">保密</span>
						</li>
						<li v-show="baseInfoForm.isBirth!=null">
							<span class="baseUl-tips">有无子女：</span>
							<span class="baseUl-txt" v-if="baseInfoForm.isBirth==0">否</span>
							<span class="baseUl-txt" v-if="baseInfoForm.isBirth==1">是</span>
						</li>
						<li v-show="baseInfoForm.race!=null"><span class="baseUl-tips">民族：</span><span class="baseUl-txt" v-html="baseInfoForm.race"></span></li>
						<li v-show="baseInfoForm.hometownAddress!=null"><span class="baseUl-tips">籍贯：</span><span class="baseUl-txt" v-html="baseInfoForm.hometownAddress"></span></li>
						<li v-show="baseInfoForm.cardType!=null">
							<span class="baseUl-tips">证件类型：</span>
							<span class="baseUl-txt" v-if="baseInfoForm.cardType==1">身份证</span>
							<span class="baseUl-txt" v-if="baseInfoForm.cardType==2">护照</span>
							<span class="baseUl-txt" v-if="baseInfoForm.cardType==3">港澳居民来往内地通行证</span>
							<span class="baseUl-txt" v-if="baseInfoForm.cardType==4">台湾居民来往大陆通行证</span>
							<span class="baseUl-txt" v-if="baseInfoForm.cardType==5">其他</span>
							<span class="baseUl-txt" v-if="baseInfoForm.cardType==6">港澳台居民居住证</span>
						</li>
						<li v-show="baseInfoForm.IdCard!=null"><span class="baseUl-tips">证件号码：</span><span class="baseUl-txt" v-html="baseInfoForm.IdCard"></span></li>
						<li v-show="baseInfoForm.major!=null"><span class="baseUl-tips">专业名称：</span><span class="baseUl-txt" v-html="baseInfoForm.major"></span></li>
						<li v-show="baseInfoForm.contMyDesc!=null" class="line"><span class="baseUl-tips">自我评价：</span><span class="baseUl-txt" v-html="baseInfoForm.contMyDesc"></span></li>
						<li v-show="baseInfoForm.jobGoal!=null" class="line"><span class="baseUl-tips">职业目标：</span><span class="baseUl-txt" v-html="baseInfoForm.jobGoal"></span></li>
					</ul>
					<div class="detailRight">
						<p class="option">
							<span @click="goEditOne">编辑</span>
						</p>
						<p class="imgBox">
							<img src="../../assets/images/logo.png" />
						</p>
					</div>
				</div>
				<div class="detail_main clear" v-show="editOneShow==true">
					<el-form :model="detailOne" :rules="detailOneRules" :inline="true" class="searchType1 detailForm">
						<p class="halfWidth">
							<el-form-item label="姓名:" prop="name">
								<el-input v-model="detailOne.name"></el-input>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="性别:">
								<template>
									<el-select v-model="detailOne.gender">
										<el-option label="女" :value="0"></el-option>
										<el-option label="男" :value="1"></el-option>
									</el-select>
								</template>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="出生日期:" prop="birthday">
								<el-date-picker v-model="detailOne.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日">
								</el-date-picker>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="手机号:" prop="phone">
								<el-input v-model="detailOne.phone"></el-input>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="邮箱:" prop="email">
								<el-input v-model="detailOne.email"></el-input>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="工作年限:">
								<template>
									<el-select v-model="detailOne.workYearNorm">
										<el-option label="不限" value></el-option>
										<el-option label="在读学生" :value="99"></el-option>
										<el-option label="应届毕业生" :value="98"></el-option>
										<el-option label="1年" :value="1"></el-option>
										<el-option label="2年" :value="2"></el-option>
										<el-option label="3年" :value="3"></el-option>
										<el-option label="4年" :value="4"></el-option>
										<el-option label="5年" :value="5"></el-option>
										<el-option label="6年" :value="6"></el-option>
										<el-option label="7年" :value="7"></el-option>
										<el-option label="8年" :value="8"></el-option>
										<el-option label="9年" :value="9"></el-option>
										<el-option label="10年及以上" :value="10"></el-option>
									</el-select>
								</template>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="最高学位:">
								<template>
									<el-select v-model="detailOne.degree">
										<el-option label="无" :value="1"></el-option>
										<el-option label="学士" :value="2"></el-option>
										<el-option label="双学士" :value="3"></el-option>
										<el-option label="硕士" :value="4"></el-option>
										<el-option label="MBA" :value="5"></el-option>
										<el-option label="博士" :value="6"></el-option>
									</el-select>
								</template>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="海外留学经历:">
								<template>
									<el-select v-model="detailOne.hasOverseaEdu">
										<el-option label="否" :value="0"></el-option>
										<el-option label="是" :value="1"></el-option>
									</el-select>
								</template>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="毕业时间:" prop="gradTime">
								<el-date-picker v-model="detailOne.gradTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日">
								</el-date-picker>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="参加工作时间:" prop="workStartTime">
								<el-date-picker v-model="detailOne.workStartTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日">
								</el-date-picker>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="现居住地:" prop="livingAddress">
								<el-input v-model="detailOne.livingAddress"></el-input>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="户口所在地:" prop="hukouAddress">
								<el-input v-model="detailOne.hukouAddress"></el-input>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="政治面貌:">
								<template>
									<el-select v-model="detailOne.politStatus">
										<el-option label="群众" :value="0"></el-option>
										<el-option label="共青团员" :value="1"></el-option>
										<el-option label="预备党员" :value="2"></el-option>
										<el-option label="党员" :value="3"></el-option>
										<el-option label="无党派人士" :value="4"></el-option>
										<el-option label="其他" :value="5"></el-option>
									</el-select>
								</template>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="固定电话:" prop="telephone">
								<el-input v-model="detailOne.telephone"></el-input>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="邮政编码:" prop="postalCode">
								<el-input v-model="detailOne.postalCode"></el-input>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="最高学历:">
								<template>
									<el-select v-model="detailOne.education">
										<el-option label="小学" :value="1"></el-option>
										<el-option label="初中" :value="2"></el-option>
										<el-option label="高中" :value="3"></el-option>
										<el-option label="中技(中专/技校/职高)" :value="4"></el-option>
										<el-option label="大专" :value="5"></el-option>
										<el-option label="本科" :value="6"></el-option>
										<el-option label="硕士研究生" :value="7"></el-option>
										<el-option label="MBA" :value="8"></el-option>
										<el-option label="博士研究生" :value="9"></el-option>
										<el-option label="保密" :value="10"></el-option>
									</el-select>
								</template>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="学习形式:">
								<template>
									<el-select v-model="detailOne.recruit">
										<el-option label="全国普通高等院校非全日制" :value="1"></el-option>
										<el-option label="全国普通高等院校全日制" :value="2"></el-option>
										<el-option label="成人高等教育" :value="3"></el-option>
										<el-option label="统招专升本" :value="4"></el-option>
										<el-option label="非统招专升本" :value="5"></el-option>
										<el-option label="自学考试" :value="6"></el-option>
										<el-option label="海外留学生" :value="7"></el-option>
										<el-option label="其他" :value="8"></el-option>
									</el-select>
								</template>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="婚否:">
								<template>
									<el-select v-model="detailOne.maritalStatus">
										<el-option label="已婚" :value="1"></el-option>
										<el-option label="未婚" :value="2"></el-option>
										<el-option label="保密" :value="3"></el-option>
									</el-select>
								</template>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="有无子女:">
								<template>
									<el-select v-model="detailOne.isBirth">
										<el-option label="否" :value="0"></el-option>
										<el-option label="是" :value="1"></el-option>
									</el-select>
								</template>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="民族:" prop="race">
								<el-input v-model="detailOne.race"></el-input>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="籍贯:" prop="hometownAddress">
								<el-input v-model="detailOne.hometownAddress"></el-input>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="证件类型:">
								<template>
									<el-select v-model="detailOne.cardType">
										<el-option label="身份证" :value="1"></el-option>
										<el-option label="护照" :value="2"></el-option>
										<el-option label="港澳居民来往内地通行证" :value="3"></el-option>
										<el-option label="台湾居民来往大陆通行证" :value="4"></el-option>
										<el-option label="其他" :value="5"></el-option>
										<el-option label="港澳台居民居住证" :value="6"></el-option>
									</el-select>
								</template>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="证件号码:" prop="IdCard">
								<el-input v-model="detailOne.IdCard"></el-input>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="专业名称:" prop="major">
								<el-input v-model="detailOne.major"></el-input>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="语言能力:" prop="languages">
								<el-input v-model="detailOne.languages"></el-input>
							</el-form-item>
						</p>
						<p class="widthAll">
							<el-form-item label="自我评价:" prop="contMyDesc" class="remark">
								<el-input type="textarea" v-model="detailOne.contMyDesc"></el-input>
							</el-form-item>
						</p>
						<p class="widthAll">
							<el-form-item label="职业目标:" prop="jobGoal" class="remark">
								<el-input type="textarea" v-model="detailOne.jobGoal"></el-input>
							</el-form-item>
						</p>
					</el-form>
					<div class="detailRight">
						<p>
							<el-button @click="cancelEditOne" size="mini">取消</el-button>
							<el-button type="primary" @click="saveBase(2)" size="mini">保存</el-button>
						</p>
						<p class="imgBox">
							<img src="../../assets/images/logo.png" />
						</p>
					</div>
				</div>
			</div>
			<div class="detailTwo clear">
				<el-divider content-position="left">求职意向</el-divider>
				<div class="detail_main" v-show="editTwoShow==false">
					<ul class="detailUl">
						<li v-show="baseInfoForm.workIndustry!=null"><span class="baseUl-tips">现从事行业：</span><span class="baseUl-txt" v-html="baseInfoForm.workIndustry"></span></li>
						<li v-show="baseInfoForm.workPosition!=null"><span class="baseUl-tips">现从事职业：</span><span class="baseUl-txt" v-html="baseInfoForm.workPosition"></span></li>
						<li v-show="baseInfoForm.workLocation!=null"><span class="baseUl-tips">现工作城市：</span><span class="baseUl-txt" v-html="baseInfoForm.workLocation"></span></li>
						<li v-show="baseInfoForm.workSalaryNorm!=null">
							<span class="baseUl-tips">现月薪（税前）：</span>
							<span class="baseUl-txt" v-if="baseInfoForm.workSalaryNorm==1">1000以下</span>
							<span class="baseUl-txt" v-if="baseInfoForm.workSalaryNorm==2">1000～2000</span>
							<span class="baseUl-txt" v-if="baseInfoForm.workSalaryNorm==3">2001～4000</span>
							<span class="baseUl-txt" v-if="baseInfoForm.workSalaryNorm==4">4001～6000</span>
							<span class="baseUl-txt" v-if="baseInfoForm.workSalaryNorm==5">6001～8000</span>
							<span class="baseUl-txt" v-if="baseInfoForm.workSalaryNorm==6">8001～10000</span>
							<span class="baseUl-txt" v-if="baseInfoForm.workSalaryNorm==7">10001～15000</span>
							<span class="baseUl-txt" v-if="baseInfoForm.workSalaryNorm==8">15001～25000</span>
							<span class="baseUl-txt" v-if="baseInfoForm.workSalaryNorm==9">25000～30000</span>
							<span class="baseUl-txt" v-if="baseInfoForm.workSalaryNorm==10">30000～50000</span>
							<span class="baseUl-txt" v-if="baseInfoForm.workSalaryNorm==11">50000～70000</span>
							<span class="baseUl-txt" v-if="baseInfoForm.workSalaryNorm==12">70000～100000</span>
							<span class="baseUl-txt" v-if="baseInfoForm.workSalaryNorm==13">100000以上</span>
							<span class="baseUl-txt" v-if="baseInfoForm.workSalaryNorm==14">面议</span>
						</li>
						<li v-show="baseInfoForm.expectIndustry!=null"><span class="baseUl-tips">期望从事行业：</span><span class="baseUl-txt" v-html="baseInfoForm.expectIndustry"></span></li>
						<li v-show="baseInfoForm.expectPosition!=null"><span class="baseUl-tips">期望从事职业：</span><span class="baseUl-txt" v-html="baseInfoForm.expectPosition"></span></li>
						<li v-show="baseInfoForm.expectJlocation!=null"><span class="baseUl-tips">期望工作城市：</span><span class="baseUl-txt" v-html="baseInfoForm.expectJlocation"></span></li>
						<li v-show="baseInfoForm.expectSalaryNorm!=null">
							<span class="baseUl-tips">期望月薪（税前）：</span>
							<span class="baseUl-txt" v-if="baseInfoForm.expectSalaryNorm==1">1000以下</span>
							<span class="baseUl-txt" v-if="baseInfoForm.expectSalaryNorm==2">1000～2000</span>
							<span class="baseUl-txt" v-if="baseInfoForm.expectSalaryNorm==3">2001～4000</span>
							<span class="baseUl-txt" v-if="baseInfoForm.expectSalaryNorm==4">4001～6000</span>
							<span class="baseUl-txt" v-if="baseInfoForm.expectSalaryNorm==5">6001～8000</span>
							<span class="baseUl-txt" v-if="baseInfoForm.expectSalaryNorm==6">8001～10000</span>
							<span class="baseUl-txt" v-if="baseInfoForm.expectSalaryNorm==7">10001～15000</span>
							<span class="baseUl-txt" v-if="baseInfoForm.expectSalaryNorm==8">15001～25000</span>
							<span class="baseUl-txt" v-if="baseInfoForm.expectSalaryNorm==9">25000～30000</span>
							<span class="baseUl-txt" v-if="baseInfoForm.expectSalaryNorm==10">30000～50000</span>
							<span class="baseUl-txt" v-if="baseInfoForm.expectSalaryNorm==11">50000～70000</span>
							<span class="baseUl-txt" v-if="baseInfoForm.expectSalaryNorm==12">70000～100000</span>
							<span class="baseUl-txt" v-if="baseInfoForm.expectSalaryNorm==13">100000以上</span>
							<span class="baseUl-txt" v-if="baseInfoForm.expectSalaryNorm==14">面议</span>
						</li>
						<li v-show="baseInfoForm.expectArriveTime!=null">
							<span class="baseUl-tips">到岗时间：</span>
							<span class="baseUl-txt" v-if="baseInfoForm.expectArriveTime==1">一周内</span>
							<span class="baseUl-txt" v-if="baseInfoForm.expectArriveTime==2">一个月内</span>
							<span class="baseUl-txt" v-if="baseInfoForm.expectArriveTime==3">三个月内</span>
							<span class="baseUl-txt" v-if="baseInfoForm.expectArriveTime==4">三个月内</span>
							<span class="baseUl-txt" v-if="baseInfoForm.expectArriveTime==5">面议</span>
						</li>
						<li v-show="baseInfoForm.expectJstatus!=null">
							<span class="baseUl-tips">求职状态：</span>
							<span class="baseUl-txt" v-if="baseInfoForm.expectJstatus==0">无</span>
							<span class="baseUl-txt" v-if="baseInfoForm.expectJstatus==1">正在主动找工作</span>
							<span class="baseUl-txt" v-if="baseInfoForm.expectJstatus==2">可以考虑工作机会</span>
							<span class="baseUl-txt" v-if="baseInfoForm.expectJstatus==3">目前不想找工作</span>
						</li>
						<li v-show="baseInfoForm.workYearSalary!=null"><span class="baseUl-tips">目前年薪（税前）：</span><span class="baseUl-txt" v-html="baseInfoForm.workYearSalary"></span></li>
						<li v-show="baseInfoForm.expectJobNature!=null">
							<span class="baseUl-tips">期望工作性质：</span>
							<span class="baseUl-txt" v-if="baseInfoForm.expectJobNature==1">全职</span>
							<span class="baseUl-txt" v-if="baseInfoForm.expectJobNature==2">兼职</span>
							<span class="baseUl-txt" v-if="baseInfoForm.expectJobNature==3">实习</span>
						</li>
						<li v-show="baseInfoForm.expectYearSalary!=null"><span class="baseUl-tips">期望年薪（税前）：</span><span class="baseUl-txt" v-html="baseInfoForm.expectYearSalary"></span></li>
						<li v-show="baseInfoForm.expectTime!=null"><span class="baseUl-tips">预计报到时间：</span><span class="baseUl-txt" v-html="baseInfoForm.expectTime"></span></li>
					</ul>
					<div class="detailRight">
						<p class="option">
							<span @click="goEditTwo">编辑</span>
						</p>
					</div>
				</div>
				<div class="detail_main clear" v-show="editTwoShow==true">
					<el-form :model="detailOne" :rules="detailTwoRules" :inline="true" class="searchType1 detailForm">
						<p class="halfWidth">
							<el-form-item label="现从事行业:" prop="workIndustryName">
								<el-input v-model="detailTwo.workIndustryName" @focus="getAllIndustry(1)"></el-input>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="现从事职业:" prop="workPositionName">
								<el-input v-model="detailTwo.workPositionName" @focus="openPosition(1)"></el-input>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="现工作城市:" prop="workLocation">
								<el-input v-model="detailTwo.workLocation"></el-input>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="现月薪(税前):" prop="workSalaryNorm">
								<template>
									<el-select v-model="detailTwo.workSalaryNorm">
										<el-option label="1000以下" :value="1"></el-option>
										<el-option label="1000～2000" :value="2"></el-option>
										<el-option label="2001～4000" :value="3"></el-option>
										<el-option label="4001～6000" :value="4"></el-option>
										<el-option label="6001～8000" :value="5"></el-option>
										<el-option label="8001～10000" :value="6"></el-option>
										<el-option label="10001～15000" :value="7"></el-option>
										<el-option label="15001～25000" :value="8"></el-option>
										<el-option label="25000～30000" :value="9"></el-option>
										<el-option label="30000～50000" :value="10"></el-option>
										<el-option label="50000～70000" :value="11"></el-option>
										<el-option label="70000～100000" :value="12"></el-option>
										<el-option label="100000以上" :value="13"></el-option>
										<el-option label="面议" :value="14"></el-option>
									</el-select>
								</template>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="期望从事行业:" prop="expectIndustryName">
								<el-input v-model="detailTwo.expectIndustryName" @focus="getAllIndustry(2)"></el-input>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="期望从事职业:" prop="expectPositionName">
								<el-input v-model="detailTwo.expectPositionName" @focus="openPosition(2)"></el-input>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="期望工作城市:" prop="expectJlocation">
								<el-input v-model="detailTwo.expectJlocation"></el-input>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="期望月薪(税前):" prop="expectSalaryNorm">
								<template>
									<el-select v-model="detailTwo.expectSalaryNorm">
										<el-option label="1000以下" :value="1"></el-option>
										<el-option label="1000～2000" :value="2"></el-option>
										<el-option label="2001～4000" :value="3"></el-option>
										<el-option label="4001～6000" :value="4"></el-option>
										<el-option label="6001～8000" :value="5"></el-option>
										<el-option label="8001～10000" :value="6"></el-option>
										<el-option label="10001～15000" :value="7"></el-option>
										<el-option label="15001～25000" :value="8"></el-option>
										<el-option label="25000～30000" :value="9"></el-option>
										<el-option label="30000～50000" :value="10"></el-option>
										<el-option label="50000～70000" :value="11"></el-option>
										<el-option label="70000～100000" :value="12"></el-option>
										<el-option label="100000以上" :value="13"></el-option>
										<el-option label="面议" :value="14"></el-option>
									</el-select>
								</template>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="到岗时间:">
								<template>
									<el-select v-model="detailTwo.expectArriveTime">
										<el-option label="一周内" :value="1"></el-option>
										<el-option label="一个月内" :value="2"></el-option>
										<el-option label="三个月内" :value="3"></el-option>
										<el-option label="三个月以上" :value="4"></el-option>
										<el-option label="面议" :value="5"></el-option>
									</el-select>
								</template>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="求职状态:">
								<template>
									<el-select v-model="detailTwo.expectJstatus">
										<el-option label="无" :value="0"></el-option>
										<el-option label="正在主动找工作" :value="1"></el-option>
										<el-option label="可以考虑工作机会" :value="2"></el-option>
										<el-option label="目前不想找工作" :value="3"></el-option>
									</el-select>
								</template>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="目前年薪(税前):" prop="workYearSalary">
								<el-input v-model="detailTwo.workYearSalary"></el-input>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="期望年薪(税前):" prop="expectYearSalary">
								<el-input v-model="detailTwo.expectYearSalary"></el-input>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="期望工作性质:">
								<template>
									<el-select v-model="detailTwo.expectJobNature">
										<el-option label="全职" :value="1"></el-option>
										<el-option label="兼职" :value="2"></el-option>
										<el-option label="实习" :value="3"></el-option>
									</el-select>
								</template>
							</el-form-item>
						</p>
						<p class="halfWidth">
							<el-form-item label="预计报到时间:" prop="expectTime">
								<el-input v-model="detailTwo.expectTime"></el-input>
							</el-form-item>
						</p>
					</el-form>
					<div class="detailRight">
						<p>
							<el-button @click="cancelEditTwo" size="mini">取消</el-button>
							<el-button type="primary" @click="saveIntention" size="mini">保存</el-button>
						</p>
					</div>
				</div>
			</div>
			<div class="detailThree clear">
				<el-divider content-position="left">教育背景</el-divider>
				<div class="detail_main">
					<div>
						<div class="detailAddTips clear" v-for="(item,index) in baseInfoForm.talentCvEdu">
							<div class="detailAddTips-div1">
								<p class="detailAddTips-p">
									<span>{{item.startDate}}</span>-
									<span>{{item.endDate}}</span>
								</p>
								<p class="detailAddTips-p" v-show="item.eduCollege!=null">{{item.eduCollege}}</p>
								<p class="detailAddTips-p" v-show="item.eduMajor!=null">{{item.eduMajor}}</p>
								<p class="detailAddTips-p" v-show="item.education!=null"><!--学历-->
									<span v-if="item.education==1">小学</span>
									<span v-if="item.education==2">初中</span>
									<span v-if="item.education==3">高中</span>
									<span v-if="item.education==4">中技(中专/技校/职高)</span>
									<span v-if="item.education==5">大专</span>
									<span v-if="item.education==6">本科</span>
									<span v-if="item.education==7">硕士研究生</span>
									<span v-if="item.education==8">MBA</span>
									<span v-if="item.education==9">博士研究生</span>
									<span v-if="item.education==10">保密</span>
								</p>
								<div class="detailRight">
									<p class="option">
										<span @click="goEditThree(1,item.id)">编辑</span>
										<span @click="goDelete(item.id,1)">删除</span>
									</p>
								</div>
							</div>
							<ul class="detailUl">
								<li class="line" v-show="item.eduDegree!=null">
									<span class="baseUl-tips">学位：</span>
									<span class="baseUl-txt" v-if="item.eduDegree==1">无</span>
									<span class="baseUl-txt" v-if="item.eduDegree==2">学士</span>
									<span class="baseUl-txt" v-if="item.eduDegree==3">双学士</span>
									<span class="baseUl-txt" v-if="item.eduDegree==4">硕士</span>
									<span class="baseUl-txt" v-if="item.eduDegree==5">MBA</span>
									<span class="baseUl-txt" v-if="item.eduDegree==6">博士</span>
								</li>
								<li class="line" v-show="item.workIndustry!=null"><span class="baseUl-tips">专业类别：</span><span class="baseUl-txt" v-html="item.workIndustry"></span></li>
								<li class="line" v-show="item.eduRecruit!=null">
									<span class="baseUl-tips">学习形式：</span>
									<span class="baseUl-txt" v-if="item.eduRecruit==1">全国普通高等院校非全日制</span>
									<span class="baseUl-txt" v-if="item.eduRecruit==2">全国普通高等院校全日制</span>
									<span class="baseUl-txt" v-if="item.eduRecruit==3">成人高等教育</span>
									<span class="baseUl-txt" v-if="item.eduRecruit==4">统招专升本</span>
									<span class="baseUl-txt" v-if="item.eduRecruit==5">非统招专升本</span>
									<span class="baseUl-txt" v-if="item.eduRecruit==6">自学考试</span>
									<span class="baseUl-txt" v-if="item.eduRecruit==7">海外留学生</span>
									<span class="baseUl-txt" v-if="item.eduRecruit==8">其他</span>
								</li>
								<li class="line" v-show="item.eduGpa!=null"><span class="baseUl-tips">成绩（GPA）：</span><span class="baseUl-txt" v-html="item.eduGpa"></span></li>
							</ul>	
							
						</div>
					
					</div>
					<div class="detail_main clear" style="margin-top: 20px;" v-show="editThreeShow==true">
						<el-form :model="detailThree" :rules="detailThreeRules" :inline="true" class="searchType1 detailForm">
							<p class="halfWidth">
								<el-form-item label="学校名称:" prop="eduCollege">
									<el-input v-model="detailThree.eduCollege"></el-input>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="专业名称:" prop="eduMajor">
									<el-input v-model="detailThree.eduMajor"></el-input>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="开始时间:" prop="startDate">
									<el-date-picker v-model="detailThree.startDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日">
									</el-date-picker>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="结束时间:" prop="endDate">
									<el-date-picker v-model="detailThree.endDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日">
									</el-date-picker>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="学历:">
									<template>
										<el-select v-model="detailThree.education">
											<el-option label="小学" :value="1"></el-option>
											<el-option label="初中" :value="2"></el-option>
											<el-option label="高中" :value="3"></el-option>
											<el-option label="中技(中专/技校/职高)" :value="4"></el-option>
											<el-option label="大专" :value="5"></el-option>
											<el-option label="本科" :value="6"></el-option>
											<el-option label="硕士研究生" :value="7"></el-option>
											<el-option label="MBA" :value="8"></el-option>
											<el-option label="博士研究生" :value="9"></el-option>
											<el-option label="保密" :value="10"></el-option>
										</el-select>
									</template>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="学位:">
									<template>
										<el-select v-model="detailThree.eduDegree">
											<el-option label="无" :value="1"></el-option>
											<el-option label="学士" :value="2"></el-option>
											<el-option label="双学士" :value="3"></el-option>
											<el-option label="硕士" :value="4"></el-option>
											<el-option label="MBA" :value="5"></el-option>
											<el-option label="博士" :value="6"></el-option>
										</el-select>
									</template>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="专业类别:" prop="majorType">
									<el-input v-model="detailThree.majorType"></el-input>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="学习形式:">
									<template>
										<el-select v-model="detailThree.eduRecruit">
											<el-option label="全国普通高等院校非全日制" :value="1"></el-option>
											<el-option label="全国普通高等院校全日制" :value="2"></el-option>
											<el-option label="成人高等教育" :value="3"></el-option>
											<el-option label="统招专升本" :value="4"></el-option>
											<el-option label="非统招专升本" :value="5"></el-option>
											<el-option label="自学考试" :value="6"></el-option>
											<el-option label="海外留学生" :value="5"></el-option>
											<el-option label="其他" :value="6"></el-option>
										</el-select>
									</template>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="成绩(GPA):" prop="eduGpa">
									<el-input v-model="detailThree.eduGpa"></el-input>
								</el-form-item>
							</p>
						</el-form>
						<div class="detailRight">
							<p>
								<el-button @click="cancelEditThree" size="mini">取消</el-button>
								<el-button type="primary" @click="editEdu" size="mini">保存</el-button>
							</p>
						</div>
					</div>
					<p class="addButton">
						<el-button type="primary" size="mini" @click="goEditThree(2)">继续添加+</el-button>
					</p>
				</div>
			</div>
			<div class="detailFour clear">
				<el-divider content-position="left">在校职务</el-divider>
				<div class="detail_main">
					<div>
						<div class="detailAddTips clear" v-for="(item,index) in baseInfoForm.schoolPosition">
							<div class="detailAddTips-div1">
								<p class="detailAddTips-p">
									<span>{{item.startTime}}</span>-
									<span>{{item.endTime}}</span>
								</p>
								<p class="detailAddTips-p" v-show="item.schoolPositionName!=null">{{item.schoolPositionName}}</p>
								
								<div class="detailRight">
									<p class="option">
										<span @click="goEditFour(1,item.id)">编辑</span>
										<span @click="goDelete(item.id,9)">删除</span>
									</p>
								</div>
							</div>
							<ul class="detailUl">
								<li class="line" v-show="item.schoolPositionDesc!=null"><span class="baseUl-tips">在校职务描述：</span><span class="baseUl-txt" v-html="item.schoolPositionDesc"></span></li>
							</ul>	
							
						</div>
					
					</div>
					<div class="detail_main clear" style="margin-top: 20px;" v-show="editFourShow==true">
						<el-form :model="detailFour" :rules="detailFourRules" :inline="true" class="searchType1 detailForm">
							<p class="halfWidth">
								<el-form-item label="在校职务名称:" prop="eduMajor">
									<el-input v-model="detailFour.schoolPositionName"></el-input>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="开始时间:" prop="startTime">
									<el-date-picker v-model="detailFour.startTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日">
									</el-date-picker>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="结束时间:" prop="endTime">
									<el-date-picker v-model="detailFour.endTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日">
									</el-date-picker>
								</el-form-item>
							</p>
							<p class="widthAll">
								<el-form-item label="在校职务描述:" prop="contMyDesc" class="remark">
									<el-input type="textarea" v-model="detailFour.schoolPositionDesc"></el-input>
								</el-form-item>
							</p>
						</el-form>
						<div class="detailRight">
							<p>
								<el-button @click="cancelEditFour" size="mini">取消</el-button>
								<el-button type="primary" @click="editSchoolPosition" size="mini">保存</el-button>
							</p>
						</div>
					</div>
					<p class="addButton">
						<el-button type="primary" size="mini" @click="goEditFour(2)">继续添加+</el-button>
					</p>
				</div>
			</div>
			<div class="detailFive clear">
				<el-divider content-position="left">实习经验</el-divider>
				<div class="detail_main">
					<div>
						<div class="detailAddTips clear" v-for="(item,index) in baseInfoForm.talentPractice">
							<div class="detailAddTips-div1">
								<p class="detailAddTips-p">
									<span>{{item.startDate}}</span>-
									<span>{{item.endDate}}</span>
								</p>
								<p class="detailAddTips-p" v-show="item.jobCpy!=null">{{item.jobCpy}}</p>
								
								<div class="detailRight">
									<p class="option">
										<span @click="goEditFive(1,item.id)">编辑</span>
										<span @click="goDelete(item.id,6)">删除</span>
									</p>
								</div>
							</div>
							<ul class="detailUl">
								<li class="line" v-show="item.jobContent!=null"><span class="baseUl-tips">实习内容：</span><span class="baseUl-txt" v-html="item.jobContent"></span></li>
								<li class="line" v-show="item.jobCpyDesc!=null"><span class="baseUl-tips">单位介绍：</span><span class="baseUl-txt" v-html="item.jobCpyDesc"></span></li>
								<li class="line" v-show="item.jobLocation!=null"><span class="baseUl-tips">实习地点：</span><span class="baseUl-txt" v-html="item.jobLocation"></span></li>
							</ul>	
						</div>
					</div>
					<div class="detail_main clear" style="margin-top: 20px;" v-show="editFiveShow==true">
						<el-form :model="detailFive" :rules="detailFiveRules" :inline="true" class="searchType1 detailForm">
							<p class="halfWidth">
								<el-form-item label="单位名称:" prop="jobCpy">
									<el-input v-model="detailFive.jobCpy"></el-input>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="开始时间:" prop="startDate">
									<el-date-picker v-model="detailFive.startDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日">
									</el-date-picker>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="结束时间:" prop="endDate">
									<el-date-picker v-model="detailFive.endDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日">
									</el-date-picker>
								</el-form-item>
							</p>
							<p class="widthAll">
								<el-form-item label="实习内容:" prop="jobContent" class="remark">
									<el-input type="textarea" v-model="detailFive.jobContent"></el-input>
								</el-form-item>
							</p>
							<p class="widthAll">
								<el-form-item label="单位介绍:" prop="jobCpyDesc" class="remark">
									<el-input type="textarea" v-model="detailFive.jobCpyDesc"></el-input>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="实习地点:" prop="jobLocation">
									<el-input v-model="detailFive.jobLocation"></el-input>
								</el-form-item>
							</p>
						</el-form>
						<div class="detailRight">
							<p>
								<el-button @click="cancelEditFive" size="mini">取消</el-button>
								<el-button type="primary" @click="editInternship" size="mini">保存</el-button>
							</p>
						</div>
					</div>
					<p class="addButton">
						<el-button type="primary" size="mini" @click="goEditFive(2)">继续添加+</el-button>
					</p>
				</div>
			</div>
			<div class="detailSix clear">
				<el-divider content-position="left">工作经验</el-divider>
				<div class="detail_main">
					<div>
						<div class="detailAddTips clear" v-for="(item,index) in baseInfoForm.talentWork">
							<div class="detailAddTips-div1">
								<p class="detailAddTips-p">
									<span>{{item.startTime}}</span>-
									<span>{{item.endTime}}</span>
								</p>
								<p class="detailAddTips-p" v-show="item.jobCpy!=null">{{item.jobCpy}}</p>
								<p class="detailAddTips-p" v-show="item.jobName!=null">{{item.jobName}}</p>
								<div class="detailRight">
									<p class="option">
										<span @click="goEditSix(1,item.id)">编辑</span>
										<span @click="goDelete(item.id,2)">删除</span>
									</p>
								</div>
							</div>
							<ul class="detailUl">
								<li class="line" v-show="item.jobContent!=null"><span class="baseUl-tips">工作职责：</span><span class="baseUl-txt" v-html="item.jobContent"></span></li>
								<li class="line" v-show="item.jobCpyNature!=null">
									<span class="baseUl-tips">单位类型：</span>
									<span class="baseUl-txt" v-if="item.jobCpyNature==1">国企</span>
									<span class="baseUl-txt" v-if="item.jobCpyNature==2">私营</span>
									<span class="baseUl-txt" v-if="item.jobCpyNature==3">合资</span>
									<span class="baseUl-txt" v-if="item.jobCpyNature==4">国家机关</span>
									<span class="baseUl-txt" v-if="item.jobCpyNature==5">非政府组织</span>
									<span class="baseUl-txt" v-if="item.jobCpyNature==6">学校</span>
									<span class="baseUl-txt" v-if="item.jobCpyNature==7">其它外商独资</span>
									<span class="baseUl-txt" v-if="item.jobCpyNature==8">代表处</span>
									<span class="baseUl-txt" v-if="item.jobCpyNature==9">股份制企业</span>
									<span class="baseUl-txt" v-if="item.jobCpyNature==10">上市公司</span>
									<span class="baseUl-txt" v-if="item.jobCpyNature==11">事业单位</span>
								</li>
								<li class="line" v-show="item.jobCpyDesc!=null"><span class="baseUl-tips">单位介绍：</span><span class="baseUl-txt" v-html="item.jobCpyDesc"></span></li>
								<li class="line" v-show="item.jobIndustryName!=null"><span class="baseUl-tips">所属行业：</span><span class="baseUl-txt" v-html="item.jobIndustryName"></span></li>
								<li class="line" v-show="item.jobDept!=null"><span class="baseUl-tips">所在部门：</span><span class="baseUl-txt" v-html="item.jobDept"></span></li>
								<li class="line" v-show="item.jobPositionName!=null"><span class="baseUl-tips">职业类别：</span><span class="baseUl-txt" v-html="item.jobPositionName"></span></li>
								<li class="line" v-show="item.jobNature!=null">
									<span class="baseUl-tips">工作性质：</span>
									<span class="baseUl-txt" v-if="item.jobNature==1">全职</span>
									<span class="baseUl-txt" v-if="item.jobNature==2">兼职</span>
									<span class="baseUl-txt" v-if="item.jobNature==3">实习</span>
								</li>
								<li class="line" v-show="item.jobLocation!=null"><span class="baseUl-tips">工作地点：</span><span class="baseUl-txt" v-html="item.jobLocation"></span></li>
								<li class="line" v-show="item.jobSalaryNorm!=null">
									<span class="baseUl-tips">月薪（税前）：</span>
									<span class="baseUl-txt" v-if="item.jobSalaryNorm==1">1000以下</span>
									<span class="baseUl-txt" v-if="item.jobSalaryNorm==2">1000～2000</span>
									<span class="baseUl-txt" v-if="item.jobSalaryNorm==3">2001～4000</span>
									<span class="baseUl-txt" v-if="item.jobSalaryNorm==4">4001～6000</span>
									<span class="baseUl-txt" v-if="item.jobSalaryNorm==5">6001～8000</span>
									<span class="baseUl-txt" v-if="item.jobSalaryNorm==6">8001～10000</span>
									<span class="baseUl-txt" v-if="item.jobSalaryNorm==7">10001～15000</span>
									<span class="baseUl-txt" v-if="item.jobSalaryNorm==8">15001～25000</span>
									<span class="baseUl-txt" v-if="item.jobSalaryNorm==9">25000～30000</span>
									<span class="baseUl-txt" v-if="item.jobSalaryNorm==10">30000～50000</span>
									<span class="baseUl-txt" v-if="item.jobSalaryNorm==11">50000～70000</span>
									<span class="baseUl-txt" v-if="item.jobSalaryNorm==12">70000～100000</span>
									<span class="baseUl-txt" v-if="item.jobSalaryNorm==13">100000以上</span>
									<span class="baseUl-txt" v-if="item.jobSalaryNorm==14">面议</span>
								</li>
								<li class="line" v-show="item.jobWhyLeave!=null"><span class="baseUl-tips">离职原因：</span><span class="baseUl-txt" v-html="item.jobWhyLeave"></span></li>
								<li class="line" v-show="item.jobCpySize!=null"><span class="baseUl-tips">企业规模：</span><span class="baseUl-txt" v-html="item.jobCpySize"></span></li>
								<li class="line" v-show="item.jobReportTo!=null"><span class="baseUl-tips">汇报对象：</span><span class="baseUl-txt" v-html="item.jobReportTo"></span></li>
								<li class="line" v-show="item.jobStaff!=null"><span class="baseUl-tips">下属人数：</span><span class="baseUl-txt" v-html="item.jobStaff"></span></li>
							</ul>	
							
						</div>
					
					</div>
					<div class="detail_main clear" style="margin-top: 20px;" v-show="editSixShow==true">
						<el-form :model="detailSix" :rules="detailSixRules" :inline="true" class="searchType1 detailForm">
							<p class="halfWidth">
								<el-form-item label="单位名称:" prop="eduMajor">
									<el-input v-model="detailSix.jobCpy"></el-input>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="职位名称:" prop="eduMajor">
									<el-input v-model="detailSix.jobName"></el-input>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="开始时间:" prop="startDate">
									<el-date-picker v-model="detailSix.startDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日">
									</el-date-picker>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="结束时间:" prop="endDate">
									<el-date-picker v-model="detailSix.endDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日">
									</el-date-picker>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="单位类型:">
									<template>
										<el-select v-model="detailSix.jobCpyNature">
											<el-option label="国企" :value="1"></el-option>
											<el-option label="私营" :value="2"></el-option>
											<el-option label="合资" :value="3"></el-option>
											<el-option label="国家机关" :value="4"></el-option>
											<el-option label="非政府组织" :value="5"></el-option>
											<el-option label="学校" :value="6"></el-option>
											<el-option label="其它外商独资" :value="7"></el-option>
											<el-option label="代表处" :value="8"></el-option>
											<el-option label="股份制企业" :value="9"></el-option>
											<el-option label="上市公司" :value="10"></el-option>
											<el-option label="事业单位" :value="11"></el-option>
										</el-select>
									</template>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="企业规模:" prop="jobCpySize">
									<el-input v-model="detailSix.jobCpySize"></el-input>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="所属行业:" prop="jobIndustry">
									<el-input v-model="detailSix.jobIndustry"></el-input>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="所在部门:" prop="jobDept">
									<el-input v-model="detailSix.jobDept"></el-input>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="汇报对象:" prop="jobReportTo">
									<el-input v-model="detailSix.jobReportTo"></el-input>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="下属人数:" prop="jobStaff">
									<el-input v-model="detailSix.jobStaff"></el-input>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="职业类别:" prop="jobPosition">
									<el-input v-model="detailSix.jobPosition"></el-input>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="工作性质:">
									<template>
										<el-select v-model="detailSix.jobNature">
											<el-option label="全职" :value="1"></el-option>
											<el-option label="兼职" :value="2"></el-option>
											<el-option label="实习" :value="3"></el-option>
										</el-select>
									</template>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="工作地点:" prop="jobLocation">
									<el-input v-model="detailSix.jobLocation"></el-input>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="月薪(税前):" prop="jobSalaryNorm">
									<template>
										<el-select v-model="detailSix.jobSalaryNorm">
											<el-option label="1000以下" :value="1"></el-option>
											<el-option label="1000～2000" :value="2"></el-option>
											<el-option label="2001～4000" :value="3"></el-option>
											<el-option label="4001～6000" :value="4"></el-option>
											<el-option label="6001～8000" :value="5"></el-option>
											<el-option label="8001～10000" :value="6"></el-option>
											<el-option label="10001～15000" :value="7"></el-option>
											<el-option label="15001～25000" :value="8"></el-option>
											<el-option label="25000～30000" :value="9"></el-option>
											<el-option label="30000～50000" :value="10"></el-option>
											<el-option label="50000～70000" :value="11"></el-option>
											<el-option label="70000～100000" :value="12"></el-option>
											<el-option label="100000以上" :value="13"></el-option>
											<el-option label="面议" :value="14"></el-option>
										</el-select>
									</template>
								</el-form-item>
							</p>
							<p class="widthAll">
								<el-form-item label="工作职责:" prop="jobContent" class="remark">
									<el-input type="textarea" v-model="detailSix.jobContent"></el-input>
								</el-form-item>
							</p>
							<p class="widthAll">
								<el-form-item label="单位介绍:" prop="jobCpyDesc" class="remark">
									<el-input type="textarea" v-model="detailSix.jobCpyDesc"></el-input>
								</el-form-item>
							</p>
							<p class="widthAll">
								<el-form-item label="离职原因:" prop="jobWhyLeave" class="remark">
									<el-input type="textarea" v-model="detailSix.jobWhyLeave"></el-input>
								</el-form-item>
							</p>
						</el-form>
						<div class="detailRight">
							<p>
								<el-button @click="cancelEditSix" size="mini">取消</el-button>
								<el-button type="primary" @click="editJobExperience" size="mini">保存</el-button>
							</p>
						</div>
					</div>
					<p class="addButton">
						<el-button type="primary" size="mini" @click="goEditSix(2)">继续添加+</el-button>
					</p>
				</div>
			</div>
			<div class="detailSeven clear">
				<el-divider content-position="left">项目经验</el-divider>
				<div class="detail_main">
					<div>
						<div class="detailAddTips clear" v-for="(item,index) in baseInfoForm.talentProject">
							<div class="detailAddTips-div1">
								<p class="detailAddTips-p">
									<span>{{item.startDate}}</span>-
									<span>{{item.endDate}}</span>
								</p>
								<p class="detailAddTips-p" v-show="item.projName!=null">{{item.projName}}</p>
								
								<div class="detailRight">
									<p class="option">
										<span @click="goEditSeven(1,item.id)">编辑</span>
										<span @click="goDelete(item.id,7)">删除</span>
									</p>
								</div>
							</div>
							<ul class="detailUl">
								<li class="line" v-show="item.projCpy!=null"><span class="baseUl-tips">所在公司名称：</span><span class="baseUl-txt" v-html="item.projCpy"></span></li>
								<li class="line" v-show="item.projPosition!=null"><span class="baseUl-tips">担任职位：</span><span class="baseUl-txt" v-html="item.projPosition"></span></li>
								<li class="line" v-show="item.projResp!=null"><span class="baseUl-tips">项目职责：</span><span class="baseUl-txt" v-html="item.projResp"></span></li>
								<li class="line" v-show="item.projContent!=null"><span class="baseUl-tips">项目内容：</span><span class="baseUl-txt" v-html="item.projContent"></span></li>
							</ul>	
							
						</div>
					
					</div>
					<div class="detail_main clear" style="margin-top: 20px;" v-show="editSevenShow==true">
						<el-form :model="detailSeven" :rules="detailSevenRules" :inline="true" class="searchType1 detailForm">
							<p class="halfWidth">
								<el-form-item label="项目名称:" prop="eduMajor">
									<el-input v-model="detailSeven.projName"></el-input>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="所在公司名称:" prop="projCpy">
									<el-input v-model="detailSeven.projCpy"></el-input>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="开始时间:" prop="startDate">
									<el-date-picker v-model="detailSeven.startDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日">
									</el-date-picker>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="结束时间:" prop="endDate">
									<el-date-picker v-model="detailSeven.endDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日">
									</el-date-picker>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="担任职位:" prop="projPosition">
									<el-input v-model="detailSeven.projPosition"></el-input>
								</el-form-item>
							</p>
							<p class="widthAll">
								<el-form-item label="项目描述:" prop="projContent" class="remark">
									<el-input type="textarea" v-model="detailSeven.projContent"></el-input>
								</el-form-item>
							</p>
							<p class="widthAll">
								<el-form-item label="项目职责:" prop="projResp" class="remark">
									<el-input type="textarea" v-model="detailSeven.projResp"></el-input>
								</el-form-item>
							</p>
						</el-form>
						<div class="detailRight">
							<p>
								<el-button @click="cancelEditSeven" size="mini">取消</el-button>
								<el-button type="primary" @click="editProExperience" size="mini">保存</el-button>
							</p>
						</div>
					</div>
					<p class="addButton">
						<el-button type="primary" size="mini" @click="goEditSeven(2)">继续添加+</el-button>
					</p>
				</div>
			</div>
			<div class="detailEight clear">
				<el-divider content-position="left">培训经历</el-divider>
				<div class="detail_main">
					<div>
						<div class="detailAddTips clear" v-for="(item,index) in baseInfoForm.talentTrain">
							<div class="detailAddTips-div1">
								<p class="detailAddTips-p">
									<span>{{item.startDate}}</span>-
									<span>{{item.endDate}}</span>
								</p>
								<p class="detailAddTips-p" v-show="item.trainOrg!=null">{{item.trainOrg}}</p>
								<p class="detailAddTips-p" v-show="item.trainSubjectName!=null">{{item.trainSubjectName}}</p>
								<div class="detailRight">
									<p class="option">
										<span @click="goEditEight(1,item.id)">编辑</span>
										<span @click="goDelete(item.id,3)">删除</span>
									</p>
								</div>
							</div>
							<ul class="detailUl">
								<li class="line" v-show="item.trainLoc!=null"><span class="baseUl-tips">培训地点：</span><span class="baseUl-txt" v-html="item.trainLoc"></span></li>
								<li class="line" v-show="item.trainCert!=null"><span class="baseUl-tips">获得证书：</span><span class="baseUl-txt" v-html="item.trainCert"></span></li>
								<li class="line" v-show="item.trainCont!=null"><span class="baseUl-tips">培训描述：</span><span class="baseUl-txt" v-html="item.trainCont"></span></li>
							</ul>
						</div>
					
					</div>
					<div class="detail_main clear" style="margin-top: 20px;" v-show="editEightShow==true">
						<el-form :model="detailEight" :rules="detailEightRules" :inline="true" class="searchType1 detailForm">
							<p class="halfWidth">
								<el-form-item label="开始时间:" prop="startDate">
									<el-date-picker v-model="detailEight.startDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日">
									</el-date-picker>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="结束时间:" prop="endDate">
									<el-date-picker v-model="detailEight.endDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日">
									</el-date-picker>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="培训地点:" prop="trainLoc">
									<el-input v-model="detailEight.trainLoc"></el-input>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="培训机构:" prop="trainOrg">
									<el-input v-model="detailEight.trainOrg"></el-input>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="课程名称:" prop="trainSubjectName">
									<el-input v-model="detailEight.trainSubjectName"></el-input>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="获得证书:" prop="trainCert">
									<el-input v-model="detailEight.trainCert"></el-input>
								</el-form-item>
							</p>
							<p class="widthAll">
								<el-form-item label="培训描述:" prop="trainCont" class="remark">
									<el-input type="textarea" v-model="detailEight.trainCont"></el-input>
								</el-form-item>
							</p>
						</el-form>
						<div class="detailRight">
							<p>
								<el-button @click="cancelEditEight" size="mini">取消</el-button>
								<el-button type="primary" @click="editTrain" size="mini">保存</el-button>
							</p>
						</div>
					</div>
					<p class="addButton">
						<el-button type="primary" size="mini" @click="goEditEight(2)">继续添加+</el-button>
					</p>
				</div>
			</div>
			<div class="detailNine clear">
				<el-divider content-position="left">证书</el-divider>
				<div class="detail_main">
					<div>
						<div class="detailAddTips clear" v-for="(item,index) in baseInfoForm.talentCert">
							<div class="detailAddTips-div1">
								<div class="detailRight">
									<p class="option">
										<span @click="goEditNine(1,item.id)">编辑</span>
										<span @click="goDelete(item.id,4)">删除</span>
									</p>
								</div>
							</div>
							<ul class="detailUl">
								<li class="line" v-show="item.certName!=null"><span class="baseUl-tips">证书名称：</span><span class="baseUl-txt" v-html="item.certName"></span></li>
								<li class="line" v-show="item.certTime!=null"><span class="baseUl-tips">获得时间：</span><span class="baseUl-txt" v-html="item.certTime"></span></li>
								<li class="line" v-show="item.certDesc!=null"><span class="baseUl-tips">证书描述：</span><span class="baseUl-txt" v-html="item.certDesc"></span></li>
							</ul>
						</div>
					
					</div>
					<div class="detail_main clear" style="margin-top: 20px;" v-show="editNineShow==true">
						<el-form :model="detailNine" :rules="detailNineRules" :inline="true" class="searchType1 detailForm">
							
							<p class="halfWidth">
								<el-form-item label="证书名称:" prop="certName">
									<el-input v-model="detailNine.certName"></el-input>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="获得时间:" prop="certTime">
									<el-date-picker v-model="detailNine.certTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日">
									</el-date-picker>
								</el-form-item>
							</p>
							<p class="widthAll">
								<el-form-item label="证书描述:" prop="certDesc" class="remark">
									<el-input type="textarea" v-model="detailNine.certDesc"></el-input>
								</el-form-item>
							</p>
						</el-form>
						<div class="detailRight">
							<p>
								<el-button @click="cancelEditNine" size="mini">取消</el-button>
								<el-button type="primary" @click="editCert" size="mini">保存</el-button>
							</p>
						</div>
					</div>
					<p class="addButton">
						<el-button type="primary" size="mini" @click="goEditNine(2)">继续添加+</el-button>
					</p>
				</div>
			</div>
			<div class="detailTen clear">
				<el-divider content-position="left">技能</el-divider>
				<div class="detail_main">
					<div>
						<div class="detailAddTips clear" v-for="(item,index) in baseInfoForm.talentSkill">
							<div class="detailAddTips-div1">
								<div class="detailRight">
									<p class="option">
										<span @click="goEditTen(1,item.id)">编辑</span>
										<span @click="goDelete(item.id,5)">删除</span>
									</p>
								</div>
							</div>
							<ul class="detailUl">
								<li class="line" v-show="item.skillsName!=null"><span class="baseUl-tips">技能名称：</span><span class="baseUl-txt" v-html="item.skillsName"></span></li>
								<li class="line" v-show="item.skillsTime!=null"><span class="baseUl-tips">使用时间总计：</span><span class="baseUl-txt" v-html="item.skillsTime"></span></li>
								<li class="line" v-show="item.skillsLevel!=null"><span class="baseUl-tips">掌握程度：</span><span class="baseUl-txt" v-html="item.skillsLevel"></span></li>
							</ul>
						</div>
					
					</div>
					<div class="detail_main clear" style="margin-top: 20px;" v-show="editTenShow==true">
						<el-form :model="detailTen" :rules="detailTenRules" :inline="true" class="searchType1 detailForm">
							
							<p class="halfWidth">
								<el-form-item label="技能名称:" prop="skillsName">
									<el-input v-model="detailTen.skillsName"></el-input>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="使用时间总计:" prop="certTime">
									<el-input v-model="detailTen.skillsTime"></el-input>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="掌握程度:">
									<template>
										<el-select v-model="detailTen.skillsLevel">
											<el-option label="了解" value="了解"></el-option>
											<el-option label="一般" value="一般"></el-option>
											<el-option label="熟练" value="熟练"></el-option>
											<el-option label="精通" value="精通"></el-option>
										</el-select>
									</template>
								</el-form-item>
							</p>
						</el-form>
						<div class="detailRight">
							<p>
								<el-button @click="cancelEditTen" size="mini">取消</el-button>
								<el-button type="primary" @click="editSkill" size="mini">保存</el-button>
							</p>
						</div>
					</div>
					<p class="addButton">
						<el-button type="primary" size="mini" @click="goEditTen(2)">继续添加+</el-button>
					</p>
				</div>
			</div>
			<div class="detailEleven clear">
				<el-divider content-position="left">获奖情况</el-divider>
				<div class="detail_main">
					<div>
						<div class="detailAddTips clear" v-for="(item,index) in baseInfoForm.talentPrize">
							<div class="detailAddTips-div1">
								<div class="detailRight">
									<p class="option">
										<span @click="goEditEleven(1,item.id)">编辑</span>
										<span @click="goDelete(item.id,8)">删除</span>
									</p>
								</div>
							</div>
							<ul class="detailUl">
								<li class="line" v-show="item.prizeName!=null"><span class="baseUl-tips">奖项名称：</span><span class="baseUl-txt" v-html="item.prizeName"></span></li>
								<li class="line" v-show="item.prizeDesc!=null"><span class="baseUl-tips">获奖描述：</span><span class="baseUl-txt" v-html="item.prizeDesc"></span></li>
								<li class="line" v-show="item.prizeLevel!=null">
									<span class="baseUl-tips">获奖级别：</span>
									<span class="baseUl-txt" v-if="item.prizeLevel==1">班组级</span>
									<span class="baseUl-txt" v-if="item.prizeLevel==2">院校级</span>
									<span class="baseUl-txt" v-if="item.prizeLevel==3">县市级</span>
									<span class="baseUl-txt" v-if="item.prizeLevel==4">省区级</span>
									<span class="baseUl-txt" v-if="item.prizeLevel==5">国家级</span>
									<span class="baseUl-txt" v-if="item.prizeLevel==6">国际级</span>
								</li>
								<li class="line" v-show="item.prizeTime!=null"><span class="baseUl-tips">获奖时间：</span><span class="baseUl-txt" v-html="item.prizeTime"></span></li>
							</ul>
						</div>
					
					</div>
					<div class="detail_main clear" style="margin-top: 20px;" v-show="editElevenShow==true">
						<el-form :model="detailEleven" :rules="detailElevenRules" :inline="true" class="searchType1 detailForm">
							
							<p class="halfWidth">
								<el-form-item label="奖项名称:" prop="prizeName">
									<el-input v-model="detailEleven.prizeName"></el-input>
								</el-form-item>
							</p>
							<p class="widthAll">
								<el-form-item label="获奖描述:" prop="prizeDesc" class="remark">
									<el-input type="textarea" v-model="detailEleven.prizeDesc"></el-input>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="获奖级别:">
									<template>
										<el-select v-model="detailEleven.prizeLevel">
											<el-option label="班组级" :value="1"></el-option>
											<el-option label="院校级" :value="2"></el-option>
											<el-option label="县市级" :value="3"></el-option>
											<el-option label="省区级" :value="4"></el-option>
											<el-option label="国家级" :value="5"></el-option>
											<el-option label="国际级" :value="6"></el-option>
										</el-select>
									</template>
								</el-form-item>
							</p>
							<p class="halfWidth">
								<el-form-item label="获奖时间:" prop="prizeTime">
									<el-date-picker v-model="detailEleven.prizeTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日">
									</el-date-picker>
								</el-form-item>
							</p>
						</el-form>
						<div class="detailRight">
							<p>
								<el-button @click="cancelEditEleven" size="mini">取消</el-button>
								<el-button type="primary" @click="editPrize" size="mini">保存</el-button>
							</p>
						</div>
					</div>
					<p class="addButton">
						<el-button type="primary" size="mini" @click="goEditTen(2)">继续添加+</el-button>
					</p>
				</div>
			</div>
			
			
		</div>
	</div>
</template>

<script>
</script>

<style>
</style>
