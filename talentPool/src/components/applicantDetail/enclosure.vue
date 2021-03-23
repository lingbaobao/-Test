<template><!--下载文件-->
	<div>
		<button class="uploadBtn">
			上传文件
			<input type="file" id="fileExport" @change="toUpload" ref="inputer" class="uploadIn" accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,.wps,.xls,.html"  />
		</button>
		<p class="uploadTips">文件大小不能超过2M，且仅支持（png,jpg,jpeg,pdf,doc,docx,wps,xls,html）格式</p>
		<!--png,jpg,jpeg,pdf,doc,docx,wps,xls-->
		<div>
			<el-table
				:data="fileList"
				style="width: 100%">
					<el-table-column label="文件名" prop="enclosureName"></el-table-column>
					<el-table-column label="职位" prop="postName"></el-table-column>
					<el-table-column label="添加人" prop="userName"></el-table-column>
					<el-table-column label="添加时间" prop="insertTime"></el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" @click="toDelete(scope.row.id)">删除</el-button>
							<el-button size="mini" type="success" @click="toDownload(scope.row.enclosurePath)">下载</el-button>
						</template>
					</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'enclosureVue',
		props:['cvId','vid'],
		data() {
			return{
				fileList:[],//附件列表
			}
		},
		methods: {
			async getAllFileList(){
				const {
					data: res
				} = await this.$http.getFileList({
					params:{
						cvId:this.cvId,
						vid:this.vid
					}
				})
				if (res.code !== 200) {
				    return this.$message.error("附件列表数据失败");
				} else {
					console.log(res.data)
					this.fileList=res.data;
					
				} 
			},
			async toDelete(id){
				//删除文件
				const {
					data: res
				} = await this.$http.deleteFile({
					params:{
						id:id
					}
				})
				if (res.code !== 200) {
				    return this.$message.error("该文件删除失败");
				} else {
					this.getAllFileList()
					return this.$message.success("该文件删除成功");
				} 
			},
			toDownload(path){
				window.location.href="http://192.168.10.62:6060/talent/download?path="+path
			},
			async toUpload(e) {
				let inputDOM = this.$refs.inputer;
				this.file = inputDOM.files[0]; // 通过DOM取文件数据
				let size = Math.floor(this.file.size / 1024); //计算文件的大小　
				var formData = new FormData(); //new一个formData事件
				formData.append("file", this.file); //将file属性添加到formData里
				//此时formData就是我们要向后台传的参数了
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
				const {
					data: res
				} = await this.$http.uploadFile(this.cvId,formData, config)
				
				if (res.code !== 200) {
				    return this.$message.error(res.msg);
				} else {
					this.getAllFileList()
					return this.$message.success("上传附件成功");
				} 
			},
			
		},
		created() {
			this.getAllFileList()
		}
	}	
		
</script>

<style lang="scss" scoped="scoped">
	.uploadBtn{
		margin-top: 10px;
		width:90px;
		height: 40px;
		border: none;
		outline: none;
		border-radius: 5px;
		line-height: 40px;
		background: #409EFF;
		color: #fff;
		position: relative;
		.uploadIn{
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			opacity: 0;
		}
	}
	.uploadTips{
		margin-top: 6px;
		color: red;
	}
</style>
