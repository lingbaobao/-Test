<template>
	<div class="admin-wrap">
		<div class="topDiv">
			<img src="../assets/images/logo-blue.png" class="logoImg" />
			<el-container class="navBox">
				<el-menu router 
				  :default-active="$route.path"
				  @click="savePath()"
				  class="topNav"
				  mode="horizontal"
				  @select="handleSelect"
				  background-color="#fff"
				  text-color="#333"
				  active-text-color="#1496c8">
					  <el-menu-item index="/index">首页</el-menu-item>
					  <el-menu-item index="/position/list" :class="[$route.path.indexOf('position') != -1 ?'is-active':'']">职位</el-menu-item>
					  <el-menu-item index="/applicant/applicantList" :class="[$route.path.indexOf('applicant') != -1 ?'is-active':'']">应聘者</el-menu-item>
					  <el-menu-item index="/interview/list" :class="[$route.path.indexOf('interview') != -1 ?'is-active':'']">面试</el-menu-item>
					  <el-menu-item index="/talentPool/talentPoolList" :class="[$route.path.indexOf('talentPool') != -1 ?'is-active':'']">人才库</el-menu-item>
					  <el-menu-item index="/set/index" :class="[$route.path.indexOf('set') != -1 ?'is-active':'']">设置</el-menu-item>
					  <el-submenu index="7">
						  <template slot="title">其他</template>
						  <el-menu-item index="7-1">员工管理系统</el-menu-item>
						  <el-menu-item index="7-2">物料管理系统</el-menu-item>
					  </el-submenu>
				</el-menu>
			</el-container> 

			<el-dropdown trigger="click" class="topRight">
				<div class="rightBox">
					<img src="../assets/images/user.jpg" alt class="userImg" />
					<p class="el-dropdown-link">
						<span class="userName">张三</span>
						<i class="el-icon-arrow-down el-icon--right"></i>
					</p>
				</div>
				<el-dropdown-menu slot="dropdown" >
					<el-dropdown-item>
					  <span type="danger">修改密码</span>
					</el-dropdown-item>
					<el-dropdown-item>
					  <span type="danger" @click="logOut">退出登录</span>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
  import '../assets/css/home.scss';

	export default {
	  data() {
		  return{
			  
		  }
	  },
	  methods: {
			//退出登录
			async logOut(){
				const {
					data: res
				} = await this.$http.delRules({params:{id:id}})

				if (res.code == 200) {
					window.location.href="http://sso.wupao.com/sso/quit.do";
				} else {
					this.$message.error(res.msg);
				}
			},
			handleSelect(key, keyPath) {
		        // console.log(keyPath,key);
				// this.$router.push({
				// 	path: keyPath,
				// })
		    },
			//保存激活路径
			savePath(path) {
			//   window.sessionStorage.setItem("activePath", path);
			//   this.activePath = path;
			},
	  },
	  mounted() {
	    
	  },
	  created() {
	    
	  }
	} 
</script>


