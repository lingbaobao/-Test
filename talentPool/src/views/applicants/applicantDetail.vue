<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-inner">
				<span class="name" v-html="baseInfoForm.name"></span>
				<span class="id" v-html="baseInfoForm.cvNum">C00013742</span>
				<span class="num"><b v-html="baseInfoForm.count"></b>次应聘</span>
				<el-select v-model="postId" class="positionSelect" @change="myPositionChange">
				  <el-option
					v-for="item in baseInfoForm.post"
					:label="item.postName"
					:value="item.id">
				  </el-option>
				</el-select>
			</div>
		</div>
		<div class="detail">
				<div class="detail_l">
					<div class="baseInfo">
						<div class="baseHeader">
							<span class="title">
								<span class="line"></span>
								<span class="txt">基本信息</span>
							</span>
							<span class="editbutton">
								<span class="el-icon-edit"></span>
								<span class="txt" @click="goBaseEdit">编辑</span>
							</span>
						</div>
						<ul class="baseUl" v-show="editBaseShow==false">
							<li><span class="baseUl-tips">手机：</span><span class="baseUl-txt" v-html="baseInfoForm.phone"></span></li>
							<li><span class="baseUl-tips">邮箱：</span><span class="baseUl-txt" v-html="baseInfoForm.email"></span></li>
							<li><span class="baseUl-tips">投递时间：</span><span class="baseUl-txt" v-html="baseInfoForm.insertTime">2020年3月30日</span></li>
							<li><span class="baseUl-tips">来源渠道：</span><span class="baseUl-txt" v-html="baseInfoForm.cvSource"></span></li>
							<li>
								<span class="baseUl-tips">人才动态：</span>
								<span class="baseUl-txt" v-if="baseInfoForm.workStatus==0">未知</span>
								<span class="baseUl-txt" v-if="baseInfoForm.workStatus==1">想看机会</span>
								<span class="baseUl-txt" v-if="baseInfoForm.workStatus==2">暂时不看机会</span>
								<span class="baseUl-txt" v-if="baseInfoForm.workStatus==3">已离职在看机会</span>
								<span class="baseUl-txt" v-if="baseInfoForm.workStatus==4">在职想看新机会</span>
							</li>
						</ul>
						<div v-show="editBaseShow==true">
							<el-form :inline="true" class="baseForm":model="baseInfoForm" :rules="detailBaseRules" ref="baseInfoRef">
								<el-form-item label="姓名:" prop="name">
									<el-input v-model="baseInfoForm.name"></el-input>
								</el-form-item>
								<el-form-item label="手机号:" prop="phone">
									<el-input v-model="baseInfoForm.phone"></el-input>
								</el-form-item>
								<el-form-item label="邮箱:" prop="email">
									<el-input v-model="baseInfoForm.email"></el-input>
								</el-form-item>
								<el-form-item label="投递时间:">
									<span v-html="baseInfoForm.insertTime"></span>
								</el-form-item>
								<el-form-item label="来源渠道:">
									<span v-html="baseInfoForm.cvSource"></span>
								</el-form-item>
								<el-form-item label="人才动态:" prop="workStatus">
									<template>
										<el-select v-model="baseInfoForm.workStatus">
											<el-option label="未知" :value="0"></el-option>
											<el-option label="想看机会" :value="1"></el-option>
											<el-option label="暂时不看机会" :value="2"></el-option>
											<el-option label="已离职在看机会" :value="3"></el-option>
											<el-option label="在职想看新机会" :value="4"></el-option>
										</el-select>
									</template>
								</el-form-item>
								<el-form-item style="margin-left: 65px;">
									<el-button @click="cancelBase">取消</el-button>
									<el-button type="primary" @click="saveBase(1)">保存</el-button>
								</el-form-item>
							</el-form>
						</div>
					</div>
				</div>
				<div class="detail_c">
					<div class="processDetail" v-show="postProcess==true">
						<el-steps :active="processStep" finish-status="success">
						  <el-step v-for="(item,index) in process" :title="item.name"></el-step>
						</el-steps>
					</div>
					<div class="detailMain">
						<div class="detailTab">
							<el-tabs v-model="activeTab" @tab-click="handleClick">
							    <el-tab-pane label="简历" name="1">
									<div v-if="activeTab=='1'">
										<p style="margin: 20px 0;">
											<el-button type="primary" size="mini" @click="getDetail">标准简历</el-button>
											<el-button size="mini" @click="getOriginalDetail">原始简历</el-button>
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
													<li v-show="baseInfoForm.idCard!=null"><span class="baseUl-tips">证件号码：</span><span class="baseUl-txt" v-html="baseInfoForm.idCard"></span></li>
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
																<el-select v-model="detailOne.politSatus">
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
														<el-form-item label="证件号码:" prop="idCard">
															<el-input v-model="detailOne.idCard"></el-input>
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
															<el-input v-model="detailTwo.workIndustryName" @focus="getIndustryDataNow"></el-input>
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
															<el-input v-model="detailTwo.expectIndustryName" @focus="getIndustryDataUn"></el-input>
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
													<el-button type="primary" size="mini" @click="goEditEleven(2)">继续添加+</el-button>
												</p>
											</div>
										</div>
									</div>
									</div>
								</el-tab-pane>
							    <el-tab-pane label="评价" name="2">
									<div v-if="activeTab=='2'">
										<evaluationVue :vid="vid" />
									</div>
								</el-tab-pane>
							    <el-tab-pane label="筛选" name="3">
									<div v-if="activeTab=='3'">
										<screenVue :cvId="cvId" :vid="vid"  />
									</div>
								</el-tab-pane>
								<el-tab-pane label="Offer" name="4">
									<div v-if="activeTab=='4'">
										<offerVue :vid="vid" />
									</div>
								</el-tab-pane>
								<el-tab-pane label="应聘过程" name="5">
									<div v-if="activeTab=='5'">
										<processVue :cvId="cvId" />
									</div>
								</el-tab-pane>
								<el-tab-pane label="附件" name="6">
									<div v-if="activeTab=='6'">
										<enclosureVue :cvId="cvId" :vid="vid"  /> 
									</div>
								</el-tab-pane>
							</el-tabs>
						</div>
					</div>
				</div>
				<div class="detail_r">
					<optionBtn 
					:styleFlag="1" 
					:key="timer" 
					:RoutineOperate="RoutineOperate" 
					:includeOperate="includeOperate" 
					:processId="processId" 
					:vidArr="vid" 
					:cvIdArr="cvId" 
					:postAndCvList="postAndCvList" 
					:approvalOffer="approvalOffer"
					:sendOfferTrue="sendOfferTrue"
					@reload='reload'
					/>
				</div>
			</div>
			
			
			<!--选择现在从事行业-->
			<el-dialog title="选择行业" width="680px" :visible.sync="industryDialogVisibleNow" @close="closeIndustryDialogNow(0)">
				<div class="clear">
					<div class="majorDialog_l">
						<el-radio-group v-model="checkedIndustryNow.id">
							<el-radio v-for="item in industryArr" :label="item.id" @change="handlecheckedIndustryChangeNow(item)">{{item.industryName}}</el-radio>
						</el-radio-group>
					</div>
					<div class="majorDialog_r">
						<p class="mainColor">已选择<b>{{checkedIndustryNum}}</b>/<span>{{industryNumOk}}</span>个</p>
						<div class="checkedBox" v-show="haveCheckedIndustryNow==true">
							<span @click="delCheckedIndustryNow">{{checkedIndustryNow.industryName}}<b>×</b></span>
						</div>
					</div>
					<p>
						<el-button type="primary" size="medium" @click="closeIndustryDialogNow(1)">确定</el-button>
						<el-button type="warning" size="medium" @click="closeIndustryDialogNow(0)">取消</el-button>
					</p>
				</div>
			</el-dialog>
			<!--选择期望从事行业-->
			<el-dialog title="选择行业" width="680px" :visible.sync="industryDialogVisibleUn" @close="closeIndustryDialogUn(0)">
				<div class="clear">
					<div class="majorDialog_l">
						<el-checkbox-group v-model="checkedIndustryName" :max="industryNumOk" @change="handlecheckedIndustryChangeUn">
						    <el-checkbox v-for="item in industryArr" :label="item.industryName">{{item.industryName}}</el-checkbox>
						</el-checkbox-group>
					</div>
					<div class="majorDialog_r">
						<p class="mainColor">已选择<b>{{checkedIndustryNum}}</b>/<span>{{industryNumOk}}</span>个</p>
						<div class="checkedBox" v-for="item in checkedIndustryUn">
							<span @click="delCheckedIndustryUn(item)">{{item.industryName}}<b>×</b></span>
						</div>
					</div>
					<p>
						<el-button type="primary" size="medium" @click="closeIndustryDialogUn(1)">确定</el-button>
						<el-button type="warning" size="medium" @click="closeIndustryDialogUn(0)">取消</el-button>
					</p>
				</div>
			</el-dialog>
			<!--选择职业-->
			<el-dialog title="选择职业" width="680px" :visible.sync="positionDialogVisible" @close="closePositionDialog(0)">
				<div class="clear">
					
					<div class="positionTab">
						<p class="positionTips" v-for="(item,index) in clickPosition" @click="toBreadcrumb(item,index)">
							<span>{{item.positionTypeName}}</span>
							<el-divider direction="vertical"></el-divider>
						</p>
					</div>
					
					<div class="majorDialog_l">
						
						<p v-for="item in positionArr" class="radioLabel">
							<input type="radio" name="positionRadio" @change="handlecheckedPositionChange(item)" class="formTips1_radio1" :value="item.id" v-model="checkedPosition.id" />
							<span @click="getPositionData(1,item)">{{item.positionTypeName}}</span>
						</p>
					</div>
					<div class="majorDialog_r">
						<p class="mainColor">已选择<b>{{checkedPositionNum}}</b>/<span>{{positionNumOk}}</span>个</p>
						<div class="checkedBox" v-show="haveCheckedPosition==true">
							<span @click="delCheckedPosition">{{checkedPosition.positionTypeName}}<b>×</b></span>
						</div>
					</div>
					<p>
						<el-button type="primary" size="medium" @click="closePositionDialog(1)">确定</el-button>
						<el-button type="warning" size="medium" @click="closePositionDialog(0)">取消</el-button>
					</p>
					
				</div>
			</el-dialog>
	
	</div>
</template>

<script>
	import evaluationVue from '@/components/applicantDetail/evaluation.vue'//评价
	import screenVue from '@/components/applicantDetail/screen.vue'//筛选
	import offerVue from '@/components/applicantDetail/offer.vue'//offer 
	import processVue from '@/components/applicantDetail/process.vue'//操作记录
	import enclosureVue from '@/components/applicantDetail/enclosure.vue'//附件记录
	import optionBtn from '@/components/options.vue'//操作
	export default {
		inject:['reload'],
		data() {
			return{
				cvId:0,//简历id
				vid:'',//中间表id
				postId:0,//职位id
				postAndCvList:[],//包含：cvId应聘者id   postId应聘者应聘的职位id  postCvId简历岗位中间表主键id
				processId:'',//流程模板id
				approvalOffer:true,//offer审批
				sendOfferTrue:true,//offer发送
				postProcess:true,//流程显示
				process:[],//当前职位流程
				processStates:[],//阶段状态
				isShowOriginal:false,
				editBaseShow:false,//编辑基本信息表单
				editOneShow:false,//编辑个人信息表单
				editTwoShow:false,//编辑求职意向表单
				editThreeShow:false,//编辑教育背景表单
				editThreeFlag:'',//教育背景表单 1：编辑保存 2、添加保存
				editFourShow:false,//编辑在校职务表单
				editFourFlag:'',//在校职务表单 1：编辑保存 2、添加保存
				editFiveShow:false,//编辑实习经验表单
				editFiveFlag:'',//实习经验表单 1：编辑保存 2、添加保存
				editSixShow:false,//编辑工作经验表单
				editSixFlag:'',//工作经验表单 1：编辑保存 2、添加保存
				editSevenShow:false,//编辑项目经验表单
				editSevenFlag:'',//项目经验表单 1：编辑保存 2、添加保存
				editEightShow:false,//编辑培训经历表单
				editEightFlag:'',//培训经历表单 1：编辑保存 2、添加保存
				editNineShow:false,//编辑证书表单
				editNineFlag:'',//证书表单 1：编辑保存 2、添加保存
				editTenShow:false,//编辑技能表单
				editTenFlag:'',//技能表单 1：编辑保存 2、添加保存
				editElevenShow:false,//编辑获奖情况表单
				editElevenFlag:'',//获奖情况表单 1：编辑保存 2、添加保存
				processStep:1,
				activeTab:"1",
				baseInfoForm:{
					id:'',//id
					name:'',//姓名
					cvNum:'',//简历编号
					count:0,//应聘次数
					phone:'',//手机号
					email:'',//邮箱
					insertTime:'',//投递时间
					cvSource:'',//来源渠道
					workStatus:0,//人才动态(0未知；1想看机会；2暂时不看；3已离职在看；4在职想看)
				}, 
				detailBase:{},//基本信息
				detailBaseRules:{
					name: [
						{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
						{ min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
					],
				},//基本信息表单提交条件
				detailOne:{},//个人信息
				detailOneRules:{
					name: [
						{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
						{ min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
					],
				},
				detailTwo:{},//求职意向
				detailTwoRules:{},
				detailThree:{},//教育背景
				detailThreeRules:{},
				detailFour:{},//在校职务
				detailFourRules:{},
				detailFive:{},//实习经验
				detailFiveRules:{},
				detailSix:{},//工作经验
				detailSixRules:{},
				detailSeven:{},//项目经验
				detailSevenRules:{},
				detailEight:{},//培训经历
				detailEightRules:{},
				detailNine:{},//证书信息
				detailNineRules:{},
				detailTen:{},//技能信息
				detailTenRules:{},
				detailEleven:{},//获奖情况
				detailElevenRules:{},
				industryDialogVisibleNow:false,//行业弹框
				industryDialogVisibleUn:false,//行业弹框
				industryArr:[],//行业数组
				industryNumOk:1,//允许选择的行业数量
				checkedIndustryNow:{
					id:'',
					industryName:''
				},
				checkedIndustryUn:[
					{
						id:'',
						industryName:''
					}
				],
				checkedIndustryId:[],
				checkedIndustryName:[],
				checkedIndustryNum:0,//选择行业数量
				haveCheckedIndustryNow:false,
				positionFlag:1,//1:现从事职业  2：期待从事职业
				positionDialogVisible:false,//职业弹框
				positionArr:[],//职业数组
				positionNumOk:1,//允许选择的职业数量
				checkedPosition:{
					id:'',
					positionTypeName:''
				},
				clickPosition:[
					{
						id:0,
						positionTypeName:'全部'
					},
				],
				checkedPositionNum:0,//选择职业数量
				pid:0,//职业父级id初始值
				havechildren:true,
				haveCheckedPosition:false,
				RoutineOperate:[],//常规操作按钮
				includeOperate:[],//包含操作按钮
				timer:'',//操作按钮组件重加载
			}
		},
		components: {
			evaluationVue,
			screenVue,
			offerVue,
			processVue,
			enclosureVue,
			optionBtn,
		},
		methods: {
			myPositionChange(val){
				//选择已投简历职位
				this.postId = val;
				this.goflowNodes(this.postId)
				this.getDetail()
				
				/* this.postAndCvList=[]
				var item = {cvId:this.cvId, postId:this.postId, postCvId:this.vid}
				this.postAndCvList.push(item) */
			},
			async showProcess(){
				//应聘当前岗位流程展示
				this.process=[]
				const {
					data: res
				} = await this.$http.findCvNodes({
					params:{
						cvId:this.cvId,
						postId:this.postId
					}
				})
				if (res.code !== 200) {
				    return this.$message.error(res.msg);
				} else {
					if(res.data.length==0){
						this.postProcess=false
					}else{
						console.log(res.data)
						this.postProcess=true;
						this.process = res.data;
						this.process.forEach((item,index)=>{
							if(item.state == 1){
								//回显当前阶段的当前状态
								this.processStates = item.states
								//进度条index显示
								console.log("当前流程位置："+index)
							   this.processStep=index
							   //获取操作按钮
							   this.getOperateBtn(item.id)
							}
						})
						
					}
				} 
			},
			async getOperateBtn(val){
				//阶段详情
				this.RoutineOperate=[]
				this.includeOperate=[]
				const {
					data: res
				} = await this.$http.flowNodeDetail({
					params:{
						id:val,
					}
				})
				if (res.code !== 200) {
				    return this.$message.error(res.msg);
				} else {
					console.log(res.data.opts)
					res.data.opts.forEach((item,index)=>{
					    if(item.state == 1){
							if(item.type==1){
								//常规操作
								this.RoutineOperate.push(item.docId)
							}else if(item.type==2){
								//包含操作
								this.includeOperate.push(item.docId)
							}
						}
					})
					
					this.timer = new Date().getTime()  //重新加载操作按钮
				} 
			},
			async goflowNodes(val) {
				//查询流程id
				const {
					data: res
				} = await this.$http.flowNodes({
					params:{
						postId:val,
					}
				})
				if (res.code == 200) {
					this.processId =  res.data.id;
					console.log(this.processId)
				} else {
					this.$message.error(res.msg);
				} 
			},
			goBaseEdit(){
				//编辑基本信息
				this.editBaseShow=true;
			},
			cancelBase(){
				//取消基本信息编辑
				this.getDetail();
				this.editBaseShow=false;
			},
			async saveBase(flag){
				//提交基本信息表单
				//params:this.baseInfoForm
				this.baseInfoForm.headpic='';//头像图片
				this.detailBase={
					id:this.baseInfoForm.id,
					name:this.baseInfoForm.name,
					phone:this.baseInfoForm.phone,
					email:this.baseInfoForm.email,
					workStatus:this.baseInfoForm.workStatus
				}
				var paramsInfo={};
				if(flag==1){
					paramsInfo=this.detailBase;
				}else{
					paramsInfo=this.detailOne;
				}
				if(paramsInfo.name=='' || paramsInfo.name==null || paramsInfo.name==undefined){
					return this.$message.error("应聘者姓名不能为空");
				}else{
					if(paramsInfo.name.length<2 || paramsInfo.name.length>10){
						return this.$message.error("字符长度在2到10");
					}else{
						const {
							data: res
						} = await this.$http.talentUpdateBaseInfor({
							params:paramsInfo
						})
						if (res.code !== 200) {
						    return this.$message.error("提交简历信息失败");
						} else {
							if(flag==1){
								this.cancelBase();
							}else{
								this.cancelEditOne()
							}
							this.getDetail();
							return this.$message.success("简历信息更新成功");
						} 
							
					}
				}
			},
			handleClick() {
				//tab切换
				//console.log(this.activeTab);
			},
			async getOriginalDetail(){
				//查看原始简历
				const {
					data: res
				} = await this.$http.getRawTalentById({
					params:{
						cvId:this.vid
					}
				})
				if (res.code !== 200) {
				    return this.$message.error("获取原始简历失败");
				} else {
					console.log(res.data)
					this.isShowOriginal=true
					if(res.data==null || res.data==''){
						this.$message.error("原始简历为空");
					}
				} 
			},
			async getDetail(){
				//查看标准简历
				const {
					data: res
				} = await this.$http.getTalentById({
					params:{
						cvId:this.cvId,
						postId:this.postId
					}
				})
				if (res.code !== 200) {
				    return this.$message.error("获取标准简历失败");
				} else {
					console.log(res.data)
					this.isShowOriginal=false
					if(res.data==null || res.data==''){
						this.$message.error("标准简历为空");
					}else{
						this.baseInfoForm = res.data;
						
						//是否可以offer审批操作
						if(this.baseInfoForm.interviewCount==0 && this.baseInfoForm.expireCount==0){
							this.approvalOffer=true
						}else{
							this.approvalOffer=false
						}
						//是否可以发送offer操作
						if(this.baseInfoForm.offerCount==0){
							this.sendOfferTrue=true
						}else{
							this.sendOfferTrue=false
						}
						
						this.vid = this.baseInfoForm.vid
						this.goflowNodes(this.postId)
						
						this.postAndCvList=[]
						var item = {cvId:this.cvId, postId:this.postId, postCvId:this.vid}
						this.postAndCvList.push(item)
						//如果没有对应职位
						if(this.baseInfoForm.post==null){
							this.process=[];
						}else{
							this.showProcess();
						}
					}
				} 
			},
			async getDetailTips(flag,id){
				//查询简历信息 1：个人信息 2.求职意向 3.教育背景 4.工作经验 5.证书信息 6.技能 7.培训经历 8.实习经历 9.项目经验 10.获奖情况 11在校职务
				const {
					data: res
				} = await this.$http.getDetailById({
					params:{
						id:id,
						flag:flag
					}
				})
				if (res.code !== 200) {
				    return this.$message.error("获取个人信息失败");
				} else {
					if(flag==1){
						//个人信息
						this.detailOne = res.data;
						console.log(this.detailOne);
					}else if(flag==2){
						//求职意向
						this.detailTwo = res.data;
						this.$set(this.detailTwo,'cvId',this.cvId);
						
					}else if(flag==3){
						//教育背景
						this.detailThree = res.data;
						console.log(this.detailThree);
					}else if(flag==11){
						//在校职务
						this.detailFour = res.data;
						console.log(this.detailFour);
					}else if(flag==8){
						//实习经验
						this.detailFive = res.data;
						console.log(this.detailFive);
					}else if(flag==4){
						//工作经验
						this.detailSix = res.data;
						console.log(this.detailSix);
					}else if(flag==9){
						//项目经验
						this.detailSeven = res.data;
						console.log(this.detailSeven);
					}else if(flag==7){
						//在校职务
						this.detailEight = res.data;
						console.log(this.detailEight);
					}else if(flag==5){
						//在校职务
						this.detailNine = res.data;
						console.log(this.detailNine);
					}else if(flag==6){
						//技能
						this.detailTen = res.data;
						console.log(this.detailTen);
					}else if(flag==10){
						//获奖
						this.detailEleven = res.data;
						console.log(this.detailEleven);
					}        
					
				} 
			},
			goEditOne(){
				//编辑个人信息
				this.editOneShow=true;
				this.getDetailTips(1,this.cvId)
			},
			cancelEditOne(){
				//取消编辑个人信息
				this.editOneShow=false;
			},
			goEditTwo(){
				//编辑求职意向
				this.editTwoShow=true;
				this.getDetailTips(2,this.cvId)
			},
			cancelEditTwo(){
				//取消编辑求职意向
				this.editTwoShow=false;
			},
			async saveIntention(){
				//保存求职意向
				console.log(this.detailTwo)
				const {
					data: res
				} = await this.$http.updateIntention({
					params:this.detailTwo
				})
				if (res.code !== 200) {
				    return this.$message.error("提交求职意向失败");
				} else {
					this.cancelEditTwo();
					this.getDetail();
					return this.$message.success("求职意向更新成功");
				} 
			},
			async getAllIndustry(){
				//获取所有行业数据
				const {
					data: res
				} = await this.$http.getIndustry({
					
				})
				if (res.code !== 200) {
				    return this.$message.error("获取行业数据失败");
				} else {
					console.log(res.data)
					this.industryArr = res.data;
				} 
			},
			getIndustryDataNow(){
				//所属行业回显
				//获取行业数据
				this.getAllIndustry()
				
				//已选重置
				this.checkedIndustryNum=0;
				this.checkedIndustryNow='';
				this.haveCheckedIndustryNow=false;
				
				//判断已选行业数据---现从事行业(单选)
				this.industryNumOk=1
				if(this.detailTwo.workIndustry != null  && this.detailTwo.workIndustry != undefined && this.detailTwo.workIndustry != ''){
					this.checkedIndustryNum=1;
					this.checkedIndustryNow = {id:this.detailTwo.workIndustry,industryName:this.detailTwo.workIndustryName},
					this.haveCheckedIndustryNow=true
				}
				
				this.industryDialogVisibleNow = true;
			},
			getIndustryDataUn(){
				//所属行业回显
				//获取行业数据
				this.getAllIndustry()
				
				//已选重置
				this.checkedIndustryNum=0;
				this.checkedIndustryUn=[];
				
				//判断已选行业数据---期望从事行业(多选)
				this.industryNumOk=20
				console.log(this.detailTwo.expectIndustry)
				if(this.detailTwo.expectIndustry != null && this.detailTwo.expectIndustry != undefined && this.detailTwo.expectIndustry != ''){
					this.checkedIndustryId = this.detailTwo.expectIndustry.split(',')
					this.checkedIndustryName = this.detailTwo.expectIndustryName.split(',')
					console.log(this.checkedIndustryId)
					this.checkedIndustryNum=this.checkedIndustryId.length;
					
					this.checkedIndustryId.forEach((itemId,index)=>{
						var item = {id:itemId,industryName:this.checkedIndustryName[index]}
						this.checkedIndustryUn.push(item) 
					})
				}
				
				this.industryDialogVisibleUn = true;
			},
			handlecheckedIndustryChangeNow(item){
				//行业选择改变
				//已选重置
				this.checkedIndustryNum=0;
				this.checkedIndustryNow='';
				//现在从事行业，单选
				this.checkedIndustryNum=1;
				this.checkedIndustryNow = {id:item.id,industryName:item.industryName},
				
				this.haveCheckedIndustryNow=true
			},
			handlecheckedIndustryChangeUn(val){
				//行业选择改变
				//已选重置
				this.checkedIndustryNum=0;
				this.checkedIndustryUn=[];
				
				//期望从事行业，多选
				this.checkedIndustryNum=val.length;
				if(val.length!=0){
					val.forEach((itemName,index)=>{
						this.industryArr.forEach((item,index)=>{
							if(item.industryName==itemName){
								var item = {id:item.id,industryName:itemName}
								this.checkedIndustryUn.push(item) 
							}
						})
					})
				}
			},
			closeIndustryDialogNow(flag){
				//flag: 0取消按钮  1 保存按钮
				
				//关闭行业弹框
				if(flag==1){
					//现为从事行业
					this.detailTwo.workIndustry = this.checkedIndustryNow.id;
					this.detailTwo.workIndustryName = this.checkedIndustryNow.industryName;
				this.haveCheckedIndustryNow=false;
				} 
				console.log(this.checkedIndustryNow)
				console.log(this.detailTwo)
				this.industryDialogVisibleNow = false;
			},
			closeIndustryDialogUn(flag){
				//flag: 0取消按钮  1 保存按钮
				
				//关闭行业弹框
				if(flag==1){
					//期待从事行业
					this.detailTwo.expectIndustry=''
					this.detailTwo.expectIndustryName=''
					console.log(this.checkedIndustryUn)
					this.checkedIndustryUn.forEach((item,index)=>{
						console.log(index)
						if(index==0){
							this.detailTwo.expectIndustry = item.id;
							this.detailTwo.expectIndustryName = item.industryName;
						}else{
							this.detailTwo.expectIndustry = this.detailTwo.expectIndustry+','+item.id;
							this.detailTwo.expectIndustryName = this.detailTwo.expectIndustryName+','+item.industryName;
						}
						
					})
				}
				this.industryDialogVisibleUn = false;
			},
			delCheckedIndustryNow(){
				this.checkedIndustryNum=0;
				this.checkedIndustryNow=''
				this.haveCheckedIndustryNow=false;
			},
			delCheckedIndustryUn(item){
				this.checkedIndustryNum--;
				this.checkedIndustryUn.forEach((itemArr,index)=>{
					if(item.id == itemArr.id){
						this.checkedIndustryUn.splice(index,1)
					}
				}) 
				//checkbox回显
				this.checkedIndustryName=[]
				this.checkedIndustryId=[]
				this.checkedIndustryUn.forEach((item,index)=>{
					this.checkedIndustryName.push(item.industryName)
					this.checkedIndustryId.push(item.id)
				}) 
				
			},
			openPosition(flag){
				//1:现在从事职业  2：期望从事职业 
				this.positionFlag = flag;
				
				//打开弹框第一次查询
				this.positionDialogVisible = true;
				this.getPositionData(0)
				
				//首次回显
				if(this.positionFlag==1){
					//判断已选职业数据---现从事职业(单选)
					if(this.detailTwo.workPosition != null ){
						this.haveCheckedPosition=true;
						this.checkedPositionNum=1;
						this.checkedPosition = {id:this.detailTwo.workPosition,positionTypeName:this.detailTwo.workPositionName,checkedVal:true}
					}else{
						this.haveCheckedPosition=false;
						this.checkedPositionNum=0;
						this.checkedPosition='';
					}
				}else{
					//判断已选职业数据---期望从事职业(单选)
					if(this.detailTwo.expectPosition != null ){
						this.haveCheckedPosition=true;
						this.checkedPositionNum=1;
						this.checkedPosition = {id:this.detailTwo.expectPosition,positionTypeName:this.detailTwo.expectPositionName,checkedVal:true}
					}else{
						this.haveCheckedPosition=false;
						this.checkedPositionNum=0;
						this.checkedPosition='';
					}
				} 
				
			},
			async getAllPosition(){
				//获取所有职业数据
				const {
					data: res
				} = await this.$http.getPositiony({
					params:{
						pid:this.pid
					}
				})
				if (res.code !== 200) {
				    return this.$message.error("获取职业数据失败");
				} else {
					//展示的选项
					if(res.data.length!=0){
						this.havechildren=true
						this.positionArr = res.data;
					}else{
						//没有子节点数据
						this.havechildren=false
					}
				}
			},
			async getPositionData(flag,val,add){
				//flag: 0普通查询 1是子节点查询
				//val flag=0('')  flag=1(item)
				//add：false则面包屑导航减少
				if(flag==0){
					this.clickPosition=[{id:0,positionTypeName:'全部'}];
					this.pid=0;
					this.getAllPosition()
					
				}else{
					//子节点查询
					this.pid = val.id;
					this.getAllPosition()
					setTimeout(() => {
						if(this.havechildren==true){
							if(add!=false){
								this.clickPosition.push({id:val.id,positionTypeName:val.positionTypeName})
							}
						}
					},200);
					
				}
				
			},
			toBreadcrumb(item,index){
				//go对应的面包屑
				this.clickPosition=this.clickPosition.splice(0,index+1)
				if(this.clickPosition.length==1){
					//普通查询
					this.getPositionData(0)
				}else{
					//子节点查询,面包屑减少
					this.getPositionData(1,item,false)
				} 
			},
			closePositionDialog(flag){
				//flag: 0取消按钮  1 保存按钮
				//关闭职业弹框
				if(flag==1){
					if(this.positionFlag==1){
						//1现为从事职业
						if(this.checkedPositionNum!=0){
							this.detailTwo.workPosition = this.checkedPosition.id;
							this.detailTwo.workPositionName = this.checkedPosition.positionTypeName;
						}else{
							this.detailTwo.workPosition = '';
							this.detailTwo.workPositionName = '';
						}
						
					}else{
						//2期待从事职业
						if(this.checkedPositionNum!=0){
							this.detailTwo.expectPosition = this.checkedPosition.id;
							this.detailTwo.expectPositionName = this.checkedPosition.positionTypeName;
						}else{
							this.detailTwo.expectPosition = '';
							this.detailTwo.expectPositionName = '';
						}
					}
					
				}
				this.positionDialogVisible = false;
			},
			handlecheckedPositionChange(item){
				//职业选择改变
				this.checkedPosition={};
				this.checkedPosition={id:item.id,positionTypeName:item.positionTypeName};
				this.checkedPositionNum=1;
				this.haveCheckedPosition=true
			},
			delCheckedPosition(){
				this.checkedPositionNum=0;
				this.checkedPosition={};
				this.haveCheckedPosition=false
			},
			goEditThree(flag,id){
				//编辑教育背景
				//flag: 1、编辑 2、添加
				if(this.editThreeShow==true){
					this.$alert('当前正处于编辑状态中，请保存或取消之后再次操作编辑', '提示', {
					  type:'warning',
					  confirmButtonText: '确定'
					});
				}else{
					if(flag==1){
						this.getDetailTips(3,id);
						this.editThreeFlag=1;
					}else{
						this.detailThree={}
						this.editThreeFlag=2;
					}
					this.editThreeShow=true;
				}
				
			},
			async editEdu(){
				//保存教育背景
				if(this.editThreeFlag==2){
					//添加保存
					this.$set(this.detailThree,'cvId',this.cvId);
				}
				console.log(this.detailThree)
				const {
					data: res
				} = await this.$http.updateEdu({
					params:this.detailThree
				})
				if (res.code !== 200) {
				    return this.$message.error("提交教育背景数据失败");
				} else {
					this.editThreeShow=false;
					this.getDetail()
					return this.$message.success("教育背景数据更新成功");
				} 
				
			},
			cancelEditThree(){
				//取消编辑教育背景
				this.editThreeShow=false;
			},
			async goDelete(id,flag){
				//id:相关模块id
				//flag:1教育背景；2工作经验；3培训经历；4证书；5技能；6实习；7项目经验；8获奖记录 9在校职务
				var res = await this.$confirm(
				    "此操作将永久删除该条信息, 是否继续?",
				    "提示",
				    {
				        confirmButtonText: "确定",
				        cancelButtonText: "取消",
				        type: "warning"
				    }
				).catch(() => {
				    this.$message({
				        type: "info",
				        message: "已取消删除"
				    });
				});
				if (res === "confirm") {
					const {
						data: res
					} = await this.$http.delBaseTalent({
						params:{
							id:id,
							flag:flag
						}
					})
					if (res.code !== 200) {
						return this.$message.error("提交删除失败");
					} else {
						this.getDetail()
						return this.$message.success("提交删除成功");
					} 
				}
			},
			goEditFour(flag,id){
				//编辑在校职务
				//flag: 1、编辑 2、添加
				if(this.editFourShow==true){
					this.$alert('当前正处于编辑状态中，请保存或取消之后再次操作编辑', '提示', {
					  type:'warning',
					  confirmButtonText: '确定'
					});
				}else{
					if(flag==1){
						this.getDetailTips(11,id);
						this.editFourFlag=1;
					}else{
						this.detailFour={}
						this.editFourFlag=2;
					}
					this.editFourShow=true;
				}
				
			},
			async editSchoolPosition(){
				//保存在校职务
				if(this.editFourFlag==2){
					//添加保存
					this.$set(this.detailFour,'cvId',this.cvId);
				}
				console.log(this.detailFour)
				const {
					data: res
				} = await this.$http.updateSchool({
					params:this.detailFour
				})
				if (res.code !== 200) {
				    return this.$message.error("提交在校职务数据失败");
				} else {
					this.editFourShow=false;
					this.getDetail()
					return this.$message.success("在校职务数据更新成功");
					
				} 
				
			},
			cancelEditFour(){
				//取消编辑在校职务
				this.editFourShow=false;
			},
			goEditFive(flag,id){
				//编辑实习经验
				//flag: 1、编辑 2、添加
				if(this.editFiveShow==true){
					this.$alert('当前正处于编辑状态中，请保存或取消之后再次操作编辑', '提示', {
					  type:'warning',
					  confirmButtonText: '确定'
					});
				}else{
					if(flag==1){
						this.getDetailTips(8,id);
						this.editFiveFlag=1;
					}else{
						this.detailFive={}
						this.editFiveFlag=2;
					}
					this.editFiveShow=true;
				}
				
			},
			async editInternship(){
				//保存实习经验
				if(this.editFiveFlag==2){
					//添加保存
					this.$set(this.detailFive,'cvId',this.cvId);
				}
				console.log(this.detailFive)
				const {
					data: res
				} = await this.$http.updatePracti({
					params:this.detailFive
				})
				if (res.code !== 200) {
				    return this.$message.error("提交实习经历数据失败");
				} else {
					this.editFiveShow=false;
					this.getDetail()
					return this.$message.success("实习经历数据更新成功");
					
				} 
				
			},
			cancelEditFive(){
				//取消编辑在校职务
				this.editFiveShow=false;
			},
			goEditSix(flag,id){
				console.log(flag)
				//编辑工作经验
				//flag: 1、编辑 2、添加
				if(this.editSixShow==true){
					this.$alert('当前正处于编辑状态中，请保存或取消之后再次操作编辑', '提示', {
					  type:'warning',
					  confirmButtonText: '确定'
					});
				}else{
					if(flag==1){
						this.getDetailTips(4,id);
						this.editSixFlag=1;
					}else{
						this.detailSix={}
						this.editSixFlag=2;
					}
					this.editSixShow=true;
				}
				
			},
			async editJobExperience(){
				//保存工作经验
				if(this.editSixFlag==2){
					//添加保存
					this.$set(this.detailSix,'cvId',this.cvId);
				}
				console.log(this.detailSix)
				const {
					data: res
				} = await this.$http.updateWork({
					params:this.detailSix
				})
				if (res.code !== 200) {
				    return this.$message.error("提交工作经验数据失败");
				} else {
					this.editSixShow=false;
					this.getDetail()
					return this.$message.success("工作经验数据更新成功");
					
				} 
				
			},
			cancelEditSix(){
				//取消编辑工作经验
				this.editSixShow=false;
			},
			goEditSeven(flag,id){
				console.log(flag)
				//编辑项目经验
				//flag: 1、编辑 2、添加
				if(this.editSevenShow==true){
					this.$alert('当前正处于编辑状态中，请保存或取消之后再次操作编辑', '提示', {
					  type:'warning',
					  confirmButtonText: '确定'
					});
				}else{
					if(flag==1){
						this.getDetailTips(9,id);
						this.editSevenFlag=1;
					}else{
						this.detailSeven={}
						this.editSevenFlag=2;
					}
					this.editSevenShow=true;
				}
				
			},
			async editProExperience(){
				//保存项目经验
				if(this.editSevenFlag==2){
					//添加保存
					this.$set(this.detailSeven,'cvId',this.cvId);
				}
				console.log(this.detailSeven)
				const {
					data: res
				} = await this.$http.updateProject({
					params:this.detailSeven
				})
				if (res.code !== 200) {
				    return this.$message.error("提交项目经验数据失败");
				} else {
					this.editSevenShow=false;
					this.getDetail()
					return this.$message.success("项目经验数据更新成功");
					
				} 
				
			},
			cancelEditSeven(){
				//取消编辑工作经验
				this.editSevenShow=false;
			},
			goEditEight(flag,id){
				console.log(flag)
				//编辑培训经历
				//flag: 1、编辑 2、添加
				if(this.editEightShow==true){
					this.$alert('当前正处于编辑状态中，请保存或取消之后再次操作编辑', '提示', {
					  type:'warning',
					  confirmButtonText: '确定'
					});
				}else{
					if(flag==1){
						this.getDetailTips(7,id);
						this.editEightFlag=1;
					}else{
						this.detailEight={}
						this.editEightFlag=2;
					}
					this.editEightShow=true;
				}
				
			},
			async editTrain(){
				//保存培训经历
				if(this.editEightFlag==2){
					//添加保存
					this.$set(this.detailEight,'cvId',this.cvId);
				}
				console.log(this.detailEight)
				const {
					data: res
				} = await this.$http.updateTrain({
					params:this.detailEight
				})
				if (res.code !== 200) {
				    return this.$message.error("提交培训经历数据失败");
				} else {
					this.editEightShow=false;
					this.getDetail()
					return this.$message.success("培训经历数据更新成功");
					
				} 
				
			},
			cancelEditEight(){
				//取消编辑培训经历
				this.editEightShow=false;
			},
			goEditNine(flag,id){
				console.log(flag)
				//编辑证书
				//flag: 1、编辑 2、添加
				if(this.editNineShow==true){
					this.$alert('当前正处于编辑状态中，请保存或取消之后再次操作编辑', '提示', {
					  type:'warning',
					  confirmButtonText: '确定'
					});
				}else{
					if(flag==1){
						this.getDetailTips(5,id);
						this.editNineFlag=1;
					}else{
						this.detailNine={}
						this.editNineFlag=2;
					}
					this.editNineShow=true;
				}
				
			},
			async editCert(){
				//保存证书
				if(this.editNineFlag==2){
					//添加保存
					this.$set(this.detailNine,'cvId',this.cvId);
				}
				console.log(this.detailNine)
				const {
					data: res
				} = await this.$http.updateCert({
					params:this.detailNine
				})
				if (res.code !== 200) {
				    return this.$message.error("提交证书数据失败");
				} else {
					this.editNineShow=false;
					this.getDetail()
					return this.$message.success("证书数据更新成功");
					
				} 
				
			},
			cancelEditNine(){
				//取消编辑证书
				this.editNineShow=false;
			},
			goEditTen(flag,id){
				console.log(flag)
				//编辑技能
				//flag: 1、编辑 2、添加
				if(this.editTenShow==true){
					this.$alert('当前正处于编辑状态中，请保存或取消之后再次操作编辑', '提示', {
					  type:'warning',
					  confirmButtonText: '确定'
					});
				}else{
					if(flag==1){
						this.getDetailTips(6,id);
						this.editTenFlag=1;
					}else{
						this.detailTen={}
						this.editTenFlag=2;
					}
					this.editTenShow=true;
				}
				
			},
			async editSkill(){
				//保存技能
				if(this.editTenFlag==2){
					//添加保存
					this.$set(this.detailTen,'cvId',this.cvId);
				}
				console.log(this.detailTen)
				const {
					data: res
				} = await this.$http.updateSkill({
					params:this.detailTen
				})
				if (res.code !== 200) {
				    return this.$message.error("提交技能数据失败");
				} else {
					this.editTenShow=false;
					this.getDetail()
					return this.$message.success("技能数据更新成功");
					
				} 
				
			},
			cancelEditTen(){
				//取消编辑技能
				this.editTenShow=false;
			},
			goEditEleven(flag,id){
				console.log(flag)
				//编辑获奖
				//flag: 1、编辑 2、添加
				if(this.editElevenShow==true){
					this.$alert('当前正处于编辑状态中，请保存或取消之后再次操作编辑', '提示', {
					  type:'warning',
					  confirmButtonText: '确定'
					});
				}else{
					if(flag==1){
						this.getDetailTips(10,id);
						this.editElevenFlag=1;
					}else{
						this.detailEleven={}
						this.editElevenFlag=2;
					}
					this.editElevenShow=true;
				}
				
			},
			async editPrize(){
				//保存获奖情况
				if(this.editElevenFlag==2){
					//添加保存
					this.$set(this.detailEleven,'cvId',this.cvId);
				}
				console.log(this.detailEleven)
				const {
					data: res
				} = await this.$http.updatePrize({
					params:this.detailEleven
				})
				if (res.code !== 200) {
				    return this.$message.error("提交获奖数据失败");
				} else {
					this.editElevenShow=false;
					this.getDetail()
					return this.$message.success("获奖数据更新成功");
					
				} 
				
			},
			cancelEditEleven(){
				//取消编辑获奖
				this.editElevenShow=false;
			},
		},
		mounted() {
		  
		},
		created() {
			this.cvId = this.$route.params.cvId;//获取简历ID
			if(this.$route.params.postId=='noPost'){
				this.postId =''
			}else{
				this.postId = this.$route.params.postId;//获取职位ID
			}
			this.getDetail();
		}
	}
</script>

<style lang="scss">
	.header{
		position: relative;
		flex-direction: column;
		height: 100%;
		box-sizing: border-box;
		padding: 4px 10px;
		height: 100px;
		border-radius: 10px 10px 5px 5px;
		background: linear-gradient(to right, #2282E3, #DDEFFF);
	}
	.header-inner{
		position: absolute;
		top: 4px;
		left: 0;
		width: 100%;
		height: calc(100% - 4px);
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: #FFF;
		padding: 0 20px 0 20px;
		box-sizing: border-box;
		border-radius: 10px 10px 5px 5px;
		.name{
			display: inline-block;
			font-family: PingFangSC-Medium;
			font-size: 28px;
			color: #040405;
			letter-spacing: 0;
			text-align: justify;
			margin-right: 5px;
			vertical-align: middle;
			line-height: 96px;
		}
		.id{
			font-size: 14px;
			color: rgba(90,100,107,0.9);
			letter-spacing: 0;
			text-align: justify;
			line-height: 24px;
			margin-right: 20px;
			vertical-align: middle;
		}
		.num{
			display: inline-block;
			height: 20px;
			line-height: 20px;
			padding: 0 5px 0 7px;
			color: #0095FF;
			font-size: 12px;
			text-align: center;
			border: 1px solid #0095FF;
			border-radius: 4px;
			box-sizing: border-box;
			margin-right: 5px;
			vertical-align: middle;
			margin-left: 20px;
			cursor: pointer;
			b{
				font-weight: normal;
			}
		}
		.positionSelect{
			float: right;
			margin-top: 28px;
		}
	}
	.detail{
		width: 100%;
		margin-top: 10px;
		.detail_l{
			width: 280px;
			float: left;
			.baseInfo{
				background: #fff;
				width: 100%;
				margin-bottom: 10px;
				border-radius: 5px;
				box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
				.baseHeader{
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					height: 44px;
					line-height: 44px;
					box-sizing: border-box;
					padding: 0 10px;
					border-bottom: 0.5px dashed #E6F2FF;
					.title {
					    display: flex;
					    align-items: center;
						.line {
						    align-items: center;
						    width: 4px;
						    height: 14px;
						    background: #2282E3;
						    border-radius: 3px;
						    margin-right: 6px;
						}
						.txt{
							font-family: PingFangSC-Medium;
							font-size: 14px;
							color: #5A646B;
						}
					}
					.editbutton {
						display: inline-block;
						cursor: pointer;
						.txt{
							font-size: 12px;
							color: #0095FF;
							line-height: 20px;
							margin-left: 5px;
						}
					}
				}
				.baseUl{
					padding: 0 14px;
					font-size: 12px;
					color: #5A646B;
					li{
						width:100%;
						height: 30px;
						line-height: 30px;
						.baseUl-tips{
							display: inline-block;
							width: 65px;
							text-align: right;
							float: left;
						}
						.baseUl-txt{
							display: inline-block;
							width: 157px;
							float: left;
						}
					}
				}
				
			}
		}
		.detail_c{
			width: calc(100% - 420px);
			height: 200px;
			float: left;
			margin: 0 10px;
			.processDetail{
				background: #fff;
				padding: 20px 35px;
				width: 100%;
				box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
				margin-bottom: 10px;
				border-radius: 5px;
			}
			.detailMain{
				background: #fff;
				padding: 20px 35px;
				width: 100%;
				box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
				border-radius: 5px;
			}
		}
		.detail_r{
			width: 120px;
			background: #fff;
			float: right;
			padding: 0 15px;
			
		}
	}
	
	.baseForm{
		padding: 0 14px;
		.el-form-item{
			margin-bottom: 16px;
			.el-form-item__label {
				font-size: 12px;
				color: #5A646B;
				line-height: 30px;
				width:65px;
				text-align: right;
				padding-right: 7px;
			}
			.el-form-item__content {
				font-size: 12px;
				color: #5A646B;
				line-height: 30px;
				width: 157px;
			}
			.el-input__inner {
				height: 30px;
				line-height: 30px;
			}
			.el-input__icon {
				line-height: 30px;
			}
			.el-button{
				width: 44px;
				height: 26px;
				padding: 0;
				font-size: 12px;
			} 
		}
	}
	
	.processDetail .el-step__title {
	    font-size: 15px;
	}
	.standardsTxt .el-divider__text{
		color: #1496c8;
		font-weight: bold;
	}
	.detail{
		width: 100%;
		.detail_main{
			padding-left: 40px;
			.detailUl{
				width: calc(100% - 150px);
				float: left;
				li{
					width: 50%;
					line-height: 30px;
					float: left;
					font-size: 12px;
					color: #5A646B;
					span:nth-child(1){
						float: left;
						display: inline-block;
						width: 120px;
						padding-right: 10px;
						text-align: right;
					}
					span:nth-child(2){
						float: left;
						display: inline-block;
						width: calc(80% - 120px);
					}
				}
				li.line{
					width: 100%;
				}
			}
			.detailRight{
				width: 150px;
				float: right;
				.imgBox{
					width: 120px;
					height: 150px;
					margin-top: 30px;
				}
			}
			.detailForm{
				width: calc(100% - 150px);
				float: left;
			}
		}
	}
	
	
	.option{
		width: 120px;
		color: #1496c8;
		text-align: right;
		span{
			margin-left: 12px;
		}
	}
	
	.majorDialog_l{
		float: left;
		width: 400px;
		padding: 10px;
		height: 320px;
		overflow-y: scroll;
		border-right: 1px solid #cbcccb;
		.el-radio-group{
			width: 100%;
			.el-radio{
				width: 50%;
				height: 18px;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				float: left;
				margin-right: 0;
				margin-bottom: 10px;
			}
		}
		.el-checkbox{
			width: 50%;
			height: 18px;
			float: left;
			margin-right: 0;
			margin-bottom: 10px;
			.el-checkbox__label{
				width: calc(100% - 40px);
				height: 18px;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				vertical-align: -4px;
			}
		}
		
	}
	.majorDialog_r{
		float: left;
		width: 238px;
		padding: 10px;
		height: 320px;
	}
	.checkedBox{
		width: 100%;
		span{
			float: left;
			margin: 10px 10px 0 0;
			padding: 0 4px;
			background: #fff0d2;
			line-height: 24px;
			border-radius: 2px;
			b{
				font-weight: normal;
				display: inline-block;
				margin-left: 5px;
			}
		}
	}
	
	.radioLabel{
		display:inline-block;
		width: 50%;
		margin-bottom:8px;
	}
	
	.formTips1_radio1{
		width: 12px;
		height: 12px;
		border: 1px #ccc solid;
		border-radius: 50%;
		margin-right: 4px;
		vertical-align: -1px;
	}
	.positionTab{
		width: 100%;
		margin-bottom: 10px;
		float: left;
		.positionTips{
			float: left;
			span{
				color: #1496c8;
				padding: 0 10px;
			}
			
		}
	}
	.detailAddTips{
		padding: 10px;
		border-bottom: 1px #DCDFE6 dashed;
	}
	.detailAddTips-div1{
		width: 100%;
		height: 30px;
		color: #333;
		font-weight: bold;
		.detailAddTips-p{
			float: left;
			width: 180px;
			line-height: 20px;
		}
	}
	.addButton{
		margin: 15px 0;
	}
</style>
