<template>
	<div class="wrapper">
		<div class="content-wrap-mini addDiv">
			<el-divider content-position="left" class="divider-main">新建应聘者</el-divider>
			<el-form :model="addForm" :rules="addFormRules"  class="form-wrap1">
				<el-form-item label="新建方式:">
				    <el-radio-group v-model="addType">
				    	<el-radio :label="1">导入文件</el-radio>
						<el-radio :label="2">手动填写</el-radio>
				    </el-radio-group>
				</el-form-item>
				<div class="addFile_div" v-show="addType==1">
					<p>上传文件：</p>
					<el-upload
					  class="upload-demo"
					  drag
					  action="1111"
					  :limit="1"
					  :before-upload="beforeUploadApplicants"
					  multiple>
					  <ul class="fileTips" v-show="addForm.file!=''">
						  <li>{{addForm.file.name}}<i class="el-icon-close" @click.stop="delFile"></i></li>
					  </ul>
					  <i class="el-icon-upload"></i>
					  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					  <div class="el-upload__text" style="color: #bababb;font-size: 12px; margin-top: 8px;">支持扩展名为DOC HTML</div>
					</el-upload>
				</div>
				<div v-show="addType==2">
					<el-form-item label="姓名:" prop="userName">
						<el-input v-model="addForm.userName"></el-input>
					</el-form-item>
					<el-form-item label="手机号:" prop="mobile">
						<el-input type="number" v-model="addForm.mobile"></el-input>
					</el-form-item>
					<el-form-item label="电子邮箱:" prop="email">
						<el-input v-model="addForm.email"></el-input>
					</el-form-item>
				</div>
				<el-form-item label="关联位置:">
					<p style="color: #bababb;font-size: 12px;">职位和人才库请至少设置一项</p>
				</el-form-item>
				<el-form-item label="职位" prop="postId">
					<template>
						<el-select v-model="addForm.postId">
							<el-option
							v-for="item in positionList"
							:key="item.id"
							:label="item.postName"
							:value="item.id">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="人才库:" prop="postId">
				   <el-select v-model="addForm.stockTypeId" placeholder="请选择">
						<el-option v-for="(item,index) in stocks" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="渠道名称:" prop="channelName" style="position: relative;">
					<el-select v-model="addForm.channelName" placeholder="请选择">
						 <el-option v-for="(item,index) in channelList" :key="index" :label="item.name" :value="item.channelName"></el-option>
					</el-select>
					<span style="color:red;position: absolute;right: -45px;" @click="addChannel">新增+</span>
				   <!-- <el-input ref="channelInput" v-model="addForm.channelName" @focus="chooseChannel" @change=""></el-input>
				   <ul class="channelList_ul" v-show="channelShow==true">
					   <li v-for="(item,index) in channelList" @click="chooseName(item.channelName)">{{item.channelName}}</li>
				   </ul> -->
				</el-form-item>
			</el-form>
			<div style="margin-left: 108px; margin-top: 20px;">
				<el-button type="primary" @click="submitForm">确 定</el-button>
				<el-button type="info" @click="goApplicantList">取 消</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			var checkMobile = (rule, value, callback) => {
				const regMobile = /^1[3456789]\d{9}$/.test(value);
				if (regMobile) {
					callback();
				} else {
					return callback(new Error('手机号格式不正确'));
				}
			};
			var checkEmail = (rule, value, callback) => {
			  const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
			  if (!value) {
			    return callback(new Error("邮箱不能为空"));
			  }
			  setTimeout(() => {
			    if (mailReg.test(value)) {
			      callback();
			    } else {
			      callback(new Error("请输入正确的邮箱格式"));
			    }
			  }, 100);
			};
			return {
				addForm:{//添加表单
					file:'',
					postId:'',
					stockTypeId:'',
					channelName:'',
					userName:'',
					mobile:'',
					email:''
				},
				addFormRules:{
					userName: [
						{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
						{ min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
					],
					mobile: [
						{
							required: true,
							message: '请输入手机号',
							trigger: 'blur'
						},
						{
							validator: checkMobile,
							trigger: 'blur'
						},
					],
					email: [
						{
							required: true,
							message: '请输入邮件',
							trigger: 'blur'
						},
						{
							validator: checkEmail,
							trigger: 'blur'
						},
					],
					channelName: [
						{
							required: true,
							message: '请输入渠道名称',
							trigger: 'blur'
						}
					],
				},
				addType:1,
				position:[],//职位
				stocks:[
					{
						id:0,
						name:'未分类'
					},
					{
						id:1,
						name:'人才公海'
					},{
						id:2,
						name:'精英库'
					},{
						id:3,
						name:'基础'
					}
				],//人才库
				channelShow:false,
				positionList:[],//职位列表
				channelList:[],
			}
		},
		methods:{
			beforeUploadApplicants(file) {
				this.addForm.file = file;//添加文件
				console.log(this.addForm.file)
				return false//屏蔽了action的默认上传
			},
			delFile(){
				this.addForm.file = '';
			},
			// 查询职务列表
			async findPositionList() {
				const {
					data: res
				} = await this.$http.getTemplateList()
			
				if (res.code == 200) {
					this.positionList = res.data
				} else {
					this.$message.error(res.msg);
				}
			},
			chooseChannel(){
				//选择渠道
				this.channelShow=true
			},
			// 查询渠道列表
			async channelSourceAll(){
				const {
					data: res
				} = await this.$http.channelSourceAll()
			
				if (res.code == 200) {
					this.channelList = res.data
				} else {
					this.$message.error(res.msg);
				}
			},
			chooseName(val){
				console.log(val)
				this.channelShow=false;
				this.$refs.channelInput.blur();
				this.addForm.channelName=val
			},
			addChannel(){
				this.$router.push({
				    path:"/set/channel/list"
				})
			},
			async submitForm(){
				//1、文件导入  2、手动填写
				var formOk = true
				if(this.addType==1){
					this.addForm.userName = ''
					this.addForm.mobile = ''
					this.addForm.email = ''
					if(this.addForm.file == ''){
					    this.$message.error("请导入简历文件");
					    formOk=false
						return false
					}
				}else if(this.addType==2){
					this.addForm.file = ''
					if(this.addForm.userName == ''){
					    this.$message.error("请输入姓名");
					    formOk=false
						return false
					}
					if(this.addForm.mobile == ''){
					    this.$message.error("请输入手机号");
					    formOk=false
						return false
					}
					if(this.addForm.email == ''){
					    this.$message.error("请输入邮件");
					    formOk=false
						return false
					}
				}
				if(this.addForm.channelName == ''){
				    this.$message.error("请选择渠道");
				    formOk=false
					return false
				}
				//职位和人才库二选一
				if(this.addForm.postId == '' && this.addForm.stockTypeId==''){
					this.$message.error("职位和人才库请至少设置一项");
					formOk=false
					return false
				}
				if(formOk==true){
					if(this.addType==1){
						var formData = new FormData();
						for(let key in this.addForm){
						    formData.append(key,this.addForm[key]);	
						}
						
						let config = {headers: {'Content-Type': 'multipart/form-data'}}
						
						const { data: res } = await this.$http.importApplicants(formData,config);
						if (res.code !== 200) {
						    return this.$message.error(res.msg);
						} else {
							this.$message.success("新建应聘者成功");
							this.goApplicantList()
						}
					}else if(this.addType==2){
						const { data: res } = await this.$http.addManually(this.addForm)
						if (res.code !== 200) {
						    return this.$message.error(res.msg);
						} else {
							this.$message.success("新建应聘者成功");
							this.goApplicantList()
						}
					}
				}
			},
			goApplicantList(){
				this.$router.push({
				    path:"/applicant/applicantList"
				})
			}
		},
		created() {
			this.findPositionList()
			this.channelSourceAll()
		}
	}
</script>

<style lang="scss">
	.addFile_div{
		clear: both;
		overflow: hidden;
		font-size: 14px;
		color: #606266;
		p{
			line-height: 30px;
			width: 108px;
			text-align: right;
			float: left;
			    
		}
	}
	.fileTips{
		li{
			width: 100%;
			background: powderblue;
			margin-bottom: 10px;
			height: 26px;
			line-height: 26px;
			text-align: left;
			padding: 0 15px;
			color: #666;
			i{
				float: right;
				margin-top: 6px;
			}
		}
	}
	.addDiv{
		.el-upload-dragger {
		    width: 360px;
			height: auto;
		    min-height: 200px;
			padding: 20px;
		    text-align: center;
		    position: relative;
		}
	}
	.channelList_ul{
		position: absolute;
		left: 0;
		top: 30px;
		width: 200px;
		border: 1px #666 solid;
		li{
			padding: 0 10px;
			line-height: 30px;
			color: #666;
			font-size: 12px;
		}
		li:nth-child(2n+1){
			background: #f1f1f1;
		}
	}
</style>
