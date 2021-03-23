<template>
<div class="content-wrap-mini" style="width: 700px;">
  <!-- <div class="tinymce-editor">
    <editor v-model="myValue"
      :init="initObject"
      @onClick="onClick">
    </editor>
  </div> -->


	<textarea name="" :id="tinymceId" cols="30" rows="15" v-model="myValue" class="tinymceId"></textarea>
</div>
  
</template>
<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
/* import 'tinymce/icons/default/icons' */
// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import 'tinymce/plugins/image'// 插入上传图片插件
import 'tinymce/plugins/media'// 插入视频插件
import 'tinymce/plugins/table'// 插入表格插件
import 'tinymce/plugins/lists'// 列表插件
import 'tinymce/plugins/wordcount'// 字数统计插件


export default {
  components: {
    Editor
  },
  props: {
		msgDetail:{},
		value: {
		  type: String,
		  default: ''
		},
		msgIndex:'',
		destroyEditor:'',
		// 基本路径，默认为空根目录，如果你的项目发布后的地址为目录形式，
		// 即abc.com/tinymce，baseUrl需要配置成tinymce，不然发布后资源会找不到
		baseUrl: {
		  type: String,
		  default: ''
		},
		disabled: {
		  type: Boolean,
		  default: false
		},
		plugins: {
		  type: [String, Array],
		  default: 'lists image media table wordcount'
        },
        toolbar: {
		  type: [String, Array],
		  default: 'undo redo '
		},
  },
  data () {
    return {
		imgBaseUrl:'',
		toolbar2String:'',
		btnsList:[],
		myValue: "",
		initObject:{},
		tinymceId: Date.now(),
		EditorContentA:'',//邮件已替换内容
		EditorContentB:'',//邮件未替换内容
    }
  },
  beforeDestroy () {
		
  },
  created() {
	var _this = this
	setTimeout(() => {
		//配置按钮
		var btnMap = _this.msgDetail.fields;
		btnMap.forEach((item,index)=>{
			var row = {name:item.code, image:item.imgPath, title:item.name}
			_this.btnsList.push(row)
		})	
		_this.btnsList.forEach(item=>{
			if( _this.toolbar2String.length<600 ){
				_this.toolbar2String = _this.toolbar2String + item.name +" " 
			} 
		})
		
		//tinymce初始化
		tinymce.init({
				selector:"#"+this.tinymceId+"",
				language_url: `${this.baseUrl}/tinymce/langs/zh_CN.js`,
				language: 'zh_CN',
				skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide`,
				content_css: `${this.baseUrl}/tinymce/skins/content/default/content.css`,
				height: 300,
				plugins: this.plugins,
				toolbar1: this.toolbar,
				toolbar2: this.toolbar2String,
				branding: false,
				menubar: false,
				// 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
				// 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
				images_upload_handler: (blobInfo, success, failure) => {
				const img = 'data:image/jpeg;base64,' + blobInfo.base64()
				success(img)
				},
				init_instance_callback: editor => {
					editor.on('SetContent', () => {
						this.myValue = editor.getContent()
					})
				},
				setup: (editor) => {
					this.addPlugins(editor);
					setTimeout(() => {
						// 先把邮件里面返回的字符转换成图片
						this.mailDetail.content = this.mailDetail.content.replace(/<% (.*?) %>/g, function(str, match){
							return '<img alt='+match+ ' src="' + match + '" class="'+match+ '"  />'
						})

						//回填邮件内容
						editor.setContent(this.msgDetail.content)
					},200);
				},
		})
	},100);	
  },
mounted() {
	if( this.destroyEditor ){
		setTimeout(() => {
			if(tinymce.editors.length>2){
				tinymce.editors[0].remove();
			}	
		},100);
	}
 },
  methods: {
	  	saveA(){
			this.EditorContentA = ''
			//换图片标签内容
			this.EditorContentA  = tinymce.editors[this.msgIndex].getContent()
			this.EditorContentA = this.EditorContentA.replace(/<img[^>]+alt=\"([^"]+)\"[^>]*>/g, function(str, match){
				return "<% "+match+" %>"
			})
			this.EditorContentA = this.EditorContentA.replace(/<p>(.*?)<\/p>/g, function(str, match){
				return match
			})
			this.EditorContentA = this.EditorContentA.replace(/&nbsp;*/g, '')
			
			return this.EditorContentA
		},
		saveB(){
			this.EditorContentB  = tinymce.editors[this.msgIndex].getContent()
			return this.EditorContentB
		},
		//批量添加插件
		addPlugins(ed) {
			let self = this
			this.btnsList.forEach(function(i,index){
				self.addOne(i,ed);
			})
		},
		 //添加一个插件
		addOne(item,ed) {
			var nameLower = item.name.toLowerCase(); //转换小写
			var cls = "mce" + item.name;
			var nameReplace = "<% " + nameLower + " %>";
			var pb = '<img alt='+item.name+ ' src="' + this.imgBaseUrl + item.image + '" class="'+item.name+ '"  />'

			ed.ui.registry.addButton(nameLower, {
				text: item.title,
				tooltip : item.title,
				image:"https://img-home.csdnimg.cn/images/20201124032511.png",
				onAction: () => {
					//ed.execCommand('mceInsertContent', 0, pb)
					ed.insertContent(pb)
				}
			});

		},
    },
}
</script>